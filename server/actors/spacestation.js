const { room_width, room_height } = require('../configs/config.json');

const createSpacestation = (players) => ({
	x: Math.random() * room_width,
	y: Math.random() * room_height,
	w: 512,
	h: 512,
	direction: 0,
	slots: [],
	vault: {},
	hspeed: -(Math.random() * 2) + 1,
	vspeed: -(Math.random() * 2) + 1,
	aspeed: Math.random() * 15,
	dock: function(player_id) {
		if(!players.hasOwnProperty(player_id)) return;
		this.slots.forEach(id => { if (id === player_id) return; });
		if(players[player_id].score < 1000) return;
		if(this.slots.length < 5){
			this.slots.push(player_id);
			if(!this.vault.hasOwnProperty(player_id)) this.vault[player_id] = 0;
			players[player_id].acceleration = 0;
			players[player_id].docked = true;
		}
	},
	undock: function(player_id){
		this.slots.forEach((id, i) => {
			if(id === player_id){
				this.slots.splice(i, 1);
				if(players.hasOwnProperty(player_id)) players[player_id].docked = false;
				return;
			}
		});
	},
	getDock: function(player_id) {
		if(!players.hasOwnProperty(player_id) || !players[player_id].docked) return -1;
		for(var i=0; i<this.slots.length; i++){
			if(player_id === this.slots[i]) return i;
		}
		return -1;
	},
	processDocks: function() {
		Object.keys(this.vault).forEach((player_id) => {
			if(!players.hasOwnProperty(player_id)) delete(this.vault[player_id]);
			else{
				if(players[player_id].docked){
					if(players[player_id].score > 0){
						//Computing score
						if(players[player_id].score > 10){
							players[player_id].score -= 10;
							this.vault[player_id] += 10;						
						}else{
							players[player_id].score--;
							this.vault[player_id]++;						
						}
						//Regenerate Life
						if(players[player_id].life < 100) players[player_id].life++;
					}else {
						this.undock(player_id);
					}
				}
			}
		});
	}
});

module.exports = { createSpacestation };