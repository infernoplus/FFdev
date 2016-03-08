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

/*
object.createNpc = function(x,y) {
 return {
  pos : {x: x, y: y},
  lastPos : {x: x, y: y},
  look : 0,
  attr : {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10},
  stat : {hp: 10, maxHp: 10},
  atk : [{name: "Fast Blade", potency: 100}, {name: "Riot Blade", potency: 220}, {name: "Rage of Halone", potency: 300}],
  mag : [{name: "Flash", potency: 5}, {name: "Cure I", potency: 100}],
  anim : {frame: false, animc : 0, moving: false, tween : {x: 0, y: 0}},
  tile : image.get('img/character/pld.png'),
  name : "Dave",
  message : "Hello I am a default npc.",
  battle : false,
  dead : false,
  step : function() {
   this.tweening();
   this.ai();
  },
  ai : function() {
   if(game.inBattle())
    return;
   var r = Math.random();
   if(r < 0.05) {
    r = util.rand(3);
    switch(r) {
     case 0 : this.move(0,1); break;
     case 1 : this.move(0,-1); break;
     case 2 : this.move(1,0); break;
     default : this.move(-1,0); break;
    }
   }
  },
  tweening : object.proto.tweening,
  move : object.proto.move,
  lookAt : object.proto.lookAt,
  damage : object.proto.damage,
  kill : object.proto.kill,
  draw : object.proto.draw
 };
};

object.createPartyMember = function(x,y,f) {
 return {
  pos : {x: x, y: y},
  lastPos : {x: x, y: y},
  look : 0,
  attr : {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10},
  stat : {hp: 10, maxHp: 10},
  atk : [{name: "Fast Strike", potency: 50}, {name: "Heavy Strike", potency: 65}],
  mag : [{name: "Cure I", potency: 100}, {name: "Dia I", potency: 30}, {name: "Protect", potency: 0}],
  follow : f,
  anim : {frame: false, animc : 0, moving: false, tween : {x: 0, y: 0}},
  tile : image.get('img/character/whm.png'),
  name : "Default Name",
  message : "Hello. I'm in your party!",
  battle : false,
  dead : false,
  step : function() {
   this.tweening();
   this.ai();
  },
  ai : function() {
   if(game.inBattle())
    return;
   if(this.follow.lastPos.x !== this.pos.x || this.follow.lastPos.y !== this.pos.y) {
    var path = map.pathFind(this.pos, this.follow.lastPos);
    var dir = util.directionTo(this.pos, {x: path.points[1].x, y: path.points[1].y});
    this.move(dir.x, dir.y);
   }
  },
  tweening : object.proto.tweening,
  move : object.proto.move,
  lookAt : object.proto.lookAt,
  damage : object.proto.damage,
  kill : object.proto.kill,
  draw : object.proto.draw
 };
};

object.createEnemy = function(x,y) {
 return {
  pos : {x: x, y: y},
  lastPos : {x: x, y: y},
  look : 0,
  attr : {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10},
  stat : {hp: 10, maxHp: 10},
  atk : [{name: "Heavy Swing", potency: 120}, {name: "Skull Sunder", potency: 200}, {name: "Overpower", potency: 75}, {name: "Fracture", potency: 40}],
  mag : [{name: "Provoke", potency: 5}],
  anim : {frame: false, animc : 0, moving: false, tween : {x: 0, y: 0}},
  tile : image.get('img/character/war.png'),
  name : "Bob",
  message : "Hello, I'm going to kill you!",
  battle : false,
  dead : false,
  step : function() {
   this.tweening();
   this.ai();
  },
  ai : function() {
   if(game.inBattle())
    return;
   var dist = util.distance(game.player.pos, this.pos);
   var t;
   switch(this.look) {
     case 0 : t = object.getObjectAtPos(this.pos.x-1,this.pos.y); break;
     case 1 : t = object.getObjectAtPos(this.pos.x+1,this.pos.y); break;
     case 2 : t = object.getObjectAtPos(this.pos.x,this.pos.y-1); break;
     default : t = object.getObjectAtPos(this.pos.x,this.pos.y+1); break;
   }
   if(t !== undefined && t === game.player) {
     game.startBattle(game.player, this);
   }
   else if(dist < 12) {
	    var path = map.pathFind(this.pos, game.player.pos);
	    var dir = util.directionTo(this.pos, {x: path.points[1].x, y: path.points[1].y});
	    this.move(dir.x, dir.y);
   }
   else {
    var r = Math.random();
    if(r < 0.05) {
     r = util.rand(3);
     switch(r) {
      case 0 : this.move(0,1); break;
      case 1 : this.move(0,-1); break;
      case 2 : this.move(1,0); break;
      default : this.move(-1,0); break;
     }
    }
   }
  },
  tweening : object.proto.tweening,
  move : object.proto.move,
  lookAt : object.proto.lookAt,
  damage : object.proto.damage,
  kill : object.proto.kill,
  draw : object.proto.draw
 };
};
*/

/*********************************************/