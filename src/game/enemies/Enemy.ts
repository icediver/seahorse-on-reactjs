import { Game } from "../Game";
import { Rectangle } from "./Rectangle";

export class Enemy extends Rectangle {
  protected game: Game;
  protected speedX: number;
  public markedForDeletion: boolean;
  public score: number;
  public lives: number = 0;
  protected frameX: number = 0;
  protected frameY: number = 0;
  private maxFrame: number = 37;
  protected image: HTMLImageElement;
  public type: string = "";

  public constructor(game: Game) {
    super(game.width, 0, 0, 0);
    this.game = game;
    this.speedX = Math.random() * -1.5 - 2.5;
    this.markedForDeletion = false;
    this.score = this.lives;
    this.image = new Image();
  }

  public update() {
    // Обновляем x-координату врага (уменьшаем ее на величину speedX)
    this.x += this.speedX - this.game.speed;
    // Помечаем врага как удаленного, если он полностью пересечет левую границу игрового поля
    if (this.x + this.width < 0) this.markedForDeletion = true;
    //sprite animation
    if (this.frameX < this.maxFrame) this.frameX++;
    else this.frameX = 0;
  }

  public draw(context: CanvasRenderingContext2D) {
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
