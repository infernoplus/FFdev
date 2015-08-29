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
 return util.directionTo(a,b);
};