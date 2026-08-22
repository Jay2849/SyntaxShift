export const Chamber5 = {
  id: 5,
  number: "CHAMBER 05",
  name: "Anti-Gravity Laser Labyrinth",
  objective: "Combine buoyancy, high bounce, and directional vector shifts to navigate laser maze.",
  energyCharges: 4,
  setup: (world) => {
    world.createEnclosingBounds();
    world.spawnSpark(80, 480);
    world.spawnPortal(880, 80);
    world.spawnLaser(240, 340, 20, 360);
    world.spawnLaser(500, 180, 20, 360);
    world.spawnLaser(720, 340, 20, 360);
    world.spawnCrate(360, 450, 50, 50);
    world.spawnCrate(600, 120, 50, 50);
  }
};

Chamber5.difficulty = "EXPERT";