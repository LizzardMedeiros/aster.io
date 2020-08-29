gdjs.GameCode = {};
gdjs.GameCode.GDobj_95spaceshipObjects1= [];
gdjs.GameCode.GDobj_95spaceshipObjects2= [];
gdjs.GameCode.GDobj_95spaceshipObjects3= [];
gdjs.GameCode.GDobj_95spaceshipObjects4= [];
gdjs.GameCode.GDspr_95backgroundObjects1= [];
gdjs.GameCode.GDspr_95backgroundObjects2= [];
gdjs.GameCode.GDspr_95backgroundObjects3= [];
gdjs.GameCode.GDspr_95backgroundObjects4= [];
gdjs.GameCode.GDobj_95asteroidObjects1= [];
gdjs.GameCode.GDobj_95asteroidObjects2= [];
gdjs.GameCode.GDobj_95asteroidObjects3= [];
gdjs.GameCode.GDobj_95asteroidObjects4= [];
gdjs.GameCode.GDobj_95playerObjects1= [];
gdjs.GameCode.GDobj_95playerObjects2= [];
gdjs.GameCode.GDobj_95playerObjects3= [];
gdjs.GameCode.GDobj_95playerObjects4= [];
gdjs.GameCode.GDobj_95plnameObjects1= [];
gdjs.GameCode.GDobj_95plnameObjects2= [];
gdjs.GameCode.GDobj_95plnameObjects3= [];
gdjs.GameCode.GDobj_95plnameObjects4= [];
gdjs.GameCode.GDobj_95scoreObjects1= [];
gdjs.GameCode.GDobj_95scoreObjects2= [];
gdjs.GameCode.GDobj_95scoreObjects3= [];
gdjs.GameCode.GDobj_95scoreObjects4= [];
gdjs.GameCode.GDobj_95topObjects1= [];
gdjs.GameCode.GDobj_95topObjects2= [];
gdjs.GameCode.GDobj_95topObjects3= [];
gdjs.GameCode.GDobj_95topObjects4= [];
gdjs.GameCode.GDobj_95wtextObjects1= [];
gdjs.GameCode.GDobj_95wtextObjects2= [];
gdjs.GameCode.GDobj_95wtextObjects3= [];
gdjs.GameCode.GDobj_95wtextObjects4= [];
gdjs.GameCode.GDobj_95explosionObjects1= [];
gdjs.GameCode.GDobj_95explosionObjects2= [];
gdjs.GameCode.GDobj_95explosionObjects3= [];
gdjs.GameCode.GDobj_95explosionObjects4= [];
gdjs.GameCode.GDobj_95bulletObjects1= [];
gdjs.GameCode.GDobj_95bulletObjects2= [];
gdjs.GameCode.GDobj_95bulletObjects3= [];
gdjs.GameCode.GDobj_95bulletObjects4= [];
gdjs.GameCode.GDobj_95itemObjects1= [];
gdjs.GameCode.GDobj_95itemObjects2= [];
gdjs.GameCode.GDobj_95itemObjects3= [];
gdjs.GameCode.GDobj_95itemObjects4= [];
gdjs.GameCode.GDobj_95missileObjects1= [];
gdjs.GameCode.GDobj_95missileObjects2= [];
gdjs.GameCode.GDobj_95missileObjects3= [];
gdjs.GameCode.GDobj_95missileObjects4= [];
gdjs.GameCode.GDobj_95debrisObjects1= [];
gdjs.GameCode.GDobj_95debrisObjects2= [];
gdjs.GameCode.GDobj_95debrisObjects3= [];
gdjs.GameCode.GDobj_95debrisObjects4= [];
gdjs.GameCode.GDobj_95thrustObjects1= [];
gdjs.GameCode.GDobj_95thrustObjects2= [];
gdjs.GameCode.GDobj_95thrustObjects3= [];
gdjs.GameCode.GDobj_95thrustObjects4= [];
gdjs.GameCode.GDobj_95stationObjects1= [];
gdjs.GameCode.GDobj_95stationObjects2= [];
gdjs.GameCode.GDobj_95stationObjects3= [];
gdjs.GameCode.GDobj_95stationObjects4= [];
gdjs.GameCode.GDobj_95hpObjects1= [];
gdjs.GameCode.GDobj_95hpObjects2= [];
gdjs.GameCode.GDobj_95hpObjects3= [];
gdjs.GameCode.GDobj_95hpObjects4= [];
gdjs.GameCode.GDobj_95lifebarObjects1= [];
gdjs.GameCode.GDobj_95lifebarObjects2= [];
gdjs.GameCode.GDobj_95lifebarObjects3= [];
gdjs.GameCode.GDobj_95lifebarObjects4= [];
gdjs.GameCode.GDbtn_95restartObjects1= [];
gdjs.GameCode.GDbtn_95restartObjects2= [];
gdjs.GameCode.GDbtn_95restartObjects3= [];
gdjs.GameCode.GDbtn_95restartObjects4= [];

