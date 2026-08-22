export function matchTargetEntity(query) {
  if (query.includes("red") || query.includes("hazard")) return "RED_BLOCKS";
  if (query.includes("blue") || query.includes("platform")) return "BLUE_BLOCKS";
  if (query.includes("crate") || query.includes("box")) return "CRATES";
  if (query.includes("spark") || query.includes("me") || query.includes("player")) return "SPARK";
  return "GLOBAL";
}
