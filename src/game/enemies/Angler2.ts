import { Game } from "../Game";
import { getImagePath } from "../utils/getImagePath";
import { Enemy } from "./Enemy";

export class Angler2 extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 213;
    this.height = 165;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    // this.color = "green";
    this.image.src = getImagePath("enemies/angler2.png");
    this.lives = 3;
    this.score = this.lives;
  }
}
