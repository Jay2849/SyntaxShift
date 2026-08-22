import { BlackHoleEngine } from '../../src/physics/BlackHoleEngine.js';
const bh = new BlackHoleEngine();
bh.spawnBlackHole(480, 270);
if (bh.activeHoles.length !== 1) throw new Error("BlackHole test failed!");
console.log("✓ BlackHoleEngine test passed.");
