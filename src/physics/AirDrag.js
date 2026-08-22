/**
 * SYNTAXSHIFT - AIR DRAG UTILITY
 */
export function calculateAirDrag(velocity, dragCoeff = 0.04) {
  return { x: -velocity.x * dragCoeff, y: -velocity.y * dragCoeff };
}
