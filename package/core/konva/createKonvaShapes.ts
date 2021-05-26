import Konva from "konva";
import type { Vector2d } from "konva/types/types";
import { setCursor } from "./cursor";

/**
 * 创建 Konva.Stage
 * @param {HTMLDivElement} el
 * @param {number} width
 * @param {number} height
 * @return { Stage } Konva.Stage
 */
export function createKonvaStage(el: HTMLDivElement | string, width: number, height: number): Konva.Stage {
  const stage = new Konva.Stage({
    container: el,
    width,
    height,
  });
  return stage;
}

/**
 * 创建 Konva.Layer
 * @param {Stage} stage
 * @return { Layer } Konva.Layer
 */
export function createKonvaLayer(stage: Konva.Stage): Konva.Layer {
  const layer = new Konva.Layer();
  stage.add(layer);
  return layer;
}

/**
 * 创建Konva.Image
 * @param { Konva.Layer } layer
 * @param { string } url
 * @param  config
 * @return { Promise<Konva.Image> }
 */
export function drawKonvaImg(layer: Konva.Layer, url: string): Promise<Konva.Image> {
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
        x: getX,
        y: getY,
        width: getW,
        height: getH,
      });
      konvaImg.addName("img" + new Date());
      layer.add(konvaImg);
      layer.batchDraw();
      resolve(konvaImg);
    };
  });
}

/**
 * 创建矩阵
 * @param {Konva.Layer} layer
 * @param {Konva.RectConfig} config
 * @return {*}
 */
export function createKonvaRect(layer: Konva.Layer, config: Konva.RectConfig): Konva.Rect {
  const rect = new Konva.Rect(config);
  layer.add(rect);
  layer.draw();
  return rect;
}

/**
 * 异步（手动）绘制矩阵
 *
 * @param {Konva.Stage} stage
 * @param {Konva.Layer} layer
 * @param {Konva.RectConfig} config
 * @return { Promise<Konva.Rect> }
 */
export function createAsyncKonvaRect(
  stage: Konva.Stage,
  layer: Konva.Layer,
  config: Konva.RectConfig = {
    visible: false,
    stroke: "red",
    strokeWidth: 2,
    draggable: true,
    strokeScaleEnabled: false,
  }
): Promise<Konva.Rect> {
  return new Promise((resolve, reject) => {
    const onCursor = setCursor(stage);

    let x1: number, y1: number, x2: number, y2: number;
    const konvaRect = createKonvaRect(layer, config);
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
      resolve(konvaRect);
      // TODO
      layer.off("mouseup.draw");
    });
  });
}
