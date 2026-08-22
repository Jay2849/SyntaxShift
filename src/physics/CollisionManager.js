import Matter from 'matter-js';

export class CollisionManager {
  static processPairs(pairs, onGoal, onDeath) {
    for (let i = 0; i < pairs.length; i++) {
      const { bodyA, bodyB } = pairs[i];
      const isSpark = bodyA.label === 'spark' || bodyB.label === 'spark';
      const other = bodyA.label === 'spark' ? bodyB : bodyA;
      if (isSpark) {
        if (other.label === 'portal' && onGoal) onGoal();
        if ((other.label === 'laser_grid' || other.label === 'spikes') && onDeath) onDeath(other.label);
      }
    }
  }
}
