"use strict";

var util = {};

util.init = function() {

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