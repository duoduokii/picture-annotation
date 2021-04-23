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
export const createKonvaStage = (el: HTMLDivElement, width: number, height: number): Stage => {
  const stage = new Konva.Stage({
    container: el,
    width,
    height,
  });
  return stage;
};

/**
 * create Konva Layer
 * @param {Stage} stage
 * @return { Lyaer } layer
 */
export const createKonvaLayer = (stage: Stage): Layer => {
  const layer = new Konva.Layer();
  stage.add(layer);
  return layer;
};

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
