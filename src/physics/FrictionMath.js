/**
 * SYNTAXSHIFT - FRICTION MATH
 */
export function getSurfaceFriction(isIce = false) {
  return isIce ? 0.001 : 0.3;
}
