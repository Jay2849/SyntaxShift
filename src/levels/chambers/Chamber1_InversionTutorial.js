/**
 * SYNTAXSHIFT - CHAMBER 01: THE INVERSION TUTORIAL
 * Perfectly scaled coordinates for 960x540 internal canvas.
 */
export const Chamber1 = {
  id: 1,
  number: "CHAMBER 01",
  name: "The Inversion Tutorial",
  objective: "Invert gravity upside down (-1G). Spark will pop off the ground pad and slide along the ceiling into the Goal Portal.",
  energyCharges: 3,
  hints: ["Invert gravity upside down", "Make Spark fall to the ceiling"],
  difficulty: "TUTORIAL",
  setup: (world) => {
    // 1. Enclosing canvas boundary (960x540)
    world.createEnclosingBounds();

    // 2. Spark starting cleanly on top of ground launch pad (left)
    world.spawnSpark(140, 410);
    world.spawnBlueBlock(140, 460, 180, 20, true); // Ground launch platform

    // 3. Extraction Goal Portal on ceiling landing pad (right)
    world.spawnPortal(820, 50, 32);
    world.spawnBlueBlock(820, 100, 200, 20, true); // Ceiling landing guide

    // 4. Heavy Red Hazard Barrier Wall blocking lower horizontal path
    world.spawnRedBlock(480, 340, 40, 240, true);
  }
};