/**
 * SYNTAXSHIFT - 5 DEDICATED ANTIGRAVITY PUZZLE CHAMBERS SPECIFICATION
 */
export const CHAMBER_CONFIGS = [
  {
    id: 1,
    number: "CHAMBER 01",
    name: "The Inversion Tutorial",
    objective: "Invert gravity to lift Spark past the barrier into the ceiling portal.",
    energyCharges: 3,
    hints: ["Invert gravity upside down", "Make Spark fall upwards"],
    setup: (physicsWorld) => {
      // 1. Enclosing canvas boundary
      physicsWorld.createEnclosingBounds();

      // 2. Spark starting on lower left ground
      physicsWorld.spawnSpark(120, 480);

      // 3. Extraction Goal Portal on ceiling right
      physicsWorld.spawnPortal(840, 70);

      // 4. Ground Barrier Wall blocking horizontal movement to portal
      physicsWorld.spawnRedBlock(480, 420, 40, 240, true);

      // 5. Decorative ceiling platform near portal
      physicsWorld.spawnBlueBlock(840, 110, 140, 20, true);
    }
  },
  {
    id: 2,
    number: "CHAMBER 02",
    name: "Selective Mass Separation",
    objective: "Lift ONLY the heavy red hazard blocks into the ceiling laser to free Spark.",
    energyCharges: 3,
    hints: ["Lift red blocks upward", "Zero gravity for red obstacles only"],
    setup: (physicsWorld) => {
      physicsWorld.createEnclosingBounds();

      // 1. Spark trapped on bottom floor center
      physicsWorld.spawnSpark(200, 480);

      // 2. Extraction Goal Portal on far right floor
      physicsWorld.spawnPortal(860, 480);

      // 3. Heavy Red Hazard Blocks trapping Spark vertically
      physicsWorld.spawnRedBlock(200, 360, 120, 40, false); // Dynamic heavy block above Spark
      physicsWorld.spawnRedBlock(200, 310, 120, 40, false);
      physicsWorld.spawnRedBlock(480, 360, 40, 300, true); // Wall divider

      // 4. Lethal Ceiling Laser Grid
      physicsWorld.spawnLaser(480, 40, 960, 20);
    }
  },
  {
    id: 3,
    number: "CHAMBER 03",
    name: "The Gravitational Chasm",
    objective: "Use neutral buoyancy (Zero-G) with rightward drift to glide across the spike pit.",
    energyCharges: 3,
    hints: ["Zero gravity float with slight right drift", "Top-right push mode"],
    setup: (physicsWorld) => {
      physicsWorld.createEnclosingBounds();

      // 1. Spark starts on left ledge
      physicsWorld.spawnSpark(80, 250);
      physicsWorld.spawnBlueBlock(80, 320, 120, 20, true);

      // 2. Portal on right ledge
      physicsWorld.spawnPortal(880, 250);
      physicsWorld.spawnBlueBlock(880, 320, 120, 20, true);

      // 3. Wide lethal spike pit at bottom
      physicsWorld.spawnSpikePit(480, 520, 700, 40);

      // 4. Ceiling proximity lasers
      physicsWorld.spawnLaser(480, 30, 700, 20);

      // 5. Floating obstacle crate in center
      physicsWorld.spawnCrate(480, 250, 40, 40);
    }
  },
  {
    id: 4,
    number: "CHAMBER 04",
    name: "The Kinetic Pendulum Inversion",
    objective: "Build downward momentum on the ramp, then flip gravity at the apex to reach upper ledge.",
    energyCharges: 3,
    hints: ["Invert gravity when Spark reaches the ramp tip"],
    setup: (physicsWorld) => {
      physicsWorld.createEnclosingBounds();

      // 1. Spark starting on left ramp top
      physicsWorld.spawnSpark(120, 150);
      physicsWorld.spawnBlueBlock(120, 200, 160, 20, true);

      // 2. Curved U-ramp / half-pipe simulated with angled blocks
      physicsWorld.spawnBlueBlock(300, 350, 180, 20, true);
      physicsWorld.spawnBlueBlock(450, 450, 180, 20, true);

      // 3. High isolated ledge with portal
      physicsWorld.spawnPortal(840, 100);
      physicsWorld.spawnBlueBlock(840, 150, 160, 20, true);

      // 4. Hazards below ramp chasm
      physicsWorld.spawnSpikePit(500, 520, 600, 30);
    }
  },
  {
    id: 5,
    number: "CHAMBER 05",
    name: "Anti-Gravity Laser Labyrinth",
    objective: "Combine buoyancy, high bounce, and directional vector shifts to navigate laser maze.",
    energyCharges: 4,
    hints: ["Make Spark super bouncy with zero friction", "Pull left with zero gravity"],
    setup: (physicsWorld) => {
      physicsWorld.createEnclosingBounds();

      // 1. Spark at bottom left
      physicsWorld.spawnSpark(80, 480);

      // 2. Extraction Goal Portal at top right
      physicsWorld.spawnPortal(880, 80);

      // 3. Laser labyrinth walls
      physicsWorld.spawnLaser(240, 340, 20, 360);
      physicsWorld.spawnLaser(500, 180, 20, 360);
      physicsWorld.spawnLaser(720, 340, 20, 360);

      // 4. Moving dynamic crate obstacles
      physicsWorld.spawnCrate(360, 450, 50, 50);
      physicsWorld.spawnCrate(600, 120, 50, 50);
    }
  }
];
