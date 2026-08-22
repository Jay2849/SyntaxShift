export const Chamber2 = {
  id: 2,
  number: "CHAMBER 02",
  name: "Selective Mass Separation",
  objective: "Lift ONLY the heavy red hazard blocks into the ceiling laser to free Spark.",
  energyCharges: 3,
  setup: (world) => {
    world.createEnclosingBounds();
    world.spawnSpark(200, 480);
    world.spawnPortal(860, 480);
    world.spawnRedBlock(200, 360, 120, 40, false);
    world.spawnRedBlock(200, 310, 120, 40, false);
    world.spawnRedBlock(480, 360, 40, 300, true);
    world.spawnLaser(480, 40, 960, 20);
  }
};

Chamber2.difficulty = "EASY";
/** Chamber 2 module ready */