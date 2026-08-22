export function renderBlackHoles(ctx, blackHoles) {
  if (!blackHoles) return;
  blackHoles.forEach(hole => {
    ctx.save();
    ctx.shadowColor = '#b537f2';
    ctx.shadowBlur = 30;
    ctx.fillStyle = '#10002b';
    ctx.strokeStyle = '#b537f2';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius || 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });
}
