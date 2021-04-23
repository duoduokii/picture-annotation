import { defineComponent, ref } from "vue";
import { BorderOutlined } from "@ant-design/icons-vue";
import classNames from "classnames/bind";
import Style from "./index.module.scss";

interface LiShape {
  label: string;
  iconName: string;
  value: string;
}

export default defineComponent({
  name: "SideBar",
  components: { BorderOutlined },
  emits: ["change"],
  setup(props, { emit }) {
    const cx = classNames.bind(Style);
    const annotionShape: Array<LiShape> = [
      {
        label: "矩形",
        iconName: "",
        value: "Rect",
      },
    ];
    const selected = ref<string | null>(null);

    const handleClick = (shape: LiShape) => {
      selected.value = shape.value;
      emit("change", shape);
    };

    return () => (
      <div class={cx("side-bar")}>
        <ul>
          {() =>
            annotionShape.map((shape) => (
              <li class={cx({ actived: selected.value === shape.value })} onClick={() => handleClick(shape)}>
                <BorderOutlined class={cx("center-y")} style={{ fontSize: "28px", color: "#fff", cursor: "pointer" }} />
              </li>
            ))
          }
        </ul>
      </div>
    );
  },
});
