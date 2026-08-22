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

  // Calculate canvas viewport dimensions (75% stage area)
  const container = document.getElementById('stage-container');
  const width = Math.min(container.clientWidth || 960, 1100);
  const height = Math.min(container.clientHeight || 540, 600);

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
    }
  });

  // 3. Level Manager Callbacks
  levelManager.onStateChange = (hudState) => {
    ui.updateHUD(hudState);
  };

  levelManager.onWin = (chamber) => {
    ui.triggerWinEffect();
    ui.setMessage(`🎉 Extraction Portal Reached! Chamber ${chamber.number} Cleared!`, "success");
    setTimeout(() => {
      levelManager.nextChamber();
    }, 2200);
  };

  levelManager.onDeath = (hazardType) => {
    soundEngine.playDeathBuzz();
    ui.setMessage(`💥 Spark was destroyed by ${hazardType}! Rebuilding chamber...`, "danger");
    setTimeout(() => {
      levelManager.resetCurrentChamber();
    }, 1200);
  };

  // 4. Load initial chamber
  levelManager.loadChamber(0);

  // 5. Main Game & Custom Rendering Loop (60 FPS)
  function renderLoop() {
    // Step Matter.js physics engine
    physicsWorld.update(16.666);

    const ctx = physicsWorld.ctx;
    const isInv = physicsWorld.antiGravityEngine.isGlobalInverted;
    const gVec = physicsWorld.antiGravityEngine.currentGravityVector;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // Render Ambient Dust Particle Grid
    visualJuice.updateParticles(isInv, gVec);
    visualJuice.drawParticles(isInv);

    // Render Rigid Bodies (Matter.js custom visual style)
    const bodies = Matter.Composite.allBodies(physicsWorld.world);
    ctx.save();

    bodies.forEach(body => {
      if (body.label === 'spark' || body.label === 'portal' || body.isSensor) return;

      const pos = body.position;
      const angle = body.angle;

      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(angle);

      if (body.label === 'red_block') {
        ctx.fillStyle = '#ff0055';
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 12;
      } else if (body.label === 'blue_block') {
        ctx.fillStyle = '#0088ff';
        ctx.shadowColor = '#0088ff';
        ctx.shadowBlur = 10;
      } else if (body.label === 'crate') {
        ctx.fillStyle = '#b537f2';
        ctx.shadowColor = '#b537f2';
        ctx.shadowBlur = 10;
      } else {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.shadowBlur = 0;
      }

      const bounds = body.bounds;
      const w = bounds.max.x - bounds.min.x;
      const h = bounds.max.y - bounds.min.y;

      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.strokeRect(-w / 2, -h / 2, w, h);

      ctx.restore();
    });
    ctx.restore();

    // Render Hazard Lasers & Spikes
    visualJuice.drawHazards(physicsWorld.entities.lasers, physicsWorld.entities.spikes);

    // Render Goal Portal Vortex
    visualJuice.drawPortal(physicsWorld.entities.portal);

    // Render Spark Protagonist
    visualJuice.drawSpark(physicsWorld.entities.spark);

    // Render Directional Force Vector Arrows over active anti-gravity entities
    visualJuice.drawEntityVectorBadges(physicsWorld.antiGravityEngine.activeEntityModifiers);

    requestAnimationFrame(renderLoop);
  }

  requestAnimationFrame(renderLoop);
});
