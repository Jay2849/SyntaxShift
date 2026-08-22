export function drawMaterialGlow(ctx, x, y, width, height, color = '#ff0055') {
  ctx.save();
  ctx.shadowColor = color;
  ctx.shadowBlur = 18;
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.strokeRect(x - width / 2, y - height / 2, width, height);
  ctx.restore();
}
