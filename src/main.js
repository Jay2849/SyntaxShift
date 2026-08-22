import Matter from 'matter-js';
import { PhysicsWorld } from './physics/PhysicsWorld.js';
import { GeminiCompiler } from './ai/GeminiCompiler.js';
import { LevelManager } from './levels/LevelManager.js';
import { SoundEngine } from './audio/SoundEngine.js';
import { VisualJuice } from './ui/VisualJuice.js';
import { TerminalUI } from './ui/TerminalUI.js';

// Import Tadakta-Bhadakta Modules
import { SparkTrailRenderer } from './ui/renderers/SparkTrailRenderer.js';
import { SupernovaExplosionRenderer } from './ui/renderers/SupernovaExplosionRenderer.js';
import { MatrixStreamRenderer } from './ui/renderers/MatrixStreamRenderer.js';
import { MouseInputHandler } from './ui/components/MouseInputHandler.js';
import { GravityGunBeam } from './physics/GravityGunBeam.js';
import { renderGravityBeam } from './ui/renderers/GravityBeamRenderer.js';
import { ChamberAssists } from './levels/ChamberAssists.js';
import { playSupernovaExplosion } from './audio/synths/SupernovaExplosionSynth.js';
import { VictoryModalController } from './ui/components/VictoryModalController.js';
import { ScoringEngine } from './levels/ScoringEngine.js';

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

  // FX & Interactivity
  const sparkTrail = new SparkTrailRenderer();
  const supernovaExplosion = new SupernovaExplosionRenderer();
  const matrixStream = new MatrixStreamRenderer(width, height);
  const mouseInput = new MouseInputHandler(canvas);

  // 2. Initialize UI Controller
  const ui = new TerminalUI({
    geminiCompiler,
    levelManager,
    soundEngine,
    visualJuice,
    onExecutePrompt: (payload) => {
      const result = physicsWorld.antiGravityEngine.executeAiPayload(payload, physicsWorld.entities);
      ui.updateHUD(levelManager.getHUDState());

      if (payload.hudMessage) {
        visualJuice.showBannerNotification(payload.hudMessage, "info", 2500);
      }
    }
  });

  // 3. Level Manager Callbacks
  levelManager.onStateChange = (hudState) => {
    ui.updateHUD(hudState);
  };

  levelManager.onWin = (chamber, timeSec, promptsUsed) => {
    ui.triggerWinEffect();

    if (physicsWorld.entities.spark) {
      const { x, y } = physicsWorld.entities.spark.position;
      supernovaExplosion.trigger(x, y);
      playSupernovaExplosion(soundEngine.ctx);
    }

    const rank = ScoringEngine.calculateRank(parseFloat(timeSec), promptsUsed);
    VictoryModalController.show(chamber.name, timeSec, promptsUsed, rank);
    visualJuice.showBannerNotification(`🎉 EXTRACTION PORTAL REACHED! [${rank}]`, "success", 3000);
    ui.setMessage(`🎉 Extraction Portal Reached! Chamber ${chamber.number} Cleared! (${rank})`, "success");

    setTimeout(() => {
      levelManager.nextChamber();
    }, 2800);
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

  // 5. Main Animation Loop (60 FPS)
  function renderLoop() {
    requestAnimationFrame(renderLoop);

    try {
      // Step Physics
      physicsWorld.update(16.666);

      // Interactive Mouse Gravity Beam Drag
      if (mouseInput.isMouseDown && physicsWorld.entities.spark) {
        GravityGunBeam.applyMouseAttraction(physicsWorld.entities.spark, mouseInput.mouseX, mouseInput.mouseY, 0.003);
      }

      const isInv = physicsWorld.antiGravityEngine.isGlobalInverted;
      const gVec = physicsWorld.antiGravityEngine.currentGravityVector;

      // 1. Background Grid & Hacker Matrix Code Stream
      visualJuice.drawStageBackground(isInv, gVec);
      matrixStream.render(physicsWorld.ctx);

      // 2. Trajectory Prediction Guide Line (For Easy Playability)
      if (physicsWorld.entities.spark) {
        const { x, y } = physicsWorld.entities.spark.position;
        ChamberAssists.renderTrajectoryGuide(physicsWorld.ctx, x, y, gVec);
        sparkTrail.update(x, y);
        sparkTrail.render(physicsWorld.ctx);
      }

      // 3. Draw Interactive Mouse Laser Tether
      if (physicsWorld.entities.spark) {
        const { x, y } = physicsWorld.entities.spark.position;
        renderGravityBeam(physicsWorld.ctx, x, y, mouseInput.mouseX, mouseInput.mouseY, mouseInput.isMouseDown);
      }

      // 4. Draw Rigid Bodies & Hazards
      const bodies = Matter.Composite.allBodies(physicsWorld.world);
      visualJuice.drawBodies(bodies);
      visualJuice.drawHazards(physicsWorld.entities.lasers, physicsWorld.entities.spikes);

      // 5. Draw Goal Portal Vortex
      visualJuice.drawPortal(physicsWorld.entities.portal);

      // 6. Draw Spark Protagonist
      visualJuice.drawSpark(physicsWorld.entities.spark);

      // 7. Draw Supernova Explosions & Force Badges
      supernovaExplosion.render(physicsWorld.ctx);
      visualJuice.drawEntityVectorBadges(physicsWorld.antiGravityEngine.activeEntityModifiers);

      // 8. Stage Banner Notification
      visualJuice.drawBannerNotification();

    } catch (err) {
      console.error("Render loop frame error:", err);
    }
  }

  requestAnimationFrame(renderLoop);
});
