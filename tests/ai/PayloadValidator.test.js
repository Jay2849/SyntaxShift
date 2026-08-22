import { validateJsonPayload } from '../../src/ai/matchers/PayloadValidator.js';

if (!validateJsonPayload({ commandType: "PHYSICS_MUTATION", antigravity: {} })) throw new Error("Validator test failed!");
console.log("✓ PayloadValidator test passed.");
