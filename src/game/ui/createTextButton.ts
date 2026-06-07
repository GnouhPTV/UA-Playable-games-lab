import Phaser from 'phaser';

type CreateTextButtonOptions = {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  backgroundColor: number;
  textColor: string;
  fontSize?: string;
  onClick: () => void;
};

export function createTextButton(scene: Phaser.Scene, options: CreateTextButtonOptions) {
  const button = scene.add.rectangle(
    options.x,
    options.y,
    options.width,
    options.height,
    options.backgroundColor,
    1,
  );

  button.setInteractive({ useHandCursor: true });

  const text = scene.add
    .text(options.x, options.y, options.label, {
      fontSize: options.fontSize ?? '20px',
      color: options.textColor,
      fontStyle: 'bold',
    })
    .setOrigin(0.5);

  button.on('pointerdown', () => {
    scene.tweens.add({
      targets: [button, text],
      scaleX: 0.95,
      scaleY: 0.95,
      duration: 80,
      yoyo: true,
      onComplete: options.onClick,
    });
  });

  return {
    button,
    text,
  };
}
