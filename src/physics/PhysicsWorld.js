import Matter from 'matter-js';
import { AntiGravityEngine } from './AntiGravityEngine.js';

/**
 * SYNTAXSHIFT - PHYSICS WORLD MANAGER
 * Handles Matter.js Engine, Canvas Rendering, Entity Spawn, and Collision Handlers
 */
export class PhysicsWorld {
  constructor(canvasElement, width = 960, height = 540) {
    this.canvas = canvasElement;
    this.width = width;
    this.height = height;

    // Matter.js Module aliases
    this.Engine = Matter.Engine;
    this.World = Matter.World;
    this.Bodies = Matter.Bodies;
    this.Body = Matter.Body;
    this.Composite = Matter.Composite;
    this.Events = Matter.Events;

    // Create Engine and World
    this.engine = this.Engine.create({
      gravity: { x: 0, y: 1.0, scale: 0.001 }
    });
    this.world = this.engine.world;
    this.world.gravity = this.engine.gravity;

    // Create AntiGravity Engine Subsystem
    this.antiGravityEngine = new AntiGravityEngine(this.world, this.engine);

    // Entity Registry
    this.entities = {
      spark: null,
      portal: null,
      redBlocks: [],
      blueBlocks: [],
      crates: [],
      lasers: [],
      spikes: [],
      walls: []
    };

    // Game state callbacks
    this.onLevelComplete = null;
    this.onPlayerDeath = null;

    // Setup Canvas context & custom render loop
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Setup collision listeners
    this.setupCollisionHandlers();
  }

  /**
   * Clear all bodies and reset world entities
   */
  clearWorld() {
    this.World.clear(this.world, false);
    this.antiGravityEngine.clearAllEntityModifiers();
    this.antiGravityEngine.resetGlobalGravity();

    this.entities = {
      spark: null,
      portal: null,
      redBlocks: [],
      blueBlocks: [],
      crates: [],
      lasers: [],
      spikes: [],
      walls: []
    };
  }

  /**
   * Create standard enclosing canvas walls
   */
  createEnclosingBounds(thickness = 40) {
    const w = this.width;
    const h = this.height;
    const t = thickness;

    const walls = [
      // Top ceiling
      this.Bodies.rectangle(w / 2, -t / 2, w + 2 * t, t, { isStatic: true, label: 'wall_ceiling' }),
      // Bottom floor
      this.Bodies.rectangle(w / 2, h + t / 2, w + 2 * t, t, { isStatic: true, label: 'wall_floor' }),
      // Left wall
      this.Bodies.rectangle(-t / 2, h / 2, t, h + 2 * t, { isStatic: true, label: 'wall_left' }),
      // Right wall
      this.Bodies.rectangle(w + t / 2, h / 2, t, h + 2 * t, { isStatic: true, label: 'wall_right' })
    ];

    walls.forEach(wall => {
      this.World.add(this.world, wall);
      this.entities.walls.push(wall);
    });
  }

  /**
   * Spawn Spark (The player protagonist energy orb)
   */
  spawnSpark(x, y, radius = 18) {
    const spark = this.Bodies.circle(x, y, radius, {
      restitution: 0.4,
      friction: 0.1,
      frictionAir: 0.01,
      density: 0.002,
      label: 'spark',
      render: { fillStyle: '#00f3ff' }
    });

    this.World.add(this.world, spark);
    this.entities.spark = spark;
    return spark;
  }

  /**
   * Spawn Portal (Extraction goal portal)
   */
  spawnPortal(x, y, radius = 28) {
    const portal = this.Bodies.circle(x, y, radius, {
      isStatic: true,
      isSensor: true, // Sensor body so Spark can pass through
      label: 'portal'
    });

    this.World.add(this.world, portal);
    this.entities.portal = portal;
    return portal;
  }

  /**
   * Spawn Red Hazard Block (Heavy obstacles)
   */
  spawnRedBlock(x, y, width, height, isStatic = false) {
    const block = this.Bodies.rectangle(x, y, width, height, {
      isStatic: isStatic,
      restitution: 0.2,
      friction: 0.4,
      density: 0.005, // Heavy
      label: 'red_block',
      render: { fillStyle: '#ff0055' }
    });

    this.World.add(this.world, block);
    this.entities.redBlocks.push(block);
    return block;
  }

  /**
   * Spawn Blue Platform Block
   */
  spawnBlueBlock(x, y, width, height, isStatic = false) {
    const block = this.Bodies.rectangle(x, y, width, height, {
      isStatic: isStatic,
      restitution: 0.3,
      friction: 0.3,
      label: 'blue_block',
      render: { fillStyle: '#0088ff' }
    });

    this.World.add(this.world, block);
    this.entities.blueBlocks.push(block);
    return block;
  }

  /**
   * Spawn Pushable Crate
   */
  spawnCrate(x, y, width = 40, height = 40) {
    const crate = this.Bodies.rectangle(x, y, width, height, {
      restitution: 0.2,
      friction: 0.5,
      density: 0.001,
      label: 'crate',
      render: { fillStyle: '#b537f2' }
    });

    this.World.add(this.world, crate);
    this.entities.crates.push(crate);
    return crate;
  }

  /**
   * Spawn Laser Hazard Line (Lethal trigger area)
   */
  spawnLaser(x, y, width, height) {
    const laser = this.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      isSensor: true,
      label: 'laser_grid'
    });

    this.World.add(this.world, laser);
    this.entities.lasers.push(laser);
    return laser;
  }

  /**
   * Spawn Spike Pit Hazard
   */
  spawnSpikePit(x, y, width, height) {
    const spikes = this.Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      isSensor: true,
      label: 'spikes'
    });

    this.World.add(this.world, spikes);
    this.entities.spikes.push(spikes);
    return spikes;
  }

  /**
   * Register collision event hooks
   */
  setupCollisionHandlers() {
    this.Events.on(this.engine, 'collisionStart', event => {
      const pairs = event.pairs;

      for (let i = 0; i < pairs.length; i++) {
        const { bodyA, bodyB } = pairs[i];

        const isSpark = bodyA.label === 'spark' || bodyB.label === 'spark';
        const other = bodyA.label === 'spark' ? bodyB : bodyA;

        if (isSpark) {
          // Spark touches Extraction Portal -> WIN
          if (other.label === 'portal') {
            if (this.onLevelComplete) this.onLevelComplete();
          }

          // Spark touches Laser Grid or Spikes -> LOSE / DEATH
          if (other.label === 'laser_grid' || other.label === 'spikes') {
            if (this.onPlayerDeath) this.onPlayerDeath(other.label);
          }
        }
      }
    });
  }

  /**
   * Step physics engine tick
   */
  update(delta = 16.666) {
    this.Engine.update(this.engine, delta);
  }
}
