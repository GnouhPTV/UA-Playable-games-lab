import Phaser from 'phaser';
import { SceneKeys } from '../sceneKeys';
import type { EndCardData } from '../types/playable';

export function startEndCard(scene: Phaser.Scene, data: EndCardData) {
  scene.scene.start(SceneKeys.EndCard, data);
}
