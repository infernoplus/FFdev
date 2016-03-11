"use strict";

var object = {};
object.types = {};

object.init = function() {

};

object.getObjectById = function(id) {
	if(id === "player") {
		return game.player.npc;
	}
	for(var i=0;i<game.objects.length;i++) {
		if(game.objects[i].id === id) {
			return game.objects[i];
		}
	}
};

object.getObjectAtPos = function(x,y) {
 var xx = parseInt(x); var yy = parseInt(y);
 for(var i=0;i<game.objects.length;i++) {
  if(game.objects[i].pos.x === xx && game.objects[i].pos.y === yy)
   return game.objects[i];
 }
 return undefined;
};