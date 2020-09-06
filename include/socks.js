socket = io.connect("http://127.0.0.1:3000");


//Atores
const actors = {
    players: {},
    spacestation: {},
    asteroids: [],
    items: [],
    missiles: [],
    explosions: [],
    debris: [],
};


socket.on("refresh", (data) => {
	actors.players = data.players || {};
    actors.asteroids = data.asteroids || [];
    actors.itens = data.itens || [];
    actors.missiles = data.missiles || [];
    actors.explosions = data.explosions || [];
    actors.debris = data.debris || [];
    actors.spacestation = data.spacestation || {};
});
