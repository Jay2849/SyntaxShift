/**
 * SYNTAXSHIFT - VECTOR MATH UTILITY
 * 2D Vector calculations for Anti-Gravity field transformations
 */

export function createVector(x = 0, y = 0) {
  return { x, y };
}

export function vectorMagnitude(v) {
  return Math.sqrt(v.x * v.x + v.y * v.y);
}

export function normalizeVector(v) {
  const mag = vectorMagnitude(v);
  if (mag === 0) return { x: 0, y: 0 };
  return { x: v.x / mag, y: v.y / mag };
}

export function rotateVector(v, angleRad) {
  const cos = Math.cos(angleRad);
  const sin = Math.sin(angleRad);
  return {
    x: v.x * cos - v.y * sin,
    y: v.x * sin + v.y * cos
  };
}

export function scaleVector(v, scale) {
  return { x: v.x * scale, y: v.y * scale };
}

export function addVectors(v1, v2) {
  return { x: v1.x + v2.x, y: v1.y + v2.y };
}

export function vectorDistance(v1, v2) { return Math.hypot(v2.x - v1.x, v2.y - v1.y); }