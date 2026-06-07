import Phaser from 'phaser';

type SlotData = {
  index: number;
  x: number;
  y: number;
  rect: Phaser.GameObjects.Rectangle;
};

type CannonData = {
  id: string;
  level: number;
  slotIndex: number;
  body: Phaser.GameObjects.Arc;
  label: Phaser.GameObjects.Text;
};

type EnemyData = {
  id: string;
  hp: number;
  speed: number;
  body: Phaser.GameObjects.Rectangle;
  hpText: Phaser.GameObjects.Text;
};

type ProjectileData = {
  id: string;
  damage: number;
  speed: number;
  targetEnemyId: string;
  body: Phaser.GameObjects.Arc;
};

export class MergeCannonScene extends Phaser.Scene {
  private slots: SlotData[] = [];
  private cannons: CannonData[] = [];
  private enemies: EnemyData[] = [];
  private projectiles: ProjectileData[] = [];

  private coins = 0;
  private gems = 0;
  private timeLeft = 25;
  private baseHp = 8;
  private isGameOver = false;

  private coinsText!: Phaser.GameObjects.Text;
  private gemsText!: Phaser.GameObjects.Text;
  private timerText!: Phaser.GameObjects.Text;
  private baseHpText!: Phaser.GameObjects.Text;

  private enemySpawnEvent?: Phaser.Time.TimerEvent;
  private cannonShootEvent?: Phaser.Time.TimerEvent;
  private countdownEvent?: Phaser.Time.TimerEvent;

  private maxCannonLevel = 5;

  constructor() {
    super('MergeCannonScene');
  }

  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    this.slots = [];
    this.cannons = [];
    this.enemies = [];
    this.projectiles = [];

    this.coins = 0;
    this.gems = 0;
    this.timeLeft = 25;
    this.baseHp = 8;
    this.isGameOver = false;

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0f172a);

    this.add
      .text(width / 2, 46, 'Merge Cannon Game', {
        fontSize: '25px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.add
      .text(width / 2, 82, 'Drag same-level cannons together to merge', {
        fontSize: '14px',
        color: '#cbd5e1',
      })
      .setOrigin(0.5);

    this.createHud();
    this.createBattleArea();
    this.createSlots();
    this.createBuyButton();
    this.createBackButton();

    // Start with 2 level-1 cannons
    this.addCannon(1, 0);
    this.addCannon(1, 1);

    // Start spawning enemies
    this.startEnemySpawner();

    // Start cannon auto shooting
    this.startCannonShooting();

    // Start countdown timer
    this.startCountdown();
  }

  update(_time: number, delta: number) {
    if (this.isGameOver) {
      return;
    }

    this.updateEnemies(delta);
    this.updateProjectiles(delta);
  }

  private startCountdown() {
    this.countdownEvent = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        if (this.isGameOver) {
          return;
        }

        this.timeLeft -= 1;
        this.timerText.setText(`Time: ${this.timeLeft}`);

        if (this.timeLeft <= 0) {
          this.endGame("Time's Up!");
        }
      },
    });
  }

  private updateEnemies(delta: number) {
    for (const enemy of [...this.enemies]) {
      const distance = enemy.speed * (delta / 1000);

      enemy.body.y += distance;
      enemy.hpText.y += distance;

      if (enemy.body.y >= 335) {
        this.handleEnemyReachedBase(enemy);
      }
    }
  }

  private startCannonShooting() {
    // Every 700ms, all cannons try to shoot.
    this.cannonShootEvent = this.time.addEvent({
      delay: 500,
      loop: true,
      callback: () => {
        this.fireAllCannons();
      },
    });
  }

  private fireAllCannons() {
    if (this.isGameOver || this.enemies.length === 0) {
      return;
    }

    for (const cannon of this.cannons) {
      this.fireCannon(cannon);
    }
  }

  private fireCannon(cannon: CannonData) {
    const targetEnemy = this.findNearestEnemy(cannon.body.x, cannon.body.y);

    if (!targetEnemy) {
      return;
    }

    const damage = cannon.level * 8;

    const projectileBody = this.add.circle(cannon.body.x, cannon.body.y, 7, 0x38bdf8);
    projectileBody.setStrokeStyle(2, 0xffffff);

    const projectile: ProjectileData = {
      id: crypto.randomUUID(),
      damage,
      speed: 280,
      targetEnemyId: targetEnemy.id,
      body: projectileBody,
    };

    this.projectiles.push(projectile);

    // Small shooting animation
    this.tweens.add({
      targets: [cannon.body, cannon.label],
      scale: 1.12,
      duration: 70,
      yoyo: true,
    });
  }

  private findNearestEnemy(x: number, y: number) {
    let nearestEnemy: EnemyData | null = null;
    let nearestDistance = Number.MAX_SAFE_INTEGER;

    for (const enemy of this.enemies) {
      const distance = Phaser.Math.Distance.Between(x, y, enemy.body.x, enemy.body.y);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestEnemy = enemy;
      }
    }

    return nearestEnemy;
  }

  private updateProjectiles(delta: number) {
    for (const projectile of [...this.projectiles]) {
      const targetEnemy = this.enemies.find((enemy) => enemy.id === projectile.targetEnemyId);

      // Nếu enemy đã chết hoặc biến mất, xóa projectile.
      if (!targetEnemy) {
        this.removeProjectile(projectile);
        continue;
      }

      const distanceToTarget = Phaser.Math.Distance.Between(
        projectile.body.x,
        projectile.body.y,
        targetEnemy.body.x,
        targetEnemy.body.y,
      );

      // Nếu projectile chạm enemy
      if (distanceToTarget < 24) {
        this.damageEnemy(targetEnemy, projectile.damage);
        this.removeProjectile(projectile);
        continue;
      }

      // Projectile bay hướng về enemy hiện tại.
      const angle = Phaser.Math.Angle.Between(
        projectile.body.x,
        projectile.body.y,
        targetEnemy.body.x,
        targetEnemy.body.y,
      );

      const moveDistance = projectile.speed * (delta / 1000);

      projectile.body.x += Math.cos(angle) * moveDistance;
      projectile.body.y += Math.sin(angle) * moveDistance;
    }
  }

  private damageEnemy(enemy: EnemyData, damage: number) {
    enemy.hp -= damage;
    enemy.hpText.setText(`${Math.max(0, enemy.hp)}`);

    this.showFloatingText(enemy.body.x, enemy.body.y - 35, `-${damage}`, '#facc15');

    // Hit animation
    this.tweens.add({
      targets: [enemy.body, enemy.hpText],
      scale: 1.15,
      duration: 80,
      yoyo: true,
    });

    if (enemy.hp <= 0) {
      this.handleEnemyKilled(enemy);
    }
  }

  private handleEnemyKilled(enemy: EnemyData) {
    const coinReward = 10;
    const gemReward = 5;

    this.coins += coinReward;
    this.gems += gemReward;

    this.coinsText.setText(`Coins: ${this.coins}`);
    this.gemsText.setText(`Gems: ${this.gems}`);

    this.showFloatingText(enemy.body.x, enemy.body.y - 60, 'KO!', '#22c55e');
    this.showFloatingText(enemy.body.x, enemy.body.y - 35, `+${coinReward} Coins`, '#fbbf24');
    this.showFloatingText(enemy.body.x, enemy.body.y - 10, `+${gemReward} Gems`, '#38bdf8');

    this.removeEnemy(enemy);
  }

  private removeProjectile(projectile: ProjectileData) {
    projectile.body.destroy();

    this.projectiles = this.projectiles.filter((item) => item.id !== projectile.id);
  }

  private createBattleArea() {
    const width = this.scale.width;

    // Top area is where enemies move.
    this.add.rectangle(width / 2, 220, 310, 220, 0x172554, 0.9);

    this.add
      .text(width / 2, 125, 'Enemy Path', {
        fontSize: '16px',
        color: '#bfdbfe',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    // Base line. If enemies pass this line, base loses HP.
    this.add.rectangle(width / 2, 335, 310, 4, 0xef4444, 1);

    this.add
      .text(width / 2, 352, 'Base Defense Line', {
        fontSize: '13px',
        color: '#fca5a5',
      })
      .setOrigin(0.5);
  }

  private createSlots() {
    // 6 cannon slots: 2 rows x 3 columns
    const positions = [
      { x: 90, y: 400 },
      { x: 180, y: 400 },
      { x: 270, y: 400 },
      { x: 90, y: 490 },
      { x: 180, y: 490 },
      { x: 270, y: 490 },
    ];

    for (let i = 0; i < positions.length; i++) {
      const pos = positions[i];

      const rect = this.add.rectangle(pos.x, pos.y, 68, 68, 0x334155, 1);
      rect.setStrokeStyle(3, 0x64748b);

      this.add
        .text(pos.x, pos.y + 44, `Slot ${i + 1}`, {
          fontSize: '11px',
          color: '#94a3b8',
        })
        .setOrigin(0.5);

      this.slots.push({
        index: i,
        x: pos.x,
        y: pos.y,
        rect,
      });
    }
  }

  private addCannon(level: number, slotIndex: number) {
    const slot = this.slots[slotIndex];

    const body = this.add.circle(slot.x, slot.y, 28, this.getCannonColor(level));
    body.setStrokeStyle(4, 0xffffff);
    body.setInteractive({ useHandCursor: true });

    const label = this.add
      .text(slot.x, slot.y, `Lv.${level}`, {
        fontSize: '17px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const cannon: CannonData = {
      id: crypto.randomUUID(),
      level,
      slotIndex,
      body,
      label,
    };

    this.cannons.push(cannon);

    // Make the cannon draggable.
    this.input.setDraggable(body);

    body.on('dragstart', () => {
      body.setDepth(20);
      label.setDepth(21);

      // Save original slot so we can return cannon if merge fails.
      body.setData('startSlotIndex', cannon.slotIndex);
    });

    body.on('drag', (_pointer: Phaser.Input.Pointer, dragX: number, dragY: number) => {
      body.setPosition(dragX, dragY);
      label.setPosition(dragX, dragY);
    });

    body.on('dragend', () => {
      this.handleCannonDrop(cannon);
    });
  }

  private handleCannonDrop(draggedCannon: CannonData) {
    const mergeTarget = this.findMergeTarget(draggedCannon);

    if (mergeTarget) {
      this.mergeCannons(draggedCannon, mergeTarget);
      return;
    }

    // If no merge target, snap back to original slot.
    this.snapCannonToSlot(draggedCannon, draggedCannon.slotIndex);
  }

  private findMergeTarget(draggedCannon: CannonData) {
    for (const otherCannon of this.cannons) {
      if (otherCannon.id === draggedCannon.id) {
        continue;
      }

      if (otherCannon.level !== draggedCannon.level) {
        continue;
      }

      if (otherCannon.level >= this.maxCannonLevel) {
        continue;
      }

      const distance = Phaser.Math.Distance.Between(
        draggedCannon.body.x,
        draggedCannon.body.y,
        otherCannon.body.x,
        otherCannon.body.y,
      );

      if (distance < 60) {
        return otherCannon;
      }
    }

    return null;
  }

  private mergeCannons(draggedCannon: CannonData, targetCannon: CannonData) {
    // Upgrade target cannon
    targetCannon.level += 1;
    this.updateCannonVisual(targetCannon);

    // Remove dragged cannon
    this.removeCannon(draggedCannon);

    this.showFloatingText(targetCannon.body.x, targetCannon.body.y - 45, 'MERGE!', '#22c55e');

    // Merge pop animation
    this.tweens.add({
      targets: [targetCannon.body, targetCannon.label],
      scale: 1.25,
      duration: 120,
      yoyo: true,
      ease: 'Power1',
    });
  }

  private updateCannonVisual(cannon: CannonData) {
    cannon.body.setFillStyle(this.getCannonColor(cannon.level));
    cannon.label.setText(`Lv.${cannon.level}`);
  }

  private removeCannon(cannon: CannonData) {
    cannon.body.destroy();
    cannon.label.destroy();

    this.cannons = this.cannons.filter((item) => item.id !== cannon.id);
  }

  private snapCannonToSlot(cannon: CannonData, slotIndex: number) {
    const slot = this.slots[slotIndex];

    cannon.body.setDepth(10);
    cannon.label.setDepth(11);

    this.tweens.add({
      targets: [cannon.body, cannon.label],
      x: slot.x,
      y: slot.y,
      duration: 180,
      ease: 'Power2',
    });
  }

  private createBuyButton() {
    const width = this.scale.width;

    const button = this.add.rectangle(width / 2, 570, 190, 46, 0x22c55e);
    button.setInteractive({ useHandCursor: true });

    this.add
      .text(width / 2, 570, 'Buy Cannon', {
        fontSize: '19px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    button.on('pointerdown', () => {
      const emptySlot = this.getEmptySlotIndex();

      if (emptySlot === -1) {
        this.showFloatingText(width / 2, 535, 'No empty slot!', '#ef4444');
        return;
      }

      this.addCannon(1, emptySlot);
      this.showFloatingText(width / 2, 535, '+ Cannon', '#22c55e');
    });
  }

  private getEmptySlotIndex() {
    for (const slot of this.slots) {
      const isUsed = this.cannons.some((cannon) => cannon.slotIndex === slot.index);

      if (!isUsed) {
        return slot.index;
      }
    }

    return -1;
  }

  private getCannonColor(level: number) {
    if (level === 1) return 0x60a5fa;
    if (level === 2) return 0x22c55e;
    if (level === 3) return 0xfacc15;
    if (level === 4) return 0xf97316;
    return 0xf97316;
  }

  private showFloatingText(x: number, y: number, text: string, color: string) {
    const floatingText = this.add
      .text(x, y, text, {
        fontSize: '22px',
        color,
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    this.tweens.add({
      targets: floatingText,
      y: y - 35,
      alpha: 0,
      duration: 600,
      onComplete: () => {
        floatingText.destroy();
      },
    });
  }

  private createBackButton() {
    const button = this.add.rectangle(70, 608, 110, 42, 0xffffff);
    button.setInteractive({ useHandCursor: true });

    this.add
      .text(70, 608, 'Menu', {
        fontSize: '18px',
        color: '#0f172a',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    button.on('pointerdown', () => {
      this.enemySpawnEvent?.remove(false);
      this.cannonShootEvent?.remove(false);
      this.countdownEvent?.remove(false);
      this.scene.start('MenuScene');
    });
  }

  private createHud() {
    this.baseHpText = this.add.text(20, 108, 'Base HP: 8', {
      fontSize: '16px',
      color: '#facc15',
      fontStyle: 'bold',
    });

    this.coinsText = this.add.text(20, 132, 'Coins: 0', {
      fontSize: '16px',
      color: '#fbbf24',
      fontStyle: 'bold',
    });

    this.gemsText = this.add.text(20, 156, 'Gems: 0', {
      fontSize: '16px',
      color: '#38bdf8',
      fontStyle: 'bold',
    });

    this.timerText = this.add
      .text(340, 108, 'Time: 25', {
        fontSize: '16px',
        color: '#22c55e',
        fontStyle: 'bold',
      })
      .setOrigin(1, 0);
  }
  private startEnemySpawner() {
    // Spawn first enemy immediately
    this.spawnEnemy();

    // Spawn a new enemy every 1.6 seconds
    this.enemySpawnEvent = this.time.addEvent({
      delay: 1600,
      loop: true,
      callback: () => {
        if (!this.isGameOver) {
          this.spawnEnemy();
        }
      },
    });
  }

  private spawnEnemy() {
    const laneXs = [90, 180, 270];
    const x = Phaser.Utils.Array.GetRandom(laneXs);

    const hpOptions = [10, 15, 20, 30];
    const hp = Phaser.Utils.Array.GetRandom(hpOptions);

    const body = this.add.rectangle(x, 155, 58, 44, 0xa855f7, 1);
    body.setStrokeStyle(3, 0xffffff);

    const hpText = this.add
      .text(x, 155, `${hp}`, {
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold',
      })
      .setOrigin(0.5);

    const enemy: EnemyData = {
      id: crypto.randomUUID(),
      hp,
      speed: 55,
      body,
      hpText,
    };

    this.enemies.push(enemy);
  }

  private handleEnemyReachedBase(enemy: EnemyData) {
    if (this.isGameOver) {
      return;
    }

    this.baseHp = Math.max(0, this.baseHp - 1);
    this.baseHpText.setText(`Base HP: ${this.baseHp}`);

    this.showFloatingText(enemy.body.x, enemy.body.y - 35, '-1 HP', '#ef4444');

    this.removeEnemy(enemy);

    if (this.baseHp <= 0) {
      this.endGame('Base Destroyed!');
    }
  }

  private removeEnemy(enemy: EnemyData) {
    enemy.body.destroy();
    enemy.hpText.destroy();

    this.enemies = this.enemies.filter((item) => item.id !== enemy.id);

    // Remove projectiles that were targeting this enemy.
    for (const projectile of [...this.projectiles]) {
      if (projectile.targetEnemyId === enemy.id) {
        this.removeProjectile(projectile);
      }
    }
  }

  private endGame(reason: string) {
    if (this.isGameOver) {
      return;
    }

    this.isGameOver = true;

    // Stop timers
    this.enemySpawnEvent?.remove(false);
    this.cannonShootEvent?.remove(false);
    this.countdownEvent?.remove(false);

    // Small delay so the player can see the last feedback
    this.time.delayedCall(500, () => {
      this.scene.start('EndCardScene', {
        finalScore: this.gems,
        title: reason === "Time's Up!" ? 'Defense Complete!' : 'Base Destroyed!',
        message: `Coins: ${this.coins} | Gems: ${this.gems}`,
        replayScene: 'MergeCannonScene',
      });
    });
  }
}
