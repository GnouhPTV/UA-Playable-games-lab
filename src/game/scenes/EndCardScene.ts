import Phaser from 'phaser';

type EndCardData = {
  finalScore?: number;
  title?: string;
  message?: string;
  replayScene?: string;
};

export class EndCardScene extends Phaser.Scene {
  private finalScore = 0;
  private title = 'Great Job!';
  private message = 'You finished the playable!';
  private replayScene = 'TapMonsterScene';
  private ctaUrl = 'https://github.com/GnouhPTV/UA-Playable-games-lab';

  constructor() {
    super('EndCardScene');
  }

  init(data: EndCardData) {
    // init() nhận dữ liệu từ scene trước.
    // Ví dụ TapMonsterScene hoặc RunnerGateScene có thể gửi finalScore sang đây.
    this.finalScore = data.finalScore ?? 0;
    this.title = data.title ?? 'Great Job!';
    this.message = data.message ?? 'You finished the playable!';
    this.replayScene = data.replayScene ?? 'TapMonsterScene';
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a);

    // Success icon
    this.add.circle(width / 2, 145, 58, 0x22c55e);
    this.add.circle(width / 2, 145, 45, 0x86efac);

    this.add
      .text(width / 2, 145, '✓', {
        fontSize: '54px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 240, this.title, {
        fontSize: '34px',
        color: '#ffffff',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 295, `Final Score: ${this.finalScore}`, {
        fontSize: '24px',
        color: '#facc15',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 335, this.message, {
        fontSize: '15px',
        color: '#cbd5e1',
        align: 'center',
        wordWrap: {
          width: 300,
        },
      })
      .setOrigin(0.5);

    this.createButton(width / 2, 420, 'View Portfolio', 0x22c55e, '#0f172a', () => {
      this.handleCtaClick();
    });

    this.createButton(width / 2, 490, 'Play Again', 0xffffff, '#0f172a', () => {
      this.scene.start(this.replayScene);
    });

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
    // Trong playable ads thật, CTA có thể dùng MRAID hoặc SDK của ad network.
    // Ở project học này, ta dùng window.open để dễ hiểu.
    window.open(this.ctaUrl, '_blank');
  }
}
