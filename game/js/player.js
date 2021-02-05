const checkPlayerCollision = (gameBuffer) =>  {
  const boundsPlayer = gameBuffer.player?.sprite.getBounds();
  const asteroidArray = gameBuffer.asteroidGroup?.children.entries;
  const actorArray = [...asteroidArray];
  for (i = 0; i < actorArray.length; i += 1) {
    const boundsActor = actorArray[i].getBounds();
    if (Phaser.Geom.Rectangle.Overlaps(boundsPlayer, boundsActor)) {
      return true;
    }
  }
  return false;
}

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

const updatePlayer = (socket) => (gameBuffer) => {
  const { player, keys } = gameBuffer;
  if (!player.hasOwnProperty('name')) return;
  player.sprite.setPosition(player.x, player.y);
  player.sprite.setAngle(player.direction);
  // Eventos
  if (checkPlayerCollision(gameBuffer)) {
    socket.emit('player_collision');
  }
  socket.emit('refresh', {
    action: action(keys),
    width: 64,
    height: 64,
    hps: 10,
  });
};