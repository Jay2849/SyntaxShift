export function renderAudioEqualizer(ctx, x, y, isAudioActive) {
  ctx.save();
  ctx.fillStyle = '#00f3ff';
  for (let i = 0; i < 5; i++) {
    const h = isAudioActive ? Math.random() * 14 + 4 : 4;
    ctx.fillRect(x + i * 5, y - h, 3, h);
  }
  ctx.restore();
}
