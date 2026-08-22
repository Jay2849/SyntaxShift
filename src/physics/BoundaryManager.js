import Matter from 'matter-js';

export class BoundaryManager {
  static createBounds(world, width, height, thickness = 40) {
    const w = width, h = height, t = thickness;
    const walls = [
      Matter.Bodies.rectangle(w / 2, -t / 2, w + 2 * t, t, { isStatic: true, label: 'wall_ceiling' }),
      Matter.Bodies.rectangle(w / 2, h + t / 2, w + 2 * t, t, { isStatic: true, label: 'wall_floor' }),
      Matter.Bodies.rectangle(-t / 2, h / 2, t, h + 2 * t, { isStatic: true, label: 'wall_left' }),
      Matter.Bodies.rectangle(w + t / 2, h / 2, t, h + 2 * t, { isStatic: true, label: 'wall_right' })
    ];
    walls.forEach(wall => Matter.World.add(world, wall));
    return walls;
  }
}