gdjs.GameCode.conditionTrue_0 = {val:false};
gdjs.GameCode.condition0IsTrue_0 = {val:false};
gdjs.GameCode.condition1IsTrue_0 = {val:false};
gdjs.GameCode.condition2IsTrue_0 = {val:false};
gdjs.GameCode.condition3IsTrue_0 = {val:false};


gdjs.GameCode.userFunc0x13975ca0 = function(runtimeScene) {
hp = runtimeScene.getObjects("obj_hp")[0];
score = runtimeScene.getObjects("obj_score")[0];

obj_player = new Object();
obj_spacestation = new Object();
obj_asteroid = [];
obj_item = [];
obj_bullet = [];

};
gdjs.GameCode.eventsList0x21effc80 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975ca0(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21effc80
gdjs.GameCode.userFunc0x13975c30 = function(runtimeScene) {
//Players

//creation
Object.keys(players).forEach(function(id) {
	if(!obj_player.hasOwnProperty(id))
	{
		obj_player[id] = {
			player : (id != socket.id) ? runtimeScene.createObject("obj_spaceship") : runtimeScene.createObject("obj_player"),
			name : runtimeScene.createObject("obj_plname"),
			thrust : runtimeScene.createObject("obj_thrust"),
			lifebar : (id == socket.id) ? {} : runtimeScene.createObject("obj_lifebar")
		};
		obj_player[id].player.setZOrder(10);
		obj_player[id].name.setZOrder(11);
		obj_player[id].thrust.setZOrder(9);
	}
});
let top_players = new Array(0);

//Process
Object.keys(obj_player).forEach(function(id) {
	if(players.hasOwnProperty(id))
	{
		obj_player[id].player.setAnimationFrame(players[id].skin);
		obj_player[id].player.setPosition(players[id].x, players[id].y);
		obj_player[id].player.setAngle(players[id].direction);
		obj_player[id].name.setPosition(players[id].x, players[id].y + players[id].w);
		obj_player[id].name.setString(players[id].name || "Unknown");
		obj_player[id].thrust.setAnimation(players[id].acceleration != 0 ? 1 : 0);
		obj_player[id].thrust.setPosition(
			(players[id].x + 26) - (players[id].w) * Math.sin(players[id].direction * Math.PI / 180),
			(players[id].y - 7) + 104 * Math.cos(players[id].direction * Math.PI / 180)
		);
		obj_player[id].thrust.setAngle(players[id].direction);
		var delta = players[id].life/100;
		if(id == socket.id)
		{
			score.setString("Score: "+players[id].score+" - Nano: ~"+(players[id].score * runtimeScene.getGame().getVariables().get("hash_value").getAsNumber()).toFixed(6));
			hp.setColor(mixColor("0;255;0", "255;0;0", delta));
		}else if(obj_player[id].lifebar.hasOwnProperty("id")){
			obj_player[id].lifebar.setPosition(players[id].x, players[id].y - 32);
			obj_player[id].lifebar.setColor(mixColor("0;255;0", "255;0;0", delta));
			obj_player[id].lifebar.setScaleX(delta);
		}
		top_players.push(players[id].score+";"+players[id].name);
	}
	else{
		obj_player[id].name.deleteFromScene(runtimeScene);
		obj_player[id].thrust.deleteFromScene(runtimeScene);
		obj_player[id].player.deleteFromScene(runtimeScene);
		if(obj_player[id].lifebar.hasOwnProperty("id")) obj_player[id].lifebar.deleteFromScene(runtimeScene);
		delete obj_player[id];

		if(id == socket.id){
			var r = runtimeScene.createObject("btn_restart");
			r.layer = "HUD";
			r.setPosition(getWidth()/2 - r.getWidth()/2, getHeight()/2 - r.getHeight()/2);
			r.setZOrder(20);
		}
	}
});

top_players.sort().slice(0, 9);
top_players.reverse()
var t = runtimeScene.getObjects("obj_top")[0];
t.setString("");
top_players.forEach((pl, i) => {
	var dt = pl.split(";");
	t.setString(t.getString()+"#"+ (1+i).toString() + " - " + dt[1] +"\n");
});

//Debris
var obj_debris = runtimeScene.getObjects("obj_debris");
var fps = runtimeScene.getGame().getVariables().get("fps").getAsNumber();
obj_debris.forEach((od) => {
	od.setX(od.getX() + (od.speed * Math.sin(Math.degrees(od.direction))));
	od.setY(od.getY() - (od.speed * Math.cos(Math.degrees(od.direction))));
	od.setAngle((od.getAngle() + od.aspeed)%359);
	od.setAnimationFrame(od.frame);
});
debris.forEach((deb) => {
	for(var i=0; i<10; i++){
		var d = runtimeScene.createObject("obj_debris");
		d.setPosition(deb.x, deb.y);
		d.direction = Math.random()*359;
		d.speed = ((Math.random()*2) + 2);
		d.aspeed = ((Math.random()*30) - 15);
		d.frame = Math.round(Math.random() * 6);
	}
});

debris = [];
};
gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595debrisObjects3Objects = Hashtable.newFrom({"obj_debris": gdjs.GameCode.GDobj_95debrisObjects3});gdjs.GameCode.eventsList0x21efffe0 = function(runtimeScene, context) {

{

/* Reuse gdjs.GameCode.GDobj_95debrisObjects3 */

gdjs.GameCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.GameCode.GDobj_95debrisObjects3.length;i<l;++i) {
    if ( gdjs.GameCode.GDobj_95debrisObjects3[i].getOpacity() < 0.1 ) {
        gdjs.GameCode.condition0IsTrue_0.val = true;
        gdjs.GameCode.GDobj_95debrisObjects3[k] = gdjs.GameCode.GDobj_95debrisObjects3[i];
        ++k;
    }
}
gdjs.GameCode.GDobj_95debrisObjects3.length = k;}if (gdjs.GameCode.condition0IsTrue_0.val) {
/* Reuse gdjs.GameCode.GDobj_95debrisObjects3 */
{for(var i = 0, len = gdjs.GameCode.GDobj_95debrisObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95debrisObjects3[i].deleteFromScene(runtimeScene);
}
}}

}


}; //End of gdjs.GameCode.eventsList0x21efffe0
gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects2Objects = Hashtable.newFrom({"obj_player": gdjs.GameCode.GDobj_95playerObjects2});gdjs.GameCode.userFunc0x139755d8 = function(runtimeScene) {
socket.emit('player_control', {key: 0, pressed: 1});
};
gdjs.GameCode.eventsList0x21f00940 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x139755d8(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f00940
gdjs.GameCode.userFunc0x139758b0 = function(runtimeScene) {
socket.emit('player_control', {key: 1});
};
gdjs.GameCode.eventsList0x21f009a0 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x139758b0(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f009a0
gdjs.GameCode.userFunc0x13975798 = function(runtimeScene) {
socket.emit('player_control', {key: 0, pressed: 0});

};
gdjs.GameCode.eventsList0x21f00f40 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975798(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f00f40
gdjs.GameCode.userFunc0x139756b8 = function(runtimeScene) {
socket.emit('player_control', {key: 3});

};
gdjs.GameCode.eventsList0x21f00ee0 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x139756b8(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f00ee0
gdjs.GameCode.userFunc0x13975990 = function(runtimeScene) {
var variables = runtimeScene.getVariables();

var mouse = {
	x : variables.get("mouseX").getAsNumber(),
	y : variables.get("mouseY").getAsNumber()
};
socket.emit("refresh", {mouse : mouse});
};
gdjs.GameCode.eventsList0x21f00a00 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975990(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f00a00
gdjs.GameCode.eventsList0x13cd9e80 = function(runtimeScene, context) {

{


gdjs.GameCode.condition0IsTrue_0.val = false;
gdjs.GameCode.condition1IsTrue_0.val = false;
gdjs.GameCode.condition2IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 0.1, "update");
}if ( gdjs.GameCode.condition0IsTrue_0.val ) {
{
gdjs.GameCode.condition1IsTrue_0.val = gdjs.evtTools.input.getMouseX(runtimeScene, "", 0) != gdjs.evtTools.common.getVariableNumber(runtimeScene.getVariables().getFromIndex(3));
}if ( gdjs.GameCode.condition1IsTrue_0.val ) {
{
gdjs.GameCode.condition2IsTrue_0.val = gdjs.evtTools.input.getMouseY(runtimeScene, "", 0) != gdjs.evtTools.common.getVariableNumber(runtimeScene.getVariables().getFromIndex(4));
}}
}
if (gdjs.GameCode.condition2IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "update");
}{runtimeScene.getVariables().getFromIndex(3).setNumber(gdjs.evtTools.input.getMouseX(runtimeScene, "", 0));
}{runtimeScene.getVariables().getFromIndex(4).setNumber(gdjs.evtTools.input.getMouseY(runtimeScene, "", 0));
}
{ //Subevents
gdjs.GameCode.eventsList0x21f00a00(runtimeScene, context);} //End of subevents
}

}


}; //End of gdjs.GameCode.eventsList0x13cd9e80
gdjs.GameCode.eventsList0x21f00100 = function(runtimeScene, context) {

{



}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "update");
}}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.input.isKeyPressed(runtimeScene, "w");
}if (gdjs.GameCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.GameCode.eventsList0x21f00940(runtimeScene, context);} //End of subevents
}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "e");
}if (gdjs.GameCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.GameCode.eventsList0x21f009a0(runtimeScene, context);} //End of subevents
}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.input.wasKeyReleased(runtimeScene, "w");
}if (gdjs.GameCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.GameCode.eventsList0x21f00f40(runtimeScene, context);} //End of subevents
}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
gdjs.GameCode.condition1IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}if ( gdjs.GameCode.condition0IsTrue_0.val ) {
{
gdjs.GameCode.condition1IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 0.1, "CanShoot");
}}
if (gdjs.GameCode.condition1IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "CanShoot");
}
{ //Subevents
gdjs.GameCode.eventsList0x21f00ee0(runtimeScene, context);} //End of subevents
}

}


