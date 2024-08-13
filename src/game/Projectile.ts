import { Game } from "./Game";
import { Rectangle } from "./enemies/Rectangle";
import { getImagePath } from "./utils/getImagePath";

export class Projectile extends Rectangle {
  speed: number;
  markedForDeletion: boolean;
  game: Game;
  image: HTMLImageElement;
  constructor(game: Game, x: number, y: number) {
    super(x, y, 10, 3);
    this.game = game;
    this.speed = 3;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = getImagePath("projectile.png");
  }

  update() {
    this.x += this.speed;
    if (this.x > this.game.width * 0.8) this.markedForDeletion = true;
  }

  draw(context: CanvasRenderingContext2D) {
    context.drawImage(this.image, this.x, this.y);
  }
}
