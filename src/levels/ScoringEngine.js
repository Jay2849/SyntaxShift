export class ScoringEngine {
  static calculateRank(timeSec, promptsUsed) {
    if (promptsUsed <= 1 && timeSec < 3.0) return 'S-RANK';
    if (promptsUsed <= 2) return 'A-RANK';
    return 'B-RANK';
  }
}
