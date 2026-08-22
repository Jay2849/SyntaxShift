export class ParticleGrid {
  constructor(width, height, count = 60) {
    this.width = width;
    this.height = height;
    this.particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2
    }));
  }
  update(isInverted, gravityVec) {
    this.particles.forEach(p => {
      p.vy = isInverted ? Math.min(p.vy - 0.1, -1.8) : Math.max(p.vy + 0.05, 0.4);
      p.vx += gravityVec.x * 0.1;
      p.x += p.vx; p.y += p.vy;
      if (p.y < 0) p.y = this.height;
      if (p.y > this.height) p.y = 0;
    });
  }
}

ParticleGrid.defaultCount = 60;