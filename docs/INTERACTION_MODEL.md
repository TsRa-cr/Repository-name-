# INTERACTION MODEL

## Philosophy

TSRAONE Gateway treats the user as a force acting on a living environment.

The cursor or touch point is not just a selector. It behaves as:

- a soft light source
- a focus controller
- a gravity center
- a local field that influences nearby material

The goal is to create a believable chain of response across the entire scene.

## Core Principles

### 1. Global Coherence

Every interactive behavior should feel like it belongs to the same physical world.

Pointer movement, hover, click, and scroll must all operate under the same logic of:

- depth
- inertia
- focus
- light
- material response

### 2. Restraint

Luxury interaction is controlled, not loud.

Movements should be small, deliberate, and spring-smoothed. The experience should never feel twitchy or gimmicky.

### 3. Environmental Response

Interaction should alter more than the hovered object.

When the user engages a target, the surrounding world may also shift through:

- subtle brightness change
- nearby particle motion
- color-field bias
- relative de-emphasis of neighboring elements

## Interaction Layers

### Cursor Light

The pointer influences:

- moving highlights
- specular edge response
- local bloom
- emphasis on nearby glass

### Parallax

Depth layers should react differently:

- foreground responds fastest
- middle layers respond moderately
- background reacts more slowly

This creates the impression of real space rather than flat transform motion.

### Magnetic Hover

Interactive elements should gently move toward the user:

- typically within 1–4px
- strength varies with depth
- never exaggerated

### Hover Focus

Hover should trigger a local focus event rather than a simple CSS state.

Expected response:

- slight lift
- slight scale increase
- stronger edge clarity
- brighter material response
- subtle environmental adjustment

### Staged Click

Navigation should be sequenced, not instant.

Ideal flow:

1. press / compression
2. energy focus or convergence
3. portal transition / camera move
4. route change

### Scroll As Space Movement

Scroll should not feel like dragging a long document.

It should produce:

- inertial movement
- subtle lighting shift
- mild scene rotation or depth drift
- spatial reveal progression

## Mobile Considerations

Touch interactions should not imitate desktop hover.

Mobile should emphasize:

- premium press depth
- calm tap response
- inertial continuity
- optional longer-press energy feel on key portal elements

## Success Criteria

The interaction model succeeds when users feel that:

- the environment is alive
- the glass reacts to them
- motion is premium and believable
- the page feels engineered rather than decorated
- the domain map from `tsraone.com` to `test2`, `test`, `aitrader`, `connect`, and `note` feels unified inside one spatial system
