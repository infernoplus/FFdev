"use strict";

var ai = {};

/*********************************/
/** World ai basic types        **/
/*********************************/
ai.world = {};

ai.world.none = function() {
	return {
		step: function(obj) {
			//As the name would suggest...
		}
	};
};

ai.world.wander = function() {
	return {
		step: function(obj) {
			if(Math.random()<0.025) {
				switch(parseInt(Math.random()*4)) {
					case 0 : { obj.move(0,1); break; }
					case 1 : { obj.move(0,-1); break; }
					case 2 : { obj.move(1,0); break; }
					default : { obj.move(-1,0); break; }
				}
			}
		}
	};
};

ai.world.follow = function(trgt) {
	return {
		step: function(obj) {
			var t = object.getObjectById(this.target);
			if(t) {
				if(util.distance(obj.pos, t.lastPos) >= 1) {
					var path = map.pathFind(obj.pos, t.lastPos);
					obj.move(path.points[1].x-path.points[0].x, path.points[1].y-path.points[0].y);
				}
			}
		},
		target: trgt //The script id of whatever we are following.
	};
};


/*********************************/
/** Battle ai basic types       **/
/*********************************/
ai.battle = {};

ai.battle.none = function() {
	return {
		step: function(obj, bat) {
			//FIXME: Should automatically pass it's turn in combat without doing anything.
		}
	};
};