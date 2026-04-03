import { clamp } from "../lib/math.js";
import { qsa, readPaletteFromElement } from "../lib/dom.js";

export function initMagneticSystem({ root, onHoverChange, onPalette }) {
  const elements = qsa(root, ".js-magnetic");

  function syncHoveredState() {
    window.requestAnimationFrame(() => {
      const active = root.querySelector(".js-magnetic.is-hovered");
      onHoverChange(active ? 1 : 0);
      onPalette(readPaletteFromElement(active));
    });
  }

  elements.forEach((element) => {
    element.addEventListener("pointerenter", () => {
      element.classList.add("is-hovered");
      onHoverChange(1);
      onPalette(readPaletteFromElement(element));
    });

    element.addEventListener("pointerleave", () => {
      element.classList.remove("is-hovered", "is-pressed");
      element.style.setProperty("--mx", "0px");
      element.style.setProperty("--my", "0px");
      element.style.setProperty("--mlift", "0px");
      element.style.setProperty("--mscale", "1");
      syncHoveredState();
    });

    element.addEventListener("pointermove", (event) => {
      const rect = element.getBoundingClientRect();
      const strength = Number.parseFloat(element.dataset.magneticStrength || "0.03");
      const depth = Number.parseFloat(element.dataset.depth || "1");
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      const shiftX = clamp(x * strength * depth, -4, 4);
      const shiftY = clamp(y * strength * depth, -3, 3);
      const lift = clamp(Math.abs(shiftY) + Math.abs(shiftX) * 0.3, 0, 4);

      element.style.setProperty("--mx", `${shiftX.toFixed(2)}px`);
      element.style.setProperty("--my", `${shiftY.toFixed(2)}px`);
      element.style.setProperty("--mlift", `${lift.toFixed(2)}px`);
      element.style.setProperty("--mscale", element.classList.contains("pill") ? "1.028" : "1.02");
    });

    element.addEventListener("pointerdown", () => {
      element.classList.add("is-pressed");
      element.style.setProperty("--mscale", "0.987");
    });

    element.addEventListener("pointerup", () => {
      element.classList.remove("is-pressed");
      if (element.classList.contains("is-hovered")) {
        element.style.setProperty("--mscale", element.classList.contains("pill") ? "1.028" : "1.02");
      } else {
        element.style.setProperty("--mscale", "1");
      }
    });
  });
}
