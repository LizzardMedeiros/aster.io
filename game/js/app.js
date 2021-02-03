const URL = 'http://localhost';
const socket = io(`${URL}:4555`);

const config = {
  type: Phaser.AUTO,
  width: window.innerWidth,
  height: window.innerHeight,
  scene: {
      preload,
      create,
      update,
  }
};

const gameData = {
  player: {},
  asteroids: [],
  mouseX: 0,
  mouseY: 0,
};

const game = new Phaser.Game(config);

function preload () {
  console.log('Carregando...');
  this.load.image('background_space', `${URL}/assets?path=bgs/bg_fundo_espacial.png`);
  this.load.image('spr_player', `${URL}/assets?path=spaceships/flea.png`);
}

function create () {
  console.log('Connected...');

  this.input.on('pointermove', (mouse) => {
    gameData.mouseX = mouse.worldX;
    gameData.mouseY = mouse.worldY;
  });

  createPlayer(socket)({ name: 'Lizzard' });

  // Sockets
  socket.on(socket.id, (server) => {
    const { room_width, room_height } = server;
    // this.cameras.main.setBounds(0, 0, window.innerWidth, window.innerHeight);
    this.add
      .tileSprite(0, 0, room_width, room_height, 'background_space')
      .setOrigin(0);
    gameData.player.sprite = this.add
      .sprite(0, 0, 'spr_player')
      .setDepth(5);
    this.cameras.main.startFollow(gameData.player.sprite);
  });

  socket.on('refresh_data', (data) => {
    gameData.player = { ...gameData.player, ...data.players[socket.id] };
    // console.log(data.players[socket.id].direction);
  });
}

function update () {
  updatePlayer(socket)(gameData);

}