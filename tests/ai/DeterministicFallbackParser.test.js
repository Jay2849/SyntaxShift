import { deterministicFallbackParser } from '../../src/ai/DeterministicFallbackParser.js';

const res = deterministicFallbackParser("Invert gravity for red blocks");
if (res.target !== "RED_BLOCKS" || res.antigravity.mode !== "INVERT") throw new Error("Fallback parser test failed!");
console.log("✓ DeterministicFallbackParser test passed.");
