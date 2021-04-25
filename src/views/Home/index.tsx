import { defineComponent, onMounted, ref, watch } from "vue";
import type { Stage } from "konva/types/Stage";
import type { Layer } from "konva/types/Layer";

import { createKonvaStage, createKonvaLayer, drawKonvaRect } from "@/utils/konva";
import { useElResize } from "@/hooks/event/useElResize";

import SideBar from "./components/side-bar";
import classNames from "classnames/bind";
import Style from "./index.module.scss";

export default defineComponent({
  name: "Home",
  components: { SideBar },
  setup() {
    const cx = classNames.bind(Style);

    const annotationType = ref<string>("");

    const refKonvaBox = ref<HTMLDivElement | null>(null);
    const stageInstance = ref<Stage | null>(null);
    const layerInstance = ref<Layer | null>(null);

    watch(annotationType, () => {
      console.log(123);
    });

    onMounted(() => {
      if (refKonvaBox.value == null) return;
      const konvaEle: HTMLDivElement = refKonvaBox.value;
      const width = konvaEle.clientWidth;
      const height = konvaEle.clientHeight;

      initKonvaInstance(konvaEle, width, height);

      const [start, stop] = useElResize(refKonvaBox.value, function () {
        if (stageInstance.value != null && refKonvaBox.value != null) {
          const { width, height } = refKonvaBox.value?.getBoundingClientRect();
          updateStage(stageInstance.value as Stage, width, height);
        }
      });
      start();
    });

    /**
     * 初始化 konva 实例
     */
    const initKonvaInstance = (el: HTMLDivElement, width: number, height: number) => {
      stageInstance.value = createKonvaStage(el, width, height);
      layerInstance.value = createKonvaLayer(stageInstance.value as Stage);
      drawKonvaRect(layerInstance.value as Layer);
      stageInstance.value.add(layerInstance.value as Layer);
    };

    const updateStage = (stage: Stage, width: number, height: number) => {
      stage.width(width);
      stage.height(height);
      stage.draw();
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
