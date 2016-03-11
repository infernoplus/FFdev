"use strict";

var input = {};

input.init = function() {
  input.cursor = {x: 0, y: 0};
  input.keys = [];
  for(var i=0;i<256;i++)
    input.keys[i] = false;
};

input.event = function(evt, state) {
  input.keys[evt.keyCode] = state;
  if(state) {
    switch(evt.keyCode) {
      case 173 : display.scale = display.scale-1 > 3 ? display.scale-1 : 3; break;
      case 61 : display.scale = display.scale+1 < 32 ? display.scale+1 : 32; break;
      case 27 : ui.toggleMenu(); break;
    }
  }
};

input.mouse = function(evt, state) {
  if(state)
    ui.mouse(evt.layerX, evt.layerY);
};

input.mouseMove = function(evt) {
  input.cursor = {x: evt.layerX, y: evt.layerY};
};

input.coordToTileScreenSpace = function(x,y) {
  return {x: parseInt(x/display.scale)*display.scale, y: parseInt(y/display.scale)*display.scale};
};

input.coordToTile = function(x,y) {
  var w = parseInt(display.width/display.scale);
  var h = parseInt(display.height/display.scale);

  var i = player.npc.pos.x - parseInt(w/2) + player.npc.anim.tween.x;
  var j = player.npc.pos.y - parseInt(h/2) + player.npc.anim.tween.y;

  var a = player.npc.pos.x-w >= 0 ? player.npc.pos.x-w : 0;
  var b = player.npc.pos.y-h >= 0 ? player.npc.pos.y-h : 0;
  var c = player.npc.pos.x+w < map.size.x ? player.npc.pos.x+w : map.size.x;
  var d = player.npc.pos.y+h < map.size.y ? player.npc.pos.y+h : map.size.y;

  return {x: parseInt((x/display.scale)+i), y: parseInt((y/display.scale)+j)};
};