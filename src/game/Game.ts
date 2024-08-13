import { InputHandler } from "./InputHandler";
import { Particle } from "./Particle";
import { Player } from "./Player";
import { Angler1 } from "./enemies/Angler1";
import { Angler2 } from "./enemies/Angler2";
import { Drone } from "./enemies/Drone";
import { Enemy } from "./enemies/Enemy";
import { HiveWhale } from "./enemies/HiveWhale";
import { LuckyFish } from "./enemies/LuckyFish";
import { Rectangle } from "./enemies/Rectangle";
import { Explosion } from "./explosion/Explosion";
import { FireExplosion } from "./explosion/FireExplosion";
import { SmokeExplosion } from "./explosion/SmokeExplosion";
import { Background } from "./ui/Backgrund";
import { UI } from "./ui/UI";

export class Game {
  width: number;
  height: number;
  player: Player;
  speed: number;
  background: Background;
  input: InputHandler;
  keys: string[];
  ammo: number;
  maxAmmo: number;
  ammoTimer: number;
  ammoInterval: number;
  ui: UI;
  enemies: Enemy[];
  enemyTimer: number;
  enemyInterval: number;
  gameOver: boolean;
  score: number;
  winningScore: number;
  gameTime: number;
  timeLimit: number;
  particles: Particle[];
  explosions: Explosion[];
  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.player = new Player(this);
    this.speed = 1;
    this.background = new Background(this);
    this.input = new InputHandler(this);
    this.keys = [];
    this.ammo = 20;
    this.maxAmmo = 50;
    this.ammoTimer = 0;
    this.ammoInterval = 500;
    this.ui = new UI(this);
    this.enemies = [];
    this.enemyTimer = 0;
    this.enemyInterval = 1000;
    this.gameOver = false;
    this.score = 0;
    this.winningScore = 30;
    this.gameTime = 0;
    this.timeLimit = 20 * 1000;
    this.particles = [];
    this.explosions = [];
  }

  update(deltaTime: number) {
    if (!this.gameOver) this.gameTime += deltaTime;
    if (this.gameTime > this.timeLimit) this.gameOver = true;
    this.player.update(deltaTime);
    this.background.update();
    this.background.layer4.update();
    if (this.ammoTimer > this.ammoInterval) {
      if (this.ammo < this.maxAmmo) this.ammo++;
      this.ammoTimer = 0;
    } else {
      this.ammoTimer += deltaTime;
    }
    // Обновляем и удаляем шестеренки (частицы)
    this.particles.forEach((particle) => particle.update());
    this.particles = this.particles.filter(
      (particle) => !particle.markedForDeletion,
    );
    // Обновляем и удаляем взрывы (explosions)
    this.explosions.forEach((ex) => ex.update(deltaTime));
    this.explosions = this.explosions.filter((ex) => !ex.markedForDeletion);

    this.enemies.forEach((enemy) => {
      enemy.update();
      // Проверим, не столкнолся ли враг с главным игроком (player)
      if (this.checkCollision(this.player, enemy)) {
        // если столкновение произошло, помечаем врага как удаленного
        enemy.markedForDeletion = true;
        this.addExplosion(enemy); // добавляем взрыв
        this.addParticles(enemy);
        // Если наш игрок столкнулся с Рыбкой-Удачей
        if (enemy.type === "lucky")
          this.player.enterPowerUp(); // Активируем режим Power-up
        else if (!this.gameOver) this.score--; // Если столкнулся с другим врагом - отнимаем из жизни игрока одну жизнь
      }
      // для всех активных пуль (projectiles) также проверим условие столкновения
      // пули с врагом.
      this.player.projectiles.forEach((projectile) => {
        // Если пуля попала в врага
        if (this.checkCollision(projectile, enemy)) {
          enemy.lives--; // уменьшаем жизни врага на единицу
          projectile.markedForDeletion = true; // удаляем пулю
          // Проверяем, если у врага не осталось жизней
          if (enemy.lives <= 0) {
            enemy.markedForDeletion = true; // удаляем врага
            this.addExplosion(enemy); // добавляем взрыв
            this.addParticles(enemy);
            // Если мы уничтожили большого врага (тип hive)
            if (enemy.type === "hive") {
              for (let i = 0; i < 5; i++) {
                // создаем массив из 5-ти дронов
                this.enemies.push(
                  new Drone(
                    this,
                    enemy.x + Math.random() * enemy.width,
                    enemy.y + Math.random() * enemy.height * 0.5,
                  ),
                );
              }
            }
            if (!this.gameOver) this.score += enemy.score; // увеличиваем количество очков главного игрока
            if (this.isWin()) this.gameOver = true; // проверяем условие победы
          }
        }
      });
    });
    this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);

    if (this.enemyTimer > this.enemyInterval && !this.gameOver) {
      this.addEnemy();
      this.enemyTimer = 0;
    } else {
      this.enemyTimer += deltaTime;
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.background.draw(context);
    this.player.draw(context);
    this.ui.draw(context);
    this.particles.forEach((particle) => particle.draw(context));
    this.enemies.forEach((enemy) => enemy.draw(context));
    this.explosions.forEach((ex) => ex.draw(context));
    this.background.layer4.draw(context);
  }
  addEnemy() {
    const randomize = Math.random();
    if (randomize < 0.3) this.enemies.push(new Angler1(this));
    else if (randomize < 0.6) this.enemies.push(new Angler2(this));
    else if (randomize < 0.7) this.enemies.push(new HiveWhale(this));
    else this.enemies.push(new LuckyFish(this));
  }
  checkCollision(rect1: Rectangle, rect2: Rectangle) {
    return (
      rect1.x < rect2.x + rect2.width &&
      rect2.x < rect1.x + rect1.width &&
      rect1.y < rect2.y + rect2.height &&
      rect2.y < rect1.y + rect1.height
    );
  }
  isWin() {
    return this.score >= this.winningScore;
  }
  addParticles(enemy: Enemy) {
    for (let i = 0; i < enemy.score; i++) {
      this.particles.push(
        new Particle(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5,
        ),
      );
    }
  }
  addExplosion(enemy: Enemy) {
    const randomize = Math.random();
    if (randomize < 0.5) {
      this.explosions.push(
        new SmokeExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5,
        ),
      );
    } else {
      this.explosions.push(
        new FireExplosion(
          this,
          enemy.x + enemy.width * 0.5,
          enemy.y + enemy.height * 0.5,
        ),
      );
    }
  }
}
