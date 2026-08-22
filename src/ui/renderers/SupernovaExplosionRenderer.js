export class SupernovaExplosionRenderer {
  constructor() { this.sparks = []; }
  trigger(x, y) {
    for (let i = 0; i < 60; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.sparks.push({
        x, y, vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed,
        alpha: 1.0, color: i % 2 === 0 ? '#00f3ff' : '#ff0055', size: Math.random() * 4 + 2
      });
    }
  }
  render(ctx) {
    ctx.save();
    this.sparks.forEach(s => {
      s.x += s.vx; s.y += s.vy; s.alpha -= 0.02;
      if (s.alpha > 0) {
        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
      }
    });
    this.sparks = this.sparks.filter(s => s.alpha > 0);
    ctx.restore();
  }
}
