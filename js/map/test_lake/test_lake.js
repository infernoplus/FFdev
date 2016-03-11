"use strict";

map.maps.test_lake = {
	file: "js/map/test_lake/test_lake.map",
	//Map specific world ai types
	world: {

	},
	//Map specific battle ai types
	battle: {

	},
	//Map specific events
	evt: {
		exit_bottom_left: function(t) { console.log("hi"); },
		exit_top_right: function(t) { if(t === player.npc) { game.queueLoadMap("test_town", {x: 25, y: 27}, 0); } },
		question_block: function(t) { if(t === player.npc) { ui.openChat("Question Block", "I'm here to help you. Now fuck off."); } }
	},
	//Map specific obj functions
	func: {
		fisher_npc_talk: function(t) { ui.openChat(this.name, "I'm a fisher. I fish for fish but it's pretty fishy sometimes."); },
		baker_npc_talk: function(t) { ui.openChat(this.name, "It's a piece of cake to bake a pretty cake."); },
		luke_npc_talk: function(t) { ui.openChat(this.name, "I'm a big gay baby lol."); },
		leader_npc_talk: function(t) { ui.openChat(this.name, "This guy won't stop following me..."); },
		follower_npc_talk: function(t) { ui.openChat(this.name, "OMG THIS GUY IS SO COOOOOOOOL XD"); }
	}
};