/**
 * SYNTAXSHIFT - MASS UTILITIES
 */
export function calculateBuoyantMass(bodyMass, gravityScale = 0.001) {
  return bodyMass * gravityScale * 1000;
}
