import Phaser from 'phaser';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super('MenuScene');
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

    this.createMenuButton(width / 2, 240, 'Tap Monster Game', () => {
      this.scene.start('TapMonsterScene');
    });

    this.createMenuButton(width / 2, 320, 'Runner Gate', () => {
      console.log('Runner Gate clicked');
    });

    this.createMenuButton(width / 2, 400, 'Merge Cannon', () => {
      console.log('Merge Cannon clicked');
    });

    this.createMenuButton(width / 2, 480, 'Gem Collector', () => {
      console.log('Gem Collector clicked');
    });
    this.add
      .text(width / 2, 600, 'v0.1.0 - Project Foundation', {
        fontSize: '16px',
        color: '#dbeafe',
      })
      .setOrigin(0.5);
  }

  private createMenuButton(x: number, y: number, label: string, onClick: () => void) {
    const button = this.add.rectangle(x, y, 260, 56, 0xffffff, 1);
    button.setInteractive({ useHandCursor: true });

    this.add
      .text(x, y, label, {
        fontSize: '20px',
        color: '#2563eb',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    button.on('pointerdown', onClick);
  }
}
