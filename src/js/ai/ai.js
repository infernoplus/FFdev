"use strict";

var ai = {};

ai.none = function() {
	/* This is literal */
};

ai.wander = function() {
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
};

ai.follow = function() {

};

ai.patrol = function() {

};

ai.guard = function() {

};