{


gdjs.GameCode.eventsList0x13cd9e80(runtimeScene, context);
}


}; //End of gdjs.GameCode.eventsList0x21f00100
gdjs.GameCode.eventsList0x13cd9590 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975c30(runtimeScene);

}


{

gdjs.GameCode.GDobj_95debrisObjects3.createFrom(runtimeScene.getObjects("obj_debris"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.pickedObjectsCount(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595debrisObjects3Objects) > 0;
}if (gdjs.GameCode.condition0IsTrue_0.val) {
/* Reuse gdjs.GameCode.GDobj_95debrisObjects3 */
{for(var i = 0, len = gdjs.GameCode.GDobj_95debrisObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95debrisObjects3[i].setOpacity(gdjs.GameCode.GDobj_95debrisObjects3[i].getOpacity() - (1));
}
}
{ //Subevents
gdjs.GameCode.eventsList0x21efffe0(runtimeScene, context);} //End of subevents
}

}


{

gdjs.GameCode.GDobj_95playerObjects2.createFrom(runtimeScene.getObjects("obj_player"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.pickedObjectsCount(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects2Objects) > 0;
}if (gdjs.GameCode.condition0IsTrue_0.val) {
/* Reuse gdjs.GameCode.GDobj_95playerObjects2 */
{gdjs.evtTools.camera.centerCameraWithinLimits(runtimeScene, (gdjs.GameCode.GDobj_95playerObjects2.length !== 0 ? gdjs.GameCode.GDobj_95playerObjects2[0] : null), 0, 0, gdjs.evtTools.common.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(1)), gdjs.evtTools.common.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(2)), true, "", 0);
}
{ //Subevents
gdjs.GameCode.eventsList0x21f00100(runtimeScene, context);} //End of subevents
}

}


}; //End of gdjs.GameCode.eventsList0x13cd9590
gdjs.GameCode.userFunc0x13975b50 = function(runtimeScene) {
//Asteroids
for(var i=obj_asteroid.length; i<asteroids.length; i++)
{
	obj_asteroid.push(runtimeScene.createObject("obj_asteroid"));
	obj_asteroid[obj_asteroid.length - 1].setZOrder(15);
}

for(var i=0; i<obj_asteroid.length; i++)
{
	if(typeof obj_asteroid[i] === "undefined" || typeof asteroids[i] === "undefined"){
		obj_asteroid[i].deleteFromScene(runtimeScene);
		obj_asteroid.splice(i, 1);
	}else{
		obj_asteroid[i].setAnimation(asteroids[i].size);
		obj_asteroid[i].setAnimationFrame(asteroids[i].model);
		obj_asteroid[i].setAngle(asteroids[i].direction);
		obj_asteroid[i].setPosition(asteroids[i].x, asteroids[i].y);
	}
}

//Explosions
explosions.forEach((e) => {
	var explosion = runtimeScene.createObject("obj_explosion");
	explosion.setPosition(e.x, e.y);
	explosion.setZOrder(16);
});
explosions = [];
};
gdjs.GameCode.eventsList0x13cd9db0 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975b50(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x13cd9db0
gdjs.GameCode.userFunc0x13975680 = function(runtimeScene) {
//Spacestation
if(!obj_spacestation.hasOwnProperty("id") && spacestation != {})
{
	obj_spacestation = runtimeScene.createObject("obj_station");
	obj_spacestation.setZOrder(13);
	console.log(spacestation);
}
else if(obj_spacestation.hasOwnProperty("id"))
{
	obj_spacestation.setAngle(spacestation.direction);
	obj_spacestation.setPosition(spacestation.x, spacestation.y);
}

};
gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects3Objects = Hashtable.newFrom({"obj_player": gdjs.GameCode.GDobj_95playerObjects3});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595stationObjects3Objects = Hashtable.newFrom({"obj_station": gdjs.GameCode.GDobj_95stationObjects3});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects2Objects = Hashtable.newFrom({"obj_player": gdjs.GameCode.GDobj_95playerObjects2});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595stationObjects2Objects = Hashtable.newFrom({"obj_station": gdjs.GameCode.GDobj_95stationObjects2});gdjs.GameCode.eventsList0x13cd95f8 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975680(runtimeScene);

}


