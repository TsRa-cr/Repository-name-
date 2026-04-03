import { gatewayFacts, subdomainNodes } from "../config/subdomains.js";
import { renderPortalScene } from "../portal/portal-scene.js";

function renderFacts() {
  return gatewayFacts
    .map(
      (fact) => `
        <div class="gateway-stat glass-chip">
          <span>${fact.label}</span>
          <strong>${fact.value}</strong>
        </div>
      `
    )
    .join("");
}

export function renderHeroSpace() {
  return `
    <section class="section hero-space" id="overview" data-scene>
      <header class="sky-rail">
        <div class="brand-monolith glass-chip">
          <span class="brand-mark">TS</span>
          <div class="brand-copy">
            <span class="eyebrow">TSRAONE Gateway</span>
            <strong>Sunlit Root Portal</strong>
          </div>
        </div>
        <nav class="sky-nav">
          <a class="glass-chip js-magnetic" data-magnetic-strength="0.024" data-portal-link href="#atlas">
            Atlas
          </a>
          <a class="glass-chip js-magnetic" data-magnetic-strength="0.024" data-portal-link href="#system">
            System
          </a>
          <a class="glass-chip js-magnetic" data-magnetic-strength="0.024" data-portal-link href="#docs">
            Docs
          </a>
        </nav>
      </header>

      <div class="hero-space-grid">
        <div class="hero-manifesto">
          <p class="eyebrow">Flagship Root-Domain Experience</p>
          <h1>A luminous portal across the TSRAONE domain system.</h1>
          <p class="hero-summary">
            Built as a bright architectural experience with sunlight, layered glass, and Apple-grade motion discipline,
            this homepage acts as the spatial front door for tsraone.com, test2, test, aitrader, connect, and note.
          </p>
          <div class="hero-actions">
            <a class="pill primary js-magnetic" href="#atlas" data-portal-link data-magnetic-strength="0.038">
              Enter The Atlas
            </a>
            <a class="pill secondary js-magnetic" href="#system" data-portal-link data-magnetic-strength="0.034">
              Review The System
            </a>
          </div>
          <div class="gateway-stats">
            ${renderFacts()}
          </div>
        </div>

        ${renderPortalScene(subdomainNodes)}
      </div>
    </section>
  `;
}
