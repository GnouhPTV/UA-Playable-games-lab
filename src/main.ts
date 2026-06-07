import './style.css';
import Phaser from 'phaser';
import { gameConfig } from './game/config';
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="game-shell">
    <h1 class="game-title">UA Playable Games Lab</h1>
    <div id="game-container"></div>
  </div>
`;

new Phaser.Game(gameConfig);
