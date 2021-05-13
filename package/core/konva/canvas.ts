import Konva from "konva";

export class ICanvas {
  private $el: HTMLDivElement;
  private $stage: Konva.Stage;
  private $layer: Konva.Layer;
  constructor(el: HTMLDivElement) {
    this.$el = el;
    this.init();
  }
  private init() {}
}

export function createKonvaStage(el: HTMLDivElement | string, width: number, height: number): Konva.Stage {
  const stage = new Konva.Stage({
    container: el,
    width,
    height,
  });
  return stage;
}
