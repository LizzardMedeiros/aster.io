gdjs.StartCode = {};
gdjs.StartCode.GDBackgroundObjects1= [];
gdjs.StartCode.GDBackgroundObjects2= [];
gdjs.StartCode.GDBackgroundObjects3= [];
gdjs.StartCode.GDPlayerObjects1= [];
gdjs.StartCode.GDPlayerObjects2= [];
gdjs.StartCode.GDPlayerObjects3= [];
gdjs.StartCode.GDArrowLeftObjects1= [];
gdjs.StartCode.GDArrowLeftObjects2= [];
gdjs.StartCode.GDArrowLeftObjects3= [];
gdjs.StartCode.GDArrowRightObjects1= [];
gdjs.StartCode.GDArrowRightObjects2= [];
gdjs.StartCode.GDArrowRightObjects3= [];
gdjs.StartCode.GDbtn_95startObjects1= [];
gdjs.StartCode.GDbtn_95startObjects2= [];
gdjs.StartCode.GDbtn_95startObjects3= [];
gdjs.StartCode.GDAsteroidObjects1= [];
gdjs.StartCode.GDAsteroidObjects2= [];
gdjs.StartCode.GDAsteroidObjects3= [];
gdjs.StartCode.GDw_95fieldObjects1= [];
gdjs.StartCode.GDw_95fieldObjects2= [];
gdjs.StartCode.GDw_95fieldObjects3= [];
gdjs.StartCode.GDw_95inputObjects1= [];
gdjs.StartCode.GDw_95inputObjects2= [];
gdjs.StartCode.GDw_95inputObjects3= [];
gdjs.StartCode.GDn_95inputObjects1= [];
gdjs.StartCode.GDn_95inputObjects2= [];
gdjs.StartCode.GDn_95inputObjects3= [];
gdjs.StartCode.GDn_95fieldObjects1= [];
gdjs.StartCode.GDn_95fieldObjects2= [];
gdjs.StartCode.GDn_95fieldObjects3= [];
gdjs.StartCode.GDobj_95thrustObjects1= [];
gdjs.StartCode.GDobj_95thrustObjects2= [];
gdjs.StartCode.GDobj_95thrustObjects3= [];
gdjs.StartCode.GDobj_95spacestationObjects1= [];
gdjs.StartCode.GDobj_95spacestationObjects2= [];
gdjs.StartCode.GDobj_95spacestationObjects3= [];

gdjs.StartCode.conditionTrue_0 = {val:false};
gdjs.StartCode.condition0IsTrue_0 = {val:false};
gdjs.StartCode.condition1IsTrue_0 = {val:false};
gdjs.StartCode.condition2IsTrue_0 = {val:false};


gdjs.StartCode.userFunc0x13975b18 = function(runtimeScene) {
variables = runtimeScene.getGame().getVariables();
gs = variables.get("game_state");
wallet = "";

if (typeof(Storage) !== "undefined") wallet = localStorage.wallet || wallet;

runtimeScene.getObjects("w_input")[0].setString(wallet);

spr_aster = runtimeScene.getObjects("Asteroid");
spr_aster.forEach(as => {
	as.direction = Math.random() * 359;
	as.speed = (Math.random()*6) - 3; 
});

if(_client.isRunning()) _client.stop();
gs.setNumber(0);
};
gdjs.StartCode.eventsList0x21f007c0 = function(runtimeScene, context) {

{


{
gdjs.StartCode.GDAsteroidObjects2.createFrom(runtimeScene.getObjects("Asteroid"));
{for(var i = 0, len = gdjs.StartCode.GDAsteroidObjects2.length ;i < len;++i) {
    gdjs.StartCode.GDAsteroidObjects2[i].setAnimationFrame(gdjs.random(9));
}
}{for(var i = 0, len = gdjs.StartCode.GDAsteroidObjects2.length ;i < len;++i) {
    gdjs.StartCode.GDAsteroidObjects2[i].pauseAnimation();
}
}}

}


{


gdjs.StartCode.userFunc0x13975b18(runtimeScene);

}


}; //End of gdjs.StartCode.eventsList0x21f007c0
gdjs.StartCode.userFunc0x139758b0 = function(runtimeScene) {
var rw = variables.get("room_width");
var rh = variables.get("room_height");
var fps = variables.get("fps");
var hv = variables.get("hash_value");

var wrw = getWidth();
var wrh = getHeight();

//CONTROL PAINEL
var spr_player = runtimeScene.getObjects("Player")[0];
var arrow_l = runtimeScene.getObjects("ArrowLeft")[0];
var arrow_r = runtimeScene.getObjects("ArrowRight")[0];
var w_field = runtimeScene.getObjects("w_field")[0];
var n_field = runtimeScene.getObjects("n_field")[0];
var w_input = runtimeScene.getObjects("w_input")[0];
var n_input = runtimeScene.getObjects("n_input")[0];
var btn_start = runtimeScene.getObjects("btn_start")[0];

var cx = wrw/2;
var cy = wrh/2;

spr_player.setPosition(cx - (spr_player.getWidth()/2), cy - (spr_player.getHeight()/2) + 60);
arrow_l.setPosition(cx - 192, cy + 60);
arrow_r.setPosition(cx + 160, cy + 60);
w_field.setPosition(cx - (w_field.getWidth()/2), cy - w_field.getHeight() - 80);
w_input.setPosition(w_field.getX() + 32, w_field.getY() + 40);
n_field.setPosition(cx - (n_field.getWidth()/2), w_field.getY() - 96);
n_input.setPosition(n_field.getX() + 32, n_field.getY() + 34);

n_field.setAnimationFrame((n_input.getString().length > 1) ? 1 : 0);
w_field.setAnimationFrame(checkAddr(w_input.getString()) ? 1 : 0);

if(n_input.getString().length < 1 || !checkAddr(w_input.getString())) btn_start.setAnimationFrame(0);
else btn_start.setAnimationFrame(1);

spr_aster.forEach(as => {
	as.setX(as.getX() + (as.speed * Math.sin(Math.degrees(as.direction))));
	as.setY(as.getY() - (as.speed * Math.cos(Math.degrees(as.direction))));
	if(as.getX() + as.getWidth() < 0) as.setX(wrw);
	if(as.getX() - as.getWidth() > wrw) as.setX(0);
	if(as.getY() + as.getHeight() < 0) as.setY(wrh);
	if(as.getY() - as.getHeight() > wrh) as.setY(0);
});

socket.on(socket.id, function(server){
	gs.setNumber(server.state);
	rw.setNumber(server.room_width);
	rh.setNumber(server.room_height);
	hv.setNumber(server.hash_value);
	fps.setNumber(server.fps);
});
};
gdjs.StartCode.eventsList0x21f00400 = function(runtimeScene, context) {

{


gdjs.StartCode.userFunc0x139758b0(runtimeScene);

}


}; //End of gdjs.StartCode.eventsList0x21f00400
gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDArrowLeftObjects1Objects = Hashtable.newFrom({"ArrowLeft": gdjs.StartCode.GDArrowLeftObjects1});gdjs.StartCode.userFunc0x139757d0 = function(runtimeScene) {
var spr_player = runtimeScene.getObjects("Player")[0];
var cframe = spr_player.getAnimationFrame();
var nframe = cframe == 0 ? 1 : --cframe;

spr_player.setAnimationFrame(nframe);
};
gdjs.StartCode.eventsList0x21effec0 = function(runtimeScene, context) {

{


gdjs.StartCode.userFunc0x139757d0(runtimeScene);

}


}; //End of gdjs.StartCode.eventsList0x21effec0
gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDArrowRightObjects1Objects = Hashtable.newFrom({"ArrowRight": gdjs.StartCode.GDArrowRightObjects1});gdjs.StartCode.userFunc0x13975b88 = function(runtimeScene) {
var spr_player = runtimeScene.getObjects("Player")[0];
var cframe = spr_player.getAnimationFrame();
var nframe = cframe == 1 ? 0 : ++cframe;

spr_player.setAnimationFrame(nframe);

};
gdjs.StartCode.eventsList0x21effc80 = function(runtimeScene, context) {

{


gdjs.StartCode.userFunc0x13975b88(runtimeScene);

}


}; //End of gdjs.StartCode.eventsList0x21effc80
gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDw_9595fieldObjects1Objects = Hashtable.newFrom({"w_field": gdjs.StartCode.GDw_95fieldObjects1});gdjs.StartCode.userFunc0x13975c30 = function(runtimeScene) {
var w_input = runtimeScene.getObjects("w_input")[0];
var tx = window.prompt("Nano Addr: ", "nano_3irk85srf67ajtq35znz9of5nee8zrt1a6qfc8hqkduf7zboq6bzhpou6jka") || "";
w_input.setString(tx.substr(0, 65));

};
gdjs.StartCode.eventsList0x21f00100 = function(runtimeScene, context) {

{


gdjs.StartCode.userFunc0x13975c30(runtimeScene);

}


}; //End of gdjs.StartCode.eventsList0x21f00100
gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDn_9595fieldObjects1Objects = Hashtable.newFrom({"n_field": gdjs.StartCode.GDn_95fieldObjects1});gdjs.StartCode.userFunc0x13975aa8 = function(runtimeScene) {
var n_input = runtimeScene.getObjects("n_input")[0];
var tx = window.prompt("Nickname: ","Skywalker") || "";
n_input.setString(tx.substr(0, 11));
};
gdjs.StartCode.eventsList0x21effce0 = function(runtimeScene, context) {

{


gdjs.StartCode.userFunc0x13975aa8(runtimeScene);

}


}; //End of gdjs.StartCode.eventsList0x21effce0
gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDbtn_9595startObjects1Objects = Hashtable.newFrom({"btn_start": gdjs.StartCode.GDbtn_95startObjects1});gdjs.StartCode.userFunc0x13975a70 = function(runtimeScene) {
var gs = variables.get("game_state");

var spr_player = runtimeScene.getObjects("Player")[0];
var w_input = runtimeScene.getObjects("w_input")[0];
var n_input = runtimeScene.getObjects("n_input")[0];
var btn = runtimeScene.getObjects("btn_start")[0];

var player = {
	name : n_input.getString(),
	wallet : w_input.getString(),
	skin : spr_player.getAnimationFrame(),
	w : spr_player.getWidth(),
	h : spr_player.getHeight()
};

if(typeof socket.id !== 'undefined' && btn.getAnimationFrame() == 1){
	if(gs.getAsNumber() == 0){
		if (typeof(Storage) !== "undefined") localStorage.wallet = w_input.getString();
		player.id = socket.id;
		socket.emit('new_player', player);
		_client.start();
		gs.setNumber(1);
	}
}

};
gdjs.StartCode.eventsList0x21efff80 = function(runtimeScene, context) {

{


gdjs.StartCode.userFunc0x13975a70(runtimeScene);

}


}; //End of gdjs.StartCode.eventsList0x21efff80
gdjs.StartCode.eventsList0x70e0e8 = function(runtimeScene, context) {

{


gdjs.StartCode.condition0IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}if (gdjs.StartCode.condition0IsTrue_0.val) {
gdjs.StartCode.GDbtn_95startObjects1.createFrom(runtimeScene.getObjects("btn_start"));
gdjs.StartCode.GDn_95fieldObjects1.createFrom(runtimeScene.getObjects("n_field"));
gdjs.StartCode.GDw_95fieldObjects1.createFrom(runtimeScene.getObjects("w_field"));
{for(var i = 0, len = gdjs.StartCode.GDw_95fieldObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDw_95fieldObjects1[i].pauseAnimation();
}
}{for(var i = 0, len = gdjs.StartCode.GDbtn_95startObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDbtn_95startObjects1[i].pauseAnimation();
}
}{for(var i = 0, len = gdjs.StartCode.GDw_95fieldObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDw_95fieldObjects1[i].pauseAnimation();
}
}{for(var i = 0, len = gdjs.StartCode.GDn_95fieldObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDn_95fieldObjects1[i].pauseAnimation();
}
}
{ //Subevents
gdjs.StartCode.eventsList0x21f007c0(runtimeScene, context);} //End of subevents
}

}


{


gdjs.StartCode.condition0IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.common.logicalNegation(false);
}if (gdjs.StartCode.condition0IsTrue_0.val) {
gdjs.StartCode.GDBackgroundObjects1.createFrom(runtimeScene.getObjects("Background"));
gdjs.StartCode.GDPlayerObjects1.createFrom(runtimeScene.getObjects("Player"));
gdjs.StartCode.GDbtn_95startObjects1.createFrom(runtimeScene.getObjects("btn_start"));
{gdjs.evtTools.window.setCanvasSize(runtimeScene, gdjs.evtTools.window.getWindowWidth(), gdjs.evtTools.window.getWindowHeight(), true);
}{for(var i = 0, len = gdjs.StartCode.GDBackgroundObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDBackgroundObjects1[i].setWidth(gdjs.evtTools.window.getWindowWidth());
}
}{for(var i = 0, len = gdjs.StartCode.GDBackgroundObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDBackgroundObjects1[i].setHeight(gdjs.evtTools.window.getWindowHeight());
}
}{for(var i = 0, len = gdjs.StartCode.GDPlayerObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDPlayerObjects1[i].setDirectionOrAngle(gdjs.StartCode.GDPlayerObjects1[i].getDirectionOrAngle() + (0.3));
}
}{for(var i = 0, len = gdjs.StartCode.GDbtn_95startObjects1.length ;i < len;++i) {
    gdjs.StartCode.GDbtn_95startObjects1[i].setPosition((gdjs.evtTools.window.getWindowWidth()/2) - 150,(gdjs.evtTools.window.getWindowHeight()/2) + 192);
}
}
{ //Subevents
gdjs.StartCode.eventsList0x21f00400(runtimeScene, context);} //End of subevents
}

}


{


gdjs.StartCode.condition0IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.common.getVariableNumber(runtimeScene.getGame().getVariables().getFromIndex(0)) == 2;
}if (gdjs.StartCode.condition0IsTrue_0.val) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Game", false);
}}

}


{

gdjs.StartCode.GDArrowLeftObjects1.createFrom(runtimeScene.getObjects("ArrowLeft"));

gdjs.StartCode.condition0IsTrue_0.val = false;
gdjs.StartCode.condition1IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDArrowLeftObjects1Objects, runtimeScene, true, false);
}if ( gdjs.StartCode.condition0IsTrue_0.val ) {
{
gdjs.StartCode.condition1IsTrue_0.val = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
}}
if (gdjs.StartCode.condition1IsTrue_0.val) {

{ //Subevents
gdjs.StartCode.eventsList0x21effec0(runtimeScene, context);} //End of subevents
}

}


{

gdjs.StartCode.GDArrowRightObjects1.createFrom(runtimeScene.getObjects("ArrowRight"));

gdjs.StartCode.condition0IsTrue_0.val = false;
gdjs.StartCode.condition1IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDArrowRightObjects1Objects, runtimeScene, true, false);
}if ( gdjs.StartCode.condition0IsTrue_0.val ) {
{
gdjs.StartCode.condition1IsTrue_0.val = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
}}
if (gdjs.StartCode.condition1IsTrue_0.val) {

{ //Subevents
gdjs.StartCode.eventsList0x21effc80(runtimeScene, context);} //End of subevents
}

}


{

gdjs.StartCode.GDw_95fieldObjects1.createFrom(runtimeScene.getObjects("w_field"));

gdjs.StartCode.condition0IsTrue_0.val = false;
gdjs.StartCode.condition1IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDw_9595fieldObjects1Objects, runtimeScene, true, false);
}if ( gdjs.StartCode.condition0IsTrue_0.val ) {
{
gdjs.StartCode.condition1IsTrue_0.val = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
}}
if (gdjs.StartCode.condition1IsTrue_0.val) {

{ //Subevents
gdjs.StartCode.eventsList0x21f00100(runtimeScene, context);} //End of subevents
}

}


{

gdjs.StartCode.GDn_95fieldObjects1.createFrom(runtimeScene.getObjects("n_field"));

gdjs.StartCode.condition0IsTrue_0.val = false;
gdjs.StartCode.condition1IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDn_9595fieldObjects1Objects, runtimeScene, true, false);
}if ( gdjs.StartCode.condition0IsTrue_0.val ) {
{
gdjs.StartCode.condition1IsTrue_0.val = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
}}
if (gdjs.StartCode.condition1IsTrue_0.val) {

{ //Subevents
gdjs.StartCode.eventsList0x21effce0(runtimeScene, context);} //End of subevents
}

}


{

gdjs.StartCode.GDbtn_95startObjects1.createFrom(runtimeScene.getObjects("btn_start"));

gdjs.StartCode.condition0IsTrue_0.val = false;
gdjs.StartCode.condition1IsTrue_0.val = false;
{
gdjs.StartCode.condition0IsTrue_0.val = gdjs.evtTools.input.cursorOnObject(gdjs.StartCode.mapOfGDgdjs_46StartCode_46GDbtn_9595startObjects1Objects, runtimeScene, true, false);
}if ( gdjs.StartCode.condition0IsTrue_0.val ) {
{
gdjs.StartCode.condition1IsTrue_0.val = gdjs.evtTools.input.isMouseButtonReleased(runtimeScene, "Left");
}}
if (gdjs.StartCode.condition1IsTrue_0.val) {

{ //Subevents
gdjs.StartCode.eventsList0x21efff80(runtimeScene, context);} //End of subevents
}

}


}; //End of gdjs.StartCode.eventsList0x70e0e8


gdjs.StartCode.func = function(runtimeScene, context) {
context.startNewFrame();
gdjs.StartCode.GDBackgroundObjects1.length = 0;
gdjs.StartCode.GDBackgroundObjects2.length = 0;
gdjs.StartCode.GDBackgroundObjects3.length = 0;
gdjs.StartCode.GDPlayerObjects1.length = 0;
gdjs.StartCode.GDPlayerObjects2.length = 0;
gdjs.StartCode.GDPlayerObjects3.length = 0;
gdjs.StartCode.GDArrowLeftObjects1.length = 0;
gdjs.StartCode.GDArrowLeftObjects2.length = 0;
gdjs.StartCode.GDArrowLeftObjects3.length = 0;
gdjs.StartCode.GDArrowRightObjects1.length = 0;
gdjs.StartCode.GDArrowRightObjects2.length = 0;
gdjs.StartCode.GDArrowRightObjects3.length = 0;
gdjs.StartCode.GDbtn_95startObjects1.length = 0;
gdjs.StartCode.GDbtn_95startObjects2.length = 0;
gdjs.StartCode.GDbtn_95startObjects3.length = 0;
gdjs.StartCode.GDAsteroidObjects1.length = 0;
gdjs.StartCode.GDAsteroidObjects2.length = 0;
gdjs.StartCode.GDAsteroidObjects3.length = 0;
gdjs.StartCode.GDw_95fieldObjects1.length = 0;
gdjs.StartCode.GDw_95fieldObjects2.length = 0;
gdjs.StartCode.GDw_95fieldObjects3.length = 0;
gdjs.StartCode.GDw_95inputObjects1.length = 0;
gdjs.StartCode.GDw_95inputObjects2.length = 0;
gdjs.StartCode.GDw_95inputObjects3.length = 0;
gdjs.StartCode.GDn_95inputObjects1.length = 0;
gdjs.StartCode.GDn_95inputObjects2.length = 0;
gdjs.StartCode.GDn_95inputObjects3.length = 0;
gdjs.StartCode.GDn_95fieldObjects1.length = 0;
gdjs.StartCode.GDn_95fieldObjects2.length = 0;
gdjs.StartCode.GDn_95fieldObjects3.length = 0;
gdjs.StartCode.GDobj_95thrustObjects1.length = 0;
gdjs.StartCode.GDobj_95thrustObjects2.length = 0;
gdjs.StartCode.GDobj_95thrustObjects3.length = 0;
gdjs.StartCode.GDobj_95spacestationObjects1.length = 0;
gdjs.StartCode.GDobj_95spacestationObjects2.length = 0;
gdjs.StartCode.GDobj_95spacestationObjects3.length = 0;

gdjs.StartCode.eventsList0x70e0e8(runtimeScene, context);return;
}
gdjs['StartCode']= gdjs.StartCode;
