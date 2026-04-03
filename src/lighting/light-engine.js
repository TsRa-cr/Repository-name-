import { defaultAtmosphere } from "../config/subdomains.js";
import { mixTriplet, tripletToCss } from "../lib/math.js";

export function createLightEngine(root) {
  const palette = {
    current: {
      primary: [...defaultAtmosphere.primary],
      secondary: [...defaultAtmosphere.secondary],
      cyan: [...defaultAtmosphere.cyan],
      warm: [...defaultAtmosphere.warm],
    },
    target: {
      primary: [...defaultAtmosphere.primary],
      secondary: [...defaultAtmosphere.secondary],
      cyan: [...defaultAtmosphere.cyan],
      warm: [...defaultAtmosphere.warm],
    },
  };

  function setTargetPalette(nextPalette) {
    const source = nextPalette || defaultAtmosphere;
    palette.target = {
      primary: [...source.primary],
      secondary: [...source.secondary],
      cyan: [...source.cyan],
      warm: [...source.warm],
    };
  }

  function update(state) {
    palette.current.primary = mixTriplet(palette.current.primary, palette.target.primary, 0.08);
    palette.current.secondary = mixTriplet(
      palette.current.secondary,
      palette.target.secondary,
      0.08
    );
    palette.current.cyan = mixTriplet(palette.current.cyan, palette.target.cyan, 0.08);
    palette.current.warm = mixTriplet(palette.current.warm, palette.target.warm, 0.08);

    root.style.setProperty("--accent-primary", tripletToCss(palette.current.primary));
    root.style.setProperty("--accent-secondary", tripletToCss(palette.current.secondary));
    root.style.setProperty("--accent-cyan", tripletToCss(palette.current.cyan));
    root.style.setProperty("--accent-warm", tripletToCss(palette.current.warm));
    root.style.setProperty("--ambient-brightness", (0.78 + state.hoverEnergy * 0.18).toFixed(3));
  }

  function getPalette() {
    return palette.current;
  }

  return { getPalette, setTargetPalette, update };
}
