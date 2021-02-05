const { max_aster_spd, room_height, room_width, fps } = require('../configs/config.json');

const createAsteroid = ({x, y, value, size}) => {
  const vspeed = ((Math.random() * max_aster_spd * 2 ) - max_aster_spd) / fps;
  const hspeed = ((Math.random() * max_aster_spd * 2 ) - max_aster_spd) / fps;
  const aspeed =  ((Math.random() * -180) + 90);
  return {
    x,
    y,
    size,
    w: 99,
    h: 99,
    value,
    life: 1 + Math.random() * 59,
    model: Math.round(Math.random() * 2),
    direction: 0,
    vspeed,
    hspeed,
    aspeed,
    damage: 10,
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
  }
};

module.exports = { createAsteroid };