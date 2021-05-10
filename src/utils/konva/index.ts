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
  layer: Konva.Layer,
  url: string,
  config?: { x?: number; y?: number; width?: number; height?: number }
): Promise<Konva.Image> {
  const setImageResizeInfo = (imgW: number, imgH: number, clientW: number, clientH: number) => {
    const aspectRatio = imgW / imgH;
    let w: number = imgW,
      h: number = imgH,
      x: number = 0,
      y: number = 0;
    if (imgW > imgH) {
      w = imgW > clientW ? clientW : imgW;
      h = w / aspectRatio;
    } else {
      h = imgH > clientH ? clientH : imgH;
      w = h * aspectRatio;
    }
    x = clientW / 2 - w / 2;
    y = clientH / 2 - h / 2;
    return { size: [w, h], position: [x, y] };
  };

  const img = new Image();
  img.src = url;

  return new Promise<Konva.Image>((resolve, reject) => {
    img.onload = () => {
      const clientW = layer.width();
      const clientH = layer.height();
      const imgW = img.width;
      const imgH = img.height;
      const getImageResizeInfo = setImageResizeInfo(imgW, imgH, clientW, clientH);
      const [getW, getH] = getImageResizeInfo.size;
      const [getX, getY] = getImageResizeInfo.position;

      const konvaImg = new Konva.Image({
        image: img,
        x: config?.x || getX,
        y: config?.y || getY,
        width: config?.width || getW,
        height: config?.height || getH,
      });
      layer.add(konvaImg);
      layer.batchDraw();
      resolve(konvaImg);
    };
  });
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
