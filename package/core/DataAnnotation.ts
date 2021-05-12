import Konva from "konva";

import { drawKonvaImg } from "./utils/konva";
import { useElResize } from "./hooks/event/useElResize";
import { createKonvaStage, createKonvaLayer } from "./utils/konva";

enum AnnotationType {
  Text,
  Image,
}

interface DataAnnotationConfig {
  type: AnnotationType;
  url?: string;
}

export class DataAnnotation {
  private $el: HTMLDivElement;

  private $stage: Konva.Stage;

  private $layer: Konva.Layer;

  private $image: Konva.Image;

  private $option: DataAnnotationConfig;

  constructor(el: HTMLDivElement, config: DataAnnotationConfig) {
    this.$el = el;
    this.$option = config;
  }
  init() {
    const { width, height } = this.$el.getBoundingClientRect();

    this._initKonvaInstance(this.$el, width, height);

    const [start, stop] = useElResize(this.$el, () => {
      const { width, height } = this.$el.getBoundingClientRect();
      this._updateStage(this.$stage, this.$image, width, height);
    });
    start();
  }

  private _initKonvaInstance(el: HTMLDivElement, width: number, height: number) {
    this.$stage = createKonvaStage(el, width, height);
    this.$layer = createKonvaLayer(this.$stage);
    // useWrite(stageInstance, layerInstance);
    if (this.$option.type == AnnotationType.Image) {
      this._drawImage(this.$layer);
    }
  }

  private _updateStage(stage: Konva.Stage, image: Konva.Image, width: number, height: number) {
    stage.width(width);
    stage.height(height);
    stage.draw();

    if (image == undefined) return;
    if (this.$option.type === AnnotationType.Image) {
      image.destroy();
      this._drawImage(this.$layer);
    }
  }

  private _drawImage(layer: Konva.Layer) {
    drawKonvaImg(layer, this.$option.url).then((res) => {
      this.$image = res;
      // useEvent(stageInstance as Konva.Stage, layerInstance as Konva.Layer);
    });
  }
}

// , "../src/assets/logo.png"
export function init(el: HTMLDivElement | string, config: DataAnnotationConfig): DataAnnotation {
  // TODO div 类型判断
  let $el = typeof el === "string" ? (document.getElementById(el) as HTMLDivElement) : el;
  const DA = new DataAnnotation($el, config);
  DA.init();
  return DA;
}
