const { fps } = require('../configs/config.json');
const MIN_DAMAGE = 3;

const createMissile = (player, createdAt) => (
  {
    owner: player.id,
    damage: player.damage || MIN_DAMAGE,
    type: 0,
    x: player.x,
    y: player.y,
    direction: player.direction,
    velocity: 500,
    createdAt,
    lifetime: player.life_shoot,
    isAlive: function (frames) {
      return (frames < this.createdAt + (this.lifetime * fps));
    },
    updatePosition: function () {
      this.x += (this.velocity * Math.sin(this.direction * Math.PI / 180)) / fps;
      this.y -= (this.velocity * Math.cos(this.direction * Math.PI / 180)) / fps;
    },
  }
);

module.exports = {
  createMissile,
}
