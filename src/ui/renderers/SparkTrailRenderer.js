export class SparkTrailRenderer {
  constructor() { this.trail = []; }
  update(x, y) {
    if (x && y) this.trail.push({ x, y, alpha: 0.8, radius: 14 });
    this.trail.forEach(t => { t.alpha -= 0.04; t.radius *= 0.95; });
    this.trail = this.trail.filter(t => t.alpha > 0.05);
  }
  render(ctx) {
    ctx.save();
    this.trail.forEach(t => {
      ctx.fillStyle = `rgba(0, 243, 255, ${t.alpha})`;
      ctx.beginPath(); ctx.arc(t.x, t.y, t.radius, 0, Math.PI * 2); ctx.fill();
    });
    ctx.restore();
  }
}
