import { CHAMBERS } from '../../src/levels/chambers/index.js';

if (CHAMBERS.length !== 5) throw new Error("Chambers test failed!");
console.log("✓ Chambers test passed.");
