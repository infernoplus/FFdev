"use strict";

/** Class defining the party status window in the main menu. **/

ui.types.component.partyStatus = {};
ui.types.component.partyStatus.create = function(name, parent) {
  var windowDividerSpriteSheet = image.get('img/ui/windowDivider.png');
  return {
    name: name,
    parent: parent,
    buttons: function() {
      var buttons = [];
      for(var i=0;i<game.party.length;i++) {
        buttons.push(ui.types.component.textButton.create("partyMember"+i, game.party[i].name, function(){}));
      }
      return buttons;
    },
    divider: { //TODO: Make this a component.
      sheet: windowDividerSpriteSheet,
      draw: function(pos, size) {
        var s = size.y/ui.drawRes;
        for(var i=0;i<s;i++) {
          display.context.drawImage(this.sheet, ui.tileRes*(i===0?0:(i===s-1?2:1)), 0, ui.tileRes, ui.tileRes, pos.x, pos.y+(ui.drawRes*i), ui.drawRes, ui.drawRes);
        }
      }
    },
    status: {
      draw: function(pos, size) {
        display.context.fillStyle = "#FFFFFF";
        display.context.font = "16px Lucida Console";
        display.context.fillText("Info about the selected party member goes here~~", pos.x+6, ui.drawRes+pos.y-6);
      }
    },
    draw: function(pos, size) {
      var disp = this.buttons();
      for(var i=0;i<disp.length;i++) {
        disp[i].draw({x: pos.x, y: pos.y+((i)*ui.drawRes)});
      }
      this.divider.draw({x: pos.x+(ui.drawRes*4), y: 0}, {x: ui.drawRes, y: size.y});
      this.status.draw({x: pos.x+(ui.drawRes*5), y: 0}, {x: size.x-(ui.drawRes*5), y: size.y});
    }
  }
};

/** Texture and sound assets used by this class **/
image.collect('img/ui/windowDivider.png');