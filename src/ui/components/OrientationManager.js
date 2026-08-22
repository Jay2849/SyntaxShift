/**
 * SYNTAXSHIFT - SCREEN ORIENTATION & FULLSCREEN MANAGER
 * Enforces landscape mode on mobile devices and manages orientation change hooks.
 */
export class OrientationManager {
  constructor(guardElementId = 'orientation-guard') {
    this.guardElement = document.getElementById(guardElementId);
    this.init();
  }

  init() {
    this.checkOrientation();

    window.addEventListener('resize', () => this.checkOrientation());
    window.addEventListener('orientationchange', () => {
      setTimeout(() => this.checkOrientation(), 200);
    });

    const lockBtn = document.getElementById('btn-lock-landscape');
    if (lockBtn) {
      lockBtn.addEventListener('click', () => this.requestLandscapeAndFullscreen());
    }
  }

  checkOrientation() {
    const isPortrait = window.innerHeight > window.innerWidth && window.innerWidth < 900;
    if (this.guardElement) {
      if (isPortrait) {
        this.guardElement.classList.add('active');
      } else {
        this.guardElement.classList.remove('active');
      }
    }
  }

  async requestLandscapeAndFullscreen() {
    try {
      // 1. Request Fullscreen
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        await docEl.requestFullscreen();
      } else if (docEl.webkitRequestFullscreen) {
        await docEl.webkitRequestFullscreen();
      }

      // 2. Lock Landscape Screen Orientation
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock('landscape').catch(err => {
          console.log('Screen orientation lock notice:', err);
        });
      }
    } catch (err) {
      console.log('Fullscreen/Orientation request status:', err);
    } finally {
      this.checkOrientation();
    }
  }

  attachTouchAutoLock() {
    const autoLock = () => {
      if (window.innerWidth < 900 && screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
      }
    };

    window.addEventListener('touchstart', autoLock, { once: true });
    window.addEventListener('click', autoLock, { once: true });
  }
}
