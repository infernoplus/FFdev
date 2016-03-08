"use strict";

/** The TODO list : 
 *  - Rewrite battle system to allow the world state to continue during fights, and instance fights in a way that allows multiple to be going on at once.
 *  - Rewrite party system to allow rearranging and automatic control swaps
 *  - Rewrite collision so that the player can walk through the party
 *  - Allow special parameters for ai in map editor and parse them correctly on load. EX: target parameter on follow ai.
 *  - Fix texture sampling/texture bleeding when zooming in engine.
 *  - Standardize all player input to the player class
 *  - Pathfinding
 *  - Tileset per map
 *  - Static and special objects
 *  - Factions and hostility
 *  - Inventory
 *  - Equipment
 *  - Spell and Ability effects
 *  - Stats and leveling
 *  - Battle AI
 *  - Rewrite UI into a framework that uses factory methods to build widgets, allow both touch and keyboard control.
 *  - Benchmark testing to see how far we go with areas.
 *  - Quests, tracking, and game scoped variables, game saving
 **/

var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 33);
        };
})();

/*********************************************/

var main = {};

main.init = function() {

 image.init();
 image.onReady( function() {
  util.init();
  input.init();
  tile.init();
  player.init();
  ui.init();
  map.init();
  object.init();
  display.init();
  game.init();
  main.step();
 });
};

main.lastTime = 0;
main.step = function() {
 var now = Date.now();

 if(now - main.lastTime > 33) {
  main.lastTime = now;

  game.step();
  display.draw();
 }

 requestAnimFrame(function() { main.step(); });
};

main.init();