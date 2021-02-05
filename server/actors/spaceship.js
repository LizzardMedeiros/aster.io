const { fps, room_width, room_height } = require('../configs/config.json');
const actor = require('./actor');

const createPlayer = ({name, w, h, skin}) => ({
  ...actor,
  can_shoot: true,
  projectileDeadline: 2, // in Seconds
  h,
  name,
  skin,
  w,
  x: Math.random() * room_width,
  y: Math.random() * room_height,
  updateSpeed: function() {
    this.hspeed -= (this.acceleration * Math.sin(this.direction * Math.PI / 180)) / fps;
    this.vspeed += (this.acceleration * Math.cos(this.direction * Math.PI / 180)) / fps;
  },
  updateDirection: function() {
    const { max_aspeed } = this;
    if (this.aspeed > max_aspeed) this.aspeed = max_aspeed;
    else if (this.aspeed < -max_aspeed) this.aspeed = -max_aspeed;
    this.direction += this.aspeed;
    // const tx = this.target.mx - this.x + 0.5;
    // const ty = this.target.my - this.y + 0.5;
    // this.direction = (Math.degrees(Math.atan2(ty, tx)) + 90) % 359;
  },
});
/*
  {
    name,
    score: 0,
    life: 100,
    damage: 10,
    can_shoot: true,
    life_shoot: 2,
    x: Math.random() * room_width,
    y: Math.random() * room_height,
    w,
    h,
    vspeed: 0,
    hspeed: 0,
    aspeed: 0,
    max_aspeed: 180,
    acceleration: 0,
    direction: 0,
    target: { x: 0, y: 0, mx: 0, my: 0 },
    model: 0,
    skin,
    listen: true,
    docked: false,
    power_up: [],
    getLevel: function () { return Math.floor(this.score / 1000); },
    checkCollision: function (actor) {
      if (!checkCollision(this, actor, Math.max(this.w, this.h))) return false;
      this.life -= Math.round(actor.damage || 0); 
      return true;
    },
    updatePosition: function() {
      this.x = (this.x + this.hspeed > room_width)
        ? 0 : (this.x + this.hspeed < 0)
        ? room_width : (this.x + this.hspeed);
      this.y = (this.y + this.vspeed > room_height)
        ? 0 : (this.y + this.vspeed < 0)
        ? room_height : (this.y + this.vspeed);     
    },
    updateSpeed: function() {
			this.hspeed -= (this.acceleration * Math.sin(this.direction * Math.PI / 180)) / fps;
			this.vspeed += (this.acceleration * Math.cos(this.direction * Math.PI / 180)) / fps;
    },
    updateDirection: function() {
      const { max_aspeed } = this;
      if (this.aspeed > max_aspeed) this.aspeed = max_aspeed;
      else if (this.aspeed < -max_aspeed) this.aspeed = -max_aspeed;
      this.direction += this.aspeed;

      // const tx = this.target.mx - this.x + 0.5;
      // const ty = this.target.my - this.y + 0.5;
      // this.direction = (Math.degrees(Math.atan2(ty, tx)) + 90) % 359;

    }
  }
);
*/
module.exports = {
  createPlayer
};