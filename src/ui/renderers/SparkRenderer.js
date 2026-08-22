export function renderSparkOrb(ctx, sparkBody) {
  if (!sparkBody) return;
  const { x, y } = sparkBody.position;
  ctx.save();
  ctx.fillStyle = '#00f3ff';
  ctx.beginPath();
  ctx.arc(x, y, sparkBody.circleRadius || 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}
