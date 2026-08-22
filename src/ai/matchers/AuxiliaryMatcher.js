export function matchAuxiliaryModifiers(query) {
  return {
    restitution: query.includes("bouncy") || query.includes("bounce") ? 0.92 : null,
    friction: query.includes("ice") || query.includes("slippery") ? 0.001 : null,
    massMultiplier: query.includes("heavy") ? 3.0 : query.includes("light") ? 0.3 : null
  };
}

export function hasAuxiliaryModifiers(aux) { return Boolean(aux && (aux.friction !== null || aux.restitution !== null)); }