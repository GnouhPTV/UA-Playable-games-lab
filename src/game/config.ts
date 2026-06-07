import Phaser from 'phaser';
import { MenuScene } from './scenes/MenuScene';
import { TapMonsterScene } from './scenes/TapMonsterScene';
import { EndCardScene } from './scenes/EndCardScene';

export const gameConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  parent: 'game-container',
  backgroundColor: '#111827',
  scene: [MenuScene, TapMonsterScene, EndCardScene],
};
