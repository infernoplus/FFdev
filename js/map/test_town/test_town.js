"use strict";

map.maps.test_town = {
    file: 'js/map/test_town/test_town.map',
    tileSet: 'img/tile/test.png',
    //Map specific world ai types
    world: {

    },
    //Map specific battle ai types
    battle: {

    },
    //Map specific events
    evt: {
      exit_bottom_right: function(t) { if(t === player.npc) { game.queueLoadMap("test_lake", {x: 25, y: 4}, 3); } }
    },
    //Map specific obj functions
    func: {
      guy_npc_talk: function(t) { ui.openChat(this.name, "I am the worst npc in the game."); },
      hc_npc_talk: function(t) { ui.openChat(this.name, "I love my children so much! Motherhood is the greatest blessing of all!"); },
    }
};

/** Texture and sound assets used by this class **/
image.collect('img/tile/test.png');