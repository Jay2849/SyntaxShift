export class PresetChipsController {
  static bind(containerId, onSelect) {
    const c = document.getElementById(containerId);
    if (c) c.addEventListener('click', (e) => {
      const btn = e.target.closest('.chip-btn');
      if (btn && btn.dataset.prompt && onSelect) onSelect(btn.dataset.prompt);
    });
  }
}
