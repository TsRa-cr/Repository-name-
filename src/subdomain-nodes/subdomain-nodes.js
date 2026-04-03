import { paletteDataAttributes } from "../lib/dom.js";

export function renderSubdomainNodes(nodes) {
  return nodes
    .map(
      (node) => `
        <a
          class="portal-node js-magnetic"
          href="${node.href}"
          data-node-id="${node.id}"
          data-portal-link
          data-depth="${node.depth}"
          data-magnetic-strength="${node.magneticStrength}"
          style="--node-x:${node.orbit.x}%; --node-y:${node.orbit.y}%; --depth:${node.depth};"
          ${paletteDataAttributes(node.accent)}
        >
          <span class="portal-node-orbit"></span>
          <span class="portal-node-stem"></span>
          <span class="portal-node-shell glass-chip">
            <span class="portal-node-name">${node.name}</span>
            <span class="portal-node-domain">${node.domain}</span>
          </span>
        </a>
      `
    )
    .join("");
}
