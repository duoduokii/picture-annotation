import { defineComponent, onMounted, ref, watch } from "vue";
import Konva from "konva";
import type { Vector2d } from "konva/types/types";
import type { Stage } from "konva/types/Stage";
import type { Layer } from "konva/types/Layer";
import type { Rect, RectConfig } from "konva/types/shapes/Rect";

import { createKonvaStage, createKonvaLayer, drawKonvaImg, drawKonvaRect } from "@/utils/konva";
import { useElResize } from "@/hooks/event/useElResize";
import { useEvent } from "./useEvent";
import { useWrite } from "./useWrite";

import SideBar from "./components/side-bar";
import classNames from "classnames/bind";
import Style from "./index.module.scss";

import Logo from "@/assets/konva-test.jpg";

export default defineComponent({
  name: "Home",
  components: { SideBar },
  setup() {
    const cx = classNames.bind(Style);

    const annotationType = ref<string>("");

    const refKonvaBox = ref<HTMLDivElement | null>(null);

    let stageInstance: Konva.Stage | null = null;
    let layerInstance: Konva.Layer | null = null;
    let imageInstance: Konva.Image | null = null;

    /**
     *
     * init Konva's instance
     *
     */
    const initKonvaInstance = (el: HTMLDivElement, width: number, height: number) => {
      stageInstance = createKonvaStage(el, width, height);
      layerInstance = createKonvaLayer(stageInstance);
      useWrite(stageInstance, layerInstance);
      if (layerInstance !== null) {
        drawImage(layerInstance, "../../assets/logo.png");
      }
    };

    const drawImage = (layer: Konva.Layer, url: string) => {
      drawKonvaImg(layer, Logo).then((res) => {
        imageInstance = res;
        useEvent(stageInstance as Konva.Stage, layerInstance as Konva.Layer);
      });
    };

    /**
     *
     * update Stage's size
     *
     */
    const updateStage = (stage: Stage, width: number, height: number) => {
      stage.width(width);
      stage.height(height);
      stage.draw();
      if (layerInstance == null || imageInstance == null) return;
      imageInstance.destroy();
      drawImage(layerInstance, "../../assets/logo.png");
    };

    onMounted(() => {
      if (refKonvaBox.value == null) return;
      const konvaEle: HTMLDivElement = refKonvaBox.value;
      const width = konvaEle.clientWidth;
      const height = konvaEle.clientHeight;

      initKonvaInstance(konvaEle, width, height);
      const [start, stop] = useElResize(refKonvaBox.value, function () {
        if (stageInstance != null && refKonvaBox.value != null) {
          const { width, height } = refKonvaBox.value?.getBoundingClientRect();
          updateStage(stageInstance, width, height);
        }
      });
      start();
    });

    /**
     * draw selection rectangle
     */
    const drawSelectedRect = (stage: Stage, layer: Layer, rect?: Rect) => {
      let selectionRectangle = drawKonvaRect(layer, {
        fill: "rgba(0,0,255,0.5)",
      });

      let x1: number, y1: number, x2, y2;
      stage.on("mousedown", (e) => {
        let { x, y } = stage.getPointerPosition() as Vector2d;
        x1 = x;
        y1 = y;
        x2 = x;
        y2 = y;

        selectionRectangle.visible(true);
        selectionRectangle.width(0);
        selectionRectangle.height(0);
        layer.draw();
      });

      stage.on("mousemove", () => {
        if (!selectionRectangle.visible()) {
          return;
        }
        if (isNaN(x1) || isNaN(y1)) {
          return;
        }

        let { x, y } = stage.getPointerPosition() as Vector2d;
        x2 = x;
        y2 = y;

        selectionRectangle.setAttrs({
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1),
        });
        layer.batchDraw();
      });
    };

    return () => (
      <div class={cx("home")}>
        <SideBar
          {...{
            onChange: (shape: any) => {
              annotationType.value = shape.value;
            },
          }}
        />
        <div id="container" class={cx("container")} ref={refKonvaBox}></div>
      </div>
    );
  },
});
