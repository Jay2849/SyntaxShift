export class LevelProgressBar {
  static render(containerId, currentIdx, total = 5) {
    const c = document.getElementById(containerId);
    if (!c) return;
    let html = '<div style="display:flex;align-items:center;gap:6px;font-size:0.75rem;">';
    for (let i = 0; i < total; i++) {
      const active = i === currentIdx;
      const done = i < currentIdx;
      const color = active ? 'var(--neon-cyan)' : done ? 'var(--neon-green)' : 'var(--text-muted)';
      html += `<span style="padding:2px 8px;border-radius:4px;border:1px solid ${color};color:${color};background:${active ? 'rgba(0,243,255,0.2)' : 'transparent'}">CH ${i+1}</span>`;
      if (i < total - 1) html += '<span style="color:var(--text-muted);">&#8702;</span>';
    }
    html += '</div>';
    c.innerHTML = html;
  }
}
