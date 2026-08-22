/**
 * SYNTAXSHIFT - FRICTION MATH
 */
export function getSurfaceFriction(isIce = false) {
  return isIce ? 0.001 : 0.3;
}

export function isIceSurface(friction) { return friction < 0.01; }
/** FrictionMath unit version 1.0 */