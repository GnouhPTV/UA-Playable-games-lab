import Phaser from 'phaser';
import { SceneKeys } from '../sceneKeys';
import { GameColors } from '../colors';
import { createTextButton } from '../ui/createTextButton';
import { ExportSystem } from '../systems/ExportSystem';
import { PlayableGameRegistry } from '../gameRegistry';

export class MenuScene extends Phaser.Scene {
  constructor() {
    super(SceneKeys.Menu);
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.add.rectangle(width / 2, height / 2, width, height, GameColors.blueDark);

    this.add
      .text(width / 2, 74, 'UA Playable Games Lab', {
        fontSize: '25px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 108, 'Build playable ads step by step', {
        fontSize: '15px',
        color: '#dbeafe',
      })
      .setOrigin(0.5);

    this.createGameButtons(width);
    this.createExportButton(width);

    this.add
      .text(width / 2, 620, 'v0.8.0 - Playable Framework', {
        fontSize: '12px',
        color: '#bfdbfe',
      })
      .setOrigin(0.5);
  }

  private createGameButtons(width: number) {
    const startY = 175;
    const gap = 70;

    PlayableGameRegistry.forEach((game, index) => {
      const y = startY + index * gap;

      createTextButton(this, {
        x: width / 2,
        y,
        width: 260,
        height: 54,
        label: game.title,
        backgroundColor: GameColors.white,
        textColor: '#2563eb',
        fontSize: '18px',
        onClick: () => {
          this.scene.start(game.sceneKey);
        },
      });

      this.add
        .text(width / 2, y + 34, `${game.version} • ${game.mechanics.join(', ')}`, {
          fontSize: '10px',
          color: '#dbeafe',
        })
        .setOrigin(0.5);
    });
  }

  private createExportButton(width: number) {
    createTextButton(this, {
      x: width / 2,
      y: 490,
      width: 260,
      height: 46,
      label: 'Export Tap Monster ZIP',
      backgroundColor: GameColors.green,
      textColor: '#0f172a',
      fontSize: '15px',
      onClick: () => {
        void ExportSystem.exportTapMonsterPlayable();
      },
    });
  }
}
