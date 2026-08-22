export function validateJsonPayload(payload) {
  return Boolean(payload && payload.commandType === "PHYSICS_MUTATION" && payload.antigravity);
}

export function isValidTarget(target) { return ["GLOBAL", "SPARK", "RED_BLOCKS", "BLUE_BLOCKS", "CRATES"].includes(target); }