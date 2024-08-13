import { Game } from "../Game";
import { Rectangle } from "./Rectangle";

export class Enemy extends Rectangle {
  game: Game;
  speedX: number;
  markedForDeletion: boolean;
  score: number;
  lives: number;
  frameX: number;
  frameY: number;
  maxFrame: number;
  image: HTMLImageElement;
  type: string;
  constructor(game: Game) {
    super(game.width, 0, 0, 0);
    this.game = game;
    this.speedX = Math.random() * -1.5 - 2.5;
    this.markedForDeletion = false;
    this.lives = 0;
    this.score = this.lives;
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.image = new Image();
    this.type = "";
  }

  update() {
    // Обновляем x-координату врага (уменьшаем ее на величину speedX)
    this.x += this.speedX - this.game.speed;
    // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
    if (this.x + this.width < 0) this.markedForDeletion = true;
    //sprite animation
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = 0;
  }

  draw(context: CanvasRenderingContext2D) {
    // Устанавливаем цвет врага
    // context.fillStyle = this.color;
    // На данном этапе наш враг будет представлять из себя
    // просто прямоугольник определенного цвета
    // context.fillRect(this.x, this.y, this.width, this.height);
    // отобразим у каждого врага его жизни
    context.fillStyle = "black";
    context.font = "20px Helvetica";
    context.fillText(this.lives.toString(), this.x, this.y - 5);
    context.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}
