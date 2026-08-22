export function renderTargetReticle(ctx, sparkX, sparkY) {
  if (!sparkX || !sparkY) return;
  ctx.save();
  ctx.strokeStyle = 'rgba(255, 0, 85, 0.6)';
  ctx.lineWidth = 1.5;
  ctx.setLineDash([4, 2]);
  ctx.beginPath(); ctx.arc(sparkX, sparkY, 28, 0, Math.PI * 2); ctx.stroke();
  ctx.restore();
}
