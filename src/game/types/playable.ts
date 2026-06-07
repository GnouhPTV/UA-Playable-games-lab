import { SceneKeys } from '../sceneKeys';

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];

export type PlayableGameId = 'tap-monster' | 'runner-gate' | 'merge-cannon' | 'gem-collector';

export type PlayableGameStatus = 'done' | 'coming-soon';

export type PlayableGameDefinition = {
  id: PlayableGameId;
  title: string;
  description: string;
  sceneKey: SceneKey;
  version: string;
  mechanics: string[];
  status: PlayableGameStatus;
};

export type EndCardData = {
  finalScore?: number;
  title?: string;
  message?: string;
  replayScene?: SceneKey;
};