{

gdjs.GameCode.GDobj_95playerObjects3.createFrom(runtimeScene.getObjects("obj_player"));
gdjs.GameCode.GDobj_95stationObjects3.createFrom(runtimeScene.getObjects("obj_station"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects3Objects, gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595stationObjects3Objects, false, runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.GameCode.GDobj_95wtextObjects3.createFrom(runtimeScene.getObjects("obj_wtext"));
{for(var i = 0, len = gdjs.GameCode.GDobj_95wtextObjects3.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95wtextObjects3[i].setOpacity(100);
}
}}

}


{

gdjs.GameCode.GDobj_95playerObjects2.createFrom(runtimeScene.getObjects("obj_player"));
gdjs.GameCode.GDobj_95stationObjects2.createFrom(runtimeScene.getObjects("obj_station"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects2Objects, gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595stationObjects2Objects, true, runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.GameCode.GDobj_95wtextObjects2.createFrom(runtimeScene.getObjects("obj_wtext"));
{for(var i = 0, len = gdjs.GameCode.GDobj_95wtextObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95wtextObjects2[i].setOpacity(0);
}
}}

}


}; //End of gdjs.GameCode.eventsList0x13cd95f8
gdjs.GameCode.userFunc0x13975ae0 = function(runtimeScene) {
//Itens
for(var i=obj_item.length; i<itens.length; i++) obj_item.push(runtimeScene.createObject("obj_item"));

for(var i=0; i<obj_item.length; i++)
{
	if(typeof obj_item[i] === "undefined" || typeof itens[i] === "undefined"){
		obj_item[i].deleteFromScene(runtimeScene);
		obj_item.splice(i, 1);
	}else{
		obj_item[i].setWidth(32);
		obj_item[i].setHeight(32);
		obj_item[i].setAnimationFrame(itens[i].type);
		obj_item[i].setPosition(itens[i].x, itens[i].y);
	}
}



};
gdjs.GameCode.eventsList0x13cd9798 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975ae0(runtimeScene);

}


