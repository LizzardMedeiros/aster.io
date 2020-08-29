const { max_aster_spd, fps } = require('../configs/config.json');

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
  getDamage: function() { return Math.round(30 / (1 + this.size)); }
});

module.exports = { createAsteroid };