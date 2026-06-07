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