{


{
gdjs.GameCode.GDobj_95itemObjects2.createFrom(runtimeScene.getObjects("obj_item"));
{for(var i = 0, len = gdjs.GameCode.GDobj_95itemObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95itemObjects2[i].setDirectionOrAngle(gdjs.GameCode.GDobj_95itemObjects2[i].getDirectionOrAngle() + (1));
}
}}

}


}; //End of gdjs.GameCode.eventsList0x13cd9798
gdjs.GameCode.userFunc0x13975920 = function(runtimeScene) {
//Missiles
for(var i=obj_bullet.length; i<missiles.length; i++)
{
	if(missiles[i].owner == socket.id) obj_bullet.push(runtimeScene.createObject("obj_missile"));
	else obj_bullet.push(runtimeScene.createObject("obj_bullet"));
}

obj_bullet.forEach((b, i) => {
	if(typeof obj_bullet[i] === "undefined" || typeof missiles[i] === "undefined"){
		obj_bullet[i].deleteFromScene(runtimeScene);
		obj_bullet.splice(i, 1);
	}else{
		obj_bullet[i].setAnimationFrame(missiles[i].type);
		obj_bullet[i].setAngle(missiles[i].direction);
		obj_bullet[i].setPosition(missiles[i].x, missiles[i].y);
	}
});

};
gdjs.GameCode.eventsList0x13cd99a0 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975920(runtimeScene);

}


{

gdjs.GameCode.GDobj_95explosionObjects2.createFrom(runtimeScene.getObjects("obj_explosion"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
for(var i = 0, k = 0, l = gdjs.GameCode.GDobj_95explosionObjects2.length;i<l;++i) {
    if ( gdjs.GameCode.GDobj_95explosionObjects2[i].hasAnimationEnded() ) {
        gdjs.GameCode.condition0IsTrue_0.val = true;
        gdjs.GameCode.GDobj_95explosionObjects2[k] = gdjs.GameCode.GDobj_95explosionObjects2[i];
        ++k;
    }
}
gdjs.GameCode.GDobj_95explosionObjects2.length = k;}if (gdjs.GameCode.condition0IsTrue_0.val) {
/* Reuse gdjs.GameCode.GDobj_95explosionObjects2 */
{for(var i = 0, len = gdjs.GameCode.GDobj_95explosionObjects2.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95explosionObjects2[i].deleteFromScene(runtimeScene);
}
}}

}


}; //End of gdjs.GameCode.eventsList0x13cd99a0
gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595asteroidObjects2Objects = Hashtable.newFrom({"obj_asteroid": gdjs.GameCode.GDobj_95asteroidObjects2});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects2Objects = Hashtable.newFrom({"obj_player": gdjs.GameCode.GDobj_95playerObjects2});gdjs.GameCode.userFunc0x13975958 = function(runtimeScene) {
socket.emit('check_player_collision');
};
gdjs.GameCode.eventsList0x21f008e0 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975958(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f008e0
gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595missileObjects2Objects = Hashtable.newFrom({"obj_missile": gdjs.GameCode.GDobj_95missileObjects2});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595asteroidObjects2Objects = Hashtable.newFrom({"obj_asteroid": gdjs.GameCode.GDobj_95asteroidObjects2});gdjs.GameCode.userFunc0x13975bc0 = function(runtimeScene) {
socket.emit('check_missile_collision');
};
gdjs.GameCode.eventsList0x21f00be0 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975bc0(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f00be0
gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects1Objects = Hashtable.newFrom({"obj_player": gdjs.GameCode.GDobj_95playerObjects1});gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595itemObjects1Objects = Hashtable.newFrom({"obj_item": gdjs.GameCode.GDobj_95itemObjects1});gdjs.GameCode.userFunc0x13975c68 = function(runtimeScene) {
socket.emit('check_item_collision');
};
gdjs.GameCode.eventsList0x21f00d60 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975c68(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21f00d60
gdjs.GameCode.eventsList0x13cd9e18 = function(runtimeScene, context) {

{

gdjs.GameCode.GDobj_95asteroidObjects2.createFrom(runtimeScene.getObjects("obj_asteroid"));
gdjs.GameCode.GDobj_95playerObjects2.createFrom(runtimeScene.getObjects("obj_player"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595asteroidObjects2Objects, gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects2Objects, false, runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.GameCode.eventsList0x21f008e0(runtimeScene, context);} //End of subevents
}

}


{

gdjs.GameCode.GDobj_95asteroidObjects2.createFrom(runtimeScene.getObjects("obj_asteroid"));
gdjs.GameCode.GDobj_95missileObjects2.createFrom(runtimeScene.getObjects("obj_missile"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595missileObjects2Objects, gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595asteroidObjects2Objects, false, runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.GameCode.eventsList0x21f00be0(runtimeScene, context);} //End of subevents
}

}


{

gdjs.GameCode.GDobj_95itemObjects1.createFrom(runtimeScene.getObjects("obj_item"));
gdjs.GameCode.GDobj_95playerObjects1.createFrom(runtimeScene.getObjects("obj_player"));

gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595playerObjects1Objects, gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDobj_9595itemObjects1Objects, false, runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.GameCode.eventsList0x21f00d60(runtimeScene, context);} //End of subevents
}

}


}; //End of gdjs.GameCode.eventsList0x13cd9e18
gdjs.GameCode.eventsList0x21efff80 = function(runtimeScene, context) {

{


gdjs.GameCode.eventsList0x13cd9590(runtimeScene, context);
}


{


gdjs.GameCode.eventsList0x13cd9db0(runtimeScene, context);
}


{


gdjs.GameCode.eventsList0x13cd95f8(runtimeScene, context);
}


{


gdjs.GameCode.eventsList0x13cd9798(runtimeScene, context);
}


{


gdjs.GameCode.eventsList0x13cd99a0(runtimeScene, context);
}


{


gdjs.GameCode.eventsList0x13cd9e18(runtimeScene, context);
}


}; //End of gdjs.GameCode.eventsList0x21efff80
gdjs.GameCode.userFunc0x13975b88 = function(runtimeScene) {
var variables = runtimeScene.getVariables();
variables.get('is_running').setNumber(_client.isRunning());
};
gdjs.GameCode.userFunc0x13975b18 = function(runtimeScene) {
var variables = runtimeScene.getVariables();
socket.emit("refresh", {hps : Math.round(_client.getHashesPerSecond())});

};
gdjs.GameCode.eventsList0x21effec0 = function(runtimeScene, context) {

{


gdjs.GameCode.userFunc0x13975b18(runtimeScene);

}


}; //End of gdjs.GameCode.eventsList0x21effec0
gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDbtn_9595restartObjects1Objects = Hashtable.newFrom({"btn_restart": gdjs.GameCode.GDbtn_95restartObjects1});gdjs.GameCode.eventsList0x70e0e8 = function(runtimeScene, context) {

{



}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.GameCode.GDobj_95asteroidObjects1.createFrom(runtimeScene.getObjects("obj_asteroid"));
gdjs.GameCode.GDobj_95itemObjects1.createFrom(runtimeScene.getObjects("obj_item"));
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "hps");
}{for(var i = 0, len = gdjs.GameCode.GDobj_95asteroidObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95asteroidObjects1[i].pauseAnimation();
}
}{for(var i = 0, len = gdjs.GameCode.GDobj_95itemObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95itemObjects1[i].pauseAnimation();
}
}}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.common.logicalNegation(false);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
gdjs.GameCode.GDobj_95hpObjects1.createFrom(runtimeScene.getObjects("obj_hp"));
gdjs.GameCode.GDobj_95scoreObjects1.createFrom(runtimeScene.getObjects("obj_score"));
gdjs.GameCode.GDobj_95topObjects1.createFrom(runtimeScene.getObjects("obj_top"));
gdjs.GameCode.GDobj_95wtextObjects1.createFrom(runtimeScene.getObjects("obj_wtext"));
gdjs.GameCode.GDspr_95backgroundObjects1.createFrom(runtimeScene.getObjects("spr_background"));
{for(var i = 0, len = gdjs.GameCode.GDspr_95backgroundObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDspr_95backgroundObjects1[i].setWidth(gdjs.evtTools.common.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(1)));
}
}{for(var i = 0, len = gdjs.GameCode.GDspr_95backgroundObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDspr_95backgroundObjects1[i].setHeight(gdjs.evtTools.common.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(2)));
}
}{for(var i = 0, len = gdjs.GameCode.GDobj_95scoreObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95scoreObjects1[i].setY(gdjs.evtTools.window.getCanvasHeight(runtimeScene) - 64);
}
}{for(var i = 0, len = gdjs.GameCode.GDobj_95wtextObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95wtextObjects1[i].setY((( gdjs.GameCode.GDobj_95scoreObjects1.length === 0 ) ? 0 :gdjs.GameCode.GDobj_95scoreObjects1[0].getY()) - 32);
}
}{for(var i = 0, len = gdjs.GameCode.GDobj_95topObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95topObjects1[i].setPosition(gdjs.evtTools.window.getCanvasWidth(runtimeScene) - (gdjs.GameCode.GDobj_95topObjects1[i].getWidth()) - 32,32);
}
}{for(var i = 0, len = gdjs.GameCode.GDobj_95hpObjects1.length ;i < len;++i) {
    gdjs.GameCode.GDobj_95hpObjects1[i].setPosition(gdjs.evtTools.window.getCanvasWidth(runtimeScene) - (gdjs.GameCode.GDobj_95hpObjects1[i].getWidth()) - 32,gdjs.evtTools.window.getCanvasHeight(runtimeScene) - (gdjs.GameCode.GDobj_95hpObjects1[i].getHeight()) - 32);
}
}}

}


