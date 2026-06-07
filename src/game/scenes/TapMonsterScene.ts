import Phaser from 'phaser';

export class TapMonsterScene extends Phaser.Scene {
  private score = 0;
  private timeLeft = 15;
  private isGameOver = false;

  private scoreText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private monster!: Phaser.GameObjects.Container;
  private countdownEvent?: Phaser.Time.TimerEvent;

  constructor() {
    super('TapMonsterScene');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.score = 0;
    this.timeLeft = 15;
    this.isGameOver = false;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a);

    // Title
    this.add
      .text(width / 2, 50, 'Tap the Pink Monster', {
        fontSize: '26px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Score text
    this.scoreText = this.add.text(20, 90, 'Score: 0', {
      fontSize: '22px',
      color: '#facc15',
      fontStyle: 'bold',
    });

    this.timerText = this.add
      .text(width - 20, 90, 'Time: 15', {
        fontSize: '22px',
        color: '#38bdf8',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);

    // Small instruction
    this.add
      .text(width / 2, 130, 'Tap the monster to get points!', {
        fontSize: '16px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    // Create the monster
    this.createMonster();

    // Start 30-second countdown
    this.startCountdown();

    // Back to menu button
    this.createBackButton();
  }

  private createMonster() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Container giúp gom nhiều phần của monster lại với nhau.
    // Khi container di chuyển, body, mắt, miệng sẽ đi theo.
    this.monster = this.add.container(width / 2, height / 2);

    // Monster body
    const body = this.add.circle(0, 0, 56, 0x22c55e);
    body.setStrokeStyle(4, 0xffffff);

    // Cho chính body nhận click/tap.
    // Cách này dễ hiểu và ổn định hơn setInteractive trực tiếp trên Container.
    body.setInteractive({ useHandCursor: true });

    body.on('pointerdown', () => {
      this.handleMonsterTap();
    });

    // Eyes
    const leftEye = this.add.circle(-16, -12, 6, 0x111827);
    const rightEye = this.add.circle(16, -12, 6, 0x111827);

    // Mouth
    const mouth = this.add.rectangle(0, 18, 28, 6, 0x111827);
    mouth.setOrigin(0.5);

    // Add all parts into the monster container
    this.monster.add([body, leftEye, rightEye, mouth]);
  }

  private startCountdown() {
    this.countdownEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        this.timeLeft -= 1;
        this.timerText.setText(`Time: ${this.timeLeft}`);

        if (this.timeLeft <= 0) {
          this.countdownEvent?.remove(false);
          this.endGame();
        }
      },
    });
  }

  private handleMonsterTap() {
    if (this.isGameOver) {
      return;
    }
    // 1. Increase score
    this.score += 2;
    this.scoreText.setText(`Score: ${this.score}`);

    // 2. Show floating +2 effect
    this.showFloatingScore();

    // 3. Add small pop animation
    this.tweens.add({
      targets: this.monster,
      scale: 1.2,
      duration: 80,
      yoyo: true,
      ease: 'Power1',
    });

    // 4. Move monster to a new random position
    this.moveMonsterToRandomPosition();
  }

  private moveMonsterToRandomPosition() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Keep monster inside safe area.
    // We avoid the top title area and bottom edge.
    const marginX = 70;
    const minY = 190;
    const maxY = height - 90;

    const randomX = Phaser.Math.Between(marginX, width - marginX);
    const randomY = Phaser.Math.Between(minY, maxY);

    this.monster.setPosition(randomX, randomY);
  }

  private showFloatingScore() {
    const floatingText = this.add
      .text(this.monster.x, this.monster.y - 60, '+2', {
        fontSize: '26px',
        color: '#22c55e',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Move the +2 upward and fade it out
    this.tweens.add({
      targets: floatingText,
      y: floatingText.y - 40,
      alpha: 0,
      duration: 500,
      onComplete: () => {
        floatingText.destroy();
      },
    });
  }

  private createBackButton() {
    const button = this.add.rectangle(70, 590, 110, 42, 0xffffff);
    button.setInteractive({ useHandCursor: true });

    this.add
      .text(70, 590, 'Menu', {
        fontSize: '18px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    button.on('pointerdown', () => {
      this.scene.start('MenuScene');
    });
  }

  private endGame() {
    this.isGameOver = true;

    // Stop countdown if it is still running
    this.countdownEvent?.remove(false);

    // Hide monster so user understands the game is finished
    this.monster.setVisible(false);

    // Move to EndCardScene and pass the final score
    this.scene.start('EndCardScene', {
      finalScore: this.score,
    });
  }
}
