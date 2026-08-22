/**
 * SYNTAXSHIFT - VELOCITY CLAMP UTILITY
 * Prevents geometry tunneling by clamping maximum velocity per tick
 */
export function clampVelocity(velocity, maxSpeed = 15.0) {
  const vx = Math.sign(velocity.x) * Math.min(Math.abs(velocity.x), maxSpeed);
  const vy = Math.sign(velocity.y) * Math.min(Math.abs(velocity.y), maxSpeed);
  return { x: vx, y: vy };
}