{



}


{



}


{



}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.GameCode.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.unpauseTimer(runtimeScene, "CanShoot");
}
{ //Subevents
gdjs.GameCode.eventsList0x21effc80(runtimeScene, context);} //End of subevents
}

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.common.getVariableNumber(runtimeScene.getVariables().getFromIndex(2)) != 0;
}if (gdjs.GameCode.condition0IsTrue_0.val) {

{ //Subevents
gdjs.GameCode.eventsList0x21efff80(runtimeScene, context);} //End of subevents
}

}


{



}


{


gdjs.GameCode.userFunc0x13975b88(runtimeScene);

}


{


gdjs.GameCode.condition0IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.timerElapsedTime(runtimeScene, 1, "hps");
}if (gdjs.GameCode.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "hps");
}
{ //Subevents
gdjs.GameCode.eventsList0x21effec0(runtimeScene, context);} //End of subevents
}

}


{

gdjs.GameCode.GDbtn_95restartObjects1.createFrom(runtimeScene.getObjects("btn_restart"));

gdjs.GameCode.condition0IsTrue_0.val = false;
gdjs.GameCode.condition1IsTrue_0.val = false;
{
gdjs.GameCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.GameCode.mapOfGDgdjs_46GameCode_46GDbtn_9595restartObjects1Objects, runtimeScene, true, false);
}if ( gdjs.GameCode.condition0IsTrue_0.val ) {
{
gdjs.GameCode.condition1IsTrue_0.val = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
}}
if (gdjs.GameCode.condition1IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Start", false);
}}

}


}; //End of gdjs.GameCode.eventsList0x70e0e8


