"use strict";

var map = {};
map.maps = {};
map.init = function() {
	map.evt = []; //Event pallete
	map.obj = []; //Object pallete

	map.size = {x: 32, y: 32}; //Map bounds
	map.data = []; //Map tile data

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

//Open map through engine
map.open = function(name) {
	game.loadingMap = true;
	map.httpGet(map.maps[name]);
};

map.load = function(mapData, file) {
	map.size = {};
	map.data = [];
	map.evt = [];
	map.obj = [];

	var ary = file.split("\n");
	var k = 0; //Line number

  //Parse evt palette
	var evtHeader = parseInt(ary[k++]);
	for(var i=0;i<evtHeader;i++) {
		var evt = ary[k++].split(",");
		map.evt.push({
			id: evt[0],
			func: mapData.evt[evt[1]] ? mapData.evt[evt[1]] : (script.evt[evt[1]] ? script.evt[evt[1]] : script.evt.none),
			type: evt[2]
		});
	}

	//Parse obj palette
	var objHeader = parseInt(ary[k++]);
	for(var i=0;i<objHeader;i++) {
		var obj = ary[k++].split(",");
		var aiw = obj[10].split(";");
		map.obj.push({
			id: obj[0],
			name: obj[1],
			color: obj[2],
			sym: obj[3],
			type: obj[4],
			dname: obj[5],
			variant: parseInt(obj[6]),
			lvl: parseInt(obj[7]),
			team: parseInt(obj[8]),
			faction: parseInt(obj[9]),
			aiWorld: mapData.world[[aiw[0]]] ? mapData.world[aiw[0]] : (ai.world[aiw[0]] ? ai.world[aiw[0]] : ai.world.none), //TODO: Warn or error?
			aiWorldParam: aiw.length > 1 ? aiw[1] : undefined,
			aiBattle: mapData.battle[obj[11]] ? mapData.battle[obj[11]] : (ai.battle[obj[11]] ? ai.battle[obj[11]] : ai.battle.none), // ^^
			func: mapData.func[obj[12]] ? mapData.func[obj[12]] : (script.func[obj[12]] ? script.func[obj[12]] : script.func.none)                  // ^^
		});
	}

	//Parse tile data
	var tileHeader = ary[k++].split(",");
	map.size = {x: parseInt(tileHeader[0]), y: parseInt(tileHeader[1])};
	for(var i=0;i<map.size.x;i++) {
			map.data.push(new Array(map.size.y));
  }
	for(var j=0;j<map.size.y;j++) {
		for(var i=0;i<map.size.x;i++) {
			var line = ary[k++];
			var tl = line.split(",");
			var evt = line.split("[")[1].split("]")[0].split(",");
			var resolved = [];
			for(var l=0;l<evt.length;l++) {
				resolved.push(map.getEvtPalleteById(evt[l]));
			}
			map.data[i][j] = {x: i, y: j, tile: parseInt(tl[0]), r: parseInt(tl[1]), c: tl[2] === "true" ? true : false, evt: evt[0] !== "" ? resolved : []}; //TODO: actually parse EVT
		}
	}

	//Parse obj data
	var objDataHeader = parseInt(ary[k++]);
	for(var i=0;i<objDataHeader;i++) {
		var objData = ary[k++].split(",");
		var p = map.getObjPalleteById(objData[0]);

		var type = object.types; //TODO: Warn or error if missing?
		var parseType = p.type.split(".");
		for(var j=0;j<parseType.length;j++) {
			type = type[parseType[j]];
		}

    var npc = type.create(
    		{x: parseInt(objData[1]), y: parseInt(objData[2])},
			parseInt(objData[3]),
			p.dname,
			p.variant,
			p.lvl,
			p.team,
			p.faction,
			p.aiWorldParam ? p.aiWorld(p.aiWorldParam) : p.aiWorld(),
			p.aiBattle(),
			p.func,
			p.name
		);
    game.objects.push(npc);
	}
	
	//Change tile set
	tile.tileSet = image.get(mapData.tileSet);
};

map.getObjPalleteById = function(id) {
	for(var i=0;i<map.obj.length;i++) {
		if(map.obj[i].id === id) {
			return map.obj[i];
		}
	}
	return undefined; //TODO: Warn or error?
};

map.getEvtPalleteById = function(id) {
	for(var i=0;i<map.evt.length;i++) {
		if(map.evt[i].id === id) {
			return map.evt[i];
		}
	}
	return undefined; //TODO: Warn or error?
};

/** Bad deprecated code that needs to be replaced. Likely with jquery */
map.httpGet = function(mapData) {
	var xmlhttp;
	if (window.XMLHttpRequest)
	{// code for IE7+, Firefox, Chrome, Opera, Safari
			xmlhttp=new XMLHttpRequest();
	}
	else
	{// code for IE6, IE5
			xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
	}
	xmlhttp.onreadystatechange=function() {
    if (xmlhttp.readyState==4 && xmlhttp.status==200) {
	   	map.load(mapData, xmlhttp.responseText);
   		game.loadingMap = false;
	  }
	}
	xmlhttp.open("GET", mapData.file);
	xmlhttp.send();
};