"use strict";

/** Class defining a button that uses text for its visual. **/

ui.types.component.textButton = {};
ui.types.component.textButton.create = function(name, text, onClick) {
  var textHighlightBoxSprite = image.get('img/ui/textHighlightBox.png');
  return {
    name: name,
    text: text,
    onClick: onClick,
    sprite: textHighlightBoxSprite,
    draw: function(pos) {
      display.context.fillStyle = "#FFFFFF";
      display.context.font = "16px Lucida Console";
      display.context.fillText(text,pos.x+6, ui.drawRes+pos.y-6);
      if(util.inBox({a: pos, b: {x: pos.x+(ui.drawRes*4), y: pos.y+ui.drawRes}}, input.cursor)) {
        display.context.drawImage(this.sprite, 0, 0, ui.tileRes*4, ui.tileRes, pos.x, pos.y, ui.drawRes*4, ui.drawRes);
      }
    }
  };
};

/** Texture and sound assets used by this class **/
image.collect('img/ui/textHighlightBox.png');