/**
 * SYNTAXSHIFT - MASS UTILITIES
 */
export function calculateBuoyantMass(bodyMass, gravityScale = 0.001) {
  return bodyMass * gravityScale * 1000;
}

export function getDensityMultiplier(isHeavy) { return isHeavy ? 0.005 : 0.001; }