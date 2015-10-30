"use strict";

var map = {};
map.init = function() {
	map.size = {x: 32, y: 32};
	map.data = [];
	for(var i=0;i<map.size.x;i++) {
		map.data.push([]);
		for(var j=0;j<map.size.y;j++) {
			map.data[i].push({x:i, y:j, tile: 0, r:0, c:false, evt: []});
		}
	}
};

map.pathFind = function(a, b) {
 //if(util.distance(a,b) > 8) {
	 var path = {points: []};
	 path.points.push(a);
	 path.points.push(util.add(a, util.directionTo(a,b)));
	 return path;
 //}

/* deprecated path finding
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
 */
};

map.spaceEmpty = function(a) {
	if(!map.map[a.x][a.y].c) {
	    if(object.getObjectAtPos(a.x, a.y) == undefined) {
	    	return true;
	    }
	}
	return false;
};

map.open = function(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  map.file = undefined;
  var reader = new FileReader();
  reader.onload = function(e) {
    var r = e.target.result;
		map.file = r;
  };
  reader.readAsText(file);

  //Recursive timeout
  var opened = function() {
		if(map.file === undefined) {
			setTimeout(function() { opened(); }, 500);
		}
	  else {
			//GOTCHA!
			map.load(map.file);
			map.file = undefined;
		}
	};

	opened();
};

map.load = function(file) {
	var ary = file.split("\n");
	var header = ary[0].split(",");

	map.data = [];
	map.size = {x: parseInt(header[0]), y: parseInt(header[1])};
	var k = 1;
	for(var i=0;i<map.size.x;i++)
			map.data.push(new Array(map.size.y));
	for(var j=0;j<map.size.y;j++) {
		for(var i=0;i<map.size.x;i++) {
			var tile = ary[k++].split(",");
			map.data[i][j] = {x: i, y: j, tile: parseInt(tile[0]), r: parseInt(tile[1]), c: tile[2] === "true" ? true : false, evt: []};
		}
	}
}
