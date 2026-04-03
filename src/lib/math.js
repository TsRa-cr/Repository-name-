export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

export function mixTriplet(current, target, factor) {
  return current.map((value, index) => lerp(value, target[index], factor));
}

export function tripletToCss(triplet) {
  return triplet.map((value) => Math.round(value)).join(", ");
}
