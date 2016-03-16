"use strict";

/** Main menu ui class **/
/** Parameters ::: container prototype
 *  - name : "some kind of identifier for this container"
 **/

ui.types.window.menu = {};
ui.types.window.menu.create = function(name) {
  return {
    name: name,
    size: {x: 1.0, y: 0.30},
    background: ui.types.component.windowBackground.create("background"),
    nav: ui.types.component.menuNav.create("nav", this), //The buttons that show the different sub windows
    currentSub: 0, //The currently open sub window (this is an int used as an index)
    sub: [
      ui.types.component.partyStatus.create("party",this)
    ],
    
    visible: false,
    setVisible: function(b) { this.visible = b; },
    show: function() { this.visible = true; },
    hide: function() { this.visible = false; },
    
    draw: function() {
      if(!this.visible) { return; }
      this.background.draw({x: ui.drawRes, y: 0}, {x: (display.width-ui.drawRes)*0.5, y: ui.drawRes*this.nav.buttons.length});
      this.nav.draw({x: 0, y: 0});
      this.sub[this.currentSub].draw({x: ui.drawRes, y: 0}, {x: (display.width-ui.drawRes)*0.5, y: ui.drawRes*this.nav.buttons.length});
      /* Test */
//      display.context.fillStyle = "#FFFFFF";
//      display.context.font = "14px Lucida Console";
//      display.context.fillText("FF# Engine - InDev v0.0.1",ui.drawRes+12,32);
//      display.context.fillText("Created using Javascript & HTML5 by InfernoPlus",ui.drawRes+12,48);
//      display.context.fillText("All rights reserved and what not.",ui.drawRes+12,64);
    }
  };
};

/** Texture and sound assets used by this class **/

