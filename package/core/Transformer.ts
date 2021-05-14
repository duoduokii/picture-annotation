import Konva from "konva";

export class Transformer {
  private _stage: Konva.Stage;
  private _layer: Konva.Layer;
  private _transformer: Konva.Transformer;
  constructor(stage: Konva.Stage, layer: Konva.Layer) {
    this._stage = stage;
    this._layer = layer;
    this._transformer = this._init();
  }
  private _init(): Konva.Transformer {
    const tr = new Konva.Transformer({
      ignoreStroke: false,
    });
    this._layer.add(tr);
    this._stage.on("click.transformer", (e) => {
      if (e.target === this._stage && tr.nodes().length != 0) {
        tr.nodes([]);
        this._layer.draw();
        return;
      }

      const isSelected = tr.nodes().indexOf(e.target) >= 0;

      if (!isSelected) {
        tr.nodes([e.target]);
        this._layer.draw();
      }
    });
    return tr;
  }
  public update(shapes: Konva.Shape[]) {
    this._transformer.nodes(shapes);
    this._layer.draw();
  }

  // TODO 销毁监听事件
  public destroy(): void {
    this._stage.off("click.transformer");
  }
}
