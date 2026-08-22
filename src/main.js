import Matter from 'matter-js';
import { PhysicsWorld } from './physics/PhysicsWorld.js';
import { GeminiCompiler } from './ai/GeminiCompiler.js';
import { LevelManager } from './levels/LevelManager.js';
import { SoundEngine } from './audio/SoundEngine.js';
import { VisualJuice } from './ui/VisualJuice.js';
import { TerminalUI } from './ui/TerminalUI.js';

/**
 * SYNTAXSHIFT MAIN APPLICATION ENTRY POINT
 */
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('physics-canvas');
  if (!canvas) return;

  // Fixed 16:9 internal physics simulation resolution (960x540)
  const width = 960;
  const height = 540;

  // 1. Initialize Subsystems
  const physicsWorld = new PhysicsWorld(canvas, width, height);
  const geminiCompiler = new GeminiCompiler();
  const levelManager = new LevelManager(physicsWorld);
  const soundEngine = new SoundEngine();
  const visualJuice = new VisualJuice(physicsWorld.ctx, width, height);

  // 2. Initialize UI Controller
  const ui = new TerminalUI({
    geminiCompiler,
    levelManager,
    soundEngine,
    visualJuice,
    onExecutePrompt: (payload) => {
      // Execute JSON physics payload directly on AntiGravityEngine
      const result = physicsWorld.antiGravityEngine.executeAiPayload(payload, physicsWorld.entities);
      ui.updateHUD(levelManager.getHUDState());

      // Show large center stage banner notification
      if (payload.hudMessage) {
        visualJuice.showBannerNotification(payload.hudMessage, "info", 2500);
      }
    }
  });

  // 3. Level Manager Callbacks
  levelManager.onStateChange = (hudState) => {
    ui.updateHUD(hudState);
  };

  levelManager.onWin = (chamber) => {
    ui.triggerWinEffect();
    visualJuice.showBannerNotification(`🎉 EXTRACTION PORTAL REACHED! CHAMBER CLEAR!`, "success", 3000);
    ui.setMessage(`🎉 Extraction Portal Reached! Chamber ${chamber.number} Cleared!`, "success");
    setTimeout(() => {
      levelManager.nextChamber();
    }, 2400);
  };

  levelManager.onDeath = (hazardType) => {
    soundEngine.playDeathBuzz();
    visualJuice.showBannerNotification(`💥 SPARK DESTROYED BY ${hazardType.toUpperCase()}!`, "danger", 2000);
    ui.setMessage(`💥 Spark was destroyed by ${hazardType}! Rebuilding chamber...`, "danger");
    setTimeout(() => {
      levelManager.resetCurrentChamber();
    }, 1200);
  };

  // 4. Load initial chamber
  levelManager.loadChamber(0);

  // 5. Unstoppable Main Game Animation Loop (60 FPS)
  function renderLoop() {
    // Schedule next frame FIRST to guarantee loop never freezes
    requestAnimationFrame(renderLoop);

    try {
      // Step Matter.js physics engine with fixed 60 FPS delta
      physicsWorld.update(16.666);

      const isInv = physicsWorld.antiGravityEngine.isGlobalInverted;
      const gVec = physicsWorld.antiGravityEngine.currentGravityVector;

      // 1. Draw High-Clarity Stage Background & Vector Grid
      visualJuice.drawStageBackground(isInv, gVec);

      // 2. Draw Rigid Bodies (Barrier Walls, Blue Platforms, Crates)
      const bodies = Matter.Composite.allBodies(physicsWorld.world);
      visualJuice.drawBodies(bodies);

      // 3. Draw Hazard Lasers & Spikes
      visualJuice.drawHazards(physicsWorld.entities.lasers, physicsWorld.entities.spikes);

      // 4. Draw Goal Portal Vortex with Target Label
      visualJuice.drawPortal(physicsWorld.entities.portal);

      // 5. Draw Spark Protagonist with Velocity Vector
      visualJuice.drawSpark(physicsWorld.entities.spark);

      // 6. Draw Selective Anti-Gravity Force Vector Badges
      visualJuice.drawEntityVectorBadges(physicsWorld.antiGravityEngine.activeEntityModifiers);

      // 7. Draw Large Stage Banner Notification
      visualJuice.drawBannerNotification();

    } catch (err) {
      console.error("Render loop frame error:", err);
    }
  }

  // Start continuous loop
  requestAnimationFrame(renderLoop);
});
