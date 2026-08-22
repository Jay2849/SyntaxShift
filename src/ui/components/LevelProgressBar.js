export class LevelProgressBar {
  static render(containerId, currentIdx, total = 5) {
    const c = document.getElementById(containerId);
    if (!c) return;

    let html = '<div style="display:flex;align-items:center;gap:4px;">';
    for (let i = 0; i < total; i++) {
      const active = i === currentIdx;
      const done = i < currentIdx;
      const bg = active ? 'var(--neon-cyan)' : done ? 'var(--neon-green)' : 'rgba(255, 255, 255, 0.1)';
      const color = active ? '#000' : done ? '#000' : 'var(--text-muted)';
      const border = active ? 'var(--neon-cyan)' : done ? 'var(--neon-green)' : 'var(--border-dim)';

      html += `<span style="font-family:var(--font-mono);font-weight:700;font-size:0.7rem;width:22px;height:22px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:${bg};color:${color};border:1px solid ${border};box-shadow:${active ? '0 0 10px var(--neon-cyan-glow)' : 'none'};">${i + 1}</span>`;
    }
    html += '</div>';
    c.innerHTML = html;
  }
}
