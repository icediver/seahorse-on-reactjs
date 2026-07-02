import { Game } from "./Game";
import { Projectile } from "./Projectile";
import { Rectangle } from "./enemies/Rectangle";
import { getImagePath } from "./utils/getImagePath";

export class Player extends Rectangle {
  private game: Game;
  private speedY: number = 0;
  private frameX: number = 0;
  private frameY: number = 0;
  private maxFrame: number = 37;
  private maxSpeed: number = 5;
  private image: HTMLImageElement;
  private powerUpTimer: number = 0; // текущий счетчик режима
  private powerUpLimit: number = 10000; // длительность режима (10 сек.)

  public projectiles: Projectile[] = [];
  public powerUp: boolean = false; // говорит о том, активирован ли режим

  public constructor(game: Game) {
    super(20, 100, 120, 190);
    this.game = game;
    this.image = new Image();
    this.image.src = getImagePath("player.png");
  }

  public update(deltaTime: number) {
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

  public draw(context: CanvasRenderingContext2D) {
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
  public shootTop() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 30),
      );
      this.game.ammo--;
    }
    // если активирован режим Power-up, то стреляем также и из хвоста
    if (this.powerUp) this.shootBottom();
  }
  private shootBottom() {
    if (this.game.ammo > 0) {
      this.projectiles.push(
        new Projectile(this.game, this.x + 80, this.y + 175),
      );
      this.game.ammo--;
    }
  }

  public enterPowerUp() {
    this.powerUpTimer = 0;
    this.powerUp = true;
    if (this.game.ammo < this.game.maxAmmo) this.game.ammo = this.game.maxAmmo;
  }
}
