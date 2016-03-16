"use strict";

/** Class defining the nav icons that run along the side of the main menu.**/

ui.types.component.menuNav = {};
ui.types.component.menuNav.create = function(name, parent) {
  var menuIconsSpriteSheet = image.get('img/ui/menuicons.png');
  return {
    name: name,
    parent: parent,
    buttons: [
      ui.types.component.spriteButton.create("party", menuIconsSpriteSheet, 0, function(){}),
      ui.types.component.spriteButton.create("inventory", menuIconsSpriteSheet, 1, function(){}),
      ui.types.component.spriteButton.create("quest", menuIconsSpriteSheet, 2, function(){}),
      ui.types.component.spriteButton.create("save", menuIconsSpriteSheet, 3, function(){}),
      ui.types.component.spriteButton.create("other", menuIconsSpriteSheet, 4, function(){}),
      ui.types.component.spriteButton.create("things", menuIconsSpriteSheet, 5, function(){}),
      ui.types.component.spriteButton.create("idk", menuIconsSpriteSheet, 6, function(){}),
      ui.types.component.spriteButton.create("lol", menuIconsSpriteSheet, 7, function(){})
    ],
    draw: function(pos) {
      for(var i=0;i<this.buttons.length;i++) {
        this.buttons[i].draw({x: pos.x, y: pos.y+(i*ui.drawRes)});
      }
    }
  }
};

/** Texture and sound assets used by this class **/
image.collect('img/ui/menuicons.png');