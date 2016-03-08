"use strict";

map.maps.test = {
	file: "js/map/test/test.map",
	//Map specific world ai types
	world: {

	},
	//Map specific battle ai types
	battle: {

	},
	//Map specific events
	evt: {
		testTeleportOne: function(t) { t.lastPos = t.pos; t.pos = {x: 2, y: 2}; },
		testDialouge: function(t) { ui.openChat("The Floor", "Owww! Why did you step on me jerk!"); }
	},
	//Map specific obj functions
	func: {
		npcTestTalkOne: function(t) { ui.openChat(this.name, "Pfff, it's not like I care if you notice me " + t.name + "."); },
		npcTestTalkTwo: function(t) { ui.openChat(this.name, t.name + "-senpai please notice me..."); }
	}
};