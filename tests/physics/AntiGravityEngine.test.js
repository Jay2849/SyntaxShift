import { clampVelocity } from '../../src/physics/VelocityClamp.js';

const clamped = clampVelocity({ x: 25, y: -30 }, 15);
if (clamped.x !== 15 || clamped.y !== -15) throw new Error("Velocity clamping test failed!");
console.log("✓ VelocityClamp test passed.");
