export function renderGravityBeam(ctx, sparkX, sparkY, mouseX, mouseY, isActive) {
  if (!isActive) return;
  ctx.save();
  ctx.shadowColor = '#00f3ff';
  ctx.shadowBlur = 20;
  ctx.strokeStyle = '#00f3ff';
  ctx.lineWidth = 3;
  ctx.setLineDash([8, 4]);
  ctx.beginPath();
  ctx.moveTo(sparkX, sparkY);
  ctx.lineTo(mouseX, mouseY);
  ctx.stroke();
  ctx.restore();
}
