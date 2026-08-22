import Matter from 'matter-js';

/**
 * SYNTAXSHIFT - VISUAL JUICE & SHADER OVERLAY MODULE
 * Handles Canvas ambient dust particles, dynamic gravity vector indicators, portal vortex, and neon halos.
 */
export class VisualJuice {
  constructor(canvasContext, width, height) {
    this.ctx = canvasContext;
    this.width = width;
    this.height = height;

    // Ambient Particle Dust System
    this.particles = [];
    this.initParticles(60);

    // Portal animation rotation angle
    this.portalAngle = 0;
  }

  initParticles(count = 60) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  /**
   * Update particle dust velocity vectors based on gravity status
   */
  updateParticles(isGlobalInverted, gravityVector) {
    this.particles.forEach(p => {
      if (isGlobalInverted) {
        // Reverse vertical velocity upwards
        p.vy = Math.min(p.vy - 0.1, -1.8);
      } else {
        // Standard downward flow
        p.vy = Math.max(p.vy + 0.05, 0.4);
      }

      p.vx += (gravityVector.x * 0.1);

      p.x += p.vx;
      p.y += p.vy;

      // Wrap around canvas boundaries
      if (p.y < 0) {
        p.y = this.height;
        p.x = Math.random() * this.width;
      } else if (p.y > this.height) {
        p.y = 0;
        p.x = Math.random() * this.width;
      }
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
    });
  }

  /**
   * Render ambient dust particles
   */
  drawParticles(isGlobalInverted) {
    this.ctx.save();
    this.particles.forEach(p => {
      this.ctx.fillStyle = isGlobalInverted ? `rgba(255, 0, 85, ${p.alpha})` : `rgba(0, 243, 255, ${p.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    });
    this.ctx.restore();
  }

  /**
   * Render Extraction Goal Portal cosmic vortex
   */
  drawPortal(portalBody) {
    if (!portalBody) return;
    const { x, y } = portalBody.position;
    const radius = portalBody.circleRadius || 28;

    this.portalAngle += 0.03;

    this.ctx.save();
    this.ctx.translate(x, y);

    // Glowing outer ring
    this.ctx.shadowColor = '#00f3ff';
    this.ctx.shadowBlur = 20;

    // Outer swirling arcs
    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = '#00f3ff';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius + 6, this.portalAngle, this.portalAngle + Math.PI * 1.3);
    this.ctx.stroke();

    this.ctx.strokeStyle = '#b537f2';
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius + 12, -this.portalAngle, -this.portalAngle + Math.PI * 1.2);
    this.ctx.stroke();

    // Inner filled core
    const grad = this.ctx.createRadialGradient(0, 0, 4, 0, 0, radius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#00f3ff');
    grad.addColorStop(1, 'rgba(181, 55, 242, 0.2)');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, radius, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }

  /**
   * Render Spark Protagonist with Cyberpunk trail & glow
   */
  drawSpark(sparkBody) {
    if (!sparkBody) return;
    const { x, y } = sparkBody.position;
    const radius = sparkBody.circleRadius || 18;

    this.ctx.save();
    this.ctx.shadowColor = '#00f3ff';
    this.ctx.shadowBlur = 25;

    // Core bright orb
    const grad = this.ctx.createRadialGradient(x, y, 2, x, y, radius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.6, '#00f3ff');
    grad.addColorStop(1, 'rgba(0, 243, 255, 0.4)');

    this.ctx.fillStyle = grad;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Outer pulsing ring
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    this.ctx.restore();
  }

  /**
   * Render directional force vector HUD badge arrows over bodies experiencing anti-gravity
   */
  drawEntityVectorBadges(activeEntityModifiers) {
    if (!activeEntityModifiers) return;

    this.ctx.save();
    for (const [_, mod] of activeEntityModifiers.entries()) {
      const body = mod.body;
      if (!body) continue;

      const { x, y } = body.position;
      const mode = mod.mode;

      // Halo ring around entity
      this.ctx.shadowColor = mode === 'ZERO_G' ? '#ffe600' : '#ff0055';
      this.ctx.shadowBlur = 15;
      this.ctx.strokeStyle = mode === 'ZERO_G' ? '#ffe600' : '#ff0055';
      this.ctx.lineWidth = 2;

      this.ctx.beginPath();
      this.ctx.arc(x, y, (body.circleRadius || 24) + 6, 0, Math.PI * 2);
      this.ctx.stroke();

      // Directional arrow line
      if (mod.vector && (mod.vector.x !== 0 || mod.vector.y !== 0)) {
        const arrowLen = 30;
        const targetX = x + mod.vector.x * arrowLen;
        const targetY = y + mod.vector.y * arrowLen;

        this.ctx.beginPath();
        this.ctx.moveTo(x, y);
        this.ctx.lineTo(targetX, targetY);
        this.ctx.stroke();
      }
    }
    this.ctx.restore();
  }

  /**
   * Render Lasers & Hazard spikes
   */
  drawHazards(lasers, spikes) {
    this.ctx.save();

    // Lasers: Glowing Neon Pink hazard beams
    lasers.forEach(laser => {
      const bounds = laser.bounds;
      const w = bounds.max.x - bounds.min.x;
      const h = bounds.max.y - bounds.min.y;

      this.ctx.shadowColor = '#ff0055';
      this.ctx.shadowBlur = 20;
      this.ctx.fillStyle = '#ff0055';
      this.ctx.fillRect(bounds.min.x, bounds.min.y, w, h);

      // Inner white pulse core
      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(bounds.min.x + 2, bounds.min.y + 2, Math.max(1, w - 4), Math.max(1, h - 4));
    });

    // Spikes: Jagged red triangles
    spikes.forEach(spike => {
      const bounds = spike.bounds;
      const minX = bounds.min.x;
      const maxX = bounds.max.x;
      const minY = bounds.min.y;
      const maxY = bounds.max.y;
      const width = maxX - minX;
      const numSpikes = Math.floor(width / 20);

      this.ctx.fillStyle = '#ff0055';
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1;

      for (let i = 0; i < numSpikes; i++) {
        const x1 = minX + i * 20;
        const x2 = minX + (i + 1) * 20;
        const xMid = (x1 + x2) / 2;

        this.ctx.beginPath();
        this.ctx.moveTo(x1, maxY);
        this.ctx.lineTo(xMid, minY);
        this.ctx.lineTo(x2, maxY);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.stroke();
      }
    });

    this.ctx.restore();
  }

  /**
   * Trigger Chromatic Aberration Screen pulse on HTML5 Canvas stage
   */
  triggerChromaticFlash() {
    const stage = document.getElementById('stage-container');
    if (stage) {
      stage.classList.remove('chromatic-pulse');
      void stage.offsetWidth; // Trigger reflow
      stage.classList.add('chromatic-pulse');
    }
  }
}
