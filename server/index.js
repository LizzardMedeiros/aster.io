const configs = require('./configs/config.json');
const gameServer = require('http').createServer();
const io = require('socket.io')(gameServer,{
  cors: {
    origin: 'http://localhost:80',
    methods: [ 'GET', 'POST' ],
  }
});

const { createPlayer } = require('./actors/spaceship');
const { createSpacestation } = require('./actors/spacestation');
const { createAsteroid } = require('./actors/asteroid');
const { createRandomItem } = require('./items');

const playerList = {};
let asteroids_array = [];
let itemArray = [];
let missile_array = [];
let explosion_array = [];
let debris_array = [];

let frames = 0;

const space_station = createSpacestation(playerList);

//Game
const run = () => {
	//computing players
	Object.keys(playerList).forEach((pl) => {
    const player = playerList[pl];
    const {
      docked,
      target,
      aspeed,
      w,
      h,
      // power_up
    } = player;

    if (!docked) {
			//Easing Rotate
			target.x += (target.mx - target.x) / aspeed;
      target.y += (target.my - target.y) / aspeed;
      player.updateDirection();
      player.updatePosition();
      player.updateSpeed();
		} else {
			const d = space_station.direction + space_station.getDock(pl) * 72;
			player.x = (space_station.x + space_station.w / 2 - w / 2) - space_station.w / 2 * Math.sin(d * Math.PI / 180);
			player.y = (space_station.y + space_station.w / 2 - h / 2) + space_station.w / 2 * Math.cos(d * Math.PI / 180);
			player.direction = d % 359;
    }
    
    //Computing powerups
    itemArray.forEach((item) => {
      item.everyFrame({ itemArray, playerList, asteroids_array, missile_array });
    });

	});

	//Computing spacestation
	space_station.direction += space_station.aspeed / configs.fps;
	space_station.direction = space_station.direction % 359;
	space_station.x = (space_station.x > configs.room_width) ? -space_station.w :
	(space_station.x + space_station.w < 0) ? configs.room_width : (space_station.x + space_station.hspeed);
	space_station.y = (space_station.y > configs.room_height) ? -space_station.h :
	(space_station.y + space_station.h < 0) ? configs.room_height : (space_station.y + space_station.vspeed);
	space_station.processDocks();

	//Computing asteroids
	asteroids_array.forEach(({ aspeed, hspeed, vspeed, x, y }, i) => {
    const asteroid = asteroids_array[i];
		asteroid.direction += (aspeed/configs.fps);
		asteroid.x = (x + hspeed > configs.room_width) ? 0 : (x + hspeed < 0) ? configs.room_width : (x + hspeed);
		asteroid.y = (y + vspeed > configs.room_height) ? 0 : (y + vspeed < 0) ? configs.room_height : (y + vspeed);		
	});

	//Computing missiles
	missile_array.forEach(({velocity, direction, created, lifetime }, i) => {
    const missile = missile_array[i];
		missile.x += (velocity * Math.sin(direction * Math.PI / 180)) / configs.fps;
		missile.y -= (velocity * Math.cos(direction * Math.PI / 180)) / configs.fps;
		if (frames > created + (lifetime * configs.fps)) missile_array.splice(i, 1);
  });
  
  //Computing items
  itemArray.forEach((item) => {
    item.everyFrame({ itemArray, playerList, asteroids_array, missile_array });
  });

	const gameData = {
		players: playerList,
		asteroids: asteroids_array,
		missiles: missile_array,
		explosions: explosion_array,
    debris: debris_array,
		itens: itemArray.map(({ icon, x, y }) => (
      { icon, x, y }
    )),
    spacestation: {
      x: space_station.x,
      y: space_station.y,
      direction: space_station.direction,
    },
  };

	frames += 1;
	io.sockets.emit('refresh_data', gameData);
	explosion_array = [];
	debris_array = [];
	loop = setTimeout(run, 1000 / configs.fps);
}

const generateAsteroid = (val, size, x, y) => {
	const { max_aster_count } = configs;
	if(asteroids_array.length < max_aster_count)
	asteroids_array.push(createAsteroid({ x, y, val, size }));
}

//listen on every connection
io.on('connection', (socket) => {
	console.log('New player connected');

	//default username
  socket.username = "Anonymous"

	//listen new players
  socket.on('new_player', ({ id, name, w, h, skin }) => {
    const { max_users, room_width, room_height, version, fps } = configs;
    if (Object.keys(playerList).length < max_users) {
      playerList[id] = Object.assign(createPlayer({ name, w, h, skin }));
      io.sockets.emit(id, {
        state: 2,
        version,
        fps,
        room_width,
        room_height,
      });
    }else{
      console.log('max players', playerList.length);
      io.sockets.emit(id, { state: -1 });    		
    }
  });

  socket.on('player_update', ({ key, pressed, direction }) => {
    if(!playerList.hasOwnProperty(socket.id)) return;
    playerList[socket.id].direction = direction;
    switch (key) {
      case 0:
        if (pressed) playerList[socket.id].acceleration = -1.2;
        else playerList[socket.id].acceleration = 0;
      break;
      case 1:
        const cond =
          checkCollision(playerList[socket.id], space_station, 100) &&
          !playerList[socket.id].docked &&
          (playerList[socket.id].score >= 1000);
        (cond) ? space_station.dock(socket.id) : space_station.undock(socket.id);
      break;
      case 3: //shoot
        if(!playerList[socket.id].docked) shoot(socket.id);
      break;
      default:
        break;
    }
  });

  socket.on('check_item_collision', () => {
    if(playerList.hasOwnProperty(socket.id)){
      const playerId = socket.id;
      itemArray.forEach((item) => {
        item.onCollide({ itemArray, playerList, playerId });
      });
    }
  });

  socket.on('check_player_collision', () => {
    if (playerList.hasOwnProperty(socket.id)) {
      if (playerList[socket.id].docked) return;
      asteroids_array.forEach((as, i) => {
        if(checkCollision(playerList[socket.id], as, as.w))
        {
          playerList[socket.id].life -= Math.round(as.getDamage()); 
          if(playerList[socket.id].life <= 0) destroyPlayer(socket.id);
          destroyAsteroid(i);
          return;
        }
      });
    }
  });

  socket.on('check_missile_collision', () => {
    if(playerList.hasOwnProperty(socket.id)){
      asteroids_array.forEach((as, i) => {
        missile_array.forEach((mi, j) => {
          if(checkCollision(mi, as, 99)) {
            // const dir = (mi.direction+90) % 359;
            // setForce(as, dir, -1);
            as.life -= (mi.damage + 20);
            if (as.life <= 0) destroyAsteroid(i);
            missile_array.splice(j, 1);
            return;
          }
        });
      });
    }
  });

  socket.on('check_missile_hit', () => {
    const { w, life } = playerList[socket.id];
    missile_array.forEach((mi, i) => {
      if (!playerList.hasOwnProperty(socket.id)) return;
      if (checkCollision(mi, playerList[socket.id], w))
      {
        if (mi.owner !== socket.id) {
          life -= mi.damage;
          if(life <= 0) destroyPlayer(socket.id);
          missile_array.splice(i, 1);
        }
        return;
      }
    });
  });  

  socket.on('refresh', ({ action, width, height, hps }) => {
    if (!playerList.hasOwnProperty(socket.id)) return;
    if (playerList[socket.id].docked) return;
    /*
    if (mouse) {
      playerList[socket.id].target.mx = mouse.x;
      playerList[socket.id].target.my = mouse.y;			
    }
    */
    if (action.left) playerList[socket.id].aspeed -= configs.angular_acc;
    if (action.right) playerList[socket.id].aspeed += configs.angular_acc;
    if (action.thrust) {
      playerList[socket.id].acceleration = configs.thrust_acc;
    } else playerList[socket.id].acceleration = 0;
    if (hps) {
      configs.hashes += hps;
      playerList[socket.id].model = Math.min(playerList[socket.id].getLevel(), 1);
      playerList[socket.id].w = Math.max(width, 64);
      playerList[socket.id].h = Math.max(height, 64);

      if (configs.hashes >= 1000) {
        generateAsteroid(
          (configs.hashes/2),
          0,
          Math.random() * configs.room_width,
          0
        );
        configs.hashes = 0;
      }
    }
  });

  socket.on('disconnect', () => {
    if (playerList.hasOwnProperty(socket.id)) {
      space_station.undock(socket.id);
      delete playerList[socket.id];
    }
  });
});

