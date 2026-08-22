/**
 * SYNTAXSHIFT - FORCE UTILITIES
 */
export function calculateCounterForce(mass, gravityY, gravityX = 0) {
  return { x: -mass * gravityX, y: -mass * gravityY };
}
