"use strict";

var player = {};

player.init = function() {
  player.npc = undefined; //The object that the player is controlling
};

player.step = function() {
  if(game.isLoading() || ui.isActive() || game.inBattle())
    return;
  var x=0,y=0;
  if(input.keys[87])
    y--;
  if(input.keys[83])
    y++;
  if(input.keys[65])
    x--;
  if(input.keys[68])
    x++;
  player.npc.move(x,y);

  if(input.keys[69]) {
    var t;
    switch(player.npc.look) {
      case 0 : t = object.getObjectAtPos(player.npc.pos.x-1,player.npc.pos.y); break;
      case 1 : t = object.getObjectAtPos(player.npc.pos.x+1,player.npc.pos.y); break;
      case 2 : t = object.getObjectAtPos(player.npc.pos.x,player.npc.pos.y-1); break;
      default : t = object.getObjectAtPos(player.npc.pos.x,player.npc.pos.y+1); break;
    }
    if(t !== undefined)
      t.func(player.npc);
  }
};