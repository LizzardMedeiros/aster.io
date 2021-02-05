const { room_height, room_width, fps } = require('../configs/config.json');
const { checkCollision } = require('../physics');

module.exports = {
  acceleration: 0,
  aspeed: 0,
  damage: 0,
  direction: 0,
  h: 64,
  hspeed: 0,
  life: 0,
  model: 0,
  size: 0,
  target: { x: 0, y: 0, mx: 0, my: 0 },
  value: 0,
  vspeed: 0,
  w: 64,
  x: 0,
  y: 0,
  updatePosition: function () {
    this.x = (this.x + this.hspeed > room_width)
    ? 0 : (this.x + this.hspeed < 0)
    ? room_width : (this.x + this.hspeed);
    this.y = (this.y + this.vspeed > room_height)
    ? 0 : (this.y + this.vspeed < 0)
    ? room_height : (this.y + this.vspeed);
  },
  updateDirection: function () {
    this.direction += (this.aspeed / fps);
  },
  checkCollision: function (actor) {
    if (!checkCollision(this, actor, Math.max(this.w, this.h))) return false;
    this.life -= Math.round(actor.damage || 0); 
    return true;
  },
}