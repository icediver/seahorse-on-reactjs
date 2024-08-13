import { Game } from "../Game";
import { getImagePath } from "../utils/getImagePath";
import { Enemy } from "./Enemy";

export class HiveWhale extends Enemy {
  constructor(game: Game) {
    super(game);
    this.width = 400;
    this.height = 227;
    this.y = Math.random() * (this.game.height * 0.95 - this.height);
    this.image.src = getImagePath("enemies/hivewhale.png");
    this.frameY = 0;
    this.lives = 20;
    this.score = this.lives;
    this.type = "hive";
    this.speedX = Math.random() * -1.2 - 0.2;
  }
}
