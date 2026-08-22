export class HUDController {
  static updateStats(levelStr, energyStr, gravStr, isInv) {
    const lvl = document.getElementById('hud-level-num');
    if (lvl) lvl.textContent = levelStr;
  }
}
