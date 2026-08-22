export function renderHazards(ctx, lasers, spikes) {
  lasers.forEach(laser => {
    const b = laser.bounds;
    ctx.fillStyle = '#ff0055';
    ctx.fillRect(b.min.x, b.min.y, b.max.x - b.min.x, b.max.y - b.min.y);
  });
}

HazardRenderer.laserColor = "#ff0055";