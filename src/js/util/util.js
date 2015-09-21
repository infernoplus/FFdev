"use strict";

var util = {};

util.init = function() {

};

util.add = function(a,b) {
	return {x: a.x+b.x, y: a.y+b.y};
};

util.directionTo = function(a, b) {
 if(Math.abs(a.x - b.x) > Math.abs(a.y - b.y)) {
  return {x: b.x > a.x ? 1 : -1, y: 0};
 }
 return {x: 0, y: b.y > a.y ? 1 : -1};
};

util.distance = function(a, b) {
 return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
};

util.rand = function(max) {
 return parseInt(Math.random()*(max+1));
};

util.inBounds = function(a,b) {
	if(a.x < 0 || a.x > b.x || a.y < 0 || a.y > b.y)
		return false;
	return true;
};