import Konva from "konva";
import { DaGraph } from "./core/Graph";
import { Transformer } from "./core/Transformer";
import { DataTaggerOptions } from "./types";
export enum AnnotationType {
  Text,
  Image,
}

export class DataAnnotation {
  private _stage: Konva.Stage;
  private _layer: Konva.Layer;
  private _ctx: DaGraph;
  private _options: DataTaggerOptions = { sourceUrl: "" };
  private _transformer: Transformer;
  constructor(el: HTMLDivElement) {
    this._ctx = new DaGraph(el);
    this._transformer = new Transformer(this._ctx.stage, this._ctx.layer);
  }

  public setOptions(config: DataTaggerOptions) {
    if (!config.sourceUrl) {
      throw new Error("url不能为空");
    }
    this._options = config;
    this._ctx.drawImage(config.sourceUrl);
  }

  public drawReact() {}
  createRect() {}
  add() {}
  removeAllShapes() {}
  removeShape() {}
  restore() {}
}

// , "../src/assets/logo.png"
export function init(el: HTMLDivElement | string): DataAnnotation {
  // TODO div 类型判断
  let $el = typeof el === "string" ? (document.getElementById(el) as HTMLDivElement) : el;
  const DA = new DataAnnotation($el);
  return DA;
}
