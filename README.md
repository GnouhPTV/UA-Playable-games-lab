# UA Playable Games Lab

A beginner-friendly project for learning UA playable ads with Vite, TypeScript, and Phaser 3.

## What is UA Playable Ads?

UA means User Acquisition. Playable ads are interactive ads that let users try a small version of a game before installing or visiting a product page.

## Tech Stack

- Vite
- TypeScript
- Phaser 3
- HTML/CSS

## Version Roadmap

- v0.1.0 - Project Foundation
- v0.2.0 - Tap Monster Game
- v0.3.0 - Runner Gate Game
- v0.4.0 - Merge Cannon Game
- v0.5.0 - Gem Collector Game
- v0.6.0 - Export HTML5 Playable
- v1.0.0 - Portfolio Ready Release

## How to Run

```bash
npm install
npm run dev
```

## v0.2.0 - Tap Monster Game

Tap Monster is the first complete playable ad prototype in this project.

### Gameplay Flow

1. The player opens the main menu.
2. The player chooses **Tap Monster Game**.
3. A monster appears on the screen.
4. The player taps/clicks the monster.
5. The score increases.
6. The monster moves to a random position.
7. A countdown timer runs.
8. When time is over, the game shows an end card.
9. The player can click:
   - **View Portfolio** CTA button
   - **Play Again**
   - **Menu**

### Concepts Learned

- Phaser Scene flow
- Click/tap interaction with `pointerdown`
- Score system
- Timer countdown with `this.time.addEvent`
- Random object positioning
- Tween animation
- End card scene
- Passing data between scenes
- CTA button behavior

### Important Files

```text
src/game/scenes/MenuScene.ts
src/game/scenes/TapMonsterScene.ts
src/game/scenes/EndCardScene.ts
src/game/config.ts
```

## v0.3.0 - Runner Gate Game

Runner Gate is the second playable ad prototype in this project.

### Gameplay Flow

1. The player opens the main menu.
2. The player chooses **Runner Gate**.
3. A player circle appears near the bottom of the screen.
4. Gates move from the top to the bottom.
5. The player drags left and right to choose a gate.
6. Each gate changes the score:
   - `+10` adds 10 points
   - `+20` adds 20 points
   - `+50` adds 50 points
   - `x2` doubles the current score
   - `-5` subtracts 5 points
7. When the timer reaches zero, the game shows the end card.
8. The player can click:
   - **View Portfolio**
   - **Play Again**
   - **Menu**

### Concepts Learned

- Drag control with pointer input
- Lane-based movement
- Object spawning with timer events
- Moving objects using the `update()` loop
- Simple collision detection
- Score modification logic
- Reusing EndCardScene for multiple games
- Passing replay scene data to EndCardScene

### Important Files

```text
src/game/scenes/MenuScene.ts
src/game/scenes/RunnerGateScene.ts
src/game/scenes/EndCardScene.ts
src/game/config.ts
```

## v0.4.0 - Merge Cannon Game

Merge Cannon is the third playable ad prototype in this project.

### Gameplay Flow

1. The player opens the main menu.
2. The player chooses **Merge Cannon**.
3. The game starts with two level-1 cannons.
4. The player can drag one cannon onto another cannon of the same level.
5. Same-level cannons merge into a higher-level cannon.
6. Enemies spawn in the enemy path.
7. Cannons automatically shoot projectiles at the nearest enemy.
8. Enemies lose HP when hit by projectiles.
9. When an enemy is defeated, the player earns coins and gems.
10. If enemies reach the defense line, Base HP decreases.
11. When the timer ends or Base HP reaches zero, the game shows the end card.
12. The player can click:

- **View Portfolio**
- **Play Again**
- **Menu**

### Concepts Learned

- Drag and drop interaction
- Merge mechanic
- Slot-based object placement
- Enemy spawning
- Enemy HP system
- Auto shooting system
- Projectile movement toward a target
- Damage calculation
- Reward system with coins and gems
- Timer-based game ending
- Base HP loss condition
- Reusing EndCardScene for multiple playable games

### Important Files

src/game/scenes/MenuScene.ts
src/game/scenes/MergeCannonScene.ts
src/game/scenes/EndCardScene.ts
src/game/config.ts

### Study Notes

`MergeCannonScene.ts` contains the main merge-defense gameplay logic.

Important functions:

create()
createSlots()
addCannon()
handleCannonDrop()
findMergeTarget()
mergeCannons()
startEnemySpawner()
spawnEnemy()
updateEnemies()
startCannonShooting()
fireAllCannons()
fireCannon()
findNearestEnemy()
updateProjectiles()
damageEnemy()
handleEnemyKilled()
handleEnemyReachedBase()
endGame()

This game combines several important playable ads mechanics: drag/drop, merge, automatic combat, rewards, timer, and end card flow.

The cannon damage is based on cannon level:

const damage = cannon.level \* 8;

Higher-level cannons are stronger, which makes the merge mechanic meaningful.

The exported or final playable flow should be short, visual, and easy to understand within a few seconds.
