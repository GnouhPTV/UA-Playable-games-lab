import { SceneKeys } from '../sceneKeys';
import { GameColors } from '../colors';
import { createTextButton } from '../ui/createTextButton';
import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Menu);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 800080);

    // Title
    this.add
      .text(width / 2, 120, 'UA Playable Games Lab', {
        fontSize: '26px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 155, 'Build playable ads step by step', {
        fontSize: '16px',
        color: '#dbeafe',
      })
      .setOrigin(0.5);

    createTextButton(this, {
      x: width / 2,
      y: 240,
      width: 260,
      height: 56,
      label: 'Tap Monster Game',
      backgroundColor: GameColors.white,
      textColor: '#2563eb',
      onClick: () => {
        this.scene.start(SceneKeys.TapMonster);
      },
    });

    createTextButton(this, {
      x: width / 2,
      y: 320,
      width: 260,
      height: 56,
      label: 'Runner Gate',
      backgroundColor: GameColors.white,
      textColor: '#2563eb',
      onClick: () => {
        this.scene.start(SceneKeys.RunnerGate);
      },
    });

    createTextButton(this, {
      x: width / 2,
      y: 400,
      width: 260,
      height: 56,
      label: 'Merge Cannon',
      backgroundColor: GameColors.white,
      textColor: '#2563eb',
      onClick: () => {
        this.scene.start(SceneKeys.MergeCannon);
      },
    });

    createTextButton(this, {
      x: width / 2,
      y: 480,
      width: 260,
      height: 56,
      label: 'Gem Collector',
      backgroundColor: GameColors.white,
      textColor: '#2563eb',
      onClick: () => {
        this.scene.start(SceneKeys.GemCollector);
      },
    });

    this.add
      .text(width / 2, 600, 'v0.1.0 - Project Foundation', {
        fontSize: '16px',
        color: '#dbeafe',
      })
      .setOrigin(0.5);
  }
}
