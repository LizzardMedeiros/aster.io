const action = (keys) => ({
  left: keys.left && keys.left.isDown,
  right: keys.right && keys.right.isDown,
  thrust: keys.thrust && keys.thrust.isDown,
  fire: keys.fire && keys.fire.isDown,
});

const createPlayer = (socket) => ({ name }) => {
  socket.emit('new_player', {
    id: socket.id,
    name,
    w: 64,
    h: 64,
    skin: 2,
  });
};

const updatePlayer = (socket) => ({ player, keys }) => {
  if (!player.hasOwnProperty('name')) return;
  player.sprite.setPosition(player.x, player.y);
  player.sprite.setAngle(player.direction);
  socket.emit('refresh', {
    action: action(keys),
    width: 64,
    height: 64,
    hps: 10,
  });
};