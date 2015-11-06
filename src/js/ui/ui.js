"use strict";

var ui = {};

ui.init = function() {
 ui.focus = undefined;

 ui.font = {sml: "12px Lucida Console", reg: "14px Lucida Console", lrg: "20px Lucida Console"};
 ui.color = {blue: "#1111FF", white: "#EEEEFF"};

 ui.load = {
	 draw: function() {
		 display.context.fillStyle = ui.color.white;
		 display.context.font = ui.font.lrg;
		 display.context.fillText("Loading...",0,0);
	 }
 };

 ui.menu = {
  openTab: undefined,
  tabs: [
   {
    text: "Party",
    mouse: function(x,y) { /*more magic*/ },
    draw: function() {
     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.reg;
     display.context.fillText(this.text,12,50);
     for(var i=0;i<game.party.length;i++) {
      display.context.fillStyle = ui.color.white;
      display.context.font = ui.font.sml;
      display.context.fillText(game.party[i].name + " HP: " + game.party[i].stat.hp + "/" + game.party[i].stat.maxHp,12,50 + ((i+1)*25));
     }
    }
   },
   {
    text: "Equipment",
    mouse: function(x,y) { /*more magic*/ },
    draw: function() {
     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.reg;
     display.context.fillText(this.text,12,50);
    }
   },
   {
    text: "Items",
    mouse: function(x,y) { /*more magic*/ },
    draw: function() {
     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.reg;
     display.context.fillText(this.text,12,50);
    }
   },
   {
    text: "Magic",
    mouse: function(x,y) { /*more magic*/ },
    draw: function() {
     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.reg;
     display.context.fillText(this.text,12,50);
    }
   },
   {
    text: "About",
    mouse: function(x,y) { /*more magic*/ },
    draw: function() {
     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.reg;
     display.context.fillText(this.text,12,50);

     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.sml;
     display.context.fillText("FF# Engine - InDev v0.0.1",12,70);
     display.context.fillText("Created using Javascript & HTML5 by InfernoPlus",12,85);
     display.context.fillText("All rights reserved and what not.",12,100);
    }
   }
  ],
  mouse: function(x,y) {
   if(this.openTab !== undefined)
    this.openTab.mouse(x,y);
   for(var i=0;i<this.tabs.length;i++) {
    var a = display.width*0.75;
    var b = (i)*25;
    var c = (display.width*0.25) + a;
    var d = (i+1)*25;

    if(x > a && x < c && y > b && y < d) {
     this.openTab = this.tabs[i];
     return;
    }
   }
  },
  draw: function() {
   display.context.fillStyle = ui.color.blue;
   display.context.fillRect(0,0,display.width,320);
   display.context.fillStyle = ui.color.white;
   display.context.fillRect(0,315,display.width,10);

   display.context.fillStyle = ui.color.white;
   display.context.fillRect(0,25,display.width*0.75,5);

   display.context.fillStyle = ui.color.white;
   display.context.fillRect(display.width*0.75,0,5,320);

   display.context.fillStyle = ui.color.white;
   display.context.font = ui.font.lrg;
   display.context.fillText("Main Menu",12,20);

   for(var i=0;i<this.tabs.length;i++) {
    display.context.fillStyle = ui.color.white;
    display.context.fillRect(display.width*0.75,(i+1)*25,display.width*0.25,5);

    display.context.fillStyle = ui.color.white;
    display.context.font = ui.font.reg;
    display.context.fillText(this.tabs[i].text,(display.width*0.75)+5,((i+1)*25)-5);
   }

   if(this.openTab !== undefined)
    this.openTab.draw();
  }
 };
 ui.menu.openTab = ui.menu.tabs[0];

 ui.chat = {
  name: "",
  message: "",
  mouse: function(x,y) {
   ui.focus = undefined;
  },
  draw: function() {
    display.context.fillStyle = ui.color.blue;
    display.context.fillRect(0,display.height*0.70,display.width,display.height*0.30);
    display.context.fillStyle = ui.color.white;
    display.context.fillRect(0,display.height*0.70,display.width,10);

    display.context.fillStyle = ui.color.white;
    display.context.font = ui.font.reg;
    display.context.fillText(this.message,12,(display.height*0.70)+40);

    display.context.fillStyle = ui.color.white;
    display.context.fillRect(35,(display.height*0.70)-20,display.width*0.30,40);
    display.context.fillStyle = ui.color.blue;
    display.context.fillRect(40,(display.height*0.70)-15,(display.width*0.30)-10,30);

    display.context.fillStyle = ui.color.white;
    display.context.font = ui.font.lrg;
    display.context.fillText(this.name, 45,(display.height*0.70)-15+20);
  }
 };

 ui.battle = {
  tile: image.get('img/ui/menu.png'),
  openTab: undefined,
  proto: {
   listSelect: function(x,y,ary) {
    var max = ((((display.height)*0.30)-32)/14)-1;
    var dx = (((display.height+10)*0.30)/ui.battle.tabs.length) + 12;
    var dy = (display.height*0.70)+32;
    var k = 0;
    for(var i=0;k<ary.length;i++) {
     for(var j=0;j<max&&k<ary.length;j++) {
      var a = dx+(64*i);
      var b = dy+(14*j)+8;
      var c = a+96;
      var d = b+12;
      if(x >= a && x < c && y >= b && y < d) {
       return ary[k];
      }
     k++;
     }
    }
    return undefined;
   },
   listDraw: function(title, ary) {
    var max = ((((display.height)*0.30)-32)/14)-1;
    var dx = (((display.height+10)*0.30)/ui.battle.tabs.length) + 12;
    var dy = (display.height*0.70)+32;
    var k = 0;
    var hoverOver = this.listSelect(input.cursor.x,input.cursor.y,ary);
    for(var i=0;k<ary.length;i++) {
     for(var j=0;j<max&&k<ary.length;j++) {
	  if(hoverOver === ary[k]) {
	   display.context.fillStyle = ui.color.white;
       display.context.fillRect(dx+(96*i),dy+(14*j)+8,96,14);
       display.context.fillStyle = ui.color.blue;
       display.context.font = ui.font.sml;
       display.context.fillText(ary[k++].name,dx+(96*i),dy+(14*j)+18);
      }
      else {
       display.context.fillStyle = ui.color.white;
       display.context.font = ui.font.sml;
       display.context.fillText(ary[k++].name,dx+(96*i),dy+(14*j)+18);
      }
     }
    }
    display.context.fillStyle = ui.color.white;
    display.context.font = ui.font.reg;
    display.context.fillText(title,dx,dy);
   },
   tileDraw : function(ary) {
    var w = parseInt(display.width/display.scale);
    var h = parseInt(display.height/display.scale);

    var x = player.npc.pos.x - parseInt(w/2) + player.npc.anim.tween.x;
    var y = player.npc.pos.y - parseInt(h/2) + player.npc.anim.tween.y;

    var a = player.npc.pos.x-w >= 0 ? player.npc.pos.x-w : 0;
    var b = player.npc.pos.y-h >= 0 ? player.npc.pos.y-h : 0;
    var c = player.npc.pos.x+w < map.size.x ? player.npc.pos.x+w : map.size.x;
    var d = player.npc.pos.y+h < map.size.y ? player.npc.pos.y+h : map.size.y;

    for(var i=0;i<ary.length;i++) {
     display.context.fillStyle = ui.color.blue;

     var w = Math.max(display.scale*0.2,1);
     var xx = (ary[i].x-x)*display.scale;
     var yy = (ary[i].y-y)*display.scale;

     display.context.fillRect(xx,yy,display.scale,w);
     display.context.fillRect(xx,yy,w,display.scale);
     display.context.fillRect(xx,yy+display.scale-w,display.scale,w);
     display.context.fillRect(xx+display.scale-w,yy,w,display.scale);
    }
   }
   /* Deprecated?
   drawSelect: function(x,y) {
    var click = input.coordToTileScreenSpace(x,y);
	display.context.fillStyle = ui.color.blue;

	var w = Math.max(display.scale*0.2,1);
    display.context.fillRect(x,y,display.scale,w);
    display.context.fillRect(x,y,w,display.scale);
    display.context.fillRect(x,y+display.scale-w,display.scale,w);
    display.context.fillRect(x+display.scale-w,y,w,display.scale);
   }*/
  },
  tabs: [
   {
    text: "Attack",
    action: undefined,
    mouse: function(x,y) {
     var act = game.battle.getNeedsOrders();
     if(this.action !== undefined) {
      var click = input.coordToTile(x,y);
      var target = object.getObjectAtPos(click.x, click.y);
      if(target !== undefined && this.attackValid(target.pos.x,target.pos.y,act)) {
       game.battle.setOrders(act, this.action, target);
       this.action = undefined;
      }
      else {
       console.log("No valid target at " + click.x + ", " + click.y);
       this.action = undefined;
      }
     }
     else {
      var sel = ui.battle.proto.listSelect(x,y,act.atk);
      if(sel !== undefined)
       this.action = sel;
     }
    },
    draw: function() {
     if(this.action !== undefined) {
      var dx = (((display.height+10)*0.30)/ui.battle.tabs.length) + 12;
      var dy = (display.height*0.70)+32;
      display.context.fillStyle = ui.color.white;
      display.context.font = ui.font.sml;
      display.context.fillText("Select target for " + this.action.name,dx+(64),dy+(14)+18);

      var act = game.battle.getNeedsOrders();
      var valid = [];
      for(var i=0;i<game.battle.teamb.length;i++) {
	   if(this.attackValid(game.battle.teamb[i].pos.x,game.battle.teamb[i].pos.y,act)) {
	    valid.push(game.battle.teamb[i].pos);
	   }
      }
      ui.battle.proto.tileDraw(valid);
     }
     else {
      var act = game.battle.getNeedsOrders();
      ui.battle.proto.listDraw(this.text, act.atk);
     }
    },
    attackValid: function(x,y,act) {
     return util.distance({x:x,y:y},act.pos) <= 1;
	}
   },
   {
    text: "Magic",
    action: undefined,
    mouse: function(x,y) {
     var act = game.battle.getNeedsOrders();
     if(this.action !== undefined) {
      var click = input.coordToTile(x,y);
      var target = object.getObjectAtPos(click.x, click.y);
      if(target !== undefined && this.magicValid(target.pos.x,target.pos.y,act)) {
       game.battle.setOrders(act, this.action, target);
       this.action = undefined;
      }
      else {
       console.log("No valid target at " + click.x + ", " + click.y);
       this.action = undefined;
      }
     }
     else {
      var sel = ui.battle.proto.listSelect(x,y,act.mag);
      if(sel !== undefined)
       this.action = sel;
     }
    },
    draw: function() {
     if(this.action !== undefined) {
      var dx = (((display.height+10)*0.30)/ui.battle.tabs.length) + 12;
      var dy = (display.height*0.70)+32;
      display.context.fillStyle = ui.color.white;
      display.context.font = ui.font.sml;
      display.context.fillText("Select target for " + this.action.name,dx+(64),dy+(14)+18);

      var act = game.battle.getNeedsOrders();
      var valid = [];
      for(var i=0;i<game.battle.teama.length;i++) {
	   if(this.magicValid(game.battle.teama[i].pos.x,game.battle.teama[i].pos.y,act)) {
	    valid.push(game.battle.teama[i].pos);
	   }
      }
      for(var i=0;i<game.battle.teamb.length;i++) {
	   if(this.magicValid(game.battle.teamb[i].pos.x,game.battle.teamb[i].pos.y,act)) {
	    valid.push(game.battle.teamb[i].pos);
	   }
      }
      ui.battle.proto.tileDraw(valid);
     }
     else {
      var act = game.battle.getNeedsOrders();
      ui.battle.proto.listDraw(this.text, act.mag);
     }
    },
    magicValid: function(x,y,act) {
	     return util.distance({x:x,y:y},act.pos) <= 6;
	}
   },
   {
    text: "Items",
    action: undefined,
    mouse: function(x,y) { /*more magic*/ },
    draw: function() {
     var dx = (((display.height+10)*0.30)/ui.battle.tabs.length) + 12;
     var dy = (display.height*0.70)+32;

     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.reg;
     display.context.fillText(this.text,dx,dy);
    }
   },
   {
    text: "Move",
    mouse: function(x,y) {
     var act = game.battle.getNeedsOrders();

     var click = input.coordToTile(x,y);
     var valid = this.moveValid(click.x,click.y,act);

     if(valid) {
      game.battle.setMove(act, click);
     }
     else {
      console.log("Cannot move to " + click.x + ", " + click.y);
     }
    },
    draw: function() {
     var act = game.battle.getNeedsOrders();
     /* Deprecated?
     var click = input.coordToTile(input.cursor.x,input.cursor.y);
     var valid = this.moveValid(click.x,click.y,act);

     if(valid) {
      var sel = input.coordToTileScreenSpace(input.cursor.x,input.cursor.y);
      ui.battle.proto.drawSelect(sel.x,sel.y,true);
     }
     */

     var moves = [{x: act.pos.x+1, y: act.pos.y},{x: act.pos.x-1, y: act.pos.y},{x: act.pos.x, y: act.pos.y+1},{x: act.pos.x, y: act.pos.y-1}];
     var valid = [];
     for(var i=0;i<moves.length;i++)
      if(this.moveValid(moves[i].x, moves[i].y, act))
        valid.push(moves[i]);
     ui.battle.proto.tileDraw(valid);

     var dx = (((display.height+10)*0.30)/ui.battle.tabs.length) + 12;
     var dy = (display.height*0.70)+32;

     display.context.fillStyle = ui.color.white;
     display.context.font = ui.font.reg;
     display.context.fillText(this.text,dx,dy);
    },
    moveValid: function(x,y,act) {
     var target = object.getObjectAtPos(x, y) === undefined;
     var distance = util.distance({x:x,y:y},act.pos) > 1 ? false : true;
     if(x < 0 || x > map.size.x || y < 0 || map > map.size.y)
      return false;
     var valid = map.map[x][y] !== 4 ? true : false;
     return target && distance && valid;
	}
   }
  ],
  mouse: function(x,y) {
   if(this.openTab !== undefined)
    this.openTab.mouse(x,y);
   var dy = ((display.height+10)*0.30)/this.tabs.length;
   for(var i=0;i<this.tabs.length;i++) {
    var a = 0;
    var b = display.height*0.70+(dy*i);
    var c = dy;
    var d = b+dy;

    if(x > a && x < c && y > b && y < d) {
     this.openTab = this.tabs[i];
     return;
    }
   }
  },
  draw: function() {
   display.context.fillStyle = ui.color.blue;
   display.context.fillRect(0,display.height*0.70,display.width,display.height*0.30);
   display.context.fillStyle = ui.color.white;
   display.context.fillRect(0,(display.height*0.70)-5,display.width,5);

   var dz = ((display.height+10)*0.30)/this.tabs.length;
   for(var i=0;i<this.tabs.length;i++) {
    display.context.drawImage(this.tile, i*32, 0, 32, 32, 0,display.height*0.70+(dz*i),dz,dz);
   }

   var dx = (((display.height+10)*0.30)/ui.battle.tabs.length) + 12;
   var dy = (display.height*0.70)+14;

   var act = game.battle.getNeedsOrders();
   display.context.fillStyle = ui.color.white;
   display.context.font = ui.font.lrg;
   display.context.fillText(act.name,dx,dy);

   display.context.fillStyle = ui.color.white;
   for(var i=0;i<game.party.length;i++) {
    display.context.fillStyle = ui.color.white;
    display.context.font = ui.font.sml;
    display.context.fillText(game.party[i].name + " HP: " + game.party[i].stat.hp + "/" + game.party[i].stat.maxHp,display.width-160,dy+((i)*25));
   }
   display.context.fillRect(display.width-172,dy-15,5,display.height*0.31);

   if(this.openTab !== undefined)
    this.openTab.draw();
  }
 };
 ui.battle.openTab = ui.battle.tabs[0];
};

ui.toggleMenu = function() {
 if(ui.focus === ui.menu) {
  ui.focus = undefined;
 }
 else if(ui.focus === undefined) {
  ui.focus = ui.menu;
 }
};

ui.openChat = function(name, message) {
 if(ui.isActive())
  return;
 ui.chat.name = name;
 ui.chat.message = message;
 ui.focus = ui.chat;
};

ui.startBattle = function() {
 ui.focus = ui.battle;
};

ui.endBattle = function() {
 ui.focus = undefined;
};

ui.isActive = function() {
 return ui.focus !== undefined;
};

ui.mouse = function(x,y) {
 if(ui.isActive())
  ui.focus.mouse(x,y);
};

ui.draw = function() {
 if(ui.isActive())
  ui.focus.draw();
};
