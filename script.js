const root = document.documentElement;
const body = document.body;
const smoothContent = document.getElementById("smooth-content");
const sections = [...document.querySelectorAll("[data-scene]")];
const magneticElements = [...document.querySelectorAll(".magnetic")];
const canvas = document.querySelector(".particle-field");
const ctx = canvas.getContext("2d");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const coarsePointer = window.matchMedia("(pointer: coarse)").matches;

const state = {
  pointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
  smoothPointer: { x: window.innerWidth * 0.5, y: window.innerHeight * 0.5 },
  pointerVelocity: 0,
  targetScroll: window.scrollY,
  currentScroll: window.scrollY,
  scrollVelocity: 0,
  hoverEnergy: 0,
  hoverTarget: 0,
  portal: { active: false, scale: 0, opacity: 0, energy: 0, size: 0 },
  frame: 0,
};

const particles = [];

function getParticleCount() {
  return reduceMotion ? 0 : Math.min(60, Math.floor(window.innerWidth / 24));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

function resizeCanvas() {
  if (!ctx) {
    return;
  }

  const ratio = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * ratio;
  canvas.height = window.innerHeight * ratio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function syncBodyHeight() {
  if (reduceMotion) {
    body.style.height = "";
    return;
  }

  body.style.height = `${smoothContent.scrollHeight}px`;
}

function createParticles() {
  particles.length = 0;
  const particleCount = getParticleCount();

  for (let index = 0; index < particleCount; index += 1) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 2.2 + 0.6,
      depth: Math.random() * 0.9 + 0.1,
      driftX: (Math.random() - 0.5) * 0.12,
      driftY: (Math.random() - 0.5) * 0.1,
      phase: Math.random() * Math.PI * 2,
    });
  }
}

function setPointerVars() {
  const nx = (state.smoothPointer.x / window.innerWidth - 0.5) * 2;
  const ny = (state.smoothPointer.y / window.innerHeight - 0.5) * 2;
  const pageProgress =
    document.body.scrollHeight > window.innerHeight
      ? clamp(state.currentScroll / (document.body.scrollHeight - window.innerHeight), 0, 1)
      : 0;

  root.style.setProperty("--cursor-x", `${state.smoothPointer.x}px`);
  root.style.setProperty("--cursor-y", `${state.smoothPointer.y}px`);
  root.style.setProperty("--cursor-nx", nx.toFixed(4));
  root.style.setProperty("--cursor-ny", ny.toFixed(4));
  root.style.setProperty("--cursor-speed", state.pointerVelocity.toFixed(3));
  root.style.setProperty("--scroll-progress", pageProgress.toFixed(4));
  root.style.setProperty("--scroll-velocity", state.scrollVelocity.toFixed(3));
  root.style.setProperty("--hover-energy", state.hoverEnergy.toFixed(3));
  root.style.setProperty("--portal-scale", state.portal.scale.toFixed(3));
  root.style.setProperty("--portal-opacity", state.portal.opacity.toFixed(3));
  root.style.setProperty("--energy-size", `${state.portal.size.toFixed(1)}px`);
  root.style.setProperty("--energy-opacity", state.portal.energy.toFixed(3));
}

function updateSceneProgress() {
  const viewportHeight = window.innerHeight;

  sections.forEach((section) => {
    const start = section.offsetTop - viewportHeight * 0.7;
    const end = section.offsetTop + section.offsetHeight - viewportHeight * 0.2;
    const progress = clamp((state.currentScroll - start) / (end - start || 1), 0, 1);
    const depth = Number.parseFloat(section.style.getPropertyValue("--depth") || "0");

    section.style.setProperty("--section-progress", progress.toFixed(4));
    section.style.setProperty("--section-shift", `${(progress - 0.5) * -28}px`);
    section.style.setProperty("--section-depth", depth.toFixed(2));
  });
}

function renderParticles() {
  if (!ctx || !particles.length) {
    return;
  }

  ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  const influenceX = (state.smoothPointer.x / window.innerWidth - 0.5) * 8;
  const influenceY = (state.smoothPointer.y / window.innerHeight - 0.5) * 8;
  const scrollForce = clamp(state.scrollVelocity * 0.04, -6, 6);

  particles.forEach((particle, index) => {
    particle.phase += 0.008 + particle.depth * 0.002;
    particle.x += particle.driftX + influenceX * particle.depth * 0.02;
    particle.y += particle.driftY + influenceY * particle.depth * 0.02 - scrollForce * particle.depth * 0.06;

    if (particle.x < -20) particle.x = window.innerWidth + 20;
    if (particle.x > window.innerWidth + 20) particle.x = -20;
    if (particle.y < -20) particle.y = window.innerHeight + 20;
    if (particle.y > window.innerHeight + 20) particle.y = -20;

    const pulse = (Math.sin(state.frame * 0.015 + particle.phase + index) + 1) * 0.5;
    const radius = particle.size + pulse * 1.2 * particle.depth + state.hoverEnergy * 0.004;
    const alpha = 0.08 + particle.depth * 0.13 + state.hoverEnergy * 0.0009;

    ctx.beginPath();
    ctx.fillStyle = `rgba(224, 247, 255, ${alpha.toFixed(3)})`;
    ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
    ctx.fill();
  });
}

function tick() {
  state.frame += 1;

  const lastPointerX = state.smoothPointer.x;
  const lastPointerY = state.smoothPointer.y;
  const lastScroll = state.currentScroll;

  state.smoothPointer.x = lerp(state.smoothPointer.x, state.pointer.x, reduceMotion ? 1 : 0.14);
  state.smoothPointer.y = lerp(state.smoothPointer.y, state.pointer.y, reduceMotion ? 1 : 0.14);
  state.currentScroll = lerp(
    state.currentScroll,
    state.targetScroll,
    reduceMotion || coarsePointer ? 1 : 0.11
  );
  state.hoverEnergy = lerp(state.hoverEnergy, state.hoverTarget, 0.12);

  state.pointerVelocity = Math.hypot(
    state.smoothPointer.x - lastPointerX,
    state.smoothPointer.y - lastPointerY
  );
  state.scrollVelocity = state.currentScroll - lastScroll;
  state.portal.energy = lerp(state.portal.energy, 0, state.portal.active ? 0.12 : 0.18);
  state.portal.size = lerp(
    state.portal.size,
    state.portal.active ? 220 : 160,
    state.portal.active ? 0.12 : 0.16
  );

  if (state.portal.active) {
    state.portal.scale = lerp(state.portal.scale, 1.25, 0.16);
    state.portal.opacity = lerp(state.portal.opacity, 0, 0.08);

    if (state.portal.opacity < 0.02) {
      state.portal.active = false;
      body.classList.remove("is-portal");
      state.portal.scale = 0;
    }
  } else if (state.portal.energy < 0.02) {
    state.portal.size = 0;
  }

  if (!reduceMotion) {
    smoothContent.style.transform = `translate3d(0, ${(-state.currentScroll).toFixed(2)}px, 0)`;
  }

  setPointerVars();
  updateSceneProgress();
  renderParticles();

  requestAnimationFrame(tick);
}

function alignPointer(event) {
  state.pointer.x = event.clientX;
  state.pointer.y = event.clientY;
}

function activateMagnet(element) {
  element.addEventListener("pointerenter", () => {
    element.classList.add("is-hovered");
    state.hoverTarget = 22;
  });

  element.addEventListener("pointerleave", () => {
    element.classList.remove("is-hovered", "is-pressed");
    element.style.setProperty("--mx", "0px");
    element.style.setProperty("--my", "0px");
    element.style.setProperty("--mscale", "1");
    window.requestAnimationFrame(() => {
      state.hoverTarget = document.querySelector(".magnetic.is-hovered") ? 22 : 0;
    });
  });

  element.addEventListener("pointermove", (event) => {
    if (reduceMotion) {
      return;
    }

    const bounds = element.getBoundingClientRect();
    const x = event.clientX - bounds.left - bounds.width / 2;
    const y = event.clientY - bounds.top - bounds.height / 2;
    const strength = element.classList.contains("pill") ? 0.22 : 0.14;
    const shiftX = clamp(x * strength, -16, 16);
    const shiftY = clamp(y * strength, -14, 14);
    const scale = element.classList.contains("pill") ? 1.03 : 1.02;

    element.style.setProperty("--mx", `${shiftX.toFixed(2)}px`);
    element.style.setProperty("--my", `${shiftY.toFixed(2)}px`);
    element.style.setProperty("--mscale", scale.toFixed(3));
    state.hoverTarget = 28;
  });

  element.addEventListener("pointerdown", () => {
    element.classList.add("is-pressed");
    element.style.setProperty("--mscale", "0.985");
  });

  element.addEventListener("pointerup", () => {
    element.classList.remove("is-pressed");
    if (element.classList.contains("is-hovered")) {
      element.style.setProperty("--mscale", element.classList.contains("pill") ? "1.03" : "1.02");
    } else {
      element.style.setProperty("--mscale", "1");
    }
  });
}

function triggerBurst(x, y) {
  root.style.setProperty("--portal-x", `${x}px`);
  root.style.setProperty("--portal-y", `${y}px`);
  state.portal.energy = 0.95;
  state.portal.size = 42;
}

function triggerPortal(x, y, targetId) {
  root.style.setProperty("--portal-x", `${x}px`);
  root.style.setProperty("--portal-y", `${y}px`);
  state.portal.active = true;
  state.portal.scale = 0.22;
  state.portal.opacity = 0.95;
  state.portal.energy = 0.82;
  state.portal.size = 28;
  body.classList.add("is-portal");

  const target = document.getElementById(targetId);
  if (!target) {
    return;
  }

  window.setTimeout(() => {
    state.targetScroll = target.offsetTop;
    window.scrollTo({ top: target.offsetTop, behavior: "auto" });
  }, 220);
}

function bindPortalLinks() {
  document.querySelectorAll("[data-portal-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const rect = link.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      triggerBurst(x, y);
      triggerPortal(x, y, link.getAttribute("data-portal-target"));
    });
  });
}

function bindShowcaseBursts() {
  document.querySelectorAll(".showcase-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX || rect.left + rect.width / 2;
      const y = event.clientY || rect.top + rect.height / 2;
      triggerBurst(x, y);
    });
  });
}

function init() {
  resizeCanvas();
  syncBodyHeight();
  createParticles();
  setPointerVars();
  updateSceneProgress();

  magneticElements.forEach(activateMagnet);
  bindPortalLinks();
  bindShowcaseBursts();

  window.addEventListener("pointermove", alignPointer, { passive: true });
  window.addEventListener(
    "scroll",
    () => {
      state.targetScroll = window.scrollY;
    },
    { passive: true }
  );
  window.addEventListener("resize", () => {
    resizeCanvas();
    syncBodyHeight();
    createParticles();
    state.targetScroll = window.scrollY;
    state.currentScroll = window.scrollY;
  });

  tick();
}

init();
