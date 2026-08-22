import Matter from 'matter-js';

/**
 * SYNTAXSHIFT - ROBUST HIGH-CLARITY VISUAL JUICE & STAGE RENDERER MODULE
 * Guaranteed zero-crash canvas renderer with safe radial gradients and fallback bounds.
 */
export class VisualJuice {
  constructor(canvasContext, width, height) {
    this.ctx = canvasContext;
    this.width = width;
    this.height = height;

    this.particles = [];
    this.initParticles(80);
    this.portalAngle = 0;
    this.notification = null;
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

  showBannerNotification(text, type = "info", durationMs = 2500) {
    this.notification = {
      text: text,
      type: type,
      expiry: Date.now() + durationMs,
      startTime: Date.now(),
      durationMs: durationMs
    };
  }

  /**
   * Draw Cyberpunk Stage Background Grid
   */
  drawStageBackground(isGlobalInverted, gravityVector) {
    const ctx = this.ctx;
    const w = this.width;
    const h = this.height;

    try {
      // Deep void gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, '#0b0f19');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Grid Lines
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;

      for (let x = 0; x <= w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
      }
      for (let y = 0; y <= h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
      }

      // Ceiling & Floor Beams
      ctx.fillStyle = isGlobalInverted ? 'rgba(244, 63, 94, 0.25)' : 'rgba(56, 189, 248, 0.1)';
      ctx.fillRect(0, 0, w, 14);
      ctx.fillStyle = isGlobalInverted ? '#f43f5e' : '#38bdf8';
      ctx.fillRect(0, 12, w, 2);

      ctx.fillStyle = !isGlobalInverted ? 'rgba(56, 189, 248, 0.25)' : 'rgba(244, 63, 94, 0.1)';
      ctx.fillRect(0, h - 14, w, 14);
      ctx.fillStyle = !isGlobalInverted ? '#38bdf8' : '#f43f5e';
      ctx.fillRect(0, h - 14, w, 2);

      ctx.font = 'bold 10px "Fira Code", monospace';
      ctx.fillStyle = isGlobalInverted ? '#f43f5e' : 'rgba(56, 189, 248, 0.7)';
      ctx.fillText('▲ CEILING SURFACE [INVERTED TARGET]', 20, 24);

      ctx.fillStyle = !isGlobalInverted ? '#38bdf8' : 'rgba(244, 63, 94, 0.7)';
      ctx.fillText('▼ GROUND SURFACE [STANDARD 1G FLOOR]', 20, h - 20);

      this.updateParticles(isGlobalInverted, gravityVector);
      this.drawParticles(isGlobalInverted);

      ctx.restore();
    } catch (e) {
      console.error("Background draw error:", e);
    }
  }

  updateParticles(isGlobalInverted, gravityVector) {
    const vecX = gravityVector ? gravityVector.x : 0;
    const vecY = gravityVector ? gravityVector.y : 1;

    this.particles.forEach(p => {
      if (isGlobalInverted) {
        p.vy = Math.min(p.vy - 0.15, -2.5);
      } else if (vecY === 0 && vecX === 0) {
        p.vy *= 0.95; p.vx *= 0.95;
      } else {
        p.vy = Math.max(p.vy + 0.1, 1.5);
      }

      p.vx += (vecX * 0.1);
      p.x += p.vx; p.y += p.vy;

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
    });
    ctx.restore();
  }

  /**
   * Safe Spark Protagonist Renderer
   */
  drawSpark(sparkBody) {
    if (!sparkBody || !sparkBody.position) return;
    const ctx = this.ctx;
    const x = sparkBody.position.x;
    const y = sparkBody.position.y;
    const radius = Math.max(12, sparkBody.circleRadius || 18);

    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    try {
      ctx.save();

      // Outer Glow Aura
      ctx.shadowColor = '#00f3ff';
      ctx.shadowBlur = 25;

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

      // Velocity Line
      const vx = sparkBody.velocity ? sparkBody.velocity.x : 0;
      const vy = sparkBody.velocity ? sparkBody.velocity.y : 0;

      if (Math.abs(vx) > 0.2 || Math.abs(vy) > 0.2) {
        ctx.strokeStyle = '#ffe600';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx * 6, y + vy * 6);
        ctx.stroke();
      }

      // Entity Label "SPARK"
      ctx.shadowBlur = 0;
      ctx.font = 'bold 11px "Fira Code", monospace';
      ctx.fillStyle = '#00f3ff';
      ctx.textAlign = 'center';
      ctx.fillText('⚡ SPARK', x, y - radius - 10);

      ctx.restore();
    } catch (e) {
      console.error("Spark draw error:", e);
    }
  }

