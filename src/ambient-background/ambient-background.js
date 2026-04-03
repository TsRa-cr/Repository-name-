import { clamp } from "../lib/math.js";

export function createAmbientBackground({ canvas, trailDots, reducedMotion }) {
  const context = canvas.getContext("2d");
  const particles = [];
  const trailState = trailDots.map(() => ({ x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 }));

  if (!context) {
    return {
      render(state) {
        trailState.forEach((dot, index) => {
          const previous = trailState[index - 1] || state.smoothPointer;
          dot.x += (previous.x - dot.x) * 0.18;
          dot.y += (previous.y - dot.y) * 0.18;
          trailDots[index].style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
        });
      },
    };
  }

  function particleCount() {
    return reducedMotion ? 0 : Math.min(52, Math.floor(window.innerWidth / 28));
  }

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * ratio;
    canvas.height = window.innerHeight * ratio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  }

  function seedParticles() {
    particles.length = 0;
    for (let index = 0; index < particleCount(); index += 1) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2 + 0.4,
        depth: Math.random() * 0.9 + 0.1,
        driftX: (Math.random() - 0.5) * 0.1,
        driftY: (Math.random() - 0.5) * 0.08,
      });
    }
  }

  function updateTrail(state) {
    trailState.forEach((dot, index) => {
      const previous = trailState[index - 1] || state.smoothPointer;
      const easing = 0.18 - index * 0.035;
      dot.x += (previous.x - dot.x) * easing;
      dot.y += (previous.y - dot.y) * easing;
      trailDots[index].style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
    });
  }

  function render(state, palette) {
    updateTrail(state);

    if (reducedMotion || !particles.length) {
      return;
    }

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    const influenceX = (state.smoothPointer.x / window.innerWidth - 0.5) * 6;
    const influenceY = (state.smoothPointer.y / window.innerHeight - 0.5) * 6;
    const scrollDrift = clamp(state.pointerVelocity * 0.01, 0, 0.8);

    particles.forEach((particle, index) => {
      particle.x += particle.driftX + influenceX * particle.depth * 0.018;
      particle.y += particle.driftY + influenceY * particle.depth * 0.018 - scrollDrift * particle.depth;

      if (particle.x < -20) particle.x = window.innerWidth + 20;
      if (particle.x > window.innerWidth + 20) particle.x = -20;
      if (particle.y < -20) particle.y = window.innerHeight + 20;
      if (particle.y > window.innerHeight + 20) particle.y = -20;

      const tint = index % 2 === 0 ? palette.cyan : palette.secondary;
      const alpha = 0.08 + particle.depth * 0.08 + state.hoverEnergy * 0.02;

      context.beginPath();
      context.fillStyle = `rgba(${tint.join(", ")}, ${alpha.toFixed(3)})`;
      context.arc(particle.x, particle.y, particle.size + state.hoverEnergy * 0.3, 0, Math.PI * 2);
      context.fill();
    });
  }

  window.addEventListener("resize", () => {
    resize();
    seedParticles();
  });

  resize();
  seedParticles();

  return { render };
}
