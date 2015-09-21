"use strict";

var display = {};

display.init = function() {
 display.canvas = document.getElementById("canvas");
 display.context = display.canvas.getContext("2d");

 display.width = display.canvas.width;
 display.height = display.canvas.height;

 display.scale = 16;
};

display.draw = function() {
 display.update();

 display.clear();
 display.drawMap();
 display.drawObjects();
 ui.draw();
 
 /* test */
 input.cursor
 display.context.fillStyle = "#FF0000";
 display.context.fillRect(input.cursor.x,input.cursor.y,1,1);
};

display.update = function() {
 display.canvas.width = window.innerWidth-36;
 display.canvas.height = window.innerHeight-36;

 display.width = display.canvas.width;
 display.height = display.canvas.height;
};

display.clear = function() {
 display.context.fillStyle = "#000000";
 display.context.fillRect(0,0,display.width,display.height);
};

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
   display.context.fillStyle = map.tile[map.map[i][j]];
   display.context.fillRect((i-x)*display.scale,(j-y)*display.scale,display.scale,display.scale);
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