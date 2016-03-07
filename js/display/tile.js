"use strict";

var tile = {};

tile.init = function() {

	tile.tileSet = image.get('img/tile/test.png');
	tile.res = 16;  //Resolution of a single tile
	tile.sheetRes = 320;//Resolution of the full sheet
};

//Takes the index of a tile and gives the top left corner of it. Tile 0 is 0,0 and tile 1 is 16,0... etc...
tile.getTileByIndex = function(k) {
	for(var i=0;i<(tile.sheetRes/tile.res);i++) {
		for(var j=0;j<(tile.sheetRes/tile.res);j++) {
			if(k === 0)
				return {x: j, y: i};
			k--;
		}
	}
	return {x: 0, y: 0};
};
