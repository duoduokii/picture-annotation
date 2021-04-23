import { defineComponent, onMounted, ref, watch } from "vue";
import type { Stage } from "konva/types/Stage";
import type { Layer } from "konva/types/Layer";

import { createKonvaStage, createKonvaLayer, drawKonvaRect } from "@/utils/konva";
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

    /**
     * 初始化 konva 实例
     */
    const initKonvaInstance = (el: HTMLDivElement, width: number, height: number) => {
      stageInstance.value = createKonvaStage(el, width, height);
      layerInstance.value = createKonvaLayer(stageInstance.value as Stage);
      drawKonvaRect(layerInstance.value as Layer);
      stageInstance.value.add(layerInstance.value as Layer);

      // stage.on("click tap", function (e) {
      //   if (e.target === stage) {
      //     stage.find("Transformer").destroy();
      //     layer.draw();
      //     return;
      //   }
      //   if (!e.target.hasName("rect")) {
      //     return;
      //   }
      //   stage.find("Transformer").destroy();

      //   var tr = new Konva.Transformer({
      //     // anchorStroke: "red",
      //     anchorFill: "#75afcc",
      //     anchorSize: 10,
      //     borderStroke: "grey",
      //     borderDash: [3, 3],
      //     ignoreStroke: true,
      //     padding: 5,
      //   });
      //   layer.add(tr);
      //   tr.attachTo(e.target);
      //   layer.draw();
      // });
    };
    watch(annotationType, () => {
      console.log(123);
    });

    onMounted(() => {
      if (refKonvaBox.value == null) return;
      const konvaEle: HTMLDivElement = refKonvaBox.value;
      const width = konvaEle.clientWidth;
      const height = konvaEle.clientHeight;
      initKonvaInstance(konvaEle, width, height);
    });

    return () => (
      <div class={cx("home")}>
        <SideBar
          {...{
            onChange: (shape: any) => {
              annotationType.value = shape.value;
            },
          }}
        />
        <div id="container" draggable={true} class={cx("container")} ref={refKonvaBox}></div>
      </div>
    );
  },
});
