import Konva from "konva";
//TODO 自定义鼠标指针图形
type KonvaCursor = "default" | "pointer" | "move" | "crosshair";

export function setCursor(stage: Konva.Stage) {
  return (type: KonvaCursor) => {
    stage.container().style.cursor = type;
  };
}
