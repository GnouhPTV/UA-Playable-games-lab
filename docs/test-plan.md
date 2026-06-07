# Test Plan

This checklist is used before publishing a stable release.

## Main Menu

- [ ] App opens successfully.
- [ ] 360x640 playable frame is visible.
- [ ] Menu shows all playable games.
- [ ] Export Tap Monster ZIP button is visible.

## Tap Monster

- [ ] Tap Monster opens from menu.
- [ ] Monster appears.
- [ ] Tapping monster increases score.
- [ ] Monster moves to a random position.
- [ ] Timer counts down.
- [ ] End card appears.
- [ ] Play Again works.
- [ ] Menu button works.
- [ ] CTA button works.

## Runner Gate

- [ ] Runner Gate opens from menu.
- [ ] Player can be dragged left/right.
- [ ] Gates spawn and move.
- [ ] Gate collision changes score.
- [ ] Timer counts down.
- [ ] End card appears.
- [ ] Play Again works.
- [ ] Menu button works.

## Merge Cannon

- [ ] Merge Cannon opens from menu.
- [ ] Cannons can be dragged.
- [ ] Same-level cannons merge correctly.
- [ ] Enemies spawn.
- [ ] Cannons auto shoot.
- [ ] Enemy HP decreases.
- [ ] Coins and gems increase after enemy defeat.
- [ ] Timer works.
- [ ] Base HP decreases when enemy reaches defense line.
- [ ] End card appears.
- [ ] Play Again works.
- [ ] Menu button works.

## Gem Collector

- [ ] Gem Collector opens from menu.
- [ ] Gems spawn randomly.
- [ ] Tapping gems increases collected gems.
- [ ] Gems disappear after collection.
- [ ] New gems respawn.
- [ ] Target score condition works.
- [ ] Timer condition works.
- [ ] End card appears.
- [ ] Play Again works.
- [ ] Menu button works.

## Export

- [ ] Export Tap Monster ZIP button downloads ZIP.
- [ ] ZIP contains index.html.
- [ ] ZIP contains style.css.
- [ ] ZIP contains playable.js.
- [ ] ZIP contains README_EXPORT.txt.
- [ ] Extracted index.html runs locally.
- [ ] Exported Tap Monster score works.
- [ ] Exported timer works.
- [ ] Exported end card works.
- [ ] Exported CTA works.
- [ ] Exported replay works.

## Build

- [ ] npm run build passes.
- [ ] No TypeScript errors.
- [ ] No console errors during normal gameplay.
