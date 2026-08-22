export class GravityOscillator {
  static computeWave(time, mass) {
    return Math.sin(time * 3) * 0.0008 * mass;
  }
}
