"use strict";

var map = {};

map.init = function() {
 map.size = {x: 512, y: 512};
 map.tile = ["#23B23B","#32AF47","#2A9F3E","#1E9C33","#453312"];
 map.map = [];
 for(var i=0;i<map.size.x;i++) {
  map.map[i] = [];
  for(var j=0;j<map.size.y;j++) {
   var r = util.rand(4);
   switch(r) {
    case 1 : map.map[i][j] = 1; break;
    case 2 : map.map[i][j] = 2; break;
    case 3 : map.map[i][j] = 3; break;
    case 4 : map.map[i][j] = 4; break;
    default : map.map[i][j] = 0; break;
   }
  }
 }
};

map.pathFind = function(a, b) {
 if(util.distance(a,b) > 8) {
	 var path = {points: []};
	 path.points.push(a);
	 path.points.push(util.add(a, util.directionTo(a,b)));
	 return path;
 }
 
 var protoContains = function(a) {
	 for(var i=0;i<this.points.length;i++) {
		 if(this.points[i].x === a.x && this.points[i].y === a.y)
			 return true;
	 }
	 return false;
 };
 var protoLast = function() {
	 return this.points[this.points.length-1];
 }
 var protoPushCopy = function(a) {
	 var copy = {points: [], contains: this.contains, last: this.last, pushCopy: this.pushCopy};
	 for(var i=0;i<this.points.length;i++) {
	     copy.points.push(this.points[i]);
 	 }
	 copy.points.push(a);
	 return copy;
 };
 
 var paths = [{points: [{x: a.x, y: a.y}], contains: protoContains, last: protoLast, pushCopy: protoPushCopy}];
 var solution;
 for(var i=0;i<12&&solution===undefined;i++) {
	 var tmp = [];
	 for(var j=0;j<paths.length;j++) {
		 var p;
		 p = {x: paths[j].last().x+1, y: paths[j].last().y};
		 if(util.inBounds(p, map.size) && (map.spaceEmpty(p) || (p.x === b.x && p.y === b.y)) && !paths[j].contains(p)) tmp.push(paths[j].pushCopy(p));
		 p = {x: paths[j].last().x-1, y: paths[j].last().y};
		 if(util.inBounds(p, map.size) && (map.spaceEmpty(p) || (p.x === b.x && p.y === b.y)) && !paths[j].contains(p)) tmp.push(paths[j].pushCopy(p));
		 p = {x: paths[j].last().x, y: paths[j].last().y+1};
		 if(util.inBounds(p, map.size) && (map.spaceEmpty(p) || (p.x === b.x && p.y === b.y)) && !paths[j].contains(p)) tmp.push(paths[j].pushCopy(p));
		 p = {x: paths[j].last().x, y: paths[j].last().y-1};
		 if(util.inBounds(p, map.size) && (map.spaceEmpty(p) || (p.x === b.x && p.y === b.y)) && !paths[j].contains(p)) tmp.push(paths[j].pushCopy(p));
	 }
	 paths = tmp;
	 for(var j=0;j<paths.length;j++) {
		 if(paths[j].last().x === b.x && paths[j].last().y === b.y) {
			 solution = paths[j];
		 }
	 }
 }
 if(solution === undefined) {
	 var path = {points: []};
	 path.points.push(a);
	 path.points.push(util.add(a, util.directionTo(a,b)));
	 console.log("Failed");
	 return path;
 }
 console.log("Solved");
 return solution;
};

map.spaceEmpty = function(a) {
	if(map.map[a.x][a.y] !== 4) {
	    if(object.getObjectAtPos(a.x, a.y) == undefined) {
	    	return true;
	    }
	}
	return false;
};