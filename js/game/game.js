"use strict";

var game = {};

game.init = function() {
  game.objects = [];
  game.load = {
      queued: undefined,
      timer: 0
  }

  var pma = object.types.npc.blm.create({x:0,y:0}, 0, "Vivi", 0, 1, 0, 0, ai.world.none(), ai.battle.none(), script.func.none, "pma");
  var pmb = object.types.npc.whm.create({x:0,y:1}, 0, "Ella", 0, 1, 0, 0, ai.world.follow("pma"), ai.battle.none(), script.func.none, "pmb");
  var pmc = object.types.npc.whm.create({x:0,y:2}, 0, "Yuna", 0, 1, 0, 0, ai.world.follow("pmb"), ai.battle.none(), script.func.none, "pmc");
  var pmd = object.types.npc.whm.create({x:0,y:3}, 0, "Vanille", 0, 1, 0, 0, ai.world.follow("pmc"), ai.battle.none(), script.func.none, "pmd");
  player.npc = pma;
  game.party = [pma, pmb, pmc, pmd];

  game.battle = undefined;

  game.loadMap("test_lake", {x: 28, y: 4}, 0);
};

game.queueLoadMap = function(name, pos, dir) {
  game.load.queued = {name: name, pos: pos, dir: dir};
};

game.loadUpdate = function() {
  if(game.load.timer >= 100 && game.load.queued) {
    game.loadMap(game.load.queued.name, game.load.queued.pos, game.load.queued.dir);
    game.load.queued = undefined;
  }
  else if(game.load.queued) {
    game.load.timer+=5;
  }
  else if(game.load.timer > 0) {
    game.load.timer-=5;
  }
};

game.isLoading = function() {
  return game.load.timer !== 0;
}

game.loadMap = function(name, pos, dir) {
  game.battle = undefined;
  game.objects.splice(0,game.objects.length);
  map.open(name);
  for(var i=0;i<game.party.length;i++) {
    game.objects.push(game.party[i]);
    switch(dir) {
      case 1 : { game.party[i].pos = {x: pos.x+i, y: pos.y}; game.party[i].lastPos = {x: pos.x+i, y: pos.y}; break; }
      case 2 : { game.party[i].pos = {x: pos.x-1, y: pos.y}; game.party[i].lastPos = {x: pos.x-i, y: pos.y+i}; break; }
      case 3 : { game.party[i].pos = {x: pos.x, y: pos.y-i}; game.party[i].lastPos = {x: pos.x, y: pos.y-i}; break; }
      default : { game.party[i].pos = {x: pos.x, y: pos.y+i}; game.party[i].lastPos = {x: pos.x, y: pos.y+i}; break; }
    }
  }
};

game.step = function() {
  game.loadUpdate();
  if(game.inBattle())
    game.battle.step();
  for(var i=0;i<game.objects.length;i++) {
    if(game.objects[i].dead) {
      game.objects.splice(i,1);
      i--;
    }
  }
  player.step();
  for(var i=0;i<game.objects.length;i++) {
    game.objects[i].step();
  }
};

game.startBattle = function(player, enemy) {
  if(game.battle !== undefined)
    return;
  game.battle = {
      teama : game.party,
      teamb : [enemy],
      turn : 0,
      init : function() {
        for(var i=0;i<this.teama.length;i++)
          this.teama[i].battle = true;
        for(var i=0;i<this.teamb.length;i++)
          this.teamb[i].battle = true;
      },
      step : function() {

      },
      getNeedsOrders : function() {
        if(this.turn < this.teama.length) {
          return this.teama[this.turn];
        }
        else {
          this.turn = 0;
          return this.teama[this.turn];
        }
      },
      setOrders : function(source, action, target) {
        console.log(source.name + " DID " + action.name + " TO " + target.name);
        source.lookAt(target.pos.x-source.pos.x,target.pos.y-source.pos.y);
        target.damage(1);
        this.stepBattle();
      },
      setMove : function(source, target) {
        console.log(source.name + " MOVED TO " + target.x + ", " + target.y);
        source.lookAt(target.x-source.pos.x,target.y-source.pos.y);
        source.move(target.x-source.pos.x,target.y-source.pos.y);
      },
      stepBattle : function() {
        if(this.checkBattle()) {
          this.end();
          return;
        }
        this.turn++;
        if(this.turn < this.teama.length)
          return;
        else if(this.turn-this.teama.length < this.teamb.length) {
          this.setOrders(this.teamb[this.turn-this.teama.length], this.teamb[this.turn-this.teama.length].atk[0], this.teama[0]);
        }
        else {
          this.turn = 0;
        }
      },
      checkBattle : function() {
        var aDead = true;
        var bDead = true;
        for(var i=0;i<this.teama.length;i++) {
          if(!this.teama[i].dead)
            aDead = false;
        }
        for(var i=0;i<this.teamb.length;i++) {
          if(!this.teamb[i].dead)
            bDead = false;
        }
        return aDead || bDead;
      },
      end : function() {
        for(var i=0;i<this.teama.length;i++)
          this.teama[i].battle = false;
        for(var i=0;i<this.teamb.length;i++) {
          this.teamb[i].battle = false; this.teamb[i].kill();
        }
        ui.endBattle();
        game.battle = undefined;
      }
  };
  ui.startBattle();
};

game.inBattle = function() {
  return game.battle !== undefined;
};
