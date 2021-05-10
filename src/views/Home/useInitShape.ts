import Konva from "konva";
import { useElResize } from "@/hooks/event/useElResize";
export function useShapeResize(el: HTMLDivElement, shape: Konva.Shape, url: string) {
  let initStatus: boolean = false;
  const getImageResizeInfo = (imgW: number, imgH: number, clientW: number, clientH: number) => {
    const aspectRatio = imgW / imgH;
    let w: number = imgW,
      h: number = imgH;
    if (imgW > imgH) {
      w = imgW > clientW ? clientW : imgW;
      h = w / aspectRatio;
    } else {
      h = imgH > clientH ? clientH : imgH;
      w = h * aspectRatio;
    }
    return [w, h];
  };
  const initShape = (): Promise<Konva.Shape> => {
    const img = new Image();
    img.src = url;
    return new Promise((resolve, reject) => {
      img.onload = () => {
        const { width: clientW, height: clientH } = el.getBoundingClientRect();
        const imgW = img.width;
        const imgH = img.height;
        const [resizeW, resizeH] = getImageResizeInfo(imgW, imgH, clientW, clientH);
        shape.x(clientW / 2 - resizeW / 2);
        shape.y(clientH / 2 - resizeH / 2);
        shape.width(resizeW);
        shape.height(resizeH);
        resolve(shape);
      };
    });
  };
  const [start, stop] = useElResize(el, function () {
    if (initStatus) {
      initShape();
    }
  });

  return [initShape];
}
