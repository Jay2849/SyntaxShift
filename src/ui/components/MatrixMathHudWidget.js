export class MatrixMathHudWidget {
  static updateFormula(elementId, vector) {
    const el = document.getElementById(elementId);
    if (el) el.textContent = `g_vec = (${vector.x.toFixed(2)}\u00ee, ${vector.y.toFixed(2)}\u00f4)`;
  }
}
