export class GravityCompassWidget {
  static renderCompass(ctx, x, y, vector) {
    ctx.save();
    ctx.strokeStyle = '#00f3ff';
    ctx.beginPath(); ctx.arc(x, y, 16, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + vector.x * 12, y + vector.y * 12); ctx.stroke();
    ctx.restore();
  }
}
