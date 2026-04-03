export const defaultAtmosphere = {
  primary: [183, 220, 255],
  secondary: [226, 221, 255],
  cyan: [211, 248, 255],
  warm: [255, 233, 210],
};

export const subdomainNodes = [
  {
    id: "test2",
    name: "TEST2",
    domain: "test2.tsraone.com",
    href: "https://test2.tsraone.com",
    eyebrow: "Preview Layer",
    title: "A brighter second-stage preview surface for portal experiments",
    description:
      "Used as a controlled proving ground for visual and interaction refinements before broader rollout across the TSRAONE domain system.",
    phase: "Secondary preview environment",
    stats: ["Prototype release lane", "Visual validation"],
    orbit: { x: 19, y: 28 },
    depth: 1.08,
    magneticStrength: 0.052,
    accent: {
      primary: [177, 221, 255],
      secondary: [223, 221, 255],
      cyan: [208, 247, 255],
      warm: [255, 232, 213],
    },
  },
  {
    id: "test",
    name: "TEST",
    domain: "test.tsraone.com",
    href: "https://test.tsraone.com",
    eyebrow: "Launch Layer",
    title: "The main public staging portal for active front-end iteration",
    description:
      "A clean release checkpoint for showcasing new gateway builds, interaction studies, and production-minded presentation changes.",
    phase: "Primary public preview surface",
    stats: ["Active staging", "Gateway rollout"],
    orbit: { x: 79, y: 34 },
    depth: 1.18,
    magneticStrength: 0.055,
    accent: {
      primary: [174, 218, 255],
      secondary: [218, 223, 255],
      cyan: [204, 246, 255],
      warm: [255, 231, 209],
    },
  },
  {
    id: "aitrader",
    name: "AITRADER",
    domain: "aitrader.tsraone.com",
    href: "https://aitrader.tsraone.com",
    eyebrow: "Trading Layer",
    title: "Explainable trading and market intelligence in one visible surface",
    description:
      "A more operational node focused on auditability, decision visibility, and calm presentation of automated market workflows.",
    phase: "Market intelligence and execution",
    stats: ["Explainable decisions", "Audit-safe state"],
    orbit: { x: 51, y: 12 },
    depth: 0.92,
    magneticStrength: 0.046,
    accent: {
      primary: [184, 222, 255],
      secondary: [230, 219, 255],
      cyan: [205, 243, 255],
      warm: [255, 234, 218],
    },
  },
  {
    id: "connect",
    name: "CONNECT",
    domain: "connect.tsraone.com",
    href: "https://connect.tsraone.com",
    eyebrow: "Bridge Layer",
    title: "Shared connections, integration bridges, and routed utility flows",
    description:
      "A connective node for linking systems, handoff points, and cross-surface movement without losing clarity or polish.",
    phase: "Linked system pathways",
    stats: ["Integration bridge", "Cross-domain routing"],
    orbit: { x: 22, y: 69 },
    depth: 0.97,
    magneticStrength: 0.048,
    accent: {
      primary: [186, 236, 255],
      secondary: [222, 221, 255],
      cyan: [202, 252, 255],
      warm: [255, 239, 225],
    },
  },
  {
    id: "note",
    name: "NOTE",
    domain: "note.tsraone.com",
    href: "https://note.tsraone.com",
    eyebrow: "Memory Layer",
    title: "Writing, capture, and preserved context held in a calmer room",
    description:
      "A quieter knowledge surface for notes, references, and accumulated working context inside the broader TSRAONE environment.",
    phase: "Knowledge continuity surface",
    stats: ["Writing space", "Stored context"],
    orbit: { x: 63, y: 72 },
    depth: 1.02,
    magneticStrength: 0.05,
    accent: {
      primary: [188, 228, 255],
      secondary: [224, 214, 255],
      cyan: [214, 250, 255],
      warm: [255, 236, 221],
    },
  },
  {
    id: "tsraone-root",
    name: "TSRAONE",
    domain: "tsraone.com",
    href: "https://tsraone.com",
    eyebrow: "Root Domain",
    title: "The central address and luminous front door for the whole system",
    description:
      "The architectural anchor that frames the brand, holds the portal identity, and routes visitors into the active TSRAONE subdomain network.",
    phase: "Primary root-domain entry",
    stats: ["Root identity", "System gateway"],
    orbit: { x: 88, y: 58 },
    depth: 0.88,
    magneticStrength: 0.045,
    accent: {
      primary: [185, 216, 255],
      secondary: [223, 218, 255],
      cyan: [209, 246, 255],
      warm: [255, 231, 211],
    },
  },
];

export const experienceNotes = [
  {
    eyebrow: "Sunlight",
    title: "Directional daylight establishes hierarchy before motion begins.",
    body:
      "Light enters from one architectural side, blooms through atmosphere, and gives the whole scene a believable luminous gradient.",
  },
  {
    eyebrow: "Material",
    title: "Glass feels thin, engineered, reflective, and alive.",
    body:
      "Surfaces carry edge highlights, controlled blur, internal gradients, and specular response instead of generic gray blur panels.",
  },
  {
    eyebrow: "Motion",
    title: "Interaction behaves like a spatial field, not a stack of effects.",
    body:
      "Parallax, hover, scroll, and click all share one premium grammar built around light, depth, focus, and restraint.",
  },
];

export const gatewayFacts = [
  { label: "Build", value: "Gateway v2 Final" },
  { label: "Mode", value: "Sunlit Root Portal" },
  { label: "Nodes", value: "5 Subdomains + Root" },
];
