import { CHAMBER_CONFIGS } from './ChamberConfigs.js';

/**
 * SYNTAXSHIFT - LEVEL & CHAMBER MANAGER
 * Tracks energy prompt charges, active level index, win/death triggers, and level rebuilds.
 */
export class LevelManager {
  constructor(physicsWorld) {
    this.physicsWorld = physicsWorld;
    this.currentLevelIndex = 0;
    this.remainingEnergy = 3;
    this.isLevelActive = false;

    // Callbacks
    this.onStateChange = null;
    this.onWin = null;
    this.onDeath = null;

    // Bind collision events from PhysicsWorld
    this.physicsWorld.onLevelComplete = () => this.handleWin();
    this.physicsWorld.onPlayerDeath = (hazardType) => this.handleDeath(hazardType);
  }

  getCurrentChamber() {
    return CHAMBER_CONFIGS[this.currentLevelIndex];
  }

  loadChamber(index = 0) {
    if (index < 0) index = 0;
    if (index >= CHAMBER_CONFIGS.length) index = CHAMBER_CONFIGS.length - 1;

    this.currentLevelIndex = index;
    const config = this.getCurrentChamber();

    this.remainingEnergy = config.energyCharges;
    this.isLevelActive = true;

    // Reset physics world and rebuild entities
    this.physicsWorld.clearWorld();
    config.setup(this.physicsWorld);

    if (this.onStateChange) {
      this.onStateChange(this.getHUDState());
    }
  }

  resetCurrentChamber() {
    this.loadChamber(this.currentLevelIndex);
  }

  nextChamber() {
    if (this.currentLevelIndex < CHAMBER_CONFIGS.length - 1) {
      this.loadChamber(this.currentLevelIndex + 1);
    } else {
      // Loop back to level 0 or celebration
      this.loadChamber(0);
    }
  }

  consumeEnergy() {
    if (this.remainingEnergy > 0) {
      this.remainingEnergy--;
      if (this.onStateChange) {
        this.onStateChange(this.getHUDState());
      }
      return true;
    }
    return false;
  }

  handleWin() {
    if (!this.isLevelActive) return;
    this.isLevelActive = false;
    if (this.onWin) {
      this.onWin(this.getCurrentChamber());
    }
  }

  handleDeath(hazardType) {
    if (!this.isLevelActive) return;
    this.isLevelActive = false;
    if (this.onDeath) {
      this.onDeath(hazardType || 'hazard');
    }
  }

  getHUDState() {
    const chamber = this.getCurrentChamber();
    return {
      chamberNum: chamber.number,
      chamberName: chamber.name,
      chamberObjective: chamber.objective,
      levelIndex: this.currentLevelIndex,
      totalLevels: CHAMBER_CONFIGS.length,
      remainingEnergy: this.remainingEnergy,
      maxEnergy: chamber.energyCharges,
      gravityVector: this.physicsWorld.antiGravityEngine.currentGravityVector,
      isGlobalInverted: this.physicsWorld.antiGravityEngine.isGlobalInverted
    };
  }
}
