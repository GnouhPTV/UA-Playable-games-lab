# MRAID Notes

## What is MRAID?

MRAID means **Mobile Rich Media Ad Interface Definitions**.

It is a standard API for mobile rich media ads that run inside mobile apps.

In simple words:

> MRAID helps an HTML5 playable ad communicate with the mobile app or ad SDK that is showing the ad.

---

## Why Playable Ads Need MRAID

A normal local playable can use:

```js
window.open('https://example.com', '_blank');
```

But in a real mobile ad environment, the ad is usually loaded inside a special WebView controlled by an ad network SDK.

Because of that, the ad may need to use:

```js
mraid.open('https://example.com');
```

instead of `window.open()`.

---

## Basic CTA Idea

For learning:

```js
window.open(ctaUrl, '_blank');
```

For an MRAID environment:

```js
if (window.mraid && typeof window.mraid.open === 'function') {
  window.mraid.open(ctaUrl);
} else {
  window.open(ctaUrl, '_blank');
}
```

### Safe CTA Helper Example

```js
function openCta(url) {
  if (window.mraid && typeof window.mraid.open === 'function') {
    window.mraid.open(url);
    return;
  }

  window.open(url, '_blank');
}
```

---

## Important MRAID Concepts

### 1. Ready State

Some MRAID features may not be ready immediately when the ad loads.

A playable may need to wait for MRAID to be ready before calling some MRAID APIs.

### 2. Open CTA

The most common useful method for a beginner is:

```js
mraid.open(url);
```

It tells the SDK to open the landing page or app store link.

### 3. Viewability

MRAID can help ads understand whether the ad is visible.

This matters for analytics and ad quality.

### 4. Close Button

Some networks manage close buttons themselves.

Do not build fake close buttons unless the network allows it.

### 5. Orientation

Some playable ads are portrait only.

Others support landscape.

Our project currently uses portrait:

```text
360 x 640
```

---

## What This Project Currently Supports

This project currently supports:

- Local HTML5 playable export
- CTA with `window.open`
- Intro screen
- Gameplay screen
- End card
- Replay button

This project does not yet fully support:

- Full MRAID lifecycle
- Network-specific SDK integration
- Store URL tracking
- Ad network validation
- Production file size optimization

---

## Future MRAID Helper

Later, we can create:

```text
src/game/ad/mraidHelper.ts
```

with functions like:

```ts
openCta(url);
isMraidAvailable();
waitForMraidReady();
```

---

## Beginner Summary

For now, remember this:

Local playable:

```js
window.open(url);
```

Real in-app ad:

```js
mraid.open(url); // if MRAID is available
```
