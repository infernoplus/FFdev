"use strict";

var display = {};

display.init = function() {
 display.canvas = document.getElementById("canvas");
 display.context = display.canvas.getContext("2d");

 display.width = display.canvas.width;
 display.height = display.canvas.height;

 display.offset = {x: 0, y: 0}; //Screen position offset from default at top left
 display.scale = 16; //Drawing scale
};

display.draw = function() {
 display.update();

 display.clear();
 display.drawMap();
 display.drawObjects();
 ui.draw();
 display.drawLoad();

 /* test */
// input.cursor
// display.context.fillStyle = "#FF0000";
// display.context.fillRect(input.cursor.x,input.cursor.y,1,1);
};

display.update = function() {
 display.canvas.width = window.innerWidth-24;
 display.canvas.height = window.innerHeight-24;

 display.width = display.canvas.width;
 display.height = display.canvas.height;

 var w = parseInt(display.width/display.scale);
 var h = parseInt(display.height/display.scale);

 var x = player.npc.pos.x - parseInt(w/2) + player.npc.anim.tween.x;
 var y = player.npc.pos.y - parseInt(h/2) + player.npc.anim.tween.y;

 display.offset = {x: Math.ceil((x*display.scale)-(display.scale/2)), y: Math.ceil((y*display.scale)-(display.scale/2))};
 
 //Disables resampling images when upscaled. Because wtf no.
 display.context.mozImageSmoothingEnabled = false;
 display.context.webkitImageSmoothingEnabled = false;
 display.context.msImageSmoothingEnabled = false;
 display.context.imageSmoothingEnabled = false; 

};

display.clear = function() {
 display.context.fillStyle = "#000000";
 display.context.fillRect(0,0,display.width,display.height);
};

/* DEPRECATED!
display.drawMap = function() {
 var w = parseInt(display.width/display.scale);
 var h = parseInt(display.height/display.scale);

 var x = game.player.pos.x - parseInt(w/2) + game.player.anim.tween.x;
 var y = game.player.pos.y - parseInt(h/2) + game.player.anim.tween.y;

 var a = game.player.pos.x-w >= 0 ? game.player.pos.x-w : 0;
 var b = game.player.pos.y-h >= 0 ? game.player.pos.y-h : 0;
 var c = game.player.pos.x+w < map.size.x ? game.player.pos.x+w : map.size.x;
 var d = game.player.pos.y+h < map.size.y ? game.player.pos.y+h : map.size.y;

 for(var i=a;i<c;i++) {
  for(var j=b;j<d;j++) {
   display.context.fillStyle = "#FFFF00";
   display.context.fillRect((i-x)*display.scale,(j-y)*display.scale,display.scale,display.scale);
  }
 }
};
*/

display.drawMap = function() {
	//Position

	//Screenspace bounds
	var horiz = display.width/display.scale;
	var vert = display.height/display.scale;

 var ss = {
	x1: Math.floor((display.offset.x/display.scale)),
	y1: Math.floor((display.offset.y/display.scale)),
	x2: Math.floor((display.offset.x/display.scale)+(horiz+display.scale)),
	y2: Math.floor((display.offset.y/display.scale)+(vert+display.scale))
 };

 for(var i=ss.x1>0?ss.x1:0;i<window.map.size.x&&i<ss.x2;i++) {
  for(var j=ss.y1>0?ss.y1:0;j<window.map.size.y&&j<ss.y2;j++) {
		var tileOffset = tile.getTileByIndex(map.data[i][j].tile);
		display.context.save();
		display.context.translate((i*display.scale)-display.offset.x, (j*display.scale)-display.offset.y);
		switch(map.data[i][j].r) {
		  	case 1 : { display.context.rotate(90*Math.PI/180); break; }
		  	case 2 : { display.context.rotate(180*Math.PI/180); break; }
		  	case 3 : { display.context.rotate(270*Math.PI/180); break; }
		  	default : { display.context.rotate(0*Math.PI/180); break; }
		}
		//display.context.drawImage(window.tile.tileSet, tileOffset.x*tile.res, tileOffset.y*tile.res, tile.res, tile.res, (i*display.scale)-display.offset.x, (j*display.scale)-display.offset.y, display.scale, display.scale);
  	display.context.drawImage(tile.tileSet, tileOffset.x*tile.res, tileOffset.y*tile.res, tile.res, tile.res, -(Math.ceil(display.scale/2)), -(Math.ceil(display.scale/2)), display.scale, display.scale);
  	display.context.restore();
  }
 }

};


display.drawObjects = function() {
 var w = parseInt(display.width/display.scale);
 var h = parseInt(display.height/display.scale);
 for(var i=0;i<game.objects.length;i++) {
  game.objects[i].draw(w,h);
 }
};

display.drawLoad = function() {
	display.context.fillStyle = "rgba(255, 255, 255, " + game.load.timer/100 + ")";
	display.context.fillRect(0,0,display.width,display.height);
};