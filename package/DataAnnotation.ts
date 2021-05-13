import { DaGraph } from "./core/createCanvas";

export enum AnnotationType {
  Text,
  Image,
}

export interface DataAnnotationConfig {
  // type: AnnotationType;
  url: string;
}

export class DataAnnotation {
  private _ctx: DaGraph;

  private _options: DataAnnotationConfig = { url: "" };

  constructor(el: HTMLDivElement) {
    this._ctx = new DaGraph(el);
  }

  public setOptions(config: DataAnnotationConfig) {
    if (!config.url) {
      throw new Error("url不能为空");
    }
    this._options = config;
    this._ctx.drawImage(config.url);
  }

  public drawReact() {}
  createRect() {}
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
