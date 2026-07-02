import { Game } from "../Game";

export class Layer {
  private game: Game;
  private image: HTMLImageElement;
  private speedModifier: number;
  private width: number = 1768;
  public height: number = 500;
  private x: number = 0;
  private y: number = 0;

  public constructor(
    game: Game,
    image: HTMLImageElement,
    speedModifier: number,
  ) {
    this.game = game;
    this.image = image;
    this.speedModifier = speedModifier;
  }

  public update() {
    if (this.x <= -this.width) this.x = 0;
    else this.x -= this.game.speed * this.speedModifier;
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y);
    context.drawImage(this.image, this.x + this.width, this.y);
  }
}
