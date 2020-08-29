const { room_width, room_height } = require('../configs/config.json');

const createPlayer = ({
  name,
  w,
  h,
  skin,
}) => {
  return {
    name,
    score: 0,
    life: 100,
    damage: 10,
    can_shoot: true,
    x: Math.random() * room_width,
    y: Math.random() * room_height,
    w,
    h,
    vspeed: 0,
    hspeed: 0,
    aspeed: 10,
    acceleration: 0,
    target: { x: 0, y: 0, mx: 0, my: 0 },
    direction: 0,
    model: 0,
    skin,
    listen: true,
    docked: false,
    power_up: [],
    getLevel: function() { return Math.floor(this.score/1000); }
  }
};

module.exports = {
  createPlayer
};