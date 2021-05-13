import Konva from "konva";
import { createKonvaStage, createKonvaLayer, drawKonvaImg } from "../utils/konva";
import { useElResize } from "../hooks/event/useElResize";

export class DaGraph {
  private _el: HTMLDivElement;

  private _url: string = "";

  private _resizeListnerStart: () => void;

  private _resizeListnerStop: () => void;

  stage: Konva.Stage;

  layer: Konva.Layer;

  image: Konva.Image | null = null;

  // TODO
  theme = {};

  constructor(el: HTMLDivElement) {
    this._el = el;
    const { width, height } = this._el.getBoundingClientRect();
    this.stage = createKonvaStage(el, width, height);
    this.layer = createKonvaLayer(this.stage);
    [this._resizeListnerStart, this._resizeListnerStop] = this._setResize();
    this._resizeListnerStart();
  }

  /**
   *
   * 画布和图片适应屏幕尺寸变化
   *
   */

  private _setResize() {
    const [start, stop] = useElResize(this._el, () => {
      const { width, height } = this._el.getBoundingClientRect();
      this.stage.width(width);
      this.stage.height(height);
      this.stage.draw();
      if (this.image == null) return;
      this.drawImage(this._url);
    });
    return [start, stop];
  }

  /**
   *
   * 初始绘制图片
   *
   */

  public drawImage(url: string) {
    if (this._url !== url) this._url = url;
    if (this.image) {
      // TODO 不销毁，而是根据位置信息重绘
      this.image.destroy();
    }
    drawKonvaImg(this.layer, url)
      .then((res) => {
        this.image = res;
      })
      .catch(() => {
        throw new Error("图片加载失败");
      });
  }

  /**
   *
   * 销毁监听器
   *
   */

  public destory() {
    this._resizeListnerStop();
  }
}
