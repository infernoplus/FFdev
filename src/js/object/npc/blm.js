"use strict";

object.types.npc.blm = {};

/* This is a type so it intializes itself before the engine intializes */
object.types.npc.selfInit = function() {
 var proto = object.types.npc.proto; //Prototype
 var obj = object.types.npc.blm; //Namespace

	obj.create = function(pos, look, ai, name) {
	 return {
		pos : {x: pos.x, y: pos.y}, //Copy by value
		lastPos : {x: pos.x, y: pos.y},
		look : look,
		attr : {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10},
		stat : {hp: 10, maxHp: 10},
		atk : [{name: "Fast Strike", potency: 50}, {name: "Heavy Strike", potency: 65}],
		mag : [{name: "Fire I", potency: 170}, {name: "Ice I", potency: 120}, {name: "Thunder I", potency: 50}],
		anim : {frame: false, animc : 0, moving: false, tween : {x: 0, y: 0}},
		tile : image.get('img/character/blm.png'),
		battle : false,
		dead : false,
		name : name,
		message : "This chat system is garbagio. >:(",
		step : function() {
		 this.tweening();
		 this.ai();
		},
		tweening : proto.tweening,
		ai : ai,
		move : proto.move,
		lookAt : proto.lookAt,
		damage : proto.damage,
		kill : proto.kill,
		draw : proto.draw
	 };
	};
};

object.types.npc.selfInit();
