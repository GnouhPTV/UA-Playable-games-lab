# Playable Ads Network Checklist

This checklist helps prepare a playable ad before sending it to an ad network.

---

## 1. Basic Package

The exported package should include:

- `index.html`
- `style.css`
- `playable.js`
- `assets/` folder, if needed
- `README` or notes, if required

---

## 2. Size Check

Playable ads should be lightweight.

Check:

- HTML size
- CSS size
- JavaScript size
- Image size
- Audio size
- Video size

Avoid:

- Large images
- Uncompressed audio
- Unused assets
- Unnecessary libraries

---

## 3. Orientation

Confirm the playable orientation:

- Portrait
- Landscape
- Responsive

This project currently uses portrait:

```text
360 x 640
```

---

## 4. CTA Behavior

Check CTA button behavior:

- Does the CTA button appear on the end card?
- Does the CTA button work locally?
- Does the CTA use MRAID when available?
- Does the CTA fallback to `window.open()`?

---

## 5. User Flow

A good playable should have:

- Clear intro
- Quick interaction
- Visible reward feedback
- Short gameplay
- Clear end card
- CTA button
- Replay button

---

## 6. Performance

Check:

- Does the playable load fast?
- Does it run smoothly on mobile?
- Are there too many objects?
- Are timers cleaned up?
- Are unused objects destroyed?

---

## 7. Audio

If audio is used:

- Keep it small
- Allow muted start
- Consider autoplay restrictions
- Only play after user interaction, if needed

---

## 8. Images

If images are used:

- Compress PNG/JPG/WebP
- Avoid very large textures
- Remove unused images

---

## 9. QA Checklist

Before export:

- [ ] Intro screen works
- [ ] Gameplay starts correctly
- [ ] Main interaction works
- [ ] Score updates
- [ ] Timer works
- [ ] End card appears
- [ ] CTA button works
- [ ] Replay button works
- [ ] No console errors
- [ ] ZIP contains expected files
- [ ] `index.html` runs locally
- [ ] File size is reasonable

---

## 10. Network-Specific Rules

Different networks may have different requirements.

Examples:

- File size limit
- MRAID support
- Click handling
- Orientation
- Close button rules
- Compressed package format
- Allowed external requests

Always check the official documentation for the target ad network.
