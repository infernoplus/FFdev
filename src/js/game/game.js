"use strict";

var game = {};

game.init = function() {
 game.objects = [];

 map.map[3][3] = 0;
 map.map[3][4] = 0;
 map.map[3][5] = 0;
 map.map[3][6] = 0;

 game.player = object.createPlayer(3,3);
 var pma = object.createPartyMember(3,4,game.player);
 var pmb = object.createPartyMember(3,5,pma); pmb.name = "Yuna";
 var pmc = object.createPartyMember(3,6,pmb); pmc.name = "Vanille";
 game.objects.push(game.player);
 game.objects.push(pma);
 game.objects.push(pmb);
 game.objects.push(pmc);

 game.party = [game.player, pma, pmb, pmc];

 for(var i=0;i<1024;i++) {
  var x = parseInt(Math.random()*map.size.x);
  var y = parseInt(Math.random()*map.size.y);
  var npc = object.createNpc(x,y);
  game.objects.push(npc);
 }

 for(var i=0;i<1024;i++) {
  var x = parseInt(Math.random()*map.size.x);
  var y = parseInt(Math.random()*map.size.y);
  var emy = object.createEnemy(x,y);
  game.objects.push(emy);
 }

 game.battle = undefined;
 console.log(map.pathFind({x: 3, y: 2}, {x: 7, y: 3}));
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