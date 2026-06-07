import { SceneKeys } from './sceneKeys';
import type { PlayableGameDefinition } from './types/playable';

export const PlayableGameRegistry: PlayableGameDefinition[] = [
  {
    id: 'tap-monster',
    title: 'Tap Monster',
    description: 'Tap target, score, timer, end card, and CTA flow.',
    sceneKey: SceneKeys.TapMonster,
    version: 'v0.2.0',
    mechanics: ['Tap', 'Score', 'Timer', 'End Card', 'CTA'],
    status: 'done',
  },
  {
    id: 'runner-gate',
    title: 'Runner Gate',
    description: 'Drag left/right, choose gates, collide, and change score.',
    sceneKey: SceneKeys.RunnerGate,
    version: 'v0.3.0',
    mechanics: ['Drag', 'Gate Choice', 'Collision', 'Score Modifier'],
    status: 'done',
  },
  {
    id: 'merge-cannon',
    title: 'Merge Cannon',
    description: 'Drag, merge, shoot enemies, gain rewards, and defend base.',
    sceneKey: SceneKeys.MergeCannon,
    version: 'v0.4.0',
    mechanics: ['Drag & Drop', 'Merge', 'Enemy HP', 'Projectile', 'Reward'],
    status: 'done',
  },
  {
    id: 'gem-collector',
    title: 'Gem Collector',
    description: 'Tap collectibles, collect gems, respawn objects, and reach target score.',
    sceneKey: SceneKeys.GemCollector,
    version: 'v0.5.0',
    mechanics: ['Collectible', 'Respawn', 'Target Score', 'Timer'],
    status: 'done',
  },
];
