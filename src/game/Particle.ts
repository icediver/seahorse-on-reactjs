import { Game } from "./Game";
import { getImagePath } from "./utils/getImagePath";

export class Particle {
  game: Game;
  x: number;
  y: number;
  image: HTMLImageElement;
  frameX: number;
  frameY: number;
  spriteSize: number;
  sizeModifier: number;
  size: number;
  speedX: number;
  speedY: number;
  gravity: number;
  markedForDeletion: boolean;
  angle: number;
  va: number;
  bounced: number;
  bottomBounceBoundary: number;
  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.image = new Image(); // document.getElementById("gears");
    this.image.src = getImagePath("gears.png");
    this.frameX = Math.floor(Math.random() * 3);
    this.frameY = Math.floor(Math.random() * 3);
    this.spriteSize = 50;
    this.sizeModifier = +(Math.random() * 0.5 + 0.5).toFixed(1);
    this.size = this.spriteSize * this.sizeModifier;
    this.speedX = Math.random() * 6 - 3;
    this.speedY = Math.random() * -15;
    this.gravity = 0.5; // коэффициент увеличения скорости (ускорение)
    this.markedForDeletion = false;
    this.angle = 0; // начальный угол поворота частицы
    this.va = Math.random() * 0.2 - 0.1; // скорость поворота частицы
    this.bounced = 0; // количество ударов (отскоков) частицы от поверхности "земли"
    this.bottomBounceBoundary = Math.random() * 80 + 60; // границы касания частиц с поверхностью земли
  }
  update() {
    this.angle += this.va;
    this.speedY += this.gravity;
    this.x -= this.speedX + this.game.speed;
    this.y += this.speedY;
    if (this.y > this.game.height + this.size || this.x < 0 - this.size)
      this.markedForDeletion = true;
    if (
      this.y > this.game.height - this.bottomBounceBoundary &&
      this.bounced < 2
    ) {
      this.bounced++;
      this.speedY *= -0.5;
    }
  }
  draw(context: CanvasRenderingContext2D) {
    context.save();
    context.translate(this.x, this.y);
    context.rotate(this.angle);
    context.drawImage(
      this.image,
      this.frameX * this.spriteSize,
      this.frameY * this.spriteSize,
      this.spriteSize,
      this.spriteSize,
      this.size * -0.5,
      this.size * -0.5,
      this.size,
      this.size,
    );
    context.restore();
  }
}
