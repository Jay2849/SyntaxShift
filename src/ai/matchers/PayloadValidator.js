export function validateJsonPayload(payload) {
  return Boolean(payload && payload.commandType === "PHYSICS_MUTATION" && payload.antigravity);
}
