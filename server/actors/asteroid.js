const { max_aster_spd, room_height, room_width, fps } = require('../configs/config.json');

const createAsteroid = ({x, y, value, size}) => ({
  x,
  y,
  size,
  w: 99,
  h: 99,
  value,
  life: 1 + Math.random() * 59,
  model: Math.round(Math.random() * 2),
  direction: 0,
  vspeed: ((Math.random() * max_aster_spd * 2 ) - max_aster_spd) / fps,
  hspeed: ((Math.random() * max_aster_spd * 2 ) - max_aster_spd) / fps,
  aspeed: ((Math.random() * -180) + 90),
  updatePosition: function () {
    this.x = (this.x + this.hspeed > room_width)
    ? 0 : (this.x + this.hspeed < 0)
    ? room_width : (x + this.hspeed);
    this.y = (this.y + this.vspeed > room_height)
    ? 0 : (this.y + this.vspeed < 0)
    ? room_height : (this.y + this.vspeed);
  },
  updateDirection: function () {
    this.direction += (this.aspeed / fps);
  },
  getDamage: function () { return Math.round(30 / (1 + this.size)); }
});

module.exports = { createAsteroid };