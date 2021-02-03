const createPlayer = (socket) => ({ name }) => {
  socket.emit('new_player', {
    id: socket.id,
    name,
    w: 64,
    h: 64,
    skin: 2,
  });
};

const updatePlayer = (socket) => (gameData) => {

  if (!gameData.player.hasOwnProperty('sprite')) return;
  const mouse = { x: gameData.mouseX, y: gameData.mouseY };
  const spr = gameData.player.sprite;
  spr.setPosition(gameData.player.x, gameData.player.y);
  spr.setAngle(gameData.player.direction);

  // console.log(gameData.player.direction)

  socket.emit('refresh', { mouse, width: 64, heigth: 64, hps: 0 });
};
