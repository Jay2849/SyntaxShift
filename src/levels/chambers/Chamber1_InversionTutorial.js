export const Chamber1 = {
  id: 1,
  number: "CHAMBER 01",
  name: "The Inversion Tutorial",
  objective: "Invert gravity to lift Spark past the barrier into the ceiling portal.",
  energyCharges: 3,
  setup: (world) => {
    world.createEnclosingBounds();
    world.spawnSpark(120, 480);
    world.spawnPortal(840, 70);
    world.spawnRedBlock(480, 420, 40, 240, true);
    world.spawnBlueBlock(840, 110, 140, 20, true);
  }
};
