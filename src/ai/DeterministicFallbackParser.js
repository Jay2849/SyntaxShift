/**
 * SYNTAXSHIFT - DETERMINISTIC FALLBACK PARSER (Zero-API / Low-Latency Engine)
 * Offline natural language keyword matrix parser that guarantees 100% playability 
 * with sub-10ms latency when Gemini API key is unavailable or network times out.
 */
export function deterministicFallbackParser(rawInput) {
  if (!rawInput || typeof rawInput !== 'string') return null;

  const query = rawInput.toLowerCase().trim();
  if (query.length === 0) return null;

  // Determine Target Entity
  let target = "GLOBAL";
  if (query.includes("red") || query.includes("red block") || query.includes("hazard") || query.includes("barrier")) {
    target = "RED_BLOCKS";
  } else if (query.includes("blue") || query.includes("blue block") || query.includes("platform")) {
    target = "BLUE_BLOCKS";
  } else if (query.includes("crate") || query.includes("box") || query.includes("crates") || query.includes("boxes")) {
    target = "CRATES";
  } else if (query.includes("spark") || query.includes("orb") || query.includes("me") || query.includes("player") || query.includes("self")) {
    target = "SPARK";
  }

  // Determine Antigravity Mode & Vector
  let mode = "INVERT";
  let vector = { x: 0, y: -1.0 };
  let enabled = true;
  let multiplier = 1.0;
  let durationSeconds = 5.0;
  let hudMessage = "Gravity mutated successfully.";

  // Zero-G / Floating Modes
  if (query.includes("zero") || query.includes("float") || query.includes("moon") || query.includes("space") || query.includes("weightless") || query.includes("neutral")) {
    mode = "ZERO_G";
    vector = { x: 0, y: 0 };
    hudMessage = `Zero-gravity float mode activated on ${target}.`;
  }
  // Upward Inversion / Anti-Gravity
  else if (query.includes("up") || query.includes("invert") || query.includes("ceiling") || query.includes("anti") || query.includes("reverse") || query.includes("upside")) {
    mode = "INVERT";
    vector = { x: 0, y: -1.0 };
    hudMessage = `Gravity inverted upward (-1G) on ${target}.`;
  }
  // Directional Vector Pushes
  else if (query.includes("right") || query.includes("top-right") || query.includes("top right") || query.includes("east")) {
    mode = "LOCAL_FIELD";
    if (query.includes("top") || query.includes("up")) {
      vector = { x: 1.0, y: -1.0 };
      hudMessage = `Top-right gravitational field applied to ${target}.`;
    } else {
      vector = { x: 1.5, y: 0 };
      hudMessage = `Rightward vector field push applied to ${target}.`;
    }
  }
  else if (query.includes("left") || query.includes("top-left") || query.includes("top left") || query.includes("west")) {
    mode = "LOCAL_FIELD";
    if (query.includes("top") || query.includes("up")) {
      vector = { x: -1.0, y: -1.0 };
      hudMessage = `Top-left gravitational field applied to ${target}.`;
    } else {
      vector = { x: -1.5, y: 0 };
      hudMessage = `Leftward vector field push applied to ${target}.`;
    }
  }
  else if (query.includes("down") || query.includes("floor") || query.includes("heavy") || query.includes("normal") || query.includes("restore")) {
    mode = "INVERT";
    vector = { x: 0, y: 1.0 };
    hudMessage = `Normal 1G downward gravity restored on ${target}.`;
  }
  else if (query.includes("wave") || query.includes("oscillate") || query.includes("bob")) {
    mode = "OSCILLATE";
    vector = { x: 0, y: -0.5 };
    hudMessage = `Sinusoidal levitation wave active on ${target}.`;
  }

  // Determine Auxiliary Properties (Bounce / Friction / Mass)
  let restitution = null;
  let friction = null;
  let massMultiplier = null;

  if (query.includes("bouncy") || query.includes("bounce") || query.includes("elastic") || query.includes("rubber")) {
    restitution = 0.92;
    hudMessage += " High elasticity enabled.";
  }
  if (query.includes("ice") || query.includes("slippery") || query.includes("slick") || query.includes("zero friction")) {
    friction = 0.001;
    hudMessage += " Near-zero surface friction applied.";
  }
  if (query.includes("heavy") || query.includes("dense")) {
    massMultiplier = 3.0;
  } else if (query.includes("light") || query.includes("feather")) {
    massMultiplier = 0.3;
  }

  return {
    commandType: "PHYSICS_MUTATION",
    target: target,
    antigravity: {
      enabled: enabled,
      mode: mode,
      vector: vector,
      multiplier: multiplier,
      durationSeconds: durationSeconds,
      damping: 0.05
    },
    auxiliaryModifiers: {
      friction: friction,
      restitution: restitution,
      massMultiplier: massMultiplier
    },
    hudMessage: hudMessage,
    isFallback: true
  };
}
