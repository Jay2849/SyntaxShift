export class ChamberAssists {
  static renderTrajectoryGuide(ctx, sparkX, sparkY, gravityVec) {
    if (!sparkX || !sparkY) return;
    ctx.save();
    ctx.strokeStyle = 'rgba(255, 230, 0, 0.4)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(sparkX, sparkY);
    ctx.lineTo(sparkX + (gravityVec.x || 0.8) * 120, sparkY + (gravityVec.y < 0 ? -180 : 180));
    ctx.stroke();
    ctx.restore();
  }
}
