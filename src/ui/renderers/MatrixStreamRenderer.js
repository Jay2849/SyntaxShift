export class MatrixStreamRenderer {
  constructor(width, height) {
    this.cols = Array.from({ length: 30 }, () => ({ x: Math.random() * width, y: Math.random() * height, speed: Math.random() * 3 + 2, text: "\u2207g = (M\u00b7cos\u03b8, M\u00b7sin\u03b8)" }));
  }
  render(ctx) {
    ctx.save();
    ctx.font = '9px "Fira Code", monospace';
    ctx.fillStyle = 'rgba(0, 243, 255, 0.15)';
    this.cols.forEach(c => {
      c.y += c.speed;
      if (c.y > 540) c.y = 0;
      ctx.fillText(c.text, c.x, c.y);
    });
    ctx.restore();
  }
}
