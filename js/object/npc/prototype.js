"use strict";

object.types.npc = {};
object.types.npc.proto = {};

/* This is a type so it intializes itself before the engine intializes */
object.types.npc.proto.selfInit = function() {
 var obj = object.types.npc.proto;

 obj.tweening = function() {
  if(this.anim.tween.x < 0)
   this.anim.tween.x += 0.33;
  if(this.anim.tween.x > 0)
   this.anim.tween.x -= 0.33;
  if(this.anim.tween.y < 0)
   this.anim.tween.y += 0.33;
  if(this.anim.tween.y > 0)
   this.anim.tween.y -= 0.33;
  if(this.anim.moving && Math.abs(this.anim.tween.x) < 0.1 && Math.abs(this.anim.tween.y) < 0.1) {
   this.anim.tween = {x: 0, y: 0};
   this.anim.moving = false;
   //We check for evt triggers after we finish stepping onto a new tile.
   var tile = map.data[this.pos.x][this.pos.y];
   for(var i=0;i<tile.evt.length;i++) {
		 tile.evt[i].func(this);
	 }
  }
 };

 obj.move = function(x,y) {
  if(this.anim.moving)
   return;
  if(x !== 0)
   if((x > 0 && this.look === 1) || (x < 0 && this.look === 0)) {
    if(this.pos.x+x >= 0 && this.pos.x+x < map.size.x)
     if(!map.data[this.pos.x+x][this.pos.y].c)
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
     if(!map.data[this.pos.x][this.pos.y+y].c)
      if(object.getObjectAtPos(this.pos.x, this.pos.y+y) == undefined) {
       this.lastPos = {x: this.pos.x, y: this.pos.y};
       this.pos.y += y; this.anim.tween.y -= y; this.look = y < 0 ? 2 : 3; this.anim.moving = true; this.anim.frame = !this.anim.frame;
      }
   }
   else
    this.look = y < 0 ? 2 : 3;
 };

 obj.lookAt = function(x,y) {
  if(Math.abs(x) > Math.abs(y))
   this.look = x < 0 ? 0 : 1;
  else
   this.look = y < 0 ? 2 : 3;
 };

 obj.draw = function(w,h) {
  var x = this.pos.x + this.anim.tween.x - player.npc.pos.x + parseInt(w/2) - player.npc.anim.tween.x;
  var y = this.pos.y + this.anim.tween.y - player.npc.pos.y + parseInt(h/2) - player.npc.anim.tween.y;
  var si = (this.look*2) + (this.anim.frame ? 1 : 0);
  display.context.drawImage(this.tile, si*16, 0, 16, 16, x*display.scale,y*display.scale,display.scale,display.scale);
 };

 obj.damage = function(x) {
  this.stat.hp -= x;
  if(this.stat.hp <= 0)
   this.kill();
 };

 obj.kill = function() {
  this.dead = true;
 };

};

object.types.npc.proto.selfInit();

/*
 object.proto.moving = false;
 object.proto.pos = {x: 0, y: 0};
 object.proto.lastPos = {x: 0, y: 0};
 object.proto.look = 0;
 object.proto.tile = undefined;
 object.proto.anim = {frame: false, moving: false, tween: {x: 0, y: 0}};
 object.proto.dead = false;
 object.proto.stat = {hp: 10, maxHp: 10};
 object.proto.attr = {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10};
 */
