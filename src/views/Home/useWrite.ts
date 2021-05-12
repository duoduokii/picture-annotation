import Konva from "konva";
export function useWrite(stage: Konva.Stage, layer: Konva.Layer) {
  const konvaText = new Konva.Text({
    x: 0,
    y: 0,
    fontSize: 20,
    fontFamily: "Calibri",
  });
  const write = (text: string) => {
    konvaText.text(text);
    layer.draw();
  };
  layer.add(konvaText);

  const getMousePos = () => {
    if (stage == undefined) return;
    layer.on("mousemove.show", () => {
      const mousePos = stage.getPointerPosition();
      if (mousePos == null) return;
      write(`x: ${mousePos.x} y: ${mousePos.y}`);
    });
  };

  getMousePos();

  return [write];
}
