import { Game } from "./Game";
import { Projectile } from "./Projectile";
import { Rectangle } from "./enemies/Rectangle";
import { getImagePath } from "./utils/getImagePath";

export class Player extends Rectangle {
  game: Game;
  speedY: number;
  frameX: number;
  frameY: number;
  maxFrame: number;
  maxSpeed: number;
  projectiles: Projectile[];
  image: HTMLImageElement;
  powerUp: boolean;
  powerUpTimer: number;
  powerUpLimit: number;

  constructor(game: Game) {
    super(20, 100, 120, 190);
    this.game = game;
    this.speedY = 0;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.maxSpeed = 5;
    this.projectiles = [];
    this.image = new Image();
    this.image.src = getImagePath("player.png");
    this.powerUp = false; // говорит о том, активирован ли режим
    this.powerUpTimer = 0; // текущий счетчик режима
    this.powerUpLimit = 10000; // длительность режима (10 сек.)
  }

  update(deltaTime: number) {
    this.y += this.speedY;
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = 0;
    //move the player
    if (this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
    else if (this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed;
    else this.speedY = 0;
    //limit the player
    if (this.y > this.game.height - this.height * 0.5)
      this.y = this.game.height - this.height * 0.5;
    else if (this.y < -this.height * 0.5) this.y = -this.height * 0.5;
    // handle projectiles
    this.projectiles.forEach((pr) => {
      pr.update();
    });
    this.projectiles = this.projectiles.filter((pr) => !pr.markedForDeletion);
    // power up
    if (this.powerUp) {
      if (this.powerUpTimer > this.powerUpLimit) {
        this.powerUpTimer = 0;
        this.powerUp = false;
        this.frameY = 0;
      } else {
        this.powerUpTimer += deltaTime;
        this.frameY = 1;
        this.game.ammo += 0.1;
      }
    }
  }

  draw(context: CanvasRenderingContext2D) {
    this.projectiles.forEach((pr) => {
      pr.draw(context);
    });
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
  shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30),
      );
      this.game.ammo--;
    }
    // если активирован режим Power-up, то стреляем также и из хвоста
    if (this.powerUp) this.shootBottom();
  }
  shootBottom() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 175),
      );
      this.game.ammo--;
    }
  }

  enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;
    if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
  }
}
