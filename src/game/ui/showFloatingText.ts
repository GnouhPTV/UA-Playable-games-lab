import Phaser from 'phaser';

type FloatingTextOptions = {
  x: number;
  y: number;
  text: string;
  color: string;
  fontSize?: string;
  moveY?: number;
  duration?: number;
};

export function showFloatingText(scene: Phaser.Scene, options: FloatingTextOptions) {
  const floatingText = scene.add
    .text(options.x, options.y, options.text, {
      fontSize: options.fontSize ?? '22px',
      color: options.color,
      fontStyle: 'bold',
    })
    .setOrigin(0.5);

  scene.tweens.add({
    targets: floatingText,
    y: options.y - (options.moveY ?? 35),
    alpha: 0,
    duration: options.duration ?? 600,
    onComplete: () => {
      floatingText.destroy();
    },
  });

  return floatingText;
}
