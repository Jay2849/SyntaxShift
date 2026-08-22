/**
 * SYNTAXSHIFT - FORCE UTILITIES
 */
export function calculateCounterForce(mass, gravityY, gravityX = 0) {
  return { x: -mass * gravityX, y: -mass * gravityY };
}

export function scaleForceByMass(force, mass) { return { x: force.x * mass, y: force.y * mass }; }