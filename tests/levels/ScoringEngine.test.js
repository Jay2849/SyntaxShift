import { ScoringEngine } from '../../src/levels/ScoringEngine.js';
if (ScoringEngine.calculateRank(2.0, 1) !== 'S-RANK') throw new Error("Scoring test failed!");
console.log("✓ ScoringEngine test passed.");
