/**
 * SYNTAXSHIFT - OSCILLATION MATH
 */
export function calculateLevitationWave(elapsedSec, mass, amplitude = 0.0008, freq = 3) {
  return Math.sin(elapsedSec * freq) * amplitude * mass;
}

export function getSinusoidalPhase(time) { return (time * 1000) % 360; }