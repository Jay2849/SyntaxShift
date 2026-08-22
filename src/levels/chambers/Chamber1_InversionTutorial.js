/**
 * SYNTAXSHIFT - CHAMBER 01: THE INVERSION TUTORIAL
 * High-clarity, instant-response level layout with ceiling goal portal alignment.
 */
export const Chamber1 = {
  id: 1,
  number: "CHAMBER 01",
  name: "The Inversion Tutorial",
  objective: "Invert gravity upside down (-1G). Spark will pop off the floor and slide along the ceiling into the Goal Portal.",
  energyCharges: 3,
  hints: ["Invert gravity upside down", "Make Spark fall to the ceiling"],
  difficulty: "TUTORIAL",
  setup: (world) => {
    // 1. Enclosing canvas boundary
    world.createEnclosingBounds();

    // 2. Spark starting on lower ground launch pad (left)
    world.spawnSpark(120, 430);
    world.spawnBlueBlock(120, 480, 160, 20, true); // Ground launch platform

    // 3. Extraction Goal Portal on ceiling (right)
    world.spawnPortal(840, 50, 32);
    world.spawnBlueBlock(840, 95, 200, 16, true); // Ceiling landing guide

    // 4. Heavy Red Hazard Barrier Wall blocking lower horizontal path
    world.spawnRedBlock(480, 360, 40, 260, true);
  }
};