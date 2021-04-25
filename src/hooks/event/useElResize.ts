import { useDebounce } from "@/hooks/core/useDebounce";
import { addResizeListener, removeResizeListener } from "@/utils/events";

interface WindowSizeOptions {
  immediate?: boolean;
}

export function useElResize(
  el: Element | typeof Window,
  fn: Function,
  delay: number = 100,
  options: WindowSizeOptions = { immediate: true }
) {
  let handler = () => {
    fn();
  };
  const [handleSize, cancel] = useDebounce(handler, delay, options);

  handler = delay ? handleSize : handler;

  function start() {
    addResizeListener(el, handler);
  }

  function stop() {
    removeResizeListener(el, handler);
    cancel();
  }
  return [start, stop];
}
