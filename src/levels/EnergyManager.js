export class EnergyManager {
  static refillEnergy(levelState) {
    levelState.remainingEnergy = levelState.maxEnergy;
  }
}
