import { CameraShakeController } from '../../src/ui/CameraShakeController.js';
const cs = new CameraShakeController(); cs.shake(10);
if (cs.intensity !== 10) throw new Error("CameraShake test failed!");
console.log("✓ CameraShakeController test passed.");
