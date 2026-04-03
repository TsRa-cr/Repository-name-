import { clamp, lerp } from "../lib/math.js";

export function createScrollDynamics({ content, reducedMotion }) {
  let targetScroll = window.scrollY;
  let currentScroll = window.scrollY;
  let velocity = 0;

  function syncHeight() {
    if (reducedMotion) {
      document.body.style.height = "";
      content.style.transform = "none";
      return;
    }

    document.body.style.height = `${content.scrollHeight}px`;
  }

  window.addEventListener(
    "scroll",
    () => {
      targetScroll = window.scrollY;
    },
    { passive: true }
  );

  window.addEventListener("resize", () => {
    syncHeight();
    targetScroll = window.scrollY;
    currentScroll = window.scrollY;
  });

  syncHeight();

  return {
    syncHeight,
    jumpTo(y) {
      targetScroll = y;
      window.scrollTo({ top: y, behavior: "auto" });
    },
    update() {
      const previous = currentScroll;
      currentScroll = reducedMotion ? targetScroll : lerp(currentScroll, targetScroll, 0.1);
      velocity = currentScroll - previous;

      if (!reducedMotion) {
        content.style.transform = `translate3d(0, ${(-currentScroll).toFixed(2)}px, 0)`;
      }
    },
    get current() {
      return currentScroll;
    },
    get velocity() {
      return velocity;
    },
    get progress() {
      const max = Math.max(document.body.scrollHeight - window.innerHeight, 1);
      return clamp(currentScroll / max, 0, 1);
    },
  };
}
