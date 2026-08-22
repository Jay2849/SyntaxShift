export function renderPortalVortex(ctx, portalBody, angle) {
  if (!portalBody) return;
  const { x, y } = portalBody.position;
  ctx.save();
  ctx.translate(x, y);
  ctx.strokeStyle = '#00f3ff';
  ctx.beginPath();
  ctx.arc(0, 0, 34, angle, angle + Math.PI * 1.3);
  ctx.stroke();
  ctx.restore();
}

PortalVortexRenderer.vortexSpeed = 0.03;