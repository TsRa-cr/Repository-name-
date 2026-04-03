import { createAmbientBackground } from "../ambient-background/ambient-background.js";
import { renderLayout } from "../components/layout-shell.js";
import { subdomainNodes } from "../config/subdomains.js";
import { prefersReducedMotion } from "../hooks/reduced-motion.js";
import { createLightEngine } from "../lighting/light-engine.js";
import { createPortalTransition, bindPortalLinks } from "../features/portal-transition.js";
import { createScrollDynamics } from "../features/scroll-dynamics.js";
import { createMotionState } from "../motion/physics.js";
import { initMagneticSystem } from "../motion/magnetic-system.js";
import { bindPortalScene } from "../portal/portal-scene.js";

const appRoot = document.getElementById("app");
const reducedMotion = prefersReducedMotion();
const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
const refs = renderLayout(appRoot);
const rootStyle = document.documentElement;

const scrollController = createScrollDynamics({
  content: refs.viewportContent,
  reducedMotion,
});
const lightEngine = createLightEngine(rootStyle);
const ambientBackground = createAmbientBackground({
  canvas: refs.particleCanvas,
  trailDots: refs.trailDots,
  reducedMotion,
});
const transition = createPortalTransition({
  root: rootStyle,
  scrollController,
});
const motion = createMotionState({
  root: rootStyle,
  reducedMotion,
  coarsePointer,
  scrollController,
});

function updateSections() {
  refs.sections.forEach((section) => {
    const start = section.offsetTop - window.innerHeight * 0.72;
    const end = section.offsetTop + section.offsetHeight - window.innerHeight * 0.2;
    const progress = Math.min(Math.max((scrollController.current - start) / (end - start || 1), 0), 1);
    section.style.setProperty("--section-progress", progress.toFixed(3));
  });
}

bindPortalScene(refs.portalScene, subdomainNodes);
bindPortalLinks({ root: refs.root, transition });

initMagneticSystem({
  root: refs.root,
  onHoverChange(value) {
    motion.state.hoverTarget = value;
  },
  onPalette(palette) {
    lightEngine.setTargetPalette(palette);
  },
});

function tick() {
  motion.step();
  lightEngine.update(motion.state);
  ambientBackground.render(motion.state, lightEngine.getPalette());
  updateSections();
  requestAnimationFrame(tick);
}

scrollController.syncHeight();
tick();
