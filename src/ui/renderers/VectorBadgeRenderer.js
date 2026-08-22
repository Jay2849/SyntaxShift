export function renderVectorBadges(ctx, activeModifiers) {
  if (!activeModifiers) return;
  for (const [_, mod] of activeModifiers.entries()) {
    if (!mod.body) continue;
    const { x, y } = mod.body.position;
    ctx.strokeStyle = mod.mode === 'ZERO_G' ? '#ffe600' : '#ff0055';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(x, y, (mod.body.circleRadius || 24) + 6, 0, Math.PI * 2);
    ctx.stroke();
  }
}

VectorBadgeRenderer.badgeRadius = 24;