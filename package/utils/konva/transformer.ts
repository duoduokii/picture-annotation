import Konva from "konva";
export function createTransformer(stage: Konva.Stage, layer: Konva.Layer) {
  const tr = new Konva.Transformer({
    ignoreStroke: false,
  });
  layer.add(tr);
  stage.on("click.transformer", (e) => {
    if (e.target === stage && tr.nodes().length != 0) {
      tr.nodes([]);
      layer.draw();
      return;
    }

    const isSelected = tr.nodes().indexOf(e.target) >= 0;
    if (!isSelected) {
      tr.nodes([e.target]);
      layer.draw();
    }
  });
  const onTransformer = (shapes: Konva.Shape[]) => {
    tr.nodes(shapes);
    layer.draw();
  };
  return {};
}
