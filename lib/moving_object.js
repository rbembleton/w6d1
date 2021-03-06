let Util = require('./util.js');

let MovingObject = function (options) {
  this.pos = options.pos;
  this.vel = options.vel;
  this.radius = options.radius;
  this.color = options.color;
  this.game = options.game;
};

MovingObject.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();

  ctx.arc(
    this.pos[0],
    this.pos[1],
    this.radius,
    0,
    2 * Math.PI,
    false
  );

  ctx.fill();
};

MovingObject.prototype.move = function () {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function (otherObject) {
  let collDist = this.radius + otherObject.radius;
  let currDist = Math.sqrt(Math.pow((this.pos[0] - otherObject.pos[0]),2) + Math.pow((this.pos[1] - otherObject.pos[1]),2));
  return (collDist >= currDist);
};

MovingObject.prototype.collideWith = function (otherObject) {
  // if (this instanceof Asteroid) {
  //
  //   if (otherObject instanceof Ship) {
  //     otherObject.relocate();
  //   }
  //
  //   if (otherObject instanceof Bullet) {
  //     this.game.remove(otherObject);
  //   }
  //
  // }
};





module.exports = MovingObject;
