import { Game } from "../Game";
import { getImagePath } from "../utils/getImagePath";
import { Layer } from "./Layer";

export class Background {
  game: Game;
  // image1: HTMLImageElement;
  layer1: Layer;
  layer2: Layer;
  layer3: Layer;
  layer4: Layer;
  layers: Layer[];
  constructor(game: Game) {
    this.game = game;
    // this.image1 = document.getElementById("layer1");
    const image1 = new Image();
    const image2 = new Image();
    const image3 = new Image();
    const image4 = new Image();
    image1.src = getImagePath("layers/layer1.png");
    image2.src = getImagePath("layers/layer2.png");
    image3.src = getImagePath("layers/layer3.png");
    image4.src = getImagePath("layers/layer4.png");
    this.layer1 = new Layer(this.game, image1, 0.2);
    this.layer2 = new Layer(this.game, image2, 0.4);
    this.layer3 = new Layer(this.game, image3, 1);
    this.layer4 = new Layer(this.game, image4, 1.5);
    this.layers = [this.layer1, this.layer2, this.layer3];
  }
  update() {
    this.layers.forEach((layer) => layer.update());
  }
  draw(context: CanvasRenderingContext2D) {
    this.layers.forEach((layer) => layer.draw(context));
  }
}
