/**
 * SYNTAXSHIFT - AIR DRAG UTILITY
 */
export function calculateAirDrag(velocity, dragCoeff = 0.04) {
  return { x: -velocity.x * dragCoeff, y: -velocity.y * dragCoeff };
}

export function applyTerminalVelocityDrag(speed) { return Math.min(speed, 15.0); }
/** AirDrag unit version 1.0 */