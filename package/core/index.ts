import { init } from "./DataAnnotation";
import { DataAnnotationConfig } from "./DataAnnotation";

export default {
  init(el: HTMLDivElement | string, config: DataAnnotationConfig) {
    return init.apply(null, arguments);
  },
};
