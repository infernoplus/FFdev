"use strict";

/** Class defining a button that uses a sprite sheet for its visual. **/

ui.types.component.spriteButton = {};
ui.types.component.spriteButton.create = function(name, spriteSheet, spriteNumber, onClick) {
  return {
    name: name,
    sheet: spriteSheet,
    sid: spriteNumber*2,
    onClick: onClick,
    draw: function(pos) {
      if(util.inBox({a: pos, b: {x: pos.x+ui.drawRes, y: pos.y+ui.drawRes}}, input.cursor)) {
        display.context.drawImage(this.sheet, (this.sid+1)*ui.tileRes, 0, ui.tileRes, ui.tileRes, pos.x, pos.y, ui.drawRes, ui.drawRes);
      }
      else {
        display.context.drawImage(this.sheet, this.sid*ui.tileRes, 0, ui.tileRes, ui.tileRes, pos.x, pos.y, ui.drawRes, ui.drawRes);
      }
    }
  };
};

/** Texture and sound assets used by this class **/