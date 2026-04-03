import { qs, qsa } from "../lib/dom.js";
import { renderPortalCore } from "../portal-core/portal-core.js";
import { renderSubdomainNodes } from "../subdomain-nodes/subdomain-nodes.js";

function renderInspector(node) {
  return `
    <div class="portal-inspector glass-panel" style="--depth: 0.24">
      <p class="eyebrow" data-active-eyebrow>${node.eyebrow}</p>
      <h3 class="inspector-title" data-active-title>${node.title}</h3>
      <p class="inspector-copy" data-active-description>${node.description}</p>
      <div class="inspector-footer">
        <span data-active-domain>${node.domain}</span>
        <strong data-active-phase>${node.phase}</strong>
      </div>
    </div>
  `;
}

export function renderPortalScene(nodes) {
  return `
    <div class="portal-scene" id="portal-scene">
      <div class="scene-shell glass-panel" style="--depth: 0.42">
        <div class="scene-sunplane"></div>
        <div class="scene-floor"></div>
        <div class="scene-column scene-column-a"></div>
        <div class="scene-column scene-column-b"></div>
        <div class="scene-frame scene-frame-a"></div>
        <div class="scene-frame scene-frame-b"></div>
        <div class="scene-halo scene-halo-a"></div>
        <div class="scene-halo scene-halo-b"></div>
        ${renderPortalCore()}
        ${renderSubdomainNodes(nodes)}
      </div>
      ${renderInspector(nodes[0])}
    </div>
  `;
}

export function bindPortalScene(sceneRoot, nodes) {
  const elementsById = new Map(nodes.map((node) => [node.id, node]));
  const inspector = {
    eyebrow: qs(sceneRoot, "[data-active-eyebrow]"),
    title: qs(sceneRoot, "[data-active-title]"),
    description: qs(sceneRoot, "[data-active-description]"),
    domain: qs(sceneRoot, "[data-active-domain]"),
    phase: qs(sceneRoot, "[data-active-phase]"),
  };

  function setActive(nodeId) {
    const node = elementsById.get(nodeId) || nodes[0];
    qsa(sceneRoot, ".portal-node").forEach((element) => {
      const isActive = element.dataset.nodeId === node.id;
      element.classList.toggle("is-active", isActive);
    });
    inspector.eyebrow.textContent = node.eyebrow;
    inspector.title.textContent = node.title;
    inspector.description.textContent = node.description;
    inspector.domain.textContent = node.domain;
    inspector.phase.textContent = node.phase;
  }

  qsa(sceneRoot, ".portal-node").forEach((element) => {
    const activate = () => setActive(element.dataset.nodeId);
    element.addEventListener("pointerenter", activate);
    element.addEventListener("focus", activate);
  });

  setActive(nodes[0].id);
}
