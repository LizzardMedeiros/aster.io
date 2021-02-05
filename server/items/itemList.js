const { checkCollision } = require('../phisics/');
// const { fps } = require('../configs/config.json');
const item = require('./item');

/*
** Script argument = { itemArray, playerArray, playerId }
** - itemArray - Array with all items present in the room
** - playerArray - Array with all connected players
** - playerId - Player ID who interacted with
*/

const itemFactory = (data) => (
  { ...item, ...data }
)

const itemList = [
  itemFactory({
    name: 'Minerals',
    value: 100,
    onCollide: function({ playerId, playerArray, itemArray }) {
      const self = itemArray[this.id];
      const player = playerArray[playerId];
      if (checkCollision(self, player, 200)) {
        player.score += this.value;
        this.destroy(itemArray);
      }
    }
  }),
  itemFactory({
    name: 'Magnet',
    icon: 2,
  }),
  itemFactory({
    name: 'Minerals',
    value: 100,
    onCollide: function({ playerId, playerArray, itemArray }) {
      const self = itemArray[this.id];
      const player = playerArray[playerId];
      if (checkCollision(self, player, 200)) {
        player.score += this.value;
        this.destroy(itemArray);
      }
    }
  }),
  itemFactory({
    name: 'Life',
    icon: 3,
    value: 5,
    onCollide: function({ playerId, playerArray, itemArray }) {
      const player = playerArray[playerId];
      if (player.hasOwnProperty('life')) {
        for (let life = this.value; player.life < 100; life--) {
          player.life++;
          if(life === 0) break;
        }
        this.destroy(itemArray);
      }
    }
  }),
];

module.exports = { itemList };