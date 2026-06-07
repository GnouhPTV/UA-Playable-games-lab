# Changelog

All notable changes to UA Playable Games Lab will be documented in this file.

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
