export const Chamber3 = {
  id: 3,
  number: "CHAMBER 03",
  name: "The Gravitational Chasm",
  objective: "Use neutral buoyancy (Zero-G) with rightward drift to glide across the spike pit.",
  energyCharges: 3,
  setup: (world) => {
    world.createEnclosingBounds();
    world.spawnSpark(80, 250);
    world.spawnBlueBlock(80, 320, 120, 20, true);
    world.spawnPortal(880, 250);
    world.spawnBlueBlock(880, 320, 120, 20, true);
    world.spawnSpikePit(480, 520, 700, 40);
    world.spawnLaser(480, 30, 700, 20);
    world.spawnCrate(480, 250, 40, 40);
  }
};

Chamber3.difficulty = "MEDIUM";