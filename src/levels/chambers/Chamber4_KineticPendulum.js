export const Chamber4 = {
  id: 4,
  number: "CHAMBER 04",
  name: "The Kinetic Pendulum Inversion",
  objective: "Build downward momentum on the ramp, then flip gravity at the apex to reach upper ledge.",
  energyCharges: 3,
  setup: (world) => {
    world.createEnclosingBounds();
    world.spawnSpark(120, 150);
    world.spawnBlueBlock(120, 200, 160, 20, true);
    world.spawnBlueBlock(300, 350, 180, 20, true);
    world.spawnBlueBlock(450, 450, 180, 20, true);
    world.spawnPortal(840, 100);
    world.spawnBlueBlock(840, 150, 160, 20, true);
    world.spawnSpikePit(500, 520, 600, 30);
  }
};

Chamber4.difficulty = "HARD";
/** Chamber 4 module ready */