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
  actors: {},
  asteroidGroup: {},
  missileGroup: {},
};

const game = new Phaser.Game(config);

function preload () {
  console.log('Carregando...');
  // Assets
  this.load.image('background_space', `${URL}/assets?path=bgs/bg_fundo_espacial.png`);
  this.load.image('spr_player', `${URL}/assets?path=spaceships/flea.png`);
  this.load.image('spr_missile', `${URL}/assets?path=missile/blue00.png`);
  this.load.image('spr_asteroid', `${URL}/assets?path=asteroids/B0.png`);
}

function create () {
  console.log('Connected...');
  createPlayer(socket)({ name: 'Lizzard' });
  // Controls
  gameBuffer.keys.thrust = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
  gameBuffer.keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
  gameBuffer.keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
  gameBuffer.keys.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

  gameBuffer.asteroidGroup = this.add.group();
  gameBuffer.missileGroup = this.add.group();

  console.log(gameBuffer.asteroidGroup)

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
    gameBuffer.actors.asteroids = data.asteroids;
    gameBuffer.actors.missiles = data.missiles;
    gameBuffer.player = { ...gameBuffer.player, ...data.players[socket.id] };
  });
}

function update () {
  //if (game.config.width !== window.innerWidth) game.config.width = window.innerWidth;
  //if (game.config.height !== window.innerHeight) game.config.height = window.innerHeight;
  updatePlayer(socket)(gameBuffer);
  updateActor(gameBuffer)('spr_asteroid');
  updateActor(gameBuffer)('spr_missile');
}
