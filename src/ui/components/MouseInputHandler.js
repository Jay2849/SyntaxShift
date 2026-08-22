export class MouseInputHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.isMouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.bind();
  }

  bind() {
    // Mouse events
    this.canvas.addEventListener('mousedown', (e) => { 
      this.isMouseDown = true; 
      this.updatePos(e); 
    });

    this.canvas.addEventListener('mousemove', (e) => { 
      if (this.isMouseDown) {
        this.updatePos(e); 
      }
    });

    window.addEventListener('mouseup', () => { 
      this.isMouseDown = false; 
    });

    // Touch events for Android & Mobile devices
    this.canvas.addEventListener('touchstart', (e) => {
      if (e.touches && e.touches.length > 0) {
        this.isMouseDown = true;
        this.updateTouchPos(e.touches[0]);
      }
    }, { passive: false });

    this.canvas.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches.length > 0) {
        this.isMouseDown = true;
        this.updateTouchPos(e.touches[0]);
        // Prevent default screen scrolling when touching canvas
        if (e.cancelable) e.preventDefault();
      }
    }, { passive: false });

    const handleTouchEnd = () => {
      this.isMouseDown = false;
    };

    this.canvas.addEventListener('touchend', handleTouchEnd);
    this.canvas.addEventListener('touchcancel', handleTouchEnd);
  }

  updatePos(e) {
    const r = this.canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    this.mouseX = (e.clientX - r.left) * (this.canvas.width / r.width);
    this.mouseY = (e.clientY - r.top) * (this.canvas.height / r.height);
  }

  updateTouchPos(touch) {
    const r = this.canvas.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    this.mouseX = (touch.clientX - r.left) * (this.canvas.width / r.width);
    this.mouseY = (touch.clientY - r.top) * (this.canvas.height / r.height);
  }
}