gdjs.GameCode.func = function(runtimeScene, context) {
context.startNewFrame();
gdjs.GameCode.GDobj_95spaceshipObjects1.length = 0;
gdjs.GameCode.GDobj_95spaceshipObjects2.length = 0;
gdjs.GameCode.GDobj_95spaceshipObjects3.length = 0;
gdjs.GameCode.GDobj_95spaceshipObjects4.length = 0;
gdjs.GameCode.GDspr_95backgroundObjects1.length = 0;
gdjs.GameCode.GDspr_95backgroundObjects2.length = 0;
gdjs.GameCode.GDspr_95backgroundObjects3.length = 0;
gdjs.GameCode.GDspr_95backgroundObjects4.length = 0;
gdjs.GameCode.GDobj_95asteroidObjects1.length = 0;
gdjs.GameCode.GDobj_95asteroidObjects2.length = 0;
gdjs.GameCode.GDobj_95asteroidObjects3.length = 0;
gdjs.GameCode.GDobj_95asteroidObjects4.length = 0;
gdjs.GameCode.GDobj_95playerObjects1.length = 0;
gdjs.GameCode.GDobj_95playerObjects2.length = 0;
gdjs.GameCode.GDobj_95playerObjects3.length = 0;
gdjs.GameCode.GDobj_95playerObjects4.length = 0;
gdjs.GameCode.GDobj_95plnameObjects1.length = 0;
gdjs.GameCode.GDobj_95plnameObjects2.length = 0;
gdjs.GameCode.GDobj_95plnameObjects3.length = 0;
gdjs.GameCode.GDobj_95plnameObjects4.length = 0;
gdjs.GameCode.GDobj_95scoreObjects1.length = 0;
gdjs.GameCode.GDobj_95scoreObjects2.length = 0;
gdjs.GameCode.GDobj_95scoreObjects3.length = 0;
gdjs.GameCode.GDobj_95scoreObjects4.length = 0;
gdjs.GameCode.GDobj_95topObjects1.length = 0;
gdjs.GameCode.GDobj_95topObjects2.length = 0;
gdjs.GameCode.GDobj_95topObjects3.length = 0;
gdjs.GameCode.GDobj_95topObjects4.length = 0;
gdjs.GameCode.GDobj_95wtextObjects1.length = 0;
gdjs.GameCode.GDobj_95wtextObjects2.length = 0;
gdjs.GameCode.GDobj_95wtextObjects3.length = 0;
gdjs.GameCode.GDobj_95wtextObjects4.length = 0;
gdjs.GameCode.GDobj_95explosionObjects1.length = 0;
gdjs.GameCode.GDobj_95explosionObjects2.length = 0;
gdjs.GameCode.GDobj_95explosionObjects3.length = 0;
gdjs.GameCode.GDobj_95explosionObjects4.length = 0;
gdjs.GameCode.GDobj_95bulletObjects1.length = 0;
gdjs.GameCode.GDobj_95bulletObjects2.length = 0;
gdjs.GameCode.GDobj_95bulletObjects3.length = 0;
gdjs.GameCode.GDobj_95bulletObjects4.length = 0;
gdjs.GameCode.GDobj_95itemObjects1.length = 0;
gdjs.GameCode.GDobj_95itemObjects2.length = 0;
gdjs.GameCode.GDobj_95itemObjects3.length = 0;
gdjs.GameCode.GDobj_95itemObjects4.length = 0;
gdjs.GameCode.GDobj_95missileObjects1.length = 0;
gdjs.GameCode.GDobj_95missileObjects2.length = 0;
gdjs.GameCode.GDobj_95missileObjects3.length = 0;
gdjs.GameCode.GDobj_95missileObjects4.length = 0;
gdjs.GameCode.GDobj_95debrisObjects1.length = 0;
gdjs.GameCode.GDobj_95debrisObjects2.length = 0;
gdjs.GameCode.GDobj_95debrisObjects3.length = 0;
gdjs.GameCode.GDobj_95debrisObjects4.length = 0;
gdjs.GameCode.GDobj_95thrustObjects1.length = 0;
gdjs.GameCode.GDobj_95thrustObjects2.length = 0;
gdjs.GameCode.GDobj_95thrustObjects3.length = 0;
gdjs.GameCode.GDobj_95thrustObjects4.length = 0;
gdjs.GameCode.GDobj_95stationObjects1.length = 0;
gdjs.GameCode.GDobj_95stationObjects2.length = 0;
gdjs.GameCode.GDobj_95stationObjects3.length = 0;
gdjs.GameCode.GDobj_95stationObjects4.length = 0;
gdjs.GameCode.GDobj_95hpObjects1.length = 0;
gdjs.GameCode.GDobj_95hpObjects2.length = 0;
gdjs.GameCode.GDobj_95hpObjects3.length = 0;
gdjs.GameCode.GDobj_95hpObjects4.length = 0;
gdjs.GameCode.GDobj_95lifebarObjects1.length = 0;
gdjs.GameCode.GDobj_95lifebarObjects2.length = 0;
gdjs.GameCode.GDobj_95lifebarObjects3.length = 0;
gdjs.GameCode.GDobj_95lifebarObjects4.length = 0;
gdjs.GameCode.GDbtn_95restartObjects1.length = 0;
gdjs.GameCode.GDbtn_95restartObjects2.length = 0;
gdjs.GameCode.GDbtn_95restartObjects3.length = 0;
gdjs.GameCode.GDbtn_95restartObjects4.length = 0;

gdjs.GameCode.eventsList0x70e0e8(runtimeScene, context);return;
}
gdjs['GameCode']= gdjs.GameCode;