  /**
   * Safe Extraction Goal Portal Renderer
   */
  drawPortal(portalBody) {
    if (!portalBody || !portalBody.position) return;
    const ctx = this.ctx;
    const x = portalBody.position.x;
    const y = portalBody.position.y;
    const radius = Math.max(16, portalBody.circleRadius || 30);

    if (!Number.isFinite(x) || !Number.isFinite(y)) return;

    try {
      this.portalAngle += 0.03;

      ctx.save();
      ctx.translate(x, y);

      ctx.shadowColor = '#00ff66';
      ctx.shadowBlur = 25;

      ctx.lineWidth = 3;
      ctx.strokeStyle = '#00ff66';
      ctx.beginPath();
      ctx.arc(0, 0, radius + 8, this.portalAngle, this.portalAngle + Math.PI * 1.4);
      ctx.stroke();

      ctx.strokeStyle = '#00f3ff';
      ctx.beginPath();
      ctx.arc(0, 0, radius + 14, -this.portalAngle, -this.portalAngle + Math.PI * 1.2);
      ctx.stroke();

      const grad = ctx.createRadialGradient(0, 0, 4, 0, 0, radius);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.5, '#00ff66');
      grad.addColorStop(1, 'rgba(0, 243, 255, 0.3)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.font = 'bold 11px "Fira Code", monospace';
      ctx.fillStyle = '#00ff66';
      ctx.textAlign = 'center';
      ctx.fillText('🌀 GOAL PORTAL', 0, radius + 20);

      ctx.restore();
    } catch (e) {
      console.error("Portal draw error:", e);
    }
  }

  /**
   * Render Rigid Bodies (Obstacles, Walls, Crates)
   */
  drawBodies(bodies) {
    if (!bodies) return;
    const ctx = this.ctx;
    ctx.save();

    bodies.forEach(body => {
      if (!body || body.label === 'spark' || body.label === 'portal' || body.isSensor) return;

      const pos = body.position;
      if (!pos || !Number.isFinite(pos.x) || !Number.isFinite(pos.y)) return;

      const angle = body.angle || 0;
      const bounds = body.bounds;
      if (!bounds) return;

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
    const y = 75;

    ctx.fillStyle = 'rgba(10, 14, 23, 0.92)';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 2;
    ctx.shadowColor = '#00f3ff';
    ctx.shadowBlur = 20;

    ctx.fillRect(x, y, bannerW, bannerH);
    ctx.strokeRect(x, y, bannerW, bannerH);

    ctx.shadowBlur = 0;
    ctx.font = 'bold 14px "Orbitron", sans-serif';
    ctx.fillStyle = '#00f3ff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.notification.text, this.width / 2, y + bannerH / 2);

    ctx.restore();
  }

  drawHazards(lasers, spikes) {
    if (!lasers || !spikes) return;
    const ctx = this.ctx;
    ctx.save();

    lasers.forEach(laser => {
      const b = laser.bounds;
      if (!b) return;
      const w = b.max.x - b.min.x;
      const h = b.max.y - b.min.y;

      ctx.shadowColor = '#ff0055';
      ctx.shadowBlur = 20;
      ctx.fillStyle = '#ff0055';
      ctx.fillRect(b.min.x, b.min.y, w, h);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(b.min.x + 2, b.min.y + 2, Math.max(1, w - 4), Math.max(1, h - 4));
    });

    spikes.forEach(spike => {
      const b = spike.bounds;
      if (!b) return;
      const minX = b.min.x, maxX = b.max.x, minY = b.min.y, maxY = b.max.y;
      const width = maxX - minX;
      const numSpikes = Math.floor(width / 20);

      ctx.fillStyle = '#ff0055';
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;

      for (let i = 0; i < numSpikes; i++) {
        const x1 = minX + i * 20;
        const x2 = minX + (i + 1) * 20;
        const xMid = (x1 + x2) / 2;

        ctx.beginPath();
        ctx.moveTo(x1, maxY);
        ctx.lineTo(xMid, minY);
        ctx.lineTo(x2, maxY);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    });

    ctx.restore();
  }

  drawEntityVectorBadges(activeEntityModifiers) {
    if (!activeEntityModifiers) return;
    const ctx = this.ctx;

    ctx.save();
    for (const [_, mod] of activeEntityModifiers.entries()) {
      const body = mod.body;
      if (!body || !body.position) continue;

      const { x, y } = body.position;
      const mode = mod.mode;

      ctx.shadowColor = mode === 'ZERO_G' ? '#ffe600' : '#ff0055';
      ctx.shadowBlur = 15;
      ctx.strokeStyle = mode === 'ZERO_G' ? '#ffe600' : '#ff0055';
      ctx.lineWidth = 2;

      ctx.beginPath();
      ctx.arc(x, y, (body.circleRadius || 24) + 6, 0, Math.PI * 2);
      ctx.stroke();

      if (mod.vector && (mod.vector.x !== 0 || mod.vector.y !== 0)) {
        const arrowLen = 30;
        const targetX = x + mod.vector.x * arrowLen;
        const targetY = y + mod.vector.y * arrowLen;

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(targetX, targetY);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  triggerChromaticFlash() {
    const stage = document.getElementById('stage-container');
    if (stage) {
      stage.classList.remove('chromatic-pulse');
      void stage.offsetWidth;
      stage.classList.add('chromatic-pulse');
    }
  }
}
