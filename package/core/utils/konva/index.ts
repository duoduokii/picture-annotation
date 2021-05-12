import Konva from "konva";

import { Rect, RectConfig } from "konva/types/shapes/Rect";

/**
 * create Konva Stage
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
 * create Konva Layer
 * @param {Stage} stage
 * @return { Layer } Konva.Layer
 */
export function createKonvaLayer(stage: Konva.Stage): Konva.Layer {
  const layer = new Konva.Layer();
  stage.add(layer);
  return layer;
}

/**
 * @description:
 * @param { Konva.Layer } layer
 * @param { string } url
 * @param  config
 * @return { Promise<Konva.Image> }
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
      konvaImg.addName("img" + new Date());
      layer.add(konvaImg);
      layer.batchDraw();
      resolve(konvaImg);
    };
  });
}

/**
 * draw konva rectangle
 * @param {Konva.Layer} layer
 * @param {Konva.RectConfig} config
 * @return {*}
 */
export function drawKonvaRect(layer: Konva.Layer, config: RectConfig): Rect {
  const rect = new Konva.Rect(config);
  layer.add(rect);
  layer.draw();
  return rect;
}
