/**
 * SYNTAXSHIFT - CHAMBER 01: THE INVERSION TUTORIAL
 * Handcrafted high-clarity level layout with explicit launch & landing pads.
 */
export const Chamber1 = {
  id: 1,
  number: "CHAMBER 01",
  name: "The Inversion Tutorial",
  objective: "Invert gravity upside down (-1G). Spark will fall UPWARDS to the ceiling to bypass the barrier.",
  energyCharges: 3,
  hints: ["Invert gravity upside down", "Make Spark fall to the ceiling"],
  difficulty: "TUTORIAL",
  setup: (world) => {
    // 1. Enclosing canvas boundary
    world.createEnclosingBounds();

    // 2. Spark starting on lower ground launch pad (left)
    world.spawnSpark(120, 440);
    world.spawnBlueBlock(120, 490, 160, 20, true); // Ground launch platform

    // 3. Extraction Goal Portal on ceiling landing pad (right)
    world.spawnPortal(840, 80);
    world.spawnBlueBlock(840, 130, 160, 20, true); // Ceiling landing platform

    // 4. Heavy Red Hazard Barrier Wall blocking lower horizontal path
    world.spawnRedBlock(480, 360, 40, 280, true);
  }
};