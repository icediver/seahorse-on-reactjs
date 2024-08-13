import { Game } from "../Game";
import { getImagePath } from "../utils/getImagePath";
import { Enemy } from "./Enemy";

export class Drone extends Enemy {
  constructor(game: Game, x: number, y: number) {
    super(game);
    this.width = 115;
    this.height = 95;
    this.x = x;
    this.y = y;
    this.image.src = getImagePath("enemies/drone.png");
    this.frameY = Math.floor(Math.random() * 2);
    this.lives = 3;
    this.score = this.lives;
    this.type = "drone";
    this.speedX = Math.random() * -4.2 - 0.5;
  }
}
