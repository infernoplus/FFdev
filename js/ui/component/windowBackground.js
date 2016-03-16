"use strict";

/** Class defining the bordered background for a window.**/

ui.types.component.windowBackground = {};
ui.types.component.windowBackground.create = function(name) {
  var windowBackgroundSpriteSheet = image.get('img/ui/windowbackground.png');
  return {
    name: name,
    sheet: windowBackgroundSpriteSheet,
    draw: function(pos, size) {
      var x = Math.floor(size.x/ui.drawRes);
      var y = Math.floor(size.y/ui.drawRes);
      
      for(var i=0;i<x;i++) {
        for(var j=0;j<y;j++) {
          var dp = {x: pos.x+(i*ui.drawRes), y: pos.y+(j*ui.drawRes)};
          var sid;
          switch((i===0?"t":"f")+(j===0?"t":"f")+(i===x-1?"t":"f")+(j===y-1?"t":"f")) {
            case "ffff" : { sid = 0; break; }
            case "tfff" : { sid = 4; break; }
            case "ftff" : { sid = 1; break; }
            case "fftf" : { sid = 2; break; }
            case "ffft" : { sid = 3; break; }
            case "ttff" : { sid = 5; break; }
            case "fftt" : { sid = 7; break; }
            case "fttf" : { sid = 6; break; }
            case "tfft" : { sid = 8; break; }
            default : {sid = 9; break; }
          }
          display.context.drawImage(this.sheet, sid*ui.tileRes, 0, ui.tileRes, ui.tileRes, dp.x, dp.y, ui.drawRes, ui.drawRes);
        }
      }
    }
  }
};

/** Texture and sound assets used by this class **/
image.collect('img/ui/windowbackground.png');