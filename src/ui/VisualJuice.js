import Matter from 'matter-js';

/**
 * SYNTAXSHIFT - AUTHENTIC VISUAL JUICE & STAGE RENDERER MODULE
 * High-clarity rendering with background vector fields, entity labels, and crisp stage boundaries.
 */
export class VisualJuice {
  constructor(canvasContext, width, height) {
    this.ctx = canvasContext;
    this.width = width;
    this.height = height;

    // Ambient Flow Particles
    this.particles = [];
    this.initParticles(80);

    this.portalAngle = 0;
    this.notification = null; // { text, type, expiry }
  }

  initParticles(count = 80) {
    this.particles = [];
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  showBannerNotification(text, type = "info", durationMs = 2000) {
    this.notification = {
      text: text,
      type: type,
      expiry: Date.now() + durationMs,
      startTime: Date.now(),
      durationMs: durationMs
    };
  }

  /**
   * Draw Cyberpunk Stage Background Grid with Directional Gravity Arrows
   */
  drawStageBackground(isGlobalInverted, gravityVector) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    // Deep void gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
    bgGrad.addColorStop(0, '#06080e');
    bgGrad.addColorStop(1, '#0b0f19');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Draw Grid Lines
    ctx.save();
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
    ctx.lineWidth = 1;
    const gridSize = 40;

    for (let x = 0; x <= w; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y <= h; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Draw Ceiling & Floor Heavy Beams for Instant Spatial Awareness
    // Top Ceiling Beam
    ctx.fillStyle = isGlobalInverted ? 'rgba(255, 0, 85, 0.25)' : 'rgba(0, 243, 255, 0.1)';
    ctx.fillRect(0, 0, w, 12);
    ctx.fillStyle = isGlobalInverted ? '#ff0055' : '#00f3ff';
    ctx.fillRect(0, 10, w, 2);

    // Bottom Floor Beam
    ctx.fillStyle = !isGlobalInverted ? 'rgba(0, 243, 255, 0.25)' : 'rgba(255, 0, 85, 0.1)';
    ctx.fillRect(0, h - 12, w, 12);
    ctx.fillStyle = !isGlobalInverted ? '#00f3ff' : '#ff0055';
    ctx.fillRect(0, h - 12, w, 2);

    // Ceiling & Floor Text Labels
    ctx.font = 'bold 10px "Fira Code", monospace';
    ctx.fillStyle = isGlobalInverted ? '#ff0055' : 'rgba(0, 243, 255, 0.6)';
    ctx.fillText('▲ CEILING SURFACE [INVERTED TARGET]', 20, 24);

    ctx.fillStyle = !isGlobalInverted ? '#00f3ff' : 'rgba(255, 0, 85, 0.6)';
    ctx.fillText('▼ GROUND SURFACE [STANDARD 1G FLOOR]', 20, h - 20);

    // Draw Background Directional Gravity Field Indicators
    this.updateParticles(isGlobalInverted, gravityVector);
    this.drawParticles(isGlobalInverted);

    ctx.restore();
  }

  updateParticles(isGlobalInverted, gravityVector) {
    this.particles.forEach(p => {
      if (isGlobalInverted) {
        p.vy = Math.min(p.vy - 0.15, -2.5);
      } else if (gravityVector.y === 0 && gravityVector.x === 0) {
        p.vy *= 0.95;
        p.vx *= 0.95;
      } else {
        p.vy = Math.max(p.vy + 0.1, 1.5);
      }

      p.vx += (gravityVector.x * 0.1);
      p.x += p.vx;
      p.y += p.vy;

      if (p.y < 0) { p.y = this.height; p.x = Math.random() * this.width; }
      else if (p.y > this.height) { p.y = 0; p.x = Math.random() * this.width; }
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
    });
  }

  drawParticles(isGlobalInverted) {
    const ctx = this.ctx;
    ctx.save();
    this.particles.forEach(p => {
      ctx.fillStyle = isGlobalInverted ? `rgba(255, 0, 85, ${p.alpha})` : `rgba(0, 243, 255, ${p.alpha})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();

      // Render mini vertical direction arrow on particles
      if (p.size > 2) {
        ctx.strokeStyle = isGlobalInverted ? 'rgba(255, 0, 85, 0.4)' : 'rgba(0, 243, 255, 0.4)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + (isGlobalInverted ? -8 : 8));
        ctx.stroke();
      }
    });
    ctx.restore();
  }

  /**
   * Render Spark (Player Protagonist) with crisp aura, velocity vector, and label
   */
  drawSpark(sparkBody) {
    if (!sparkBody) return;
    const ctx = this.ctx;
    const { x, y } = sparkBody.position;
    const radius = sparkBody.circleRadius || 18;
    const vx = sparkBody.velocity.x;
    const vy = sparkBody.velocity.y;

    ctx.save();

    // 1. Outer Glow Aura
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 25;

    // Gradient Orb Fill
    const grad = ctx.createRadialGradient(x, y, 2, x, y, radius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#00f3ff');
    grad.addColorStop(1, 'rgba(0, 243, 255, 0.4)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 2. Velocity Direction Line
    if (Math.abs(vx) > 0.2 || Math.abs(vy) > 0.2) {
      ctx.strokeStyle = '#ffe600';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + vx * 6, y + vy * 6);
      ctx.stroke();
    }

    // 3. Clear Entity Label "SPARK"
    ctx.shadowBlur = 0;
    ctx.font = 'bold 11px "Fira Code", monospace';
    ctx.fillStyle = '#00f3ff';
    ctx.textAlign = 'center';
    ctx.fillText('⚡ SPARK', x, y - radius - 10);

    ctx.restore();
  }

  /**
   * Render Extraction Goal Portal with pulsing vortex & clear target text
   */
  drawPortal(portalBody) {
    if (!portalBody) return;
    const ctx = this.ctx;
    const { x, y } = portalBody.position;
    const radius = portalBody.circleRadius || 28;

    this.portalAngle += 0.03;

    ctx.save();
    ctx.translate(x, y);

    // Glowing outer aura
    ctx.shadowColor = '#00ff66';
    ctx.shadowBlur = 25;

    // Swirling arcs
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#00ff66';
    ctx.beginPath();
    ctx.arc(0, 0, radius + 8, this.portalAngle, this.portalAngle + Math.PI * 1.4);
    ctx.stroke();

    ctx.strokeStyle = '#00f3ff';
    ctx.beginPath();
    ctx.arc(0, 0, radius + 14, -this.portalAngle, -this.portalAngle + Math.PI * 1.2);
    ctx.stroke();

    // Core filled gradient
    const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, radius);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.5, '#00ff66');
    grad.addColorStop(1, 'rgba(0, 243, 255, 0.3)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();

    // Label "EXIT PORTAL"
    ctx.shadowBlur = 0;
    ctx.font = 'bold 11px "Fira Code", monospace';
    ctx.fillStyle = '#00ff66';
    ctx.textAlign = 'center';
    ctx.fillText('🌀 GOAL PORTAL', 0, -radius - 12);

    ctx.restore();
  }

  /**
   * Render Rigid Bodies (Obstacles, Walls, Crates) with Crisp Metadata Labels
   */
  drawBodies(bodies) {
    const ctx = this.ctx;
    ctx.save();

    bodies.forEach(body => {
      if (body.label === 'spark' || body.label === 'portal' || body.isSensor) return;

      const pos = body.position;
      const angle = body.angle;
      const bounds = body.bounds;
      const w = bounds.max.x - bounds.min.x;
      const h = bounds.max.y - bounds.min.y;

      ctx.save();
      ctx.translate(pos.x, pos.y);
      ctx.rotate(angle);

      if (body.label === 'red_block') {
        ctx.fillStyle = 'rgba(255, 0, 85, 0.85)';
        ctx.shadowColor = '#ff0055';
        ctx.shadowBlur = 15;
        ctx.strokeStyle = '#ffffff';
      } else if (body.label === 'blue_block') {
        ctx.fillStyle = 'rgba(0, 136, 255, 0.85)';
        ctx.shadowColor = '#0088ff';
        ctx.shadowBlur = 12;
        ctx.strokeStyle = '#00f3ff';
      } else if (body.label === 'crate') {
        ctx.fillStyle = 'rgba(181, 55, 242, 0.85)';
        ctx.shadowColor = '#b537f2';
        ctx.shadowBlur = 12;
        ctx.strokeStyle = '#ffffff';
      } else {
        ctx.fillStyle = 'rgba(30, 41, 59, 0.9)';
        ctx.shadowBlur = 0;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      }

      ctx.lineWidth = 2;
      ctx.fillRect(-w / 2, -h / 2, w, h);
      ctx.strokeRect(-w / 2, -h / 2, w, h);

      // Render Label on obstacle blocks
      if (w > 30 && h > 20) {
        ctx.shadowBlur = 0;
        ctx.font = 'bold 10px "Fira Code", monospace';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        let tag = '';
        if (body.label === 'red_block') tag = body.isStatic ? '⛔ HAZARD WALL' : '📦 RED BLOCK';
        else if (body.label === 'blue_block') tag = '🟦 PLATFORM';
        else if (body.label === 'crate') tag = '📦 CRATE';

        if (tag) ctx.fillText(tag, 0, 0);
      }

      ctx.restore();
    });

    ctx.restore();
  }

  /**
   * Render Large Center-Screen Action Banner Notification
   */
  drawBannerNotification() {
    if (!this.notification) return;
    const now = Date.now();
    if (now > this.notification.expiry) {
      this.notification = null;
      return;
    }

    const ctx = this.ctx;
    const elapsed = now - this.notification.startTime;
    const remaining = this.notification.expiry - now;
    const alpha = Math.min(1, remaining / 300, elapsed / 200);

    ctx.save();
    ctx.globalAlpha = alpha;

    const bannerW = 540;
    const bannerH = 46;
    const x = (this.width - bannerW) / 2;
    const y = 80;

    // Background Card
    ctx.fillStyle = 'rgba(10, 14, 23, 0.92)';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 20;

    ctx.fillRect(x, y, bannerW, bannerH);
    ctx.strokeRect(x, y, bannerW, bannerH);

    // Banner Text
    ctx.shadowBlur = 0;
    ctx.font = 'bold 14px "Orbitron", sans-serif';
    ctx.fillStyle = '#00f3ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.notification.text, this.width / 2, y + bannerH / 2);

    ctx.restore();
  }

  /**
   * Trigger Chromatic Aberration Screen pulse on stage
   */
  triggerChromaticFlash() {
    const stage = document.getElementById('stage-container');
    if (stage) {
      stage.classList.remove('chromatic-pulse');
      void stage.offsetWidth;
      stage.classList.add('chromatic-pulse');
    }
  }
}
