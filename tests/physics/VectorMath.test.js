import { createVector, vectorMagnitude } from '../../src/physics/VectorMath.js';

const v = createVector(3, 4);
if (vectorMagnitude(v) !== 5) throw new Error("Vector magnitude math failed!");
console.log("✓ VectorMath test passed.");
