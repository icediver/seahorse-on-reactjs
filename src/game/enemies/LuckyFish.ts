import { Game } from "../Game";
import { getImagePath } from "../utils/getImagePath";
import { Enemy } from "./Enemy";

export class LuckyFish extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 99;
    this.height = 95;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image.src = getImagePath("enemies/lucky.png");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 5;
    this.score = 15;
    this.type = "lucky";
  }
}
