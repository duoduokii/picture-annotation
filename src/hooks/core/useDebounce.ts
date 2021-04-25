import { isFunction } from "@/utils/is";
interface DebounceOption {
  immediate?: boolean;
}
export function useDebounce(handler: Function, delay: number = 320, options: DebounceOption = { immediate: true }) {
  if (!isFunction(handler)) {
    throw new Error("handler is not Function!");
  }
  // debounce options
  let immediate = options.immediate;

  let timer: ReturnType<typeof setTimeout> | null;
  let cancelled: boolean | null = false;
  // cancel timer
  function cancelTimer() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  }

  // cancel exec
  function cancel() {
    cancelTimer();
    cancelled = true;
  }

  function fn(this: unknown, ...args: any[]) {
    if (cancelled) {
      return;
    }
    const exec = () => {
      handler.apply(this, args);
    };
    if (immediate) {
      immediate = false;
      exec();
    } else {
      if (timer !== null) cancelTimer();
      timer = setTimeout(exec, delay);
    }
  }
  return [fn, cancel];
}
