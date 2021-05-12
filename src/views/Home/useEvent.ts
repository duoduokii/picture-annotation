import Konva from "konva";
import type { Vector2d } from "konva/types/types";

import { setCursor } from "@/utils/konva/style";
import { drawKonvaRect } from "@/utils/konva/index";

interface KonvaShapeInfo {
  shape: Konva.Shape;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useEvent(stage: Konva.Stage, layer: Konva.Layer) {
  const annotationShapes: Konva.Shape[] = [];
  const onCursor = setCursor(stage);

  const drawKonvaShape = (stage: Konva.Stage, layer: Konva.Layer) => {
    let x1: number, y1: number, x2: number, y2: number;
    const konvaRect = drawKonvaRect(layer, {
      visible: false,
      stroke: "red",
      strokeWidth: 2,
      draggable: true,
      strokeScaleEnabled: false,
    });
    layer.on("mousedown.draw", () => {
      onCursor("crosshair");
      const { x, y } = stage.getPointerPosition() as Vector2d;
      x1 = x;
      y1 = y;
      x2 = x;
      y2 = y;
      konvaRect.visible(true);
      konvaRect.width(0);
      konvaRect.height(0);
      konvaRect.moveUp();
      layer.draw();
    });
    layer.on("mousemove.draw", () => {
      //TODO 计算超出图片边界的情况
      if (!konvaRect.visible()) return;
      if (isNaN(x1) || isNaN(y1)) return;
      let { x, y } = stage.getPointerPosition() as Vector2d;
      x2 = x;
      y2 = y;
      konvaRect.setAttrs({
        x: Math.min(x1, x2),
        y: Math.min(y1, y2),
        width: Math.abs(x2 - x1),
        height: Math.abs(y2 - y1),
      });
      layer.draw();
    });
    layer.on("mouseup.draw", () => {
      onCursor("default");
      layer.off("mousedown.draw");
      layer.off("mousemove.draw");
      if (!konvaRect.visible()) return;
      // TODO
      annotationShapes.push(konvaRect);
      layer.off("mouseup.draw");
    });
    return konvaRect;
  };

  const addTransformer = (stage: Konva.Stage, layer: Konva.Layer) => {
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
    return onTransformer;
  };
  addTransformer(stage, layer);
  drawKonvaShape(stage, layer);

  return [annotationShapes];
}
