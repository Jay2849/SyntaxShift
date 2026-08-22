import Matter from 'matter-js';

/**
 * SYNTAXSHIFT - ANTIGRAVITY SUBSYSTEM MODULE
 * Integrates Matter.js 2D Rigid Body Physics with Real-Time Vector Field & Selective Entity Manipulation
 */
export class AntiGravityEngine {
  constructor(matterWorld, matterEngine) {
    this.world = matterWorld;
    this.engine = matterEngine;
    
    // Active modifiers map: key -> modifier object
    this.activeEntityModifiers = new Map();
    
    // Global state track
    this.currentGravityVector = { x: 0, y: 1.0 };
    this.currentScale = 0.001;
    this.isGlobalInverted = false;
    this.terminalVelocityMax = 15.0; // max px/tick speed to avoid geometry tunneling

    // Register custom beforeUpdate physics hook
    Matter.Events.on(this.engine, 'beforeUpdate', () => this.applyContinuousForces());
  }

  /**
   * Set Global Environmental Gravity Vector
   * @param {number} x Horizontal vector components [-3.0, 3.0]
   * @param {number} y Vertical vector components [-3.0, 3.0]
   * @param {number} scale Gravity scale factor (default 0.001)
   */
  setGlobalGravity(x, y, scale = 0.001) {
    if (this.engine.gravity) {
      this.engine.gravity.x = x;
      this.engine.gravity.y = y;
      this.engine.gravity.scale = scale;
    }
    if (this.world.gravity) {
      this.world.gravity.x = x;
      this.world.gravity.y = y;
      this.world.gravity.scale = scale;
    }
    
    this.currentGravityVector = { x, y };
    this.currentScale = scale;
    this.isGlobalInverted = y < 0;
  }

  /**
   * Reset global gravity to standard 1G downwards
   */
  resetGlobalGravity() {
    this.setGlobalGravity(0, 1.0, 0.001);
  }

  /**
   * Register local/selective antigravity effect on specific entity or array of entities
   * @param {Matter.Body} body Target Matter.js body
   * @param {string} mode "INVERT" | "ZERO_G" | "PULL_UP" | "LOCAL_FIELD" | "OSCILLATE"
   * @param {object} vector Directional vector {x, y}
   * @param {number} multiplier Force multiplier
   * @param {number} durationMs Duration in milliseconds
   */
  applyEntityAntiGravity(body, mode, vector = { x: 0, y: -1 }, multiplier = 1.0, durationMs = 5000) {
    if (!body || body.isStatic) return;

    const effectId = `effect_${body.id}_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const originalFrictionAir = body.frictionAir !== undefined ? body.frictionAir : 0.01;

    const modifier = {
      body: body,
      mode: mode,
      vector: { x: vector.x || 0, y: vector.y !== undefined ? vector.y : -1 },
      multiplier: multiplier || 1.0,
      expiry: Date.now() + durationMs,
      originalFrictionAir: originalFrictionAir,
      startTime: Date.now()
    };

    // Prevent excessive acceleration penetration by adjusting air friction
    Matter.Body.set(body, 'frictionAir', 0.04);
    this.activeEntityModifiers.set(effectId, modifier);

    if (durationMs > 0 && durationMs < Infinity) {
      setTimeout(() => {
        this.removeEntityAntiGravity(effectId);
      }, durationMs);
    }
  }

  /**
   * Remove specific entity anti-gravity effect
   */
  removeEntityAntiGravity(effectId) {
    const mod = this.activeEntityModifiers.get(effectId);
    if (mod) {
      if (mod.body) {
        Matter.Body.set(mod.body, 'frictionAir', mod.originalFrictionAir);
      }
      this.activeEntityModifiers.delete(effectId);
    }
  }

  /**
   * Clear all entity local anti-gravity modifiers
   */
  clearAllEntityModifiers() {
    for (const [effectId, mod] of this.activeEntityModifiers.entries()) {
      if (mod.body) {
        Matter.Body.set(mod.body, 'frictionAir', mod.originalFrictionAir);
      }
    }
    this.activeEntityModifiers.clear();
  }

  /**
   * Continuous Tick-based force applicator for isolated floating/inversion & terminal velocity clamping
   */
  applyContinuousForces() {
    const now = Date.now();
    const allBodies = Matter.Composite.allBodies(this.world);

    // 1. Terminal Velocity Clamping & Air Drag across all non-static bodies
    allBodies.forEach(body => {
      if (body.isStatic) return;

      // Clamp vertical and horizontal velocity
      const vx = body.velocity.x;
      const vy = body.velocity.y;
      
      const clampedVx = Math.sign(vx) * Math.min(Math.abs(vx), this.terminalVelocityMax);
      const clampedVy = Math.sign(vy) * Math.min(Math.abs(vy), this.terminalVelocityMax);

      if (clampedVx !== vx || clampedVy !== vy) {
        Matter.Body.setVelocity(body, { x: clampedVx, y: clampedVy });
      }
    });

    // 2. Active Selective Entity Modifiers (Local gravity field override)
    for (const [effectId, mod] of this.activeEntityModifiers.entries()) {
      if (now > mod.expiry) {
        this.removeEntityAntiGravity(effectId);
        continue;
      }

      const body = mod.body;
      if (!body || body.isStatic) continue;

      const mass = body.mass;
      const gravityObj = this.engine.gravity || this.world.gravity || { x: 0, y: 1.0, scale: 0.001 };
      const gravY = gravityObj.y * gravityObj.scale * 1000;
      const gravX = gravityObj.x * gravityObj.scale * 1000;

      if (mod.mode === 'ZERO_G') {
        // Counteract global gravity precisely: F = -m * g
        const counterForceY = -mass * gravY;
        const counterForceX = -mass * gravX;
        
        // Add gentle stabilization dampener
        const floatDriftX = mod.vector.x * mass * 0.0005;
        const floatDriftY = mod.vector.y * mass * 0.0005;

        Matter.Body.applyForce(body, body.position, { 
          x: counterForceX + floatDriftX, 
          y: counterForceY + floatDriftY 
        });
      } 
      else if (mod.mode === 'INVERT' || mod.mode === 'PULL_UP') {
        // Double upward force: cancel standard fall (-mass * gravY) + apply negative upward acceleration (-mass * g_desired)
        const upwardForceY = -2 * mass * (0.001 * mod.multiplier) * Math.abs(mod.vector.y);
        const directionalForceX = mass * (0.001 * mod.multiplier) * mod.vector.x;
        
        Matter.Body.applyForce(body, body.position, { x: directionalForceX, y: upwardForceY });
      }
      else if (mod.mode === 'LOCAL_FIELD') {
        // Apply arbitrary vector force
        const forceX = mass * (0.0012 * mod.multiplier) * mod.vector.x;
        const forceY = mass * (0.0012 * mod.multiplier) * mod.vector.y;

        Matter.Body.applyForce(body, body.position, { x: forceX, y: forceY });
      }
      else if (mod.mode === 'OSCILLATE') {
        // Sinusoidal floating levitation wave
        const elapsedTime = (now - mod.startTime) / 1000;
        const wave = Math.sin(elapsedTime * 3) * 0.0008 * mass;
        const counterForceY = -mass * gravY;

        Matter.Body.applyForce(body, body.position, { x: 0, y: counterForceY + wave });
      }
    }
  }

  /**
   * Execute Structured AI Compiler Output Payload directly onto Matter.js world & entities
   * @param {object} payload JSON contract from Gemini API or Fallback Parser
   * @param {object} entities HashMap of game objects { spark, redBlocks, blueBlocks, crates, etc. }
   */
  executeAiPayload(payload, entities) {
    if (!payload || !payload.antigravity || !payload.antigravity.enabled) {
      // Check auxiliary modifiers (e.g. bounce / friction / mass without gravity mutation)
      this.applyAuxiliaryModifiers(payload, entities);
      return { success: false, message: payload?.hudMessage || "No gravity action requested." };
    }

    const { target, antigravity, auxiliaryModifiers } = payload;
    const { mode, vector, multiplier, durationSeconds } = antigravity;
    const durationMs = (durationSeconds || 5) * 1000;

    const vec = vector || { x: 0, y: -1.0 };

    if (target === 'GLOBAL') {
      if (mode === 'INVERT') {
        const vecX = vec.x !== 0 ? vec.x : 0.6; // Slight rightward drift to glide along ceiling towards portal
        const vecY = vec.y !== undefined ? vec.y : -1.0;
        this.setGlobalGravity(vecX, vecY);
      } else if (mode === 'ZERO_G') {
        this.setGlobalGravity(0, 0, 0);
      } else if (mode === 'LOCAL_FIELD' || mode === 'PULL_UP') {
        this.setGlobalGravity(vec.x || 0, vec.y || -1.0);
      }

      // INSTANT POP IMPULSE: Wake up all non-static bodies & apply upward initial velocity so they don't stick to the floor
      const bodies = Matter.Composite.allBodies(this.world).filter(b => !b.isStatic);
      bodies.forEach(body => {
        if (body.isSleeping) Matter.Body.setSleeping(body, false);
        const impulseY = mode === 'INVERT' ? -6.0 : mode === 'ZERO_G' ? -3.0 : -4.0;
        const impulseX = mode === 'INVERT' ? 2.0 : (vec.x || 0) * 3.0;
        Matter.Body.setVelocity(body, { x: impulseX, y: impulseY });
      });

      // Auto-restore global gravity after duration timer
      if (durationMs < 60000) {
        setTimeout(() => {
          this.resetGlobalGravity();
        }, durationMs);
      }
    } 
    else if (target === 'SPARK' && entities.spark) {
      const spark = entities.spark;
      if (spark.isSleeping) Matter.Body.setSleeping(spark, false);
      const impulseY = mode === 'INVERT' ? -6.0 : -3.0;
      Matter.Body.setVelocity(spark, { x: (vec.x || 0.8) * 3.0, y: impulseY });
      this.applyEntityAntiGravity(spark, mode, vec, multiplier, durationMs);
    } 
    else if (target === 'RED_BLOCKS' && entities.redBlocks && entities.redBlocks.length > 0) {
      entities.redBlocks.forEach(block => {
        this.applyEntityAntiGravity(block, mode, vec, multiplier, durationMs);
      });
    }
    else if (target === 'BLUE_BLOCKS' && entities.blueBlocks && entities.blueBlocks.length > 0) {
      entities.blueBlocks.forEach(block => {
        this.applyEntityAntiGravity(block, mode, vec, multiplier, durationMs);
      });
    }
    else if (target === 'CRATES' && entities.crates && entities.crates.length > 0) {
      entities.crates.forEach(crate => {
        this.applyEntityAntiGravity(crate, mode, vec, multiplier, durationMs);
      });
    }

    // Apply auxiliary physical properties (restitution, friction, mass)
    if (auxiliaryModifiers) {
      this.applyAuxiliaryModifiers(payload, entities);
    }

    return {
      success: true,
      message: payload.hudMessage || `Gravity mutated: ${mode} on ${target}`
    };
  }

  /**
   * Apply auxiliary physics parameters (restitution/bounce, friction, massMultiplier)
   */
  applyAuxiliaryModifiers(payload, entities) {
    const { target, auxiliaryModifiers } = payload;
    if (!auxiliaryModifiers) return;

    let targets = [];
    if (target === 'SPARK' && entities.spark) targets.push(entities.spark);
    else if (target === 'RED_BLOCKS' && entities.redBlocks) targets = entities.redBlocks;
    else if (target === 'BLUE_BLOCKS' && entities.blueBlocks) targets = entities.blueBlocks;
    else if (target === 'CRATES' && entities.crates) targets = entities.crates;
    else if (target === 'GLOBAL') {
      targets = Matter.Composite.allBodies(this.world).filter(b => !b.isStatic);
    }

    targets.forEach(body => {
      if (!body) return;
      if (auxiliaryModifiers.restitution !== null && auxiliaryModifiers.restitution !== undefined) {
        Matter.Body.set(body, 'restitution', auxiliaryModifiers.restitution);
      }
      if (auxiliaryModifiers.friction !== null && auxiliaryModifiers.friction !== undefined) {
        Matter.Body.set(body, 'friction', auxiliaryModifiers.friction);
      }
      if (auxiliaryModifiers.massMultiplier !== null && auxiliaryModifiers.massMultiplier !== undefined) {
        Matter.Body.setMass(body, body.mass * auxiliaryModifiers.massMultiplier);
      }
    });
  }
}
