let Asteroid = require('./asteroid.js');
let Ship = require('./ship.js');
let Bullet = require('./bullet.js');

let Game = function() {
  this.asteroids = [];
  this.addAsteroids();
  this.ship = new Ship(this);
  this.bullets = [];

};
Game.DIM_X = 1000;
Game.DIM_Y = 800;
Game.NUM_ASTEROIDS = 10;

Game.prototype.addAsteroids = function() {
  for (var i = 0; i < Game.NUM_ASTEROIDS; i++) {
    let pos = this.randomPosition();
    let newAst = new Asteroid(pos, this);
    this.asteroids.push(newAst);
  }

};

Game.prototype.blowUpAsteroid = function (oldAst) {
  for (var i = 0; i < 3; i++) {
    let pos = [oldAst.pos[0], oldAst.pos[1]];
    let newAst = new Asteroid(pos, this);
    newAst.radius = 13;
    this.asteroids.push(newAst);
  }
  this.remove(oldAst);
};

Game.prototype.randomPosition = function() {
  let randX = Math.random() * Game.DIM_X;
  let randY = Math.random() * Game.DIM_Y;
  return [randX, randY];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(function (object) {
    object.draw(ctx);
  });
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(function (object) {
    object.move();
  });
};

Game.prototype.wrap = function (pos) {
  if (pos[0] <= 0) { pos[0] += Game.DIM_X; }
  if (pos[0] >= Game.DIM_X) { pos[0] -= Game.DIM_X; }
  if (pos[1] <= 0) { pos[1] += Game.DIM_Y; }
  if (pos[1] >= Game.DIM_Y) { pos[1] -= Game.DIM_Y; }
  return pos;
};

Game.prototype.checkCollisions = function () {
  let theseObjs = this.allObjects();
    for (var i = 0; i < theseObjs.length - 1; i++) {
      for (var j = i + 1; j < theseObjs.length; j++) {
        if (theseObjs[i].isCollidedWith(theseObjs[j])) {
          theseObjs[i].collideWith(theseObjs[j]);
        }
      }
    }
};

Game.prototype.remove = function (object) {
  if (object instanceof Asteroid) {
    let astIdx = this.asteroids.indexOf(object);
    this.asteroids.splice(astIdx, 1);
  } else if (object instanceof Bullet) {
    let btIdx = this.bullets.indexOf(object);
    this.bullets.splice(btIdx, 1);
  }
};

Game.prototype.step = function () {
  this.moveObjects();
  this.checkCollisions();

};

Game.prototype.allObjects = function () {
  return this.asteroids.concat(this.bullets).concat(this.ship);
};



module.exports = Game;
