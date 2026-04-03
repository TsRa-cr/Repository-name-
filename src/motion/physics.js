import { clamp, lerp } from "../lib/math.js";

export function createMotionState({ root, reducedMotion, coarsePointer, scrollController }) {
  const state = {
    pointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    smoothPointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    trailPointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
    hoverTarget: 0,
    hoverEnergy: 0,
    pointerVelocity: 0,
    reducedMotion,
    coarsePointer,
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      state.pointer.x = event.clientX;
      state.pointer.y = event.clientY;
    },
    { passive: true }
  );

  function syncRootVariables() {
    const nx = (state.smoothPointer.x / window.innerWidth - 0.5) * 2;
    const ny = (state.smoothPointer.y / window.innerHeight - 0.5) * 2;
    const progress = scrollController.progress;
    const tilt = clamp(scrollController.velocity * 0.12, -2.2, 2.2);

    root.style.setProperty("--cursor-x", `${state.smoothPointer.x}px`);
    root.style.setProperty("--cursor-y", `${state.smoothPointer.y}px`);
    root.style.setProperty("--trail-x", `${state.trailPointer.x}px`);
    root.style.setProperty("--trail-y", `${state.trailPointer.y}px`);
    root.style.setProperty("--parallax-x", `${(nx * 30).toFixed(2)}px`);
    root.style.setProperty("--parallax-y", `${(ny * 24).toFixed(2)}px`);
    root.style.setProperty("--hover-energy", state.hoverEnergy.toFixed(3));
    root.style.setProperty("--scroll-progress", progress.toFixed(4));
    root.style.setProperty("--scroll-tilt", `${tilt.toFixed(3)}deg`);
    root.style.setProperty("--pointer-energy", clamp(state.pointerVelocity * 0.12, 0, 1.2).toFixed(3));
  }

  function step() {
    const previousX = state.smoothPointer.x;
    const previousY = state.smoothPointer.y;

    scrollController.update();

    state.smoothPointer.x = lerp(
      state.smoothPointer.x,
      state.pointer.x,
      state.reducedMotion ? 1 : 0.12
    );
    state.smoothPointer.y = lerp(
      state.smoothPointer.y,
      state.pointer.y,
      state.reducedMotion ? 1 : 0.12
    );
    state.trailPointer.x = lerp(
      state.trailPointer.x,
      state.smoothPointer.x,
      state.reducedMotion ? 1 : 0.085
    );
    state.trailPointer.y = lerp(
      state.trailPointer.y,
      state.smoothPointer.y,
      state.reducedMotion ? 1 : 0.085
    );
    state.hoverEnergy = lerp(state.hoverEnergy, state.hoverTarget, 0.1);
    state.pointerVelocity = Math.hypot(
      state.smoothPointer.x - previousX,
      state.smoothPointer.y - previousY
    );

    syncRootVariables();
  }

  return { state, step };
}
