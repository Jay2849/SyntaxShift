export class MouseInputHandler {
  constructor(canvas) {
    this.canvas = canvas;
    this.isMouseDown = false;
    this.mouseX = 0;
    this.mouseY = 0;
    this.bind();
  }
  bind() {
    this.canvas.addEventListener('mousedown', (e) => { this.isMouseDown = true; this.updatePos(e); });
    this.canvas.addEventListener('mousemove', (e) => { this.updatePos(e); });
    window.addEventListener('mouseup', () => { this.isMouseDown = false; });
  }
  updatePos(e) {
    const r = this.canvas.getBoundingClientRect();
    this.mouseX = (e.clientX - r.left) * (this.canvas.width / r.width);
    this.mouseY = (e.clientY - r.top) * (this.canvas.height / r.height);
  }
}
