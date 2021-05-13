// TODO add polyfill(resize-observer-polyfill)
function resizeHandler(entries: any[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: Function) => {
        fn();
      });
    }
  }
}
// element resize listener
export function addResizeListener(el: any, fn: Function) {
  if (!el.__resizeListeners__) {
    el.__resizeListeners__ = [];
    el.__ro__ = new ResizeObserver(resizeHandler);
    el.__ro__.observe(el);
  }
  el.__resizeListeners__.push(fn);
}

// remove element resize listener
export function removeResizeListener(el: any, fn: Function) {
  if (!el || !el.__resizeListeners__) return;
  el.__resizeListeners__.splice(el.__resizeListeners__.indexOf(fn), 1);
  if (!el.__resizeListeners__.length) {
    el.__ro__.disconnect();
  }
}
