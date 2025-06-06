import { Body } from './body.js';

export class World {
  constructor(gravity = 9.8) {
    this.bodies = [];
    this.gravity = gravity;
  }

  addBody(body) {
    this.bodies.push(body);
  }

  update(dt) {
    for (const body of this.bodies) {
      body.applyForce(0, body.mass * this.gravity);
      body.update(dt);
    }
    this.handleCollisions();
  }

  handleCollisions() {
    for (let i = 0; i < this.bodies.length; i++) {
      for (let j = i + 1; j < this.bodies.length; j++) {
        const a = this.bodies[i];
        const b = this.bodies[j];
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy);
        if (dist < a.radius + b.radius) {
          const angle = Math.atan2(dy, dx);
          const totalMass = a.mass + b.mass;
          const overlap = a.radius + b.radius - dist;
          a.x -= (overlap * (b.mass / totalMass)) * Math.cos(angle);
          a.y -= (overlap * (b.mass / totalMass)) * Math.sin(angle);
          b.x += (overlap * (a.mass / totalMass)) * Math.cos(angle);
          b.y += (overlap * (a.mass / totalMass)) * Math.sin(angle);
        }
      }
    }
  }
}
