export class VictoryModalController {
  static show(chamberName, timeSec, promptsUsed, score = 'S-RANK') {
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
      <div class="modal-card" style="text-align: center;">
        <div class="modal-title" style="color: var(--neon-green);">🏆 CHAMBER CLEARED!</div>
        <div class="modal-body">
          <h3 style="color: var(--text-bright);">${chamberName}</h3>
          <div style="margin: 16px 0; font-size: 1.2rem; display: flex; justify-content: space-around;">
            <div>⏱️ Time: <strong style="color: var(--neon-cyan);">${timeSec}s</strong></div>
            <div>⚡ Energy: <strong style="color: var(--neon-yellow);">${promptsUsed} used</strong></div>
            <div>⭐ Rank: <strong style="color: var(--neon-pink);">${score}</strong></div>
          </div>
        </div>
        <button class="btn-execute" id="btn-next-chamber" style="margin: 0 auto;">NEXT CHAMBER ➔</button>
      </div>
    `;
    document.body.appendChild(modal);
    document.getElementById('btn-next-chamber')?.addEventListener('click', () => modal.remove());
  }
}
