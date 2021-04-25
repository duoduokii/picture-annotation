import Konva from "konva";
import type { Stage } from "konva/types/Stage";
import { Layer } from "konva/types/Layer";
import { Rect, RectConfig } from "konva/types/shapes/Rect";

/**
 * create Konva Stage
 * @param {HTMLDivElement} el
 * @param {number} width
 * @param {number} height
 * @return { Stage } stage
 */
export function createKonvaStage(el: HTMLDivElement, width: number, height: number): Stage {
  const stage = new Konva.Stage({
    container: el,
    width,
    height,
  });
  return stage;
}

/**
 * create Konva Layer
 * @param {Stage} stage
 * @return { Layer } layer
 */
export function createKonvaLayer(stage: Stage): Layer {
  const layer = new Konva.Layer();
  stage.add(layer);
  return layer;
}

/**
 * draw konva img
 * @param {*}
 * @return {*}
 */
export function drawKonvaImg(
  boxEl: Element,
  layer: Konva.Layer,
  url: string,
  config?: { x: number; y: number; width?: number; height?: number }
) {
  console.log(boxEl.clientWidth);
  const clientW = boxEl.clientWidth;
  const clientH = boxEl.clientHeight;
  const img = new Image();
  img.src = url;
  const imgW = img.width;
  const imgH = img.height;
  img.onload = () => {
    const konvaImg = new Konva.Image({
      image: img,
      x: config?.x || 0,
      y: config?.y || 0,
      width: config?.width || img.width,
      height: config?.height || img.height,
    });
    layer.add(konvaImg);
    layer.batchDraw();
    return konvaImg;
  };
}

/**
 * draw konva rectangle
 * @param {Layer} layer
 * @param {RectConfig} config
 * @return {*}
 */
export const drawKonvaRect = (
  layer: Layer,
  config: RectConfig = {
    x: 20,
    y: 20,
    width: 100,
    height: 50,
    stroke: "green",
    strokeWidth: 1,
    name: "rect",
    draggable: true,
    strokeScaleEnabled: false,
  },
  cursor: "default" | "pointer" = "pointer"
): Rect => {
  const rect = new Konva.Rect(config);
  layer.add(rect);
  if (cursor === "pointer") {
    rect.on("mouseover", function () {
      document.body.style.cursor = "pointer";
    });
    rect.on("mouseout", function () {
      document.body.style.cursor = "default";
    });
  }
  return rect;
};
