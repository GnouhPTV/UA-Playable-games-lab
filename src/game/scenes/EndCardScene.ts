import Phaser from 'phaser';
import { SceneKeys } from '../sceneKeys';
import { GameColors } from '../colors';
import { createTextButton } from '../ui/createTextButton';

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
  private replayScene: string = SceneKeys.TapMonster;
  private ctaUrl = 'https://github.com/GnouhPTV/UA-Playable-games-lab';

  constructor() {
    super(SceneKeys.EndCard);
  }

  init(data: EndCardData) {
    // init() nhận dữ liệu từ scene trước.
    // Ví dụ TapMonsterScene hoặc RunnerGateScene có thể gửi finalScore sang đây.
    this.finalScore = data.finalScore ?? 0;
    this.title = data.title ?? 'Great Job!';
    this.message = data.message ?? 'You finished the playable!';
    this.replayScene = data.replayScene ?? SceneKeys.TapMonster;
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

    createTextButton(this, {
      x: width / 2,
      y: 420,
      width: 240,
      height: 54,
      label: 'View Portfolio',
      backgroundColor: GameColors.green,
      textColor: '#0f172a',
      onClick: () => {
        this.handleCtaClick();
      },
    });

    createTextButton(this, {
      x: width / 2,
      y: 490,
      width: 240,
      height: 54,
      label: 'Play Again',
      backgroundColor: GameColors.white,
      textColor: '#0f172a',
      onClick: () => {
        this.scene.start(this.replayScene);
      },
    });

    createTextButton(this, {
      x: width / 2,
      y: 560,
      width: 240,
      height: 54,
      label: 'Menu',
      backgroundColor: GameColors.slate,
      textColor: '#ffffff',
      onClick: () => {
        this.scene.start(SceneKeys.Menu);
      },
    });
  }

  private handleCtaClick() {
    // Trong playable ads thật, CTA có thể dùng MRAID hoặc SDK của ad network.
    // Ở project học này, ta dùng window.open để dễ hiểu.
    window.open(this.ctaUrl, '_blank');
  }
}
