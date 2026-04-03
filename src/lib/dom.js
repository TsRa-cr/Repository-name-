export function qs(scope, selector) {
  return scope.querySelector(selector);
}

export function qsa(scope, selector) {
  return [...scope.querySelectorAll(selector)];
}

export function paletteDataAttributes(palette) {
  return [
    `data-accent-primary="${palette.primary.join(",")}"`,
    `data-accent-secondary="${palette.secondary.join(",")}"`,
    `data-accent-cyan="${palette.cyan.join(",")}"`,
    `data-accent-warm="${palette.warm.join(",")}"`,
  ].join(" ");
}

export function readPaletteFromElement(element) {
  if (!element?.dataset.accentPrimary) {
    return null;
  }

  const read = (key) => element.dataset[key].split(",").map((value) => Number.parseFloat(value));

  return {
    primary: read("accentPrimary"),
    secondary: read("accentSecondary"),
    cyan: read("accentCyan"),
    warm: read("accentWarm"),
  };
}
