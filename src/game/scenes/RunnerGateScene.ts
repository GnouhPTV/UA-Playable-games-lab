import Phaser from 'phaser';
import { SceneKeys } from '../sceneKeys';
import { startEndCard } from '../framework/startEndCard';

type GateValue = '+10' | '+20' | '+50' | 'x2' | '-5';

type GateData = {
  rowId: number;
  value: GateValue;
  rect: Phaser.GameObjects.Rectangle;
  label: Phaser.GameObjects.Text;
};

export class RunnerGateScene extends Phaser.Scene {
  private score = 0;
  private timeLeft = 20;
  private isGameOver = false;

  private player!: Phaser.GameObjects.Arc;
  private scoreText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;

  private gates: GateData[] = [];
  private passedRows = new Set<number>();
  private nextRowId = 1;

  private spawnEvent?: Phaser.Time.TimerEvent;
  private countdownEvent?: Phaser.Time.TimerEvent;

  private laneXs = [90, 180, 270];
  private gateSpeed = 170;

  constructor() {
    super(SceneKeys.RunnerGate);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Reset trạng thái mỗi lần scene bắt đầu.
    this.score = 0;
    this.timeLeft = 20;
    this.isGameOver = false;
    this.gates = [];
    this.passedRows.clear();
    this.nextRowId = 1;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a);

    this.createRoad();
    this.createHud();
    this.createPlayer();
    this.createBackButton();

    this.add
      .text(width / 2, 132, 'Drag left/right to choose the best gate', {
        fontSize: '14px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    this.setupDragControl();
    this.startGateSpawner();
    this.startCountdown();
  }

  update(_time: number, delta: number) {
    if (this.isGameOver) {
      return;
    }

    // delta là thời gian giữa 2 frame, tính bằng milliseconds.
    // Ta đổi sang giây bằng cách chia 1000.
    const distance = this.gateSpeed * (delta / 1000);

    for (const gate of this.gates) {
      gate.rect.y += distance;
      gate.label.y += distance;
    }

    this.checkGateCollisions();
    this.removeOldGates();
  }

  private createRoad() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Road background
    this.add.rectangle(width / 2, height / 2 + 35, 280, height, 0x1e293b);

    // Lane dividers
    this.add.rectangle(135, height / 2 + 35, 3, height, 0x334155, 0.9);
    this.add.rectangle(225, height / 2 + 35, 3, height, 0x334155, 0.9);

    // Side dark areas
    this.add.rectangle(25, height / 2, 50, height, 0x020617, 0.8);
    this.add.rectangle(width - 25, height / 2, 50, height, 0x020617, 0.8);

    // Small title
    this.add
      .text(width / 2, 48, 'Choose The Best Gate', {
        fontSize: '25px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
  }

  private createHud() {
    this.scoreText = this.add.text(20, 85, 'Score: 0', {
      fontSize: '21px',
      color: '#facc15',
      fontStyle: 'bold',
    });

    this.timerText = this.add
      .text(340, 85, 'Time: 20', {
        fontSize: '21px',
        color: '#38bdf8',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);
  }

  private createPlayer() {
    const width = this.scale.width;

    // Player là hình tròn xanh ở gần cuối màn hình.
    this.player = this.add.circle(width / 2, 540, 26, 0x60a5fa);
    this.player.setStrokeStyle(4, 0xffffff);

    this.add
      .text(width / 2, 540, 'P', {
        fontSize: '20px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
  }

  private setupDragControl() {
    const width = this.scale.width;

    // Người chơi có thể kéo ở bất kỳ vị trí nào trên màn hình.
    // Nếu đang giữ chuột/tay, player sẽ đi theo trục X.
    this.input.on('pointermove', (pointer: Phaser.Input.Pointer) => {
      if (!pointer.isDown || this.isGameOver) {
        return;
      }

      this.player.x = Phaser.Math.Clamp(pointer.x, 60, width - 60);
    });

    // Khi người chơi chạm vào màn hình, player cũng nhảy tới vị trí X đó.
    this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {
      if (this.isGameOver) {
        return;
      }

      this.player.x = Phaser.Math.Clamp(pointer.x, 60, width - 60);
    });
  }

  private startGateSpawner() {
    // Tạo row gate đầu tiên ngay lập tức.
    this.spawnGateRow();

    // Sau đó cứ 1.5 giây tạo thêm một row gate.
    this.spawnEvent = this.time.addEvent({
      delay: 1500,
      loop: true,
      callback: () => {
        this.spawnGateRow();
      },
    });
  }

  private spawnGateRow() {
    const rowId = this.nextRowId;
    this.nextRowId += 1;

    for (const laneX of this.laneXs) {
      const value = this.getRandomGateValue();

      const isBadGate = value.startsWith('-');
      const isMultiplyGate = value.startsWith('x');

      const color = isBadGate ? 0xef4444 : isMultiplyGate ? 0xa855f7 : 0x22c55e;

      const rect = this.add.rectangle(laneX, -40, 78, 54, color, 0.95);
      rect.setStrokeStyle(3, 0xffffff);

      const label = this.add
        .text(laneX, -40, value, {
          fontSize: '22px',
          color: '#ffffff',
          fontStyle: 'bold',
        })
        .setOrigin(0.5);

      this.gates.push({
        rowId,
        value,
        rect,
        label,
      });
    }
  }

  private getRandomGateValue(): GateValue {
    const values: GateValue[] = ['+10', '+20', '+50', 'x2', '-5'];
    return Phaser.Utils.Array.GetRandom(values);
  }

  private checkGateCollisions() {
    for (const gate of this.gates) {
      if (this.passedRows.has(gate.rowId)) {
        continue;
      }

      const hit = this.isPlayerTouchingGate(gate);

      if (hit) {
        this.handleGateHit(gate);
      }
    }
  }

  private isPlayerTouchingGate(gate: GateData) {
    // Ta dùng kiểm tra khoảng cách đơn giản để dễ hiểu.
    // Nếu player đủ gần gate theo cả X và Y thì coi như va chạm.
    const dx = Math.abs(this.player.x - gate.rect.x);
    const dy = Math.abs(this.player.y - gate.rect.y);

    const playerRadius = 26;
    const gateHalfWidth = 39;
    const gateHalfHeight = 27;

    return dx < playerRadius + gateHalfWidth && dy < playerRadius + gateHalfHeight;
  }

  private handleGateHit(selectedGate: GateData) {
    this.passedRows.add(selectedGate.rowId);

    this.applyGateValue(selectedGate.value);
    this.showGateFeedback(selectedGate.value);

    // Hiệu ứng gate được chọn
    this.tweens.add({
      targets: selectedGate.rect,
      scaleX: 1.15,
      scaleY: 1.15,
      duration: 100,
      yoyo: true,
    });

    // Sau khi chọn một gate trong row, xóa cả row đó.
    // Điều này giống playable ads: người chơi chỉ được chọn một cổng.
    this.time.delayedCall(140, () => {
      this.destroyGateRow(selectedGate.rowId);
    });
  }

  private applyGateValue(value: GateValue) {
    if (value.startsWith('+')) {
      const amount = Number(value.replace('+', ''));
      this.score += amount;
    }

    if (value.startsWith('-')) {
      const amount = Number(value.replace('-', ''));
      this.score = Math.max(0, this.score - amount);
    }

    if (value === 'x2') {
      this.score *= 2;
    }

    this.scoreText.setText(`Score: ${this.score}`);
  }

  private showGateFeedback(value: GateValue) {
    const feedback = this.add
      .text(this.player.x, this.player.y - 55, value, {
        fontSize: '26px',
        color: value.startsWith('-') ? '#ef4444' : '#22c55e',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: feedback,
      y: feedback.y - 45,
      alpha: 0,
      duration: 600,
      onComplete: () => {
        feedback.destroy();
      },
    });
  }

  private destroyGateRow(rowId: number) {
    const remainingGates: GateData[] = [];

    for (const gate of this.gates) {
      if (gate.rowId === rowId) {
        gate.rect.destroy();
        gate.label.destroy();
      } else {
        remainingGates.push(gate);
      }
    }

    this.gates = remainingGates;
  }

  private removeOldGates() {
    const height = this.scale.height;
    const remainingGates: GateData[] = [];

    for (const gate of this.gates) {
      if (gate.rect.y > height + 80) {
        gate.rect.destroy();
        gate.label.destroy();
      } else {
        remainingGates.push(gate);
      }
    }

    this.gates = remainingGates;
  }

  private startCountdown() {
    this.countdownEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.timeLeft -= 1;
        this.timerText.setText(`Time: ${this.timeLeft}`);

        if (this.timeLeft <= 0) {
          this.endGame();
        }
      },
    });
  }

  private endGame() {
    this.isGameOver = true;

    this.spawnEvent?.remove(false);
    this.countdownEvent?.remove(false);

    startEndCard(this, {
      finalScore: this.score,
      title: 'Runner Finished!',
      message: 'You chose gates and changed your score.',
      replayScene: SceneKeys.RunnerGate,
    });
  }

  private createBackButton() {
    const button = this.add.rectangle(70, 608, 110, 42, 0xffffff);
    button.setInteractive({ useHandCursor: true });

    this.add
      .text(70, 608, 'Menu', {
        fontSize: '18px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    button.on('pointerdown', () => {
      this.spawnEvent?.remove(false);
      this.countdownEvent?.remove(false);
      this.scene.start(SceneKeys.Menu);
    });
  }
}
