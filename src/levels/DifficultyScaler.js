export class DifficultyScaler {
  static getEnergyLimit(chamberId) {
    return chamberId === 5 ? 4 : 3;
  }
}
