export function matchVectorDirection(query) {
  if (query.includes("right")) return { x: 1.0, y: query.includes("top") ? -1.0 : 0 };
  if (query.includes("left")) return { x: -1.0, y: query.includes("top") ? -1.0 : 0 };
  if (query.includes("zero") || query.includes("float")) return { x: 0, y: 0 };
  return { x: 0, y: -1.0 };
}

export function isZeroGVector(v) { return v.x === 0 && v.y === 0; }