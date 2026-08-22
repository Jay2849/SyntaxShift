export class LogConsoleDrawer {
  constructor() {
    this.logs = [];
    this.container = document.createElement('div');
    this.container.id = 'log-console-drawer';
    this.container.style.cssText = 'position:fixed;top:64px;right:-320px;width:300px;bottom:220px;background:rgba(6,8,14,0.95);border-left:1px solid var(--neon-cyan);padding:12px;font-size:0.7rem;overflow-y:auto;transition:right 0.3s;z-index:90;';
    document.body.appendChild(this.container);
  }
  toggle() {
    const isOpen = this.container.style.right === '0px';
    this.container.style.right = isOpen ? '-320px' : '0px';
  }
  log(msg) {
    const line = document.createElement('div');
    line.style.color = 'var(--neon-cyan)';
    line.textContent = `[${new Date().toLocaleTimeString()}] ${msg}`;
    this.container.prepend(line);
  }
}
