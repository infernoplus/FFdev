"use strict";

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

  if(game.loadingMap) { display.drawLoading(); }
  else { display.draw(); game.step(); }
 }

 requestAnimFrame(function() { main.step(); });
};

main.init();