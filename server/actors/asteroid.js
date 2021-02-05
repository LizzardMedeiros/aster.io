const { max_aster_spd, fps } = require('../configs/config.json');
const actor = require('./actor');

const createAsteroid = ({x, y, value, size}) => {
  const vspeed = ((Math.random() * max_aster_spd * 2 ) - max_aster_spd) / fps;
  const hspeed = ((Math.random() * max_aster_spd * 2 ) - max_aster_spd) / fps;
  const aspeed =  ((Math.random() * -180) + 90);
  return {
    ...actor,
    aspeed,
    damage: 10,
    hspeed,
    life: 1 + Math.random() * 59,
    model: Math.round(Math.random() * 2),
    size,
    value,
    vspeed,
    x,
    y,
  }
};

module.exports = { createAsteroid };