import Phaser from 'phaser';

type EndCardData = {
  finalScore?: number;
};

export class EndCardScene extends Phaser.Scene {
  private finalScore = 0;
  private ctaUrl = 'https://github.com/GnouhPTV/UA-Playable-games-lab';

  constructor() {
    super('EndCardScene');
  }

  init(data: EndCardData) {
    // init() runs before create().
    // We use it to receive data from another scene.
    // In this case, TapMonsterScene sends the final score here.
    this.finalScore = data.finalScore ?? 0;
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a);

    // Decorative success circle
    this.add.circle(width / 2, 145, 58, 0x22c55e);
    this.add.circle(width / 2, 145, 45, 0x86efac);

    this.add
      .text(width / 2, 145, '✓', {
        fontSize: '54px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Main title
    this.add
      .text(width / 2, 240, 'Great Job!', {
        fontSize: '36px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Final score
    this.add
      .text(width / 2, 295, `Final Score: ${this.finalScore}`, {
        fontSize: '24px',
        color: '#facc15',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Short marketing-style message
    this.add
      .text(width / 2, 335, 'This is my first playable ad prototype.', {
        fontSize: '15px',
        color: '#cbd5e1',
        align: 'center',
      })
      .setOrigin(0.5);

    // CTA button
    this.createButton(width / 2, 420, 'View Portfolio', 0x22c55e, '#0f172a', () => {
      this.handleCtaClick();
    });

    // Replay button
    this.createButton(width / 2, 490, 'Play Again', 0xffffff, '#0f172a', () => {
      this.scene.start('TapMonsterScene');
    });

    // Menu button
    this.createButton(width / 2, 560, 'Menu', 0x334155, '#ffffff', () => {
      this.scene.start('MenuScene');
    });
  }

  private createButton(
    x: number,
    y: number,
    label: string,
    backgroundColor: number,
    textColor: string,
    onClick: () => void,
  ) {
    const button = this.add.rectangle(x, y, 240, 54, backgroundColor, 1);
    button.setInteractive({ useHandCursor: true });

    this.add
      .text(x, y, label, {
        fontSize: '20px',
        color: textColor,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Small hover/tap feedback
    button.on('pointerdown', () => {
      this.tweens.add({
        targets: button,
        scaleX: 0.95,
        scaleY: 0.95,
        duration: 80,
        yoyo: true,
        onComplete: onClick,
      });
    });
  }

  private handleCtaClick() {
    // In a real ad network, CTA handling may use MRAID or network-specific APIs.
    // For learning, we open a placeholder URL.
    window.open(this.ctaUrl, '_blank');
  }
}
