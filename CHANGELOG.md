# Changelog

All notable changes to UA Playable Games Lab will be documented in this file.

## [0.5.0] - Gem Collector Game

### Added

- Added Gem Collector playable game scene.
- Added collectible gem objects.
- Added random gem spawning inside the play area.
- Added gem values such as `+2`, `+5`, `+10`, and `+20`.
- Added tap/click collection interaction.
- Added collected gems score.
- Added target gem score condition.
- Added countdown timer.
- Added gem respawn system.
- Added floating reward text when gems are collected.
- Added collection animation when gems disappear.
- Added End Card flow for Gem Collector.
- Added replay support for Gem Collector through shared EndCardScene.

### Changed

- Updated main menu so Gem Collector button opens the playable game.
- Updated Phaser scene configuration to include GemCollectorScene.
- Updated SceneKeys to include GemCollector.
- Reused shared UI helpers for Gem Collector buttons and floating text.

### Notes

- This version introduces collectible objects, respawn logic, target score conditions, and another complete playable ad prototype.

## [0.4.5] - Refactor & Architecture

### Added

- Added shared scene key constants.
- Added shared game color constants.
- Added reusable text button helper.
- Added reusable floating text helper.

### Changed

- Started replacing hardcoded scene name strings with shared `SceneKeys`.
- Refactored repeated button creation logic into a shared helper.
- Improved code readability for future playable game development.

### Notes

- This version does not add a new game.
- The goal is to improve project structure and prepare the codebase for future playable ads.

## [0.4.0] - Merge Cannon Game

### Added

- Added Merge Cannon playable game scene.
- Added 6 cannon slots.
- Added draggable cannon objects.
- Added same-level cannon merge mechanic.
- Added cannon level system.
- Added cannon color changes by level.
- Added Add/Buy Cannon button.
- Added enemy spawning system.
- Added enemy HP display.
- Added enemy movement toward the defense line.
- Added Base HP system.
- Added automatic cannon shooting.
- Added projectile movement toward nearest enemy.
- Added damage system.
- Added enemy defeat handling.
- Added coins and gems reward system.
- Added countdown timer.
- Added game ending when timer reaches zero.
- Added game ending when Base HP reaches zero.
- Added End Card flow for Merge Cannon.
- Added replay support for Merge Cannon through shared EndCardScene.

### Changed

- Updated main menu so Merge Cannon button opens the playable game.
- Updated Phaser scene configuration to include MergeCannonScene.
- Improved EndCardScene reuse across Tap Monster, Runner Gate, and Merge Cannon.

### Notes

- This version introduces drag-and-drop, merge mechanics, enemy HP, auto shooting, projectile targeting, rewards, timer, and defense-based game ending.

## [0.3.0] - Runner Gate Game

### Added

- Added Runner Gate playable game scene.
- Added drag left/right player control.
- Added 3-lane road layout.
- Added moving gate rows.
- Added gate values: `+10`, `+20`, `+50`, `x2`, and `-5`.
- Added simple collision detection between player and gates.
- Added score feedback when passing through gates.
- Added countdown timer for Runner Gate.
- Added End Card flow for Runner Gate.
- Added replay support for Runner Gate through shared EndCardScene.

### Changed

- Updated main menu so Runner Gate button opens the playable game.
- Updated Phaser scene configuration to include RunnerGateScene.
- Improved EndCardScene to support multiple replay scenes.

### Notes

- This version introduces drag control, gate choice mechanics, spawning objects, and collision logic.

## [0.2.0] - Tap Monster Game

### Added

- Added Tap Monster playable game scene.
- Added clickable/tappable monster interaction.
- Added score system for monster taps.
- Added floating score feedback.
- Added random monster movement after each tap.
- Added countdown timer.
- Added game-over flow when timer reaches zero.
- Added End Card scene.
- Added final score display.
- Added CTA button.
- Added Play Again button.
- Added Menu button.
- Added scene transition from gameplay to end card.

### Changed

- Updated main menu so Tap Monster button opens the playable game.
- Updated Phaser scene configuration to include TapMonsterScene and EndCardScene.

### Notes

- This version is the first complete playable ad prototype in the project.

## [0.1.0] - Project Foundation

### Added

- Vite + TypeScript project foundation.
- Phaser 3 setup.
- 360x640 mobile playable frame.
- Main menu scene.
- Placeholder buttons for Tap Monster, Runner Gate, Merge Cannon, and Gem Collector.
- README with project overview and run instructions.
