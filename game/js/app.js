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

const gameBuffer = {
  player: {},
  keys: {},
  asteroids: [],
};

const game = new Phaser.Game(config);

function preload () {
  console.log('Carregando...');
  this.load.image('background_space', `${URL}/assets?path=bgs/bg_fundo_espacial.png`);
  this.load.image('spr_player', `${URL}/assets?path=spaceships/flea.png`);
  this.load.image('spr_asteroid', `${URL}/assets?path=asteroids/B0.png`);
}

function create () {
  console.log('Connected...');
  createPlayer(socket)({ name: 'Lizzard' });
  gameBuffer.keys.thrust = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  gameBuffer.keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  gameBuffer.keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

  // Sockets
  socket.on(socket.id, (server) => {
    const { room_width, room_height } = server;
    this.cameras.main.setBounds(0, 0, room_width, room_height);
    this.add
      .tileSprite(0, 0, room_width, room_height, 'background_space')
      .setOrigin(0);
    gameBuffer.player.sprite = this.add
      .sprite(0, 0, 'spr_player')
      .setDepth(5);
    this.cameras.main.startFollow(gameBuffer.player.sprite);
  });

  socket.on('refresh_data', (data) => {
    gameBuffer.asteroids = data.asteroids;
    gameBuffer.player = { ...gameBuffer.player, ...data.players[socket.id] };
  });
}

function update () {
  updatePlayer(socket)(gameBuffer);
  updateAsteroids(gameBuffer);
}