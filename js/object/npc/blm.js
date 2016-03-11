"use strict";

object.types.npc.blm = {};

// This anon function initializes a factory for the this type.
(function() {
	var proto = object.types.npc.proto; //Prototype
	var obj = object.types.npc.blm; //Namespace

	  /** --- Parameters ---
	  	 pos      :: {x, y} world space position
	  	 look     :: 0 1 2 3 (left right up down) world space facing direction
	     name     :: "string" display name of this actor
	  	 variant  :: 0 - 99 determines what sprite sheet to use. defined by the tileVar function below
	  	 lvl      :: 0 - 99 (used to generate stats and spell lists)
	  	 team     :: 0 - 99 determines if something is frineldy or not. player & allies are 0 and enemies are anything else. enemies on different teams will fight.
	  	 faction  :: 0 - 99 determines the named faction an obj belongs to. player will always be in player faction but allies can be in different factions
	     aiWorld  :: func() ai assigned to this actor when it is navigating the overworld
	     aiBattle :: func() ai assigned to this actor when it enters a battle
	     func     :: func() function of this object when activated
	     id       :: "string" script level id of this actor. used for special shit
	  **/

	obj.create = function(pos, look, name, variant, lvl, team, faction, aiWorld, aiBattle, func, id) {
	 var tileVar = function(v) {
	   switch(v) {
			 case 1 : return image.get('img/character/blm_red.png');
	 		 default : return image.get('img/character/blm.png');
		 }
	 };
	 return {
		pos : {x: pos.x, y: pos.y}, //Explicit copy by value
		lastPos : {x: pos.x, y: pos.y},
		look : look,
		attr : {vit: 10, str: 10, dex: 10, int: 10, mnd: 10, pie: 10}, //TODO: Generate by level
		stat : {hp: 10, maxHp: 10}, //TODO: Generate from attr
		atk : [{name: "Fast Strike", potency: 50}, {name: "Heavy Strike", potency: 65}], //TODO: Assemble from spell list and level
		mag : [{name: "Fire I", potency: 170}, {name: "Ice I", potency: 120}, {name: "Thunder I", potency: 50}], // ^^
		anim : {frame: false, animc : 0, moving: false, tween : {x: 0, y: 0}},
		tile : tileVar(variant),
		team : team,
		faction : faction,
		battle : false,
		dead : false,
		id : id,
		name : name,
		func : func,
		step : function() {
		 this.tweening();
		 this.aiWorld.step(this);
		},
		tweening : proto.tweening,
		aiWorld : aiWorld,
		aiBattle: aiBattle,
		move : proto.move,
		lookAt : proto.lookAt,
		damage : proto.damage,
		kill : proto.kill,
		draw : proto.draw
	 };
	};
})();

/** Texture and sound assets used by this class **/
image.collect('img/character/blm.png');
image.collect('img/character/blm_red.png');
