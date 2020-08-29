module.exports = {
  id: 0,
  name: '',
  icon: 0,
  value: 0,
  everyFrame: () => {},
  onCollide: function ({ itemArray }){
    this.destroy(itemArray);
  },
  destroy: function(itemArray) {
    itemArray.splice(this.id, 1);
  }
}