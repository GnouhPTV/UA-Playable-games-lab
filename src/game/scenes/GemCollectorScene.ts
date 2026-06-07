import Phaser from 'phaser';
import { SceneKeys } from '../sceneKeys';
import { GameColors } from '../colors';
import { createTextButton } from '../ui/createTextButton';
import { showFloatingText } from '../ui/showFloatingText';
import { startEndCard } from '../framework/startEndCard';

type GemData = {
  id: string;
  value: number;
  body: Phaser.GameObjects.Rectangle;
  label: Phaser.GameObjects.Text;
};

export class GemCollectorScene extends Phaser.Scene {
  private gems: GemData[] = [];

  private collectedGems = 0;
  private targetGems = 80;
  private timeLeft = 25;
  private isGameOver = false;

  private gemsText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;

  private countdownEvent?: Phaser.Time.TimerEvent;
  private gemSpawnEvent?: Phaser.Time.TimerEvent;

  constructor() {
    super(SceneKeys.GemCollector);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Reset game state every time this scene starts.
    this.gems = [];
    this.collectedGems = 0;
    this.targetGems = 80;
    this.timeLeft = 25;
    this.isGameOver = false;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, GameColors.background);

    this.add
      .text(width / 2, 48, 'Gem Collector Game', {
        fontSize: '25px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 82, 'Tap gems to reach the target before time runs out', {
        fontSize: '13px',
        color: '#cbd5e1',
        align: 'center',
        wordWrap: { width: 300 },
      })
      .setOrigin(0.5);

    this.createPlayArea();
    this.createHud();
    this.createBackButton();

    // Spawn a few gems at the start.
    for (let i = 0; i < 5; i++) {
      this.spawnGem();
    }

    this.startGemSpawner();
    this.startCountdown();
  }

  private createPlayArea() {
    const width = this.scale.width;

    this.add.rectangle(width / 2, 330, 310, 400, GameColors.panel, 0.9);
    this.add.rectangle(width / 2, 330, 300, 390, GameColors.panelDark, 0.25);

    this.add
      .text(width / 2, 145, 'Collect Area', {
        fontSize: '16px',
        color: '#bfdbfe',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);
  }

  private createHud() {
    this.gemsText = this.add.text(20, 105, 'Gems: 0', {
      fontSize: '17px',
      color: '#38bdf8',
      fontStyle: 'bold',
    });

    this.add.text(20, 128, 'Target: 80', {
      fontSize: '17px',
      color: '#facc15',
      fontStyle: 'bold',
    });
    this.timerText = this.add
      .text(340, 105, 'Time: 25', {
        fontSize: '17px',
        color: '#22c55e',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);
  }

  private startGemSpawner() {
    this.gemSpawnEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.isGameOver) {
          return;
        }

        // Keep the screen readable. Do not spawn too many gems.
        if (this.gems.length < 10) {
          this.spawnGem();
        }
      },
    });
  }

  private spawnGem() {
    const width = this.scale.width;

    const x = Phaser.Math.Between(70, width - 70);
    const y = Phaser.Math.Between(175, 500);

    const value = Phaser.Utils.Array.GetRandom([2, 5, 10, 20]);

    // A gem is represented by a rotated square.
    const body = this.add.rectangle(x, y, 34, 34, GameColors.blue, 1);
    body.setRotation(Math.PI / 4);
    body.setStrokeStyle(3, GameColors.white);
    body.setInteractive({ useHandCursor: true });

    const label = this.add
      .text(x, y + 34, `+${value}`, {
        fontSize: '13px',
        color: '#e0f2fe',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const gem: GemData = {
      id: crypto.randomUUID(),
      value,
      body,
      label,
    };

    this.gems.push(gem);

    body.on('pointerdown', () => {
      this.collectGem(gem);
    });

    // Small spawn animation.
    body.setScale(0);
    label.setAlpha(0);

    this.tweens.add({
      targets: body,
      scale: 1,
      duration: 160,
      ease: 'Back.Out',
    });

    this.tweens.add({
      targets: label,
      alpha: 1,
      duration: 160,
    });
  }

  private collectGem(gem: GemData) {
    if (this.isGameOver) {
      return;
    }

    this.collectedGems += gem.value;
    this.gemsText.setText(`Gems: ${this.collectedGems}`);

    showFloatingText(this, {
      x: gem.body.x,
      y: gem.body.y - 38,
      text: `+${gem.value}`,
      color: '#38bdf8',
      fontSize: '24px',
    });

    // Disable interaction so the same gem cannot be collected twice.
    gem.body.disableInteractive();

    this.tweens.add({
      targets: [gem.body, gem.label],
      scale: 1.4,
      alpha: 0,
      duration: 160,
      onComplete: () => {
        this.removeGem(gem);
      },
    });

    if (this.collectedGems >= this.targetGems) {
      this.endGame('Target Reached!');
    }
  }

  private removeGem(gem: GemData) {
    gem.body.destroy();
    gem.label.destroy();

    this.gems = this.gems.filter((item) => item.id !== gem.id);
  }

  private startCountdown() {
    this.countdownEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.isGameOver) {
          return;
        }

        this.timeLeft -= 1;
        this.timerText.setText(`Time: ${this.timeLeft}`);

        if (this.timeLeft <= 0) {
          this.endGame("Time's Up!");
        }
      },
    });
  }

  private endGame(reason: string) {
    if (this.isGameOver) {
      return;
    }

    this.isGameOver = true;

    this.countdownEvent?.remove(false);
    this.gemSpawnEvent?.remove(false);

    for (const gem of [...this.gems]) {
      gem.body.disableInteractive();
    }

    this.time.delayedCall(350, () => {
      startEndCard(this, {
        finalScore: this.collectedGems,
        title: reason === 'Target Reached!' ? 'Target Reached!' : "Time's Up!",
        message: `Collected Gems: ${this.collectedGems} / ${this.targetGems}`,
        replayScene: SceneKeys.GemCollector,
      });
    });
  }

  private createBackButton() {
    createTextButton(this, {
      x: 70,
      y: 608,
      width: 110,
      height: 42,
      label: 'Menu',
      backgroundColor: GameColors.white,
      textColor: '#0f172a',
      fontSize: '18px',
      onClick: () => {
        this.countdownEvent?.remove(false);
        this.gemSpawnEvent?.remove(false);
        this.scene.start(SceneKeys.Menu);
      },
    });
  }
}
