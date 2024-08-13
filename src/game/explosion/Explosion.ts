import { Game } from "../Game";

export class Explosion {
  game: Game;
  frameX: number;
  spriteWidth: number;
  spriteHeight: number;
  width: number;
  height: number;
  x: number;
  y: number;
  fps: number;
  timer: number;
  interval: number;
  markedForDeletion: boolean;
  maxFrame: number;
  image: HTMLImageElement;

  constructor(game: Game, x: number, y: number) {
    this.game = game;
    this.frameX = 0;
    this.spriteWidth = 200;
    this.spriteHeight = 200;
    this.width = this.spriteWidth;
    this.height = this.spriteHeight;
    this.x = x - this.width * 0.5;
    this.y = y - this.height * 0.5;
    this.fps = 30;
    this.timer = 0;
    this.interval = 1000 / this.fps;
    this.markedForDeletion = false;
    this.maxFrame = 8;
    this.image = new Image();
  }
  update(deltaTime: number) {
    this.x -= this.game.speed; // для того, чтобы взрывы двигались вместе с игрой, а не стояли на месте
    if (this.timer > this.interval) {
      this.frameX++;
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    if (this.frameX > this.maxFrame) this.markedForDeletion = true;
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.frameX * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
