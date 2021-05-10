import Konva from "konva";

interface KonvaShapeInfo {
  shape: Konva.Shape;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useEvent(stage: Konva.Stage, layer: Konva.Layer) {
  const annotationShapes: Konva.Shape[] = [];

  const drawKonvaShape = (layer: Konva.Layer) => {
    let startPointX: number = 0;
    let startPointY: number = 0;
    let konvaShape: Konva.Rect | null = null;
    layer.on("mousedown.draw", () => {
      const mousePos = stage.getPointerPosition();
      if (mousePos == null) return;
      startPointX = mousePos.x;
      startPointY = mousePos.y;
      konvaShape = drawRect(layer, startPointX, startPointY);
    });
    layer.on("mousemove.draw", () => {
      //TODO 计算超出图片边界的情况
      const mousePos = stage.getPointerPosition();
      if (mousePos == null || konvaShape == null) return;
      konvaShape.width(mousePos.x - startPointX);
      konvaShape.height(mousePos.y - startPointY);
      layer.draw();
    });
    layer.on("mouseup.draw", () => {
      layer.off("mousedown.draw");
      layer.off("mousemove.draw");
      if (konvaShape != null) annotationShapes.push(konvaShape);
      stopDraw(layer);
    });
  };

  const stopDraw = (layer: Konva.Layer) => {
    layer.off("mouseup.draw");
  };

  const drawRect = (layer: Konva.Layer, x: number = 0, y: number = 0) => {
    const rectInstance = new Konva.Rect({
      x: x,
      y: y,
      stroke: "red",
      strokeWidth: 2,
      draggable: true,
    });

    rectInstance.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    rectInstance.on("mouseout", function () {
      document.body.style.cursor = "default";
    });

    layer.add(rectInstance);
    return rectInstance;
  };
  drawKonvaShape(layer);

  return [annotationShapes];
}
