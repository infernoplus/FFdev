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
 util.init();
 input.init();
 ui.init();
 map.init();
 object.init();
 display.init();
 game.init();
 main.step();
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