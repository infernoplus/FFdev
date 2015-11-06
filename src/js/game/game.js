"use strict";

var game = {};

game.init = function() {
 game.objects = [];
 game.loading = false;
 game.loadMap("test");

 player.npc = object.types.npc.blm.create({x:3,y:3}, 0, ai.none, "Vivi");
 var pma = object.types.npc.blm.create({x:3,y:4}, 0, ai.wander, "Ella");
 var pmb = object.types.npc.blm.create({x:3,y:5}, 0, ai.wander, "Yuna");
 var pmc = object.types.npc.blm.create({x:3,y:6}, 0, ai.wander, "Vanille");
 game.objects.push(player.npc);
 game.objects.push(pma);
 game.objects.push(pmb);
 game.objects.push(pmc);

 game.party = [player.npc, pma, pmb, pmc];

 for(var i=0;i<8;i++) {
  var x = parseInt(Math.random()*map.size.x);
  var y = parseInt(Math.random()*map.size.y);
  var npc = object.types.npc.blm.create({x:x,y:y}, 0, ai.wander, "Nice Guy");
  game.objects.push(npc);
 }

 for(var i=0;i<3;i++) {
  var x = parseInt(Math.random()*map.size.x);
  var y = parseInt(Math.random()*map.size.y);
  var emy = object.types.npc.blm.create({x:x,y:y}, 0, ai.wander, "Mean Guy");
  game.objects.push(emy);
 }

 game.battle = undefined;
};

game.loadMap = function(name) {
	map.open(name);
};

game.step = function() {
 if(game.inBattle())
  game.battle.step();
 for(var i=0;i<game.objects.length;i++) {
  if(game.objects[i].dead) {
   game.objects.splice(i,1);
   i--;
  }
 }
 player.step();
 for(var i=0;i<game.objects.length;i++) {
  game.objects[i].step();
 }
};

game.startBattle = function(player, enemy) {
 if(game.battle !== undefined)
  return;
 game.battle = {
  teama : game.party,
  teamb : [enemy],
  turn : 0,
  init : function() {
   for(var i=0;i<this.teama.length;i++)
    this.teama[i].battle = true;
   for(var i=0;i<this.teamb.length;i++)
    this.teamb[i].battle = true;
  },
  step : function() {

  },
  getNeedsOrders : function() {
   if(this.turn < this.teama.length) {
    return this.teama[this.turn];
   }
   else {
    this.turn = 0;
    return this.teama[this.turn];
   }
  },
  setOrders : function(source, action, target) {
   console.log(source.name + " DID " + action.name + " TO " + target.name);
   source.lookAt(target.pos.x-source.pos.x,target.pos.y-source.pos.y);
   target.damage(1);
   this.stepBattle();
  },
  setMove : function(source, target) {
    console.log(source.name + " MOVED TO " + target.x + ", " + target.y);
    source.lookAt(target.x-source.pos.x,target.y-source.pos.y);
    source.move(target.x-source.pos.x,target.y-source.pos.y);
  },
  stepBattle : function() {
   if(this.checkBattle()) {
    this.end();
    return;
   }
   this.turn++;
   if(this.turn < this.teama.length)
    return;
   else if(this.turn-this.teama.length < this.teamb.length) {
    this.setOrders(this.teamb[this.turn-this.teama.length], this.teamb[this.turn-this.teama.length].atk[0], this.teama[0]);
   }
   else {
    this.turn = 0;
   }
  },
  checkBattle : function() {
   var aDead = true;
   var bDead = true;
   for(var i=0;i<this.teama.length;i++) {
    if(!this.teama[i].dead)
     aDead = false;
   }
   for(var i=0;i<this.teamb.length;i++) {
    if(!this.teamb[i].dead)
     bDead = false;
   }
   return aDead || bDead;
  },
  end : function() {
   for(var i=0;i<this.teama.length;i++)
    this.teama[i].battle = false;
   for(var i=0;i<this.teamb.length;i++) {
    this.teamb[i].battle = false; this.teamb[i].kill();
   }
   ui.endBattle();
   game.battle = undefined;
  }
 };
 ui.startBattle();
};

game.inBattle = function() {
 return game.battle !== undefined;
};

/*********************************************/
