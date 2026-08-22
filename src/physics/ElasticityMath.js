/**
 * SYNTAXSHIFT - ELASTICITY MATH
 */
export function clampRestitution(value, min = 0.0, max = 0.95) {
  return Math.max(min, Math.min(max, value));
}

export function isSuperBouncy(restitution) { return restitution > 0.85; }
/** ElasticityMath unit version 1.0 */