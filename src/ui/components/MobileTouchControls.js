/**
 * SYNTAXSHIFT - MOBILE TOUCH CONTROLS OVERLAY
 * Renders quick touch-action buttons for Android mobile & tablet devices.
 */
export class MobileTouchControls {
  constructor(containerElement, onAction) {
    this.container = containerElement;
    this.onAction = onAction;
    this.render();
  }

  render() {
    if (!this.container) return;

    this.container.innerHTML = `
      <div class="mobile-controls-wrapper">
        <button class="mobile-touch-btn flip-btn" data-action="Invert gravity upside down" title="Invert Gravity">
          <span class="btn-icon-emoji">⚡</span>
          <span class="btn-lbl">FLIP GRAV</span>
        </button>

        <button class="mobile-touch-btn push-left-btn" data-action="Push Spark to the left" title="Push Left">
          <span class="btn-icon-emoji">⬅️</span>
          <span class="btn-lbl">LEFT</span>
        </button>

        <button class="mobile-touch-btn push-right-btn" data-action="Push Spark to the right" title="Push Right">
          <span class="btn-icon-emoji">➡️</span>
          <span class="btn-lbl">RIGHT</span>
        </button>

        <button class="mobile-touch-btn boost-up-btn" data-action="Push Spark top upward" title="Boost Upward">
          <span class="btn-icon-emoji">🚀</span>
          <span class="btn-lbl">BOOST</span>
        </button>

        <button class="mobile-touch-btn zerog-btn" data-action="Float Spark in zero gravity" title="Zero-G Float">
          <span class="btn-icon-emoji">🌌</span>
          <span class="btn-lbl">ZERO-G</span>
        </button>
      </div>
    `;

    this.container.addEventListener('click', (e) => {
      const btn = e.target.closest('.mobile-touch-btn');
      if (btn && btn.dataset.action && this.onAction) {
        this.onAction(btn.dataset.action);
      }
    });

    this.container.addEventListener('touchstart', (e) => {
      const btn = e.target.closest('.mobile-touch-btn');
      if (btn) {
        btn.classList.add('active-touch');
      }
    }, { passive: true });

    this.container.addEventListener('touchend', (e) => {
      const btn = e.target.closest('.mobile-touch-btn');
      if (btn) {
        btn.classList.remove('active-touch');
      }
    }, { passive: true });
  }
}
