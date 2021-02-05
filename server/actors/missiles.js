const { fps } = require('../configs/config.json');
const actor = require('./actor');
const MIN_DAMAGE = 3;

const createMissile = (player, createdAt) => (
  {
    ...actor,
    createdAt,
    damage: player.damage || MIN_DAMAGE,
    direction: player.direction,
    groupName: 'missile',
    life: player.projectileDeadline,
    owner: player.id,
    vspeed: 500,
    x: player.x,
    y: player.y,
    isAlive: function (frames) {
      return (frames < this.createdAt + (this.life * fps));
    },
    updatePosition: function () {
      this.x += (this.vspeed * Math.sin(this.direction * Math.PI / 180)) / fps;
      this.y -= (this.vspeed * Math.cos(this.direction * Math.PI / 180)) / fps;
    },
  }
);

module.exports = {
  createMissile,
}
