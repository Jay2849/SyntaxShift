export class ChamberWeatherParticles {
  static getWeatherColor(chamberId) {
    const colors = { 1: '#00f3ff', 2: '#b537f2', 3: '#ff0055', 4: '#ffe600', 5: '#00ff66' };
    return colors[chamberId] || '#00f3ff';
  }
}
