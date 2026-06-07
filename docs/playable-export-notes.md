# Playable Export Notes

## What Export Means

In development, this project runs with Vite:

```bash
npm run dev
```

But a playable ad usually needs to be exported as a standalone HTML5 package.

A simple exported playable package contains:

```text
index.html
style.css
playable.js
README_EXPORT.txt
```

---

## Current Export

Current export:

- Tap Monster standalone export

The export is created by:

```text
src/game/systems/ExportSystem.ts
```

---

## Current Exported Files

### `index.html`

The entry file.

It loads:

```html
<link rel="stylesheet" href="./style.css" />
<script src="./playable.js"></script>
```

### `style.css`

Controls the appearance of the playable.

### `playable.js`

Contains the actual playable logic.

It handles:

- Intro screen
- Start game
- Tap monster
- Score
- Timer
- End card
- CTA
- Replay

### `README_EXPORT.txt`

Explains how to test the exported playable.

---

## Local Export Limitation

The exported Tap Monster is intentionally simple.

It does not yet export the Phaser version of the scene.

Instead, it exports a plain HTML/CSS/JS version so the structure is easier to understand.

---

## Future Improvements

Possible future export improvements:

- Export all game prototypes
- Export Phaser-based runtime
- Add MRAID CTA helper
- Add file size checker
- Add package validation
- Add image/audio asset support
- Add ad network preset notes
