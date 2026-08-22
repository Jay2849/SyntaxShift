export class CameraShakeController {
  constructor() { this.intensity = 0; }
  shake(amount = 8) { this.intensity = amount; }
  update(ctx) {
    if (this.intensity > 0) {
      const dx = (Math.random() - 0.5) * this.intensity;
      const dy = (Math.random() - 0.5) * this.intensity;
      ctx.translate(dx, dy);
      this.intensity *= 0.85;
      if (this.intensity < 0.5) this.intensity = 0;
    }
  }
}
