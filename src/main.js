import Matter from 'matter-js';
import { PhysicsWorld } from './physics/PhysicsWorld.js';
import { GeminiCompiler } from './ai/GeminiCompiler.js';
import { LevelManager } from './levels/LevelManager.js';
import { SoundEngine } from './audio/SoundEngine.js';
import { VisualJuice } from './ui/VisualJuice.js';
import { TerminalUI } from './ui/TerminalUI.js';

// Import Tadakta-Bhadakta & Frontend Overhaul Modules
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
import { LogConsoleDrawer } from './ui/components/LogConsoleDrawer.js';
import { CameraShakeController } from './ui/CameraShakeController.js';
import { renderTargetReticle } from './ui/renderers/TargetReticleRenderer.js';
import { GravityCompassWidget } from './ui/components/GravityCompassWidget.js';
import { renderAudioEqualizer } from './ui/components/AudioEqualizerWidget.js';
import { MobileTouchControls } from './ui/components/MobileTouchControls.js';

/**
 * SYNTAXSHIFT MAIN APPLICATION ENTRY POINT
 */
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('physics-canvas');
  if (!canvas) return;

  const width = 960;
  const height = 540;

  // 1. Initialize Subsystems
  const physicsWorld = new PhysicsWorld(canvas, width, height);
  const geminiCompiler = new GeminiCompiler();
  const levelManager = new LevelManager(physicsWorld);
  const soundEngine = new SoundEngine();
  soundEngine.attachTouchUnlockListener();

  const visualJuice = new VisualJuice(physicsWorld.ctx, width, height);

  // FX, Camera Shake & Interactive Components
  const sparkTrail = new SparkTrailRenderer();
  const supernovaExplosion = new SupernovaExplosionRenderer();
  const matrixStream = new MatrixStreamRenderer(width, height);
  const mouseInput = new MouseInputHandler(canvas);
  const cameraShake = new CameraShakeController();
  const logDrawer = new LogConsoleDrawer();

  logDrawer.log("SyntaxShift Anti-Gravity Telemetry Kernel Initialized.");

  // Mobile Touch Controls Overlay
  const mobileControlsContainer = document.getElementById('mobile-touch-controls');
  if (mobileControlsContainer) {
    new MobileTouchControls(mobileControlsContainer, (promptActionText) => {
      ui.handlePromptExecution(promptActionText);
    });
  }

  // 2. Initialize UI Controller
  const ui = new TerminalUI({
    geminiCompiler,
    levelManager,
    soundEngine,
    visualJuice,
    onExecutePrompt: (payload) => {
      const result = physicsWorld.antiGravityEngine.executeAiPayload(payload, physicsWorld.entities);
      ui.updateHUD(levelManager.getHUDState());
      cameraShake.shake(6);
      logDrawer.log(`Physics Command Executed: ${payload.hudMessage}`);

      if (payload.hudMessage) {
        visualJuice.showBannerNotification(payload.hudMessage, "info", 2500);
      }
    }
  });


  ui.logDrawer = logDrawer;

  // 3. Level Manager Callbacks
  levelManager.onStateChange = (hudState) => {
    ui.updateHUD(hudState);
    logDrawer.log(`Chamber Loaded: ${hudState.chamberName}`);
  };

  levelManager.onWin = (chamber, timeSec, promptsUsed) => {
    ui.triggerWinEffect();
    cameraShake.shake(15);

    if (physicsWorld.entities.spark) {
      const { x, y } = physicsWorld.entities.spark.position;
      supernovaExplosion.trigger(x, y);
      playSupernovaExplosion(soundEngine.ctx);
    }

    const rank = ScoringEngine.calculateRank(parseFloat(timeSec), promptsUsed);
    VictoryModalController.show(chamber.name, timeSec, promptsUsed, rank);
    visualJuice.showBannerNotification(`🎉 EXTRACTION PORTAL REACHED! [${rank}]`, "success", 3000);
    ui.setMessage(`🎉 Extraction Portal Reached! Chamber ${chamber.number} Cleared! (${rank})`, "success");
    logDrawer.log(`Chamber Cleared! Rank: ${rank}, Time: ${timeSec}s`);

    setTimeout(() => {
      levelManager.nextChamber();
    }, 2800);
  };

  levelManager.onDeath = (hazardType) => {
    soundEngine.playDeathBuzz();
    cameraShake.shake(12);
    visualJuice.showBannerNotification(`💥 SPARK DESTROYED BY ${hazardType.toUpperCase()}!`, "danger", 2000);
    ui.setMessage(`💥 Spark was destroyed by ${hazardType}! Rebuilding chamber...`, "danger");
    logDrawer.log(`Spark Destroyed by ${hazardType}`);
    setTimeout(() => {
      levelManager.resetCurrentChamber();
    }, 1200);
  };

  // 4. Load initial chamber
  levelManager.loadChamber(0);

  // 5. Unstoppable Main Animation Loop (60 FPS)
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
      const ctx = physicsWorld.ctx;

      ctx.save();
      // Apply Camera Shockwave Shake
      cameraShake.update(ctx);

      // 1. Background Grid & Hacker Matrix Code Stream
      visualJuice.drawStageBackground(isInv, gVec);
      matrixStream.render(ctx);

      // 2. Directional Vector Compass Widget (Top Right of Stage)
      GravityCompassWidget.renderCompass(ctx, width - 40, 40, gVec);

      // 3. Audio Equalizer Indicator
      renderAudioEqualizer(ctx, width - 80, 48, soundEngine.ctx && soundEngine.ctx.state === 'running');

      // 4. Trajectory Prediction Guide Line (For Easy Playability)
      if (physicsWorld.entities.spark) {
        const { x, y } = physicsWorld.entities.spark.position;
        ChamberAssists.renderTrajectoryGuide(ctx, x, y, gVec);
        sparkTrail.update(x, y);
        sparkTrail.render(ctx);
        renderTargetReticle(ctx, x, y);
      }

      // 5. Draw Interactive Mouse Laser Tether
      if (physicsWorld.entities.spark) {
        const { x, y } = physicsWorld.entities.spark.position;
        renderGravityBeam(ctx, x, y, mouseInput.mouseX, mouseInput.mouseY, mouseInput.isMouseDown);
      }

      // 6. Draw Rigid Bodies & Hazards
      const bodies = Matter.Composite.allBodies(physicsWorld.world);
      visualJuice.drawBodies(bodies);
      visualJuice.drawHazards(physicsWorld.entities.lasers, physicsWorld.entities.spikes);

      // 7. Draw Goal Portal Vortex
      visualJuice.drawPortal(physicsWorld.entities.portal);

      // 8. Draw Spark Protagonist
      visualJuice.drawSpark(physicsWorld.entities.spark);

      // 9. Draw Supernova Explosions & Force Badges
      supernovaExplosion.render(ctx);
      visualJuice.drawEntityVectorBadges(physicsWorld.antiGravityEngine.activeEntityModifiers);

      // 10. Stage Banner Notification
      visualJuice.drawBannerNotification();

      ctx.restore();

    } catch (err) {
      console.error("Render loop frame error:", err);
    }
  }

  requestAnimationFrame(renderLoop);
});
