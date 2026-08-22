export class GravityGunBeam {
  static applyMouseAttraction(spark, mouseX, mouseY, pullStrength = 0.003) {
    if (!spark || !mouseX || !mouseY) return;
    const dx = mouseX - spark.position.x;
    const dy = mouseY - spark.position.y;
    const dist = Math.hypot(dx, dy);
    if (dist > 5) {
      spark.force.x += (dx / dist) * pullStrength * spark.mass;
      spark.force.y += (dy / dist) * pullStrength * spark.mass;
    }
  }
}
