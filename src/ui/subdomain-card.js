import { paletteDataAttributes } from "../lib/dom.js";

export function renderSubdomainCard(node, index) {
  return `
    <article
      id="node-${node.id}"
      class="atlas-node glass-panel js-magnetic"
      style="--depth: ${0.18 + index * 0.04}"
      data-depth="${0.18 + index * 0.04}"
      data-magnetic-strength="${0.028 + index * 0.002}"
      ${paletteDataAttributes(node.accent)}
    >
      <div class="atlas-node-header">
        <p class="eyebrow">${node.eyebrow}</p>
        <span class="atlas-node-domain">${node.domain}</span>
      </div>
      <h3>${node.name}</h3>
      <p class="atlas-node-title">${node.title}</p>
      <p class="atlas-node-body">${node.description}</p>
      <div class="atlas-node-meta">
        <span>${node.stats[0]}</span>
        <span>${node.stats[1]}</span>
      </div>
    </article>
  `;
}
