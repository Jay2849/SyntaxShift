/**
 * SYNTAXSHIFT - ELASTICITY MATH
 */
export function clampRestitution(value, min = 0.0, max = 0.95) {
  return Math.max(min, Math.min(max, value));
}
