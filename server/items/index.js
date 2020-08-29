const { itemList } = require('./itemList');

const createRandomItem = (x, y) => {
  const item = itemList[ Math.floor(Math.random() * itemList.length) ];
  return {
    ...item,
    x, y
  }
};

module.exports = {
  createRandomItem
}