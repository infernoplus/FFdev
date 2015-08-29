"use strict";

var object = {};
object.proto = {};

object.init = function() {
 object.proto.moving = false;
 object.proto.pos = {x: 0, y: 0};
 object.proto.lastPos = {x: 0, y: 0};
 object.proto.look = 0;
 object.proto.tile = undefined;
 object.proto.anim = {frame: false, moving: false, tween: {x: 0, y: 0}};
 object.proto.dead = false;
 object.proto.stat = {hp: 10, maxHp: 10};
 object.proto.attr = {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10};

 object.proto.tweening = function() {
  if(this.anim.tween.x < 0)
   this.anim.tween.x += 0.33;
  if(this.anim.tween.x > 0)
   this.anim.tween.x -= 0.33;
  if(this.anim.tween.y < 0)
   this.anim.tween.y += 0.33;
  if(this.anim.tween.y > 0)
   this.anim.tween.y -= 0.33;
  if(Math.abs(this.anim.tween.x) < 0.1 && Math.abs(this.anim.tween.y) < 0.1) {
   this.anim.tween = {x: 0, y: 0};
   this.anim.moving = false;
  }
 };

 object.proto.move = function(x,y) {
  if(this.anim.moving)
   return;
  if(x !== 0)
   if((x > 0 && this.look === 1) || (x < 0 && this.look === 0)) {
    if(this.pos.x+x >= 0 && this.pos.x+x < map.size.x)
     if(map.map[this.pos.x+x][this.pos.y] != 4)
      if(object.getObjectAtPos(this.pos.x+x, this.pos.y) == undefined) {
       this.lastPos = {x: this.pos.x, y: this.pos.y};
       this.pos.x += x; this.anim.tween.x -= x; this.look = x < 0 ? 0 : 1; this.anim.moving = true; this.anim.frame = !this.anim.frame;
     }
   }
   else
    this.look = x < 0 ? 0 : 1;
  else if(y !== 0)
   if((y > 0 && this.look === 3) || (y < 0 && this.look === 2)) {
    if(this.pos.y+y >= 0 && this.pos.y+y < map.size.y)
     if(map.map[this.pos.x][this.pos.y+y] != 4)
      if(object.getObjectAtPos(this.pos.x, this.pos.y+y) == undefined) {
       this.lastPos = {x: this.pos.x, y: this.pos.y};
       this.pos.y += y; this.anim.tween.y -= y; this.look = y < 0 ? 2 : 3; this.anim.moving = true; this.anim.frame = !this.anim.frame;
      }
   }
   else
    this.look = y < 0 ? 2 : 3;
 };

 object.proto.lookAt = function(x,y) {
  if(Math.abs(x) > Math.abs(y))
   this.look = x < 0 ? 0 : 1;
  else
   this.look = y < 0 ? 2 : 3;
 };

 object.proto.draw = function(w,h) {
  var x = this.pos.x + this.anim.tween.x - game.player.pos.x + parseInt(w/2) - game.player.anim.tween.x;
  var y = this.pos.y + this.anim.tween.y - game.player.pos.y + parseInt(h/2) - game.player.anim.tween.y;
  var si = (this.look*2) + (this.anim.frame ? 1 : 0);
  display.context.drawImage(this.tile, si*16, 0, 16, 16, x*display.scale,y*display.scale,display.scale,display.scale);
 };

 object.proto.damage = function(x) {
  this.stat.hp -= x;
  if(this.stat.hp <= 0)
   this.kill();
 };

 object.proto.kill = function() {
  this.dead = true;
 };
};

object.getObjectAtPos = function(x,y) {
 var xx = parseInt(x); var yy = parseInt(y);
 for(var i=0;i<game.objects.length;i++) {
  if(game.objects[i].pos.x === xx && game.objects[i].pos.y === yy)
   return game.objects[i];
 }
 return undefined;
};

object.createPlayer = function(x,y) {
 return {
  pos : {x: x, y: y},
  lastPos : {x: x, y: y},
  look : 0,
  attr : {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10},
  stat : {hp: 10, maxHp: 10},
  atk : [{name: "Fast Strike", potency: 50}, {name: "Heavy Strike", potency: 65}],
  mag : [{name: "Fire I", potency: 170}, {name: "Ice I", potency: 120}, {name: "Thunder I", potency: 50}],
  anim : {frame: false, animc : 0, moving: false, tween : {x: 0, y: 0}},
  tile : document.getElementById("blm_sheet"),
  battle : false,
  dead : false,
  name : "Vivi",
  step : function() {
   this.tweening();
   this.input();
  },
  tweening : object.proto.tweening,
  input : function() {
   if(ui.isActive() || game.inBattle())
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
   this.move(x,y);

   if(input.keys[69]) {
    var t;
    switch(this.look) {
     case 0 : t = object.getObjectAtPos(this.pos.x-1,this.pos.y); break;
     case 1 : t = object.getObjectAtPos(this.pos.x+1,this.pos.y); break;
     case 2 : t = object.getObjectAtPos(this.pos.x,this.pos.y-1); break;
     default : t = object.getObjectAtPos(this.pos.x,this.pos.y+1); break;
    }
    if(t !== undefined)
     ui.openChat(t.name, t.message);
   }
  },
  move : object.proto.move,
  lookAt : object.proto.lookAt,
  damage : object.proto.damage,
  kill : object.proto.kill,
  draw : object.proto.draw
 };
};

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
  tile : document.getElementById("pal_sheet"),
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
  tile : document.getElementById("whm_sheet"),
  name : "Ella",
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
    var dir = map.pathFind(this.pos, this.follow.lastPos);
    this.move(dir.x,dir.y);
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
  tile : document.getElementById("war_sheet"),
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
   else if(dist < 6) {
    var dir = util.directionTo(this.pos, game.player.pos);
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

/*********************************************/