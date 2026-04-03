import { experienceNotes, subdomainNodes } from "../config/subdomains.js";
import { qsa } from "../lib/dom.js";
import { renderHeroSpace } from "../hero-space/hero-space.js";
import { renderSubdomainCard } from "../ui/subdomain-card.js";

function renderExperienceNotes() {
  return experienceNotes
    .map(
      (note, index) => `
        <article class="experience-note glass-panel" style="--depth: ${0.2 + index * 0.05}">
          <p class="eyebrow">${note.eyebrow}</p>
          <h3>${note.title}</h3>
          <p>${note.body}</p>
        </article>
      `
    )
    .join("");
}

function renderNodeAtlas() {
  return subdomainNodes.map((node, index) => renderSubdomainCard(node, index)).join("");
}

export function renderLayout(root) {
  root.innerHTML = `
    <div class="gateway-v2" id="gateway-v2">
      <div class="ambient-background" aria-hidden="true">
        <canvas class="ambient-particles"></canvas>
        <div class="sun-disc"></div>
        <div class="sun-beam sun-beam-a"></div>
        <div class="sun-beam sun-beam-b"></div>
        <div class="atmosphere-haze"></div>
        <div class="air-grid"></div>
        <div class="architectural-plane plane-a"></div>
        <div class="architectural-plane plane-b"></div>
        <div class="architectural-plane plane-c"></div>
        <div class="architectural-veil veil-a"></div>
        <div class="architectural-veil veil-b"></div>
        <div class="cursor-light"></div>
        <div class="cursor-trail">
          <span class="trail-dot trail-dot-a"></span>
          <span class="trail-dot trail-dot-b"></span>
          <span class="trail-dot trail-dot-c"></span>
        </div>
        <div class="portal-flash"></div>
      </div>

      <div class="viewport-shell" data-viewport-shell>
        <div class="viewport-content" data-viewport-content>
          ${renderHeroSpace()}

          <section class="section atlas-section" id="atlas" data-scene>
            <div class="section-header narrow">
              <p class="eyebrow">Subdomain Atlas</p>
              <h2>Six entrances, each tuned as a distinct luminous surface.</h2>
            </div>
            <div class="node-atlas">
              ${renderNodeAtlas()}
            </div>
          </section>

          <section class="section system-section" id="system" data-scene>
            <div class="section-header narrow">
              <p class="eyebrow">System Intent</p>
              <h2>One interaction field, one material language, one architectural world.</h2>
            </div>
            <div class="experience-grid">
              ${renderExperienceNotes()}
            </div>
          </section>

          <section class="section docs-section" id="docs" data-scene>
            <div class="docs-ribbon glass-panel">
              <div>
                <p class="eyebrow">Project Documentation</p>
                <h3>Overview, design system, and interaction model live alongside the codebase.</h3>
              </div>
              <div class="docs-links">
                <a class="glass-chip js-magnetic" data-magnetic-strength="0.026" href="./docs/PROJECT_OVERVIEW.md">
                  PROJECT_OVERVIEW.md
                </a>
                <a class="glass-chip js-magnetic" data-magnetic-strength="0.026" href="./docs/DESIGN_SYSTEM.md">
                  DESIGN_SYSTEM.md
                </a>
                <a class="glass-chip js-magnetic" data-magnetic-strength="0.026" href="./docs/INTERACTION_MODEL.md">
                  INTERACTION_MODEL.md
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  `;

  return {
    root: root.firstElementChild,
    viewportShell: root.querySelector("[data-viewport-shell]"),
    viewportContent: root.querySelector("[data-viewport-content]"),
    particleCanvas: root.querySelector(".ambient-particles"),
    portalScene: root.querySelector("#portal-scene"),
    sections: qsa(root, "[data-scene]"),
    trailDots: qsa(root, ".trail-dot"),
  };
}