function shoot(player) {
  const { docked, can_shoot, damage, getLevel, x, y, w, h, direction } = playerList[player];
	if(!playerList.hasOwnProperty(player)) return;
	if(docked) return;
	if(can_shoot) {
    playerList[player].can_shoot = false;
		missile_array.push({
			owner: player,
			damage: damage + getLevel() * 3, //A cada nível, aumenta 3 de dano
			type: (getLevel() === 1) ? 1 : 0,
			x: x + (w / 2) + 26 * Math.sin(direction * Math.PI / 180),
			y: y + (h / 2) - 26,
			direction,
			velocity: configs.speed_shot,
			created: frames,
			lifetime: configs.life_shot
		});
		setTimeout(() => {
      if(playerList.hasOwnProperty(player)) playerList[player].can_shoot = true;
		}, configs.time_shot);
	}
}

function destroyPlayer(player) {
  if (!playerList.hasOwnProperty(player)) return;
  const { docked, x, y, score } = playerList[player];
	if(docked) return;
	const pos = {x, y};
	explosion_array.push(pos);
	debris_array.push(pos);
	if(score > 0){
		createItem(
			x,
			y,
			// score > 2000 ? 1 : 0,
			// score
		);
	}
	delete playerList[player];
}

function destroyAsteroid(i) {
  const { size, x, y, value } = asteroids_array[i];
	if (size < 2) {
		const val = Math.floor(value / 3);
		const sz = size + 1; 
		for(let j=0; j<3; j++) generateAsteroid(val, sz, x, y);
	}
	explosion_array.push({x, y});
	createItem(
		x,
		y,
		// (Math.random() > 0.2) ? 0 : (Math.random() > 0.2) ? 3 : 2,
		// value
	);
	asteroids_array.splice(i, 1);
}

function createItem(x, y /*, type, value */) {
	itemArray.push(
    createRandomItem(x, y)
  );
}

//Physics
Math.degrees = (radians) => {
  return radians / Math.PI * 180;
};

function easingDirection(_old, _new, spd) {
	if(_old === _new) return _old;
	const o = _old % 179;
	const n = _new % 179;
	if(o > n) return (_old + spd);
	else return (_old - spd);
}

function setForce(obj, direction, force) {
	obj.hspeed -= force * Math.sin(direction * Math.PI / 180);
	obj.vspeed += force * Math.cos(direction * Math.PI / 180);
}

function checkCollision(obj1, obj2, radius) {
  if(!obj1 || !obj2) return;
  const { x: x1, y: y1, w: w1, h: h1 } = obj1;
  const { x: x2, y: y2, w: w2, h: h2 } = obj2;

	const xx = obj1.hasOwnProperty('w') ? x1 + (w1 / 2) : x1;
	const yy = obj1.hasOwnProperty('h') ? y1 + (h1 / 2) : y1;
	const xx2 = obj2.hasOwnProperty('w') ? x2 + (w2/ 2) : x2;
  const yy2 = obj2.hasOwnProperty('h') ? y2 + (h2 / 2) : y2;

	return Math.sqrt(Math.pow(xx - xx2, 2) + Math.pow(yy - yy2, 2)) <= radius;
};

module.exports = {
  run,
  gameServer,
}