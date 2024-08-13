import { Game } from "../Game";

export class Layer {
  game: Game;
  image: HTMLImageElement;
  speedModifier: number;
  width: number;
  height: number;
  x: number;
  y: number;

  constructor(game: Game, image: HTMLImageElement, speedModifier: number) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
    this.width = 1768;
    this.height = 500;
    this.x = 0;
    this.y = 0;
  }
  update() {
    if (this.x <= -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}
