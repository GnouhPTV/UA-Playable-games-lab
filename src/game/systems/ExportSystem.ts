import JSZip from 'jszip';

export class ExportSystem {
  static async exportTapMonsterPlayable() {
    const zip = new JSZip();

    zip.file('index.html', this.createIndexHtml());
    zip.file('style.css', this.createStyleCss());
    zip.file('playable.js', this.createPlayableJs());
    zip.file('README_EXPORT.txt', this.createReadmeExport());

    const blob = await zip.generateAsync({
      type: 'blob',
    });

    const url = URL.createObjectURL(blob);

    const downloadLink = document.createElement('a');
    downloadLink.href = url;
    downloadLink.download = 'tap-monster-playable.zip';
    downloadLink.click();

    URL.revokeObjectURL(url);
  }

  private static createIndexHtml() {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tap Monster Playable</title>
  <link rel="stylesheet" href="./style.css" />
</head>
<body>
  <div id="app"></div>
  <script src="./playable.js"></script>
</body>
</html>`;
  }

  private static createStyleCss() {
    return `* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #eef3ff;
  font-family: Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
}

#app {
  width: 360px;
  height: 640px;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(15, 23, 42, 0.25);
  background: #0f172a;
}

.screen {
  width: 360px;
  height: 640px;
  position: relative;
  overflow: hidden;
  color: white;
  text-align: center;
}

.intro,
.end-card {
  background: linear-gradient(180deg, #2563eb, #0f172a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.gameplay {
  background: #0f172a;
}

.title {
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 12px;
}

.subtitle {
  font-size: 16px;
  color: #dbeafe;
  width: 280px;
  line-height: 1.4;
  margin-bottom: 28px;
}

.button {
  width: 240px;
  height: 56px;
  border: none;
  border-radius: 18px;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
  margin: 8px 0;
}

.primary {
  background: #22c55e;
  color: #0f172a;
}

.secondary {
  background: white;
  color: #0f172a;
}

.hud {
  position: absolute;
  top: 24px;
  left: 20px;
  right: 20px;
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  font-size: 20px;
}

.instruction {
  position: absolute;
  top: 74px;
  left: 0;
  right: 0;
  font-size: 15px;
  color: #cbd5e1;
}

.monster {
  position: absolute;
  width: 96px;
  height: 96px;
  border-radius: 50%;
  background: #f472b6;
  border: 4px solid white;
  cursor: pointer;
  transition: transform 0.08s ease;
}

.monster::before,
.monster::after {
  content: "";
  position: absolute;
  top: 28px;
  width: 12px;
  height: 12px;
  background: #111827;
  border-radius: 50%;
}

.monster::before {
  left: 26px;
}

.monster::after {
  right: 26px;
}

.mouth {
  position: absolute;
  left: 32px;
  top: 58px;
  width: 32px;
  height: 7px;
  background: #111827;
  border-radius: 999px;
}

.floating {
  position: absolute;
  color: #22c55e;
  font-size: 26px;
  font-weight: 800;
  pointer-events: none;
  animation: floatUp 0.6s ease forwards;
}

@keyframes floatUp {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-40px);
  }
}

.score-result {
  font-size: 26px;
  color: #facc15;
  font-weight: 800;
  margin: 18px 0;
}

.note {
  color: #cbd5e1;
  font-size: 14px;
  width: 280px;
  line-height: 1.4;
  margin-bottom: 20px;
}`;
  }

  private static createPlayableJs() {
    return `const app = document.getElementById("app");

const ctaUrl = "https://github.com/GnouhPTV/UA-Playable-games-lab";

let score = 0;
let timeLeft = 15;
let timerId = null;

function setScreen(html) {
  app.innerHTML = html;
}

function showIntro() {
  setScreen(
    '<div class="screen intro">' +
      '<div class="title">Tap Monster</div>' +
      '<div class="subtitle">Tap the monster as many times as you can before time runs out.</div>' +
      '<button id="play-button" class="button primary">Play</button>' +
    '</div>'
  );

  document.getElementById("play-button").addEventListener("click", startGame);
}

function startGame() {
  score = 0;
  timeLeft = 15;

  setScreen(
    '<div class="screen gameplay">' +
      '<div class="hud">' +
        '<div id="score-text">Score: 0</div>' +
        '<div id="timer-text">Time: 15</div>' +
      '</div>' +
      '<div class="instruction">Tap the monster to get points!</div>' +
      '<div id="monster" class="monster"><div class="mouth"></div></div>' +
    '</div>'
  );

  const monster = document.getElementById("monster");

  monster.addEventListener("click", function () {
    handleMonsterTap(monster);
  });

  moveMonster(monster);

  timerId = setInterval(function () {
    timeLeft -= 1;

    const timerText = document.getElementById("timer-text");
    timerText.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerId);
      showEndCard();
    }
  }, 1000);
}

function handleMonsterTap(monster) {
  score += 1;

  const scoreText = document.getElementById("score-text");
  scoreText.textContent = "Score: " + score;

  showFloatingText("+1", monster.offsetLeft + 48, monster.offsetTop - 10);

  monster.style.transform = "scale(1.18)";

  setTimeout(function () {
    monster.style.transform = "scale(1)";
    moveMonster(monster);
  }, 90);
}

function moveMonster(monster) {
  const minX = 40;
  const maxX = 224;
  const minY = 135;
  const maxY = 500;

  const x = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
  const y = Math.floor(Math.random() * (maxY - minY + 1)) + minY;

  monster.style.left = x + "px";
  monster.style.top = y + "px";
}

function showFloatingText(text, x, y) {
  const gameplay = document.querySelector(".gameplay");

  const floating = document.createElement("div");
  floating.className = "floating";
  floating.textContent = text;
  floating.style.left = x + "px";
  floating.style.top = y + "px";

  gameplay.appendChild(floating);

  setTimeout(function () {
    floating.remove();
  }, 650);
}

function showEndCard() {
  setScreen(
    '<div class="screen end-card">' +
      '<div class="title">Great Job!</div>' +
      '<div class="score-result">Final Score: ' + score + '</div>' +
      '<div class="note">This is a standalone exported HTML5 playable prototype.</div>' +
      '<button id="cta-button" class="button primary">View Portfolio</button>' +
      '<button id="replay-button" class="button secondary">Play Again</button>' +
    '</div>'
  );

  document.getElementById("cta-button").addEventListener("click", function () {
    window.open(ctaUrl, "_blank");
  });

  document.getElementById("replay-button").addEventListener("click", startGame);
}

showIntro();`;
  }

  private static createReadmeExport() {
    return `Tap Monster Playable Export

Files included:
- index.html
- style.css
- playable.js
- README_EXPORT.txt

How to test:
1. Extract this ZIP file.
2. Open index.html in your browser.
3. Click Play.
4. Tap the monster.
5. Wait for the timer to finish.
6. Check the end card and replay button.

What this export demonstrates:
- Intro screen
- Gameplay screen
- Tap interaction
- Score
- Timer
- End card
- CTA button
- Replay button

MVP limitation:
This is a learning export. Real ad networks may require:
- MRAID integration
- click URL handling
- file size limits
- orientation settings
- network-specific QA validation
`;
  }
}
