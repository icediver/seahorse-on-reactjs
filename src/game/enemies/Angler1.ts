import { Game } from "../Game";
import { getImagePath } from "../utils/getImagePath";
import { Enemy } from "./Enemy";

export class Angler1 extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 228;
    this.height = 169;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image.src = getImagePath("enemies/angler1.png");
    this.lives = 2;
    this.score = this.lives;
  }
}
