export function matchAntigravityMode(query) {
  if (query.includes("zero") || query.includes("float") || query.includes("moon")) return "ZERO_G";
  if (query.includes("up") || query.includes("invert") || query.includes("ceiling")) return "INVERT";
  if (query.includes("wave") || query.includes("oscillate")) return "OSCILLATE";
  if (query.includes("right") || query.includes("left")) return "LOCAL_FIELD";
  return "INVERT";
}
