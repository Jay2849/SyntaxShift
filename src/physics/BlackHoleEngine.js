export class BlackHoleEngine {
  constructor() { this.activeHoles = []; }
  spawnBlackHole(x, y, strength = 0.005) { this.activeHoles.push({ x, y, strength, radius: 40, createdAt: Date.now() }); }
  applyGravitationalPull(bodies) {
    this.activeHoles.forEach(hole => {
      bodies.forEach(b => {
        if (b.isStatic) return;
        const dx = hole.x - b.position.x;
        const dy = hole.y - b.position.y;
        const dist = Math.hypot(dx, dy);
        if (dist > 10 && dist < 400) {
          const force = (hole.strength * b.mass) / (dist * 0.5);
          b.force.x += (dx / dist) * force;
          b.force.y += (dy / dist) * force;
        }
      });
    });
  }
}
