"use strict";

var ui = {};
ui.types = {};
ui.types.window = {};
ui.types.component = {};

/* Debug */
ui.tileRes = 32;
ui.drawRes = 32;

ui.init = function() {
  ui.containers = [];
  
  /* Test!~ */
  var testWindow = new ui.types.window.menu.create("test");
  testWindow.show();
  ui.containers.push(testWindow);
  
};

ui.openChat = function() {
  /* DEPRECATED */
};

ui.mouse = function(x,y) {
  
};

ui.draw = function() {
  for(var i=0;i<ui.containers.length;i++) {
    ui.containers[i].draw();
  }
};