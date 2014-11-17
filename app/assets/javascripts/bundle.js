require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){



},{}],"background":[function(require,module,exports){
var Background, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

Background = (function(_super) {
  __extends(Background, _super);

  function Background(texture) {
    this.renderPriority = globals.priority.background;
    Background.__super__.constructor.call(this, texture);
  }

  Background.prototype.setRenderPriority = function(layer) {
    return this.renderPriority = layer;
  };

  Background.prototype.getRenderPriority = function() {
    return this.renderPriority;
  };

  Background.prototype.addToStage = function(stage) {
    stage.addChild(this);
  };

  return Background;

})(PIXI.Sprite);

module.exports = Background;


},{"sh-globals":undefined}],"beerpoweredengine":[function(require,module,exports){
var BeerPoweredEngine,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

BeerPoweredEngine = (function() {
  var _scene, _scenes;

  _scenes = null;

  _scene = null;

  function BeerPoweredEngine(width, height) {
    this.width = width;
    this.height = height;
    this.animate = __bind(this.animate, this);
    this.init();
  }

  BeerPoweredEngine.prototype.init = function() {
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
    document.body.appendChild(this.renderer.view);
    this.stats = new Stats;
    document.body.appendChild(this.stats.domElement);
    requestAnimationFrame(this.animate);
  };

  BeerPoweredEngine.prototype.createScene = function(id) {
    var scene;
    if (this._scenes[id]) {
      return undefined;
    }
    scene = new Scene;
    this._scenes[id] = scene;
    return scene;
  };

  BeerPoweredEngine.prototype.goToScene = function(id) {
    if (this._scenes[id]) {
      if (this._scene.scene) {
        this._scene.paused();
      }
      this._scene = this._scenes[id];
      this._scene.resume();
      return true;
    }
    return false;
  };

  BeerPoweredEngine.prototype.setScene = function(scene) {
    this._scene = scene;
  };

  BeerPoweredEngine.prototype.setPoller = function(poller) {
    this._poller = poller;
  };

  BeerPoweredEngine.prototype.animate = function(deltaTime) {
    var _ref;
    this.stats.begin();
    if (this._scene != null) {
      this.renderer.render(this._scene);
    }
    if ((_ref = this._poller) != null) {
      _ref.call();
    }
    this.stats.end();
    requestAnimationFrame(this.animate);
    TWEEN.update(deltaTime);
  };

  return BeerPoweredEngine;

})();

module.exports = BeerPoweredEngine;


},{}],"button":[function(require,module,exports){
var Button, ButtonActiveState, ButtonMode, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

ButtonActiveState = {
  inactive: 0,
  active: 1
};

ButtonMode = {
  focus: 1,
  click: 0,
  hover: 5
};

Button = (function(_super) {
  __extends(Button, _super);

  function Button(textureOn, textureOff, texturePress) {
    this.textureOn = textureOn;
    this.textureOff = textureOff;
    this.texturePress = texturePress;
    Button.__super__.constructor.call(this, this.textureOn);
    this.isPress = false;
    this.mode = ButtonMode.focus;
  }

  Button.prototype.update = function(deltaTime) {
    if (this.isPres) {
      if (this.mode === ButtonMode.click) {
        this.setTexture(this.texturePress);
      }
    }
  };

  Button.prototype.press = function() {
    this.isPress = true;
  };

  Button.prototype.getBoundingBox = function() {
    return this.getBounds;
  };

  Button.prototype.setRenderPriority = function() {};

  Button.prototype.getRenderPriority = function() {};

  return Button;

})(PIXI.Sprite);

module.exports = Button;


},{"sh-globals":undefined}],"loader":[function(require,module,exports){
var Background, Loader, ProgressBar, Sketch, SystemText, globals;

globals = require('sh-globals');

Background = require('background');

Sketch = require('sketch');

ProgressBar = require('progressbar');

SystemText = require('systemtext');

Loader = (function() {
  function Loader(screenWidth, screenHeight, stage) {
    var $, tween;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.stage = stage;
    $ = this;
    this.tasksDone = false;
    this.tasksCount = 0;
    this.tasksCompleted = 0;
    this.tradeOff = false;
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/pursuit_blue.png'), PIXI.Texture.fromImage('/assets/images/pursuit.png')];
    this.myFilter = new PIXI.RGBSplitFilter;
    this.background = new Background(this.textures[0]);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = this.screenWidth / 2;
    this.background.position.y = this.screenHeight / 2;
    this.background.addToStage(this.stage);
    this.logoNoFill = new Sketch(this.textures[1]);
    this.logoNoFill.anchor.x = 0.5;
    this.logoNoFill.anchor.y = 0.5;
    this.logoNoFill.position.x = this.screenWidth / 2;
    this.logoNoFill.position.y = this.screenHeight / 2;
    this.logoNoFill.scale.x = 0.2;
    this.logoNoFill.scale.y = 0.2;
    this.logoNoFill.addToStage(this.stage);
    this.logo = new Sketch(this.textures[2]);
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;
    this.logo.position.x = this.screenWidth / 2;
    this.logo.position.y = this.screenHeight / 2;
    this.logo.scale.x = 0.2;
    this.logo.scale.y = 0.2;
    this.logo.alpha = 0.0;
    this.logo.addToStage(this.stage);
    this.startButton = new SystemText('Play', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.startButton.anchor.x = 0.5;
    this.startButton.anchor.y = 0.5;
    this.startButton.position.x = this.screenWidth / 2;
    this.startButton.position.y = this.screenWidth / 2 + 90;
    this.startButton.alpha = 0.0;
    this.startButton.interactive = true;
    this.startButton.mouseover = function(data) {};
    this.startButton.mouseout = function(data) {};
    this.startButton.mousedown = function(data) {
      $.startButton.scale.x = 0.8;
      $.startButton.scale.y = 0.8;
      $.tradeOff = true;
    };
    this.startButton.mouseup = function(data) {
      $.startButton.scale.x = 1.0;
      $.startButton.scale.y = 1.0;
    };
    this.startButton.click = function(data) {
      $.background.filters = [$.myFilter];
    };
    this.startButton.touchstart = function(data) {};
    this.startButton.touchend = function(data) {};
    this.startButton.tap = function(data) {};
    this.startButton.addToStage(this.stage);
    this.loadSound = new Howl({
      urls: ['/assets/sounds/flo_rida.mp3'],
      autoplay: false,
      loop: true,
      onload: function() {
        return console.log('finished loading sound');
      }
    });
    tween = new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 9000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.logo.alpha = this.alpha;
    }).onComplete(function() {
      return $.startButton.alpha = 1.0;
    }).start();
  }

  Loader.prototype.taskToLoad = function(count) {
    return this.tasksCount = count;
  };

  Loader.prototype.addToFinishedTask = function() {
    if (!this.tasksCount === this.tasksCompleted) {
      return this.tasksCompleted += 1;
    } else {
      return this.tasksDone = true;
    }
  };

  Loader.prototype.update = function(deltaTime) {};

  return Loader;

})();

module.exports = Loader;


},{"background":undefined,"progressbar":undefined,"sh-globals":undefined,"sketch":undefined,"systemtext":undefined}],"progressbar":[function(require,module,exports){
var ProgressBar, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

ProgressBar = (function(_super) {
  __extends(ProgressBar, _super);

  function ProgressBar(textureBlank, textureFull) {
    ProgressBar.__super__.constructor.call(this, textureBlank);
  }

  ProgressBar.prototype.update = function(deltaTime) {};

  ProgressBar.prototype.settings = function(opts) {};

  return ProgressBar;

})(PIXI.Sprite);

module.exports = ProgressBar;


},{"sh-globals":undefined}],"scene":[function(require,module,exports){
var Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = (function(_super) {
  __extends(Scene, _super);

  function Scene() {
    this.paused = false;
    return;
  }

  Scene.prototype.update = function(deltaTime) {};

  Scene.prototype.pause = function() {
    this.paused = true;
  };

  Scene.prototype.resume = function() {
    this.paused = false;
  };

  Scene.prototype.isPaused = function() {
    return this.paused;
  };

  return Scene;

})(PIXI.Stage);


},{}],"sh-configs":[function(require,module,exports){
module.exports = {
  desktop: {
    settings: {
      width: 800,
      height: 600
    },
    loader: {
      background: '',
      logo: '',
      fill: ''
    }
  },
  phones: {
    android: {
      settings: {
        width: 480,
        height: 320
      },
      loader: {
        background: '',
        logo: '',
        fill: ''
      }
    },
    ios: {
      settings: {
        width: 480,
        height: 320
      },
      loader: {
        background: '',
        logo: '',
        fill: ''
      }
    },
    windows: {
      settings: {
        width: 800,
        height: 600
      },
      loader: {
        background: '',
        logo: '',
        fill: ''
      }
    }
  },
  tablets: {
    android: {
      settings: {
        width: 1024,
        height: 768
      },
      loader: {
        background: '',
        logo: '',
        fill: ''
      }
    },
    ios: {
      settings: {
        width: 480,
        height: 320
      },
      loader: {
        background: '',
        logo: '',
        fill: ''
      }
    }
  }
};


},{}],"sh-globals":[function(require,module,exports){
module.exports = {
  gameModes: {
    onLoad: 2,
    onLobby: 4,
    onGame: 6,
    onPause: 8,
    onOptions: 10,
    onEnd: 12
  },
  priority: {
    background: 10,
    normal: 50,
    overlay: 60,
    banner: 75,
    above: 100,
    max: 999
  }
};


},{}],"shuffled":[function(require,module,exports){
var Background, BeerPoweredEngine, Loader, ShuffledApp, Sketch,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

BeerPoweredEngine = require('beerpoweredengine');

Background = require('background');

Sketch = require('sketch');

Loader = require('loader');

ShuffledApp = (function() {
  function ShuffledApp(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.update = __bind(this.update, this);
    this.engine = new BeerPoweredEngine(this.screenWidth, this.screenHeight);
    this.stage = new PIXI.Stage(0x000000);
    this.engine.setStage(this.stage);
    this.engine.setPoller(this.update);
    this.loader = new Loader(this.screenWidth, this.screenHeight, this.stage);
  }

  ShuffledApp.prototype.update = function(deltaTime) {
    this.loader.update(deltaTime);
  };

  ShuffledApp.prototype.sketch = function() {
    return true;
  };

  return ShuffledApp;

})();

module.exports = ShuffledApp;


},{"background":undefined,"beerpoweredengine":undefined,"loader":undefined,"sketch":undefined}],"sketch":[function(require,module,exports){
var Sketch, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

Sketch = (function(_super) {
  __extends(Sketch, _super);

  function Sketch(texture) {
    this.renderPriority = globals.priority.normal;
    Sketch.__super__.constructor.call(this, texture);
  }

  Sketch.prototype.setRenderPriority = function(layer) {
    return this.renderPriority = layer;
  };

  Sketch.prototype.getRenderPriority = function() {
    return this.renderPriority;
  };

  Sketch.prototype.addToStage = function(stage) {
    stage.addChild(this);
  };

  return Sketch;

})(PIXI.Sprite);

module.exports = Sketch;


},{"sh-globals":undefined}],"systemtext":[function(require,module,exports){
var SystemText, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

SystemText = (function(_super) {
  __extends(SystemText, _super);

  function SystemText(msg, style) {
    SystemText.__super__.constructor.call(this, msg, style);
  }

  SystemText.prototype.addToStage = function(stage) {
    stage.addChild(this);
  };

  return SystemText;

})(PIXI.Text);

module.exports = SystemText;


},{"sh-globals":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvYXNzZXRzL2phdmFzY3JpcHRzL21haW4uanMiLCJlbnRpdGllcy9iYWNrZ3JvdW5kLmNvZmZlZSIsImJlZXJwb3dlcmVkZW5naW5lLmNvZmZlZSIsImVudGl0aWVzL2J1dHRvbi5jb2ZmZWUiLCJlbnRpdGllcy9sb2FkZXIuY29mZmVlIiwiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuY29mZmVlIiwiZW50aXRpZXMvc2NlbmUuY29mZmVlIiwiY29uZmlncy5jb2ZmZWUiLCJnbG9iYWxzLmNvZmZlZSIsInNodWZmbGVkLmNvZmZlZSIsImVudGl0aWVzL3NrZXRjaC5jb2ZmZWUiLCJlbnRpdGllcy9zeXN0ZW10ZXh0LmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTs7QUNGQSxJQUFBLG1CQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLCtCQUFBLENBQUE7O0FBQWEsRUFBQSxvQkFBQyxPQUFELEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxjQUFELEdBQWtCLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBbkMsQ0FBQTtBQUFBLElBQ0EsNENBQU0sT0FBTixDQURBLENBRFM7RUFBQSxDQUFiOztBQUFBLHVCQUlBLGlCQUFBLEdBQW1CLFNBQUMsS0FBRCxHQUFBO1dBQ2YsSUFBQyxDQUFBLGNBQUQsR0FBa0IsTUFESDtFQUFBLENBSm5CLENBQUE7O0FBQUEsdUJBT0EsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO1dBQ2YsSUFBQyxDQUFBLGVBRGM7RUFBQSxDQVBuQixDQUFBOztBQUFBLHVCQVVBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNSLElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmLENBQUEsQ0FEUTtFQUFBLENBVlosQ0FBQTs7b0JBQUE7O0dBRHFCLElBQUksQ0FBQyxPQUY5QixDQUFBOztBQUFBLE1BaUJNLENBQUMsT0FBUCxHQUFpQixVQWpCakIsQ0FBQTs7OztBQ0NBLElBQUEsaUJBQUE7RUFBQSxrRkFBQTs7QUFBQTtBQUNJLE1BQUEsZUFBQTs7QUFBQSxFQUFBLE9BQUEsR0FBVSxJQUFWLENBQUE7O0FBQUEsRUFDQSxNQUFBLEdBQVMsSUFEVCxDQUFBOztBQUVhLEVBQUEsMkJBQUUsS0FBRixFQUFVLE1BQVYsR0FBQTtBQUNULElBRFUsSUFBQyxDQUFBLFFBQUEsS0FDWCxDQUFBO0FBQUEsSUFEa0IsSUFBQyxDQUFBLFNBQUEsTUFDbkIsQ0FBQTtBQUFBLDZDQUFBLENBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxJQUFELENBQUEsQ0FBQSxDQURTO0VBQUEsQ0FGYjs7QUFBQSw4QkFLQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0YsSUFBQSxJQUFDLENBQUEsUUFBRCxHQUFZLElBQUksQ0FBQyxrQkFBTCxDQUF3QixJQUFDLENBQUEsS0FBekIsRUFBZ0MsSUFBQyxDQUFBLE1BQWpDLENBQVosQ0FBQTtBQUFBLElBQ0EsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFkLENBQTBCLElBQUMsQ0FBQSxRQUFRLENBQUMsSUFBcEMsQ0FEQSxDQUFBO0FBQUEsSUFHQSxJQUFDLENBQUEsS0FBRCxHQUFTLEdBQUEsQ0FBQSxLQUhULENBQUE7QUFBQSxJQUlBLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBZCxDQUEwQixJQUFDLENBQUEsS0FBSyxDQUFDLFVBQWpDLENBSkEsQ0FBQTtBQUFBLElBTUEscUJBQUEsQ0FBc0IsSUFBQyxDQUFBLE9BQXZCLENBTkEsQ0FERTtFQUFBLENBTE4sQ0FBQTs7QUFBQSw4QkFlQSxXQUFBLEdBQWEsU0FBQyxFQUFELEdBQUE7QUFDVCxRQUFBLEtBQUE7QUFBQSxJQUFBLElBQXNCLElBQUMsQ0FBQSxPQUFRLENBQUEsRUFBQSxDQUEvQjtBQUFBLGFBQU8sU0FBUCxDQUFBO0tBQUE7QUFBQSxJQUVBLEtBQUEsR0FBUSxHQUFBLENBQUEsS0FGUixDQUFBO0FBQUEsSUFHQSxJQUFDLENBQUEsT0FBUSxDQUFBLEVBQUEsQ0FBVCxHQUFlLEtBSGYsQ0FBQTtXQUlBLE1BTFM7RUFBQSxDQWZiLENBQUE7O0FBQUEsOEJBc0JBLFNBQUEsR0FBVyxTQUFDLEVBQUQsR0FBQTtBQUNQLElBQUEsSUFBRyxJQUFDLENBQUEsT0FBUSxDQUFBLEVBQUEsQ0FBWjtBQUNJLE1BQUEsSUFBb0IsSUFBQyxDQUFBLE1BQU0sQ0FBQyxLQUE1QjtBQUFBLFFBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLENBQUEsQ0FBQSxDQUFBO09BQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBQyxDQUFBLE9BQVEsQ0FBQSxFQUFBLENBRG5CLENBQUE7QUFBQSxNQUVBLElBQUMsQ0FBQSxNQUFNLENBQUMsTUFBUixDQUFBLENBRkEsQ0FBQTtBQUdBLGFBQU8sSUFBUCxDQUpKO0tBQUE7V0FLQSxNQU5PO0VBQUEsQ0F0QlgsQ0FBQTs7QUFBQSw4QkE4QkEsUUFBQSxHQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ04sSUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLEtBQVYsQ0FETTtFQUFBLENBOUJWLENBQUE7O0FBQUEsOEJBa0NBLFNBQUEsR0FBVyxTQUFDLE1BQUQsR0FBQTtBQUNQLElBQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxNQUFYLENBRE87RUFBQSxDQWxDWCxDQUFBOztBQUFBLDhCQXNDQSxPQUFBLEdBQVMsU0FBQyxTQUFELEdBQUE7QUFDTCxRQUFBLElBQUE7QUFBQSxJQUFBLElBQUMsQ0FBQSxLQUFLLENBQUMsS0FBUCxDQUFBLENBQUEsQ0FBQTtBQUNBLElBQUEsSUFBRyxtQkFBSDtBQUNJLE1BQUEsSUFBQyxDQUFBLFFBQVEsQ0FBQyxNQUFWLENBQWlCLElBQUMsQ0FBQSxNQUFsQixDQUFBLENBREo7S0FEQTs7VUFJUSxDQUFFLElBQVYsQ0FBQTtLQUpBO0FBQUEsSUFLQSxJQUFDLENBQUEsS0FBSyxDQUFDLEdBQVAsQ0FBQSxDQUxBLENBQUE7QUFBQSxJQU9BLHFCQUFBLENBQXNCLElBQUMsQ0FBQSxPQUF2QixDQVBBLENBQUE7QUFBQSxJQVFBLEtBQUssQ0FBQyxNQUFOLENBQWEsU0FBYixDQVJBLENBREs7RUFBQSxDQXRDVCxDQUFBOzsyQkFBQTs7SUFESixDQUFBOztBQUFBLE1Bb0RNLENBQUMsT0FBUCxHQUFpQixpQkFwRGpCLENBQUE7Ozs7QUNEQSxJQUFBLDhDQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQSxpQkFFQSxHQUNJO0FBQUEsRUFBQSxRQUFBLEVBQVUsQ0FBVjtBQUFBLEVBQ0EsTUFBQSxFQUFRLENBRFI7Q0FISixDQUFBOztBQUFBLFVBTUEsR0FDSTtBQUFBLEVBQUEsS0FBQSxFQUFPLENBQVA7QUFBQSxFQUNBLEtBQUEsRUFBTyxDQURQO0FBQUEsRUFFQSxLQUFBLEVBQU8sQ0FGUDtDQVBKLENBQUE7O0FBQUE7QUFZSSwyQkFBQSxDQUFBOztBQUFhLEVBQUEsZ0JBQUUsU0FBRixFQUFjLFVBQWQsRUFBMkIsWUFBM0IsR0FBQTtBQUNULElBRFUsSUFBQyxDQUFBLFlBQUEsU0FDWCxDQUFBO0FBQUEsSUFEc0IsSUFBQyxDQUFBLGFBQUEsVUFDdkIsQ0FBQTtBQUFBLElBRG1DLElBQUMsQ0FBQSxlQUFBLFlBQ3BDLENBQUE7QUFBQSxJQUFBLHdDQUFNLElBQUMsQ0FBQSxTQUFQLENBQUEsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQURYLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxJQUFELEdBQVEsVUFBVSxDQUFDLEtBRm5CLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUtBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQTtBQUNKLElBQUEsSUFBRyxJQUFDLENBQUEsTUFBSjtBQUNJLE1BQUEsSUFBRyxJQUFDLENBQUEsSUFBRCxLQUFTLFVBQVUsQ0FBQyxLQUF2QjtBQUNJLFFBQUEsSUFBQyxDQUFBLFVBQUQsQ0FBWSxJQUFDLENBQUEsWUFBYixDQUFBLENBREo7T0FESjtLQURJO0VBQUEsQ0FMUixDQUFBOztBQUFBLG1CQVdBLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDSCxJQUFBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBWCxDQURHO0VBQUEsQ0FYUCxDQUFBOztBQUFBLG1CQWVBLGNBQUEsR0FBZ0IsU0FBQSxHQUFBO1dBQ1osSUFBQyxDQUFBLFVBRFc7RUFBQSxDQWZoQixDQUFBOztBQUFBLG1CQWtCQSxpQkFBQSxHQUFtQixTQUFBLEdBQUEsQ0FsQm5CLENBQUE7O0FBQUEsbUJBcUJBLGlCQUFBLEdBQW1CLFNBQUEsR0FBQSxDQXJCbkIsQ0FBQTs7Z0JBQUE7O0dBRGlCLElBQUksQ0FBQyxPQVgxQixDQUFBOztBQUFBLE1Bb0NNLENBQUMsT0FBUCxHQUFpQixNQXBDakIsQ0FBQTs7OztBQ0FBLElBQUEsNERBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQSxVQUVBLEdBQWEsT0FBQSxDQUFRLFlBQVIsQ0FGYixDQUFBOztBQUFBLE1BR0EsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUEsV0FJQSxHQUFjLE9BQUEsQ0FBUSxhQUFSLENBSmQsQ0FBQTs7QUFBQSxVQUtBLEdBQWEsT0FBQSxDQUFRLFlBQVIsQ0FMYixDQUFBOztBQUFBO0FBUWlCLEVBQUEsZ0JBQUUsV0FBRixFQUFnQixZQUFoQixFQUErQixLQUEvQixHQUFBO0FBQ1QsUUFBQSxRQUFBO0FBQUEsSUFEVSxJQUFDLENBQUEsY0FBQSxXQUNYLENBQUE7QUFBQSxJQUR3QixJQUFDLENBQUEsZUFBQSxZQUN6QixDQUFBO0FBQUEsSUFEdUMsSUFBQyxDQUFBLFFBQUEsS0FDeEMsQ0FBQTtBQUFBLElBQUEsQ0FBQSxHQUFJLElBQUosQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLFNBQUQsR0FBYSxLQUZiLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxVQUFELEdBQWMsQ0FIZCxDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsY0FBRCxHQUFrQixDQUpsQixDQUFBO0FBQUEsSUFLQSxJQUFDLENBQUEsUUFBRCxHQUFZLEtBTFosQ0FBQTtBQUFBLElBTUEsSUFBQyxDQUFBLFFBQUQsR0FBWSxDQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBYixDQUF1QixzQ0FBdkIsQ0FEUSxFQUVSLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBYixDQUF1QixpQ0FBdkIsQ0FGUSxFQUdSLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBYixDQUF1Qiw0QkFBdkIsQ0FIUSxDQU5aLENBQUE7QUFBQSxJQW1CQSxJQUFDLENBQUEsUUFBRCxHQUFZLEdBQUEsQ0FBQSxJQUFRLENBQUMsY0FuQnJCLENBQUE7QUFBQSxJQXFCQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLFVBQUEsQ0FBVyxJQUFDLENBQUEsUUFBUyxDQUFBLENBQUEsQ0FBckIsQ0FyQmxCLENBQUE7QUFBQSxJQXNCQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFuQixHQUF1QixHQXRCdkIsQ0FBQTtBQUFBLElBdUJBLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQW5CLEdBQXVCLEdBdkJ2QixDQUFBO0FBQUEsSUF3QkEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBckIsR0FBeUIsSUFBQyxDQUFBLFdBQUQsR0FBZSxDQXhCeEMsQ0FBQTtBQUFBLElBeUJBLElBQUMsQ0FBQSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQXJCLEdBQXlCLElBQUMsQ0FBQSxZQUFELEdBQWdCLENBekJ6QyxDQUFBO0FBQUEsSUEwQkEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxVQUFaLENBQXVCLElBQUMsQ0FBQSxLQUF4QixDQTFCQSxDQUFBO0FBQUEsSUE4QkEsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxNQUFBLENBQU8sSUFBQyxDQUFBLFFBQVMsQ0FBQSxDQUFBLENBQWpCLENBOUJsQixDQUFBO0FBQUEsSUErQkEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbkIsR0FBdUIsR0EvQnZCLENBQUE7QUFBQSxJQWdDQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFuQixHQUF1QixHQWhDdkIsQ0FBQTtBQUFBLElBaUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsUUFBUSxDQUFDLENBQXJCLEdBQXlCLElBQUMsQ0FBQSxXQUFELEdBQWUsQ0FqQ3hDLENBQUE7QUFBQSxJQWtDQSxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFyQixHQUF5QixJQUFDLENBQUEsWUFBRCxHQUFnQixDQWxDekMsQ0FBQTtBQUFBLElBbUNBLElBQUMsQ0FBQSxVQUFVLENBQUMsS0FBSyxDQUFDLENBQWxCLEdBQXNCLEdBbkN0QixDQUFBO0FBQUEsSUFvQ0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBbEIsR0FBc0IsR0FwQ3RCLENBQUE7QUFBQSxJQXFDQSxJQUFDLENBQUEsVUFBVSxDQUFDLFVBQVosQ0FBdUIsSUFBQyxDQUFBLEtBQXhCLENBckNBLENBQUE7QUFBQSxJQXVDQSxJQUFDLENBQUEsSUFBRCxHQUFZLElBQUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxRQUFTLENBQUEsQ0FBQSxDQUFqQixDQXZDWixDQUFBO0FBQUEsSUF3Q0EsSUFBQyxDQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBYixHQUFpQixHQXhDakIsQ0FBQTtBQUFBLElBeUNBLElBQUMsQ0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQWIsR0FBaUIsR0F6Q2pCLENBQUE7QUFBQSxJQTBDQSxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFmLEdBQW1CLElBQUMsQ0FBQSxXQUFELEdBQWUsQ0ExQ2xDLENBQUE7QUFBQSxJQTJDQSxJQUFDLENBQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFmLEdBQW1CLElBQUMsQ0FBQSxZQUFELEdBQWdCLENBM0NuQyxDQUFBO0FBQUEsSUE0Q0EsSUFBQyxDQUFBLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBWixHQUFnQixHQTVDaEIsQ0FBQTtBQUFBLElBNkNBLElBQUMsQ0FBQSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQVosR0FBZ0IsR0E3Q2hCLENBQUE7QUFBQSxJQThDQSxJQUFDLENBQUEsSUFBSSxDQUFDLEtBQU4sR0FBYyxHQTlDZCxDQUFBO0FBQUEsSUErQ0EsSUFBQyxDQUFBLElBQUksQ0FBQyxVQUFOLENBQWlCLElBQUMsQ0FBQSxLQUFsQixDQS9DQSxDQUFBO0FBQUEsSUFpREEsSUFBQyxDQUFBLFdBQUQsR0FBbUIsSUFBQSxVQUFBLENBQVcsTUFBWCxFQUNmO0FBQUEsTUFBQSxJQUFBLEVBQU0saUJBQU47QUFBQSxNQUNBLEtBQUEsRUFBTyxRQURQO0FBQUEsTUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLE1BR0EsTUFBQSxFQUFRLFNBSFI7QUFBQSxNQUlBLGVBQUEsRUFBaUIsQ0FKakI7S0FEZSxDQWpEbkIsQ0FBQTtBQUFBLElBdURBLElBQUMsQ0FBQSxXQUFXLENBQUMsTUFBTSxDQUFDLENBQXBCLEdBQXdCLEdBdkR4QixDQUFBO0FBQUEsSUF3REEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBcEIsR0FBd0IsR0F4RHhCLENBQUE7QUFBQSxJQXlEQSxJQUFDLENBQUEsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUF0QixHQUEwQixJQUFDLENBQUEsV0FBRCxHQUFlLENBekR6QyxDQUFBO0FBQUEsSUEwREEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBdEIsR0FBMEIsSUFBQyxDQUFBLFdBQUQsR0FBZSxDQUFmLEdBQW1CLEVBMUQ3QyxDQUFBO0FBQUEsSUEyREEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLEdBQXFCLEdBM0RyQixDQUFBO0FBQUEsSUE0REEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxXQUFiLEdBQTJCLElBNUQzQixDQUFBO0FBQUEsSUE4REEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLEdBQXlCLFNBQUMsSUFBRCxHQUFBLENBOUR6QixDQUFBO0FBQUEsSUFnRUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxRQUFiLEdBQXdCLFNBQUMsSUFBRCxHQUFBLENBaEV4QixDQUFBO0FBQUEsSUFrRUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxTQUFiLEdBQXlCLFNBQUMsSUFBRCxHQUFBO0FBQ3JCLE1BQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBcEIsR0FBd0IsR0FBeEIsQ0FBQTtBQUFBLE1BQ0EsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBcEIsR0FBd0IsR0FEeEIsQ0FBQTtBQUFBLE1BRUEsQ0FBQyxDQUFDLFFBQUYsR0FBYSxJQUZiLENBRHFCO0lBQUEsQ0FsRXpCLENBQUE7QUFBQSxJQXVFQSxJQUFDLENBQUEsV0FBVyxDQUFDLE9BQWIsR0FBdUIsU0FBQyxJQUFELEdBQUE7QUFDbkIsTUFBQSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFwQixHQUF3QixHQUF4QixDQUFBO0FBQUEsTUFDQSxDQUFDLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFwQixHQUF3QixHQUR4QixDQURtQjtJQUFBLENBdkV2QixDQUFBO0FBQUEsSUEyRUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxLQUFiLEdBQXFCLFNBQUMsSUFBRCxHQUFBO0FBQ2pCLE1BQUEsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFiLEdBQXVCLENBQUMsQ0FBQyxDQUFDLFFBQUgsQ0FBdkIsQ0FEaUI7SUFBQSxDQTNFckIsQ0FBQTtBQUFBLElBOEVBLElBQUMsQ0FBQSxXQUFXLENBQUMsVUFBYixHQUEwQixTQUFDLElBQUQsR0FBQSxDQTlFMUIsQ0FBQTtBQUFBLElBZ0ZBLElBQUMsQ0FBQSxXQUFXLENBQUMsUUFBYixHQUF3QixTQUFDLElBQUQsR0FBQSxDQWhGeEIsQ0FBQTtBQUFBLElBa0ZBLElBQUMsQ0FBQSxXQUFXLENBQUMsR0FBYixHQUFtQixTQUFDLElBQUQsR0FBQSxDQWxGbkIsQ0FBQTtBQUFBLElBcUZBLElBQUMsQ0FBQSxXQUFXLENBQUMsVUFBYixDQUF3QixJQUFDLENBQUEsS0FBekIsQ0FyRkEsQ0FBQTtBQUFBLElBdUZBLElBQUMsQ0FBQSxTQUFELEdBQWlCLElBQUEsSUFBQSxDQUNiO0FBQUEsTUFBQSxJQUFBLEVBQU0sQ0FBQyw2QkFBRCxDQUFOO0FBQUEsTUFDQSxRQUFBLEVBQVUsS0FEVjtBQUFBLE1BRUEsSUFBQSxFQUFNLElBRk47QUFBQSxNQUdBLE1BQUEsRUFBUSxTQUFBLEdBQUE7ZUFDSixPQUFPLENBQUMsR0FBUixDQUFZLHdCQUFaLEVBREk7TUFBQSxDQUhSO0tBRGEsQ0F2RmpCLENBQUE7QUFBQSxJQThGQSxLQUFBLEdBQVksSUFBQSxLQUFLLENBQUMsS0FBTixDQUNSO0FBQUEsTUFBQSxLQUFBLEVBQU8sR0FBUDtLQURRLENBRVgsQ0FBQyxFQUZVLENBR1I7QUFBQSxNQUFBLEtBQUEsRUFBTyxHQUFQO0tBSFEsRUFJVixJQUpVLENBSUwsQ0FBQyxNQUpJLENBSUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FKeEIsQ0FJOEIsQ0FBQyxRQUovQixDQUl5QyxTQUFBLEdBQUE7QUFDakQsTUFBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQVAsR0FBZSxJQUFDLENBQUEsS0FBaEIsQ0FEaUQ7SUFBQSxDQUp6QyxDQU9YLENBQUMsVUFQVSxDQU9FLFNBQUEsR0FBQTthQUNWLENBQUMsQ0FBQyxXQUFXLENBQUMsS0FBZCxHQUFzQixJQURaO0lBQUEsQ0FQRixDQVNYLENBQUMsS0FUVSxDQUFBLENBOUZaLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQTJHQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7V0FDUixJQUFDLENBQUEsVUFBRCxHQUFjLE1BRE47RUFBQSxDQTNHWixDQUFBOztBQUFBLG1CQThHQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7QUFDZixJQUFBLElBQUcsQ0FBQSxJQUFLLENBQUEsVUFBTCxLQUFtQixJQUFDLENBQUEsY0FBdkI7YUFDSSxJQUFDLENBQUEsY0FBRCxJQUFtQixFQUR2QjtLQUFBLE1BQUE7YUFHSSxJQUFDLENBQUEsU0FBRCxHQUFhLEtBSGpCO0tBRGU7RUFBQSxDQTlHbkIsQ0FBQTs7QUFBQSxtQkFvSEEsTUFBQSxHQUFRLFNBQUMsU0FBRCxHQUFBLENBcEhSLENBQUE7O2dCQUFBOztJQVJKLENBQUE7O0FBQUEsTUE0SU0sQ0FBQyxPQUFQLEdBQWlCLE1BNUlqQixDQUFBOzs7O0FDQUEsSUFBQSxvQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsWUFBUixDQUFWLENBQUE7O0FBQUE7QUFHSSxnQ0FBQSxDQUFBOztBQUFhLEVBQUEscUJBQUMsWUFBRCxFQUFlLFdBQWYsR0FBQTtBQUNULElBQUEsNkNBQU0sWUFBTixDQUFBLENBRFM7RUFBQSxDQUFiOztBQUFBLHdCQUdBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQSxDQUhSLENBQUE7O0FBQUEsd0JBTUEsUUFBQSxHQUFVLFNBQUMsSUFBRCxHQUFBLENBTlYsQ0FBQTs7cUJBQUE7O0dBRHNCLElBQUksQ0FBQyxPQUYvQixDQUFBOztBQUFBLE1BWU0sQ0FBQyxPQUFQLEdBQWlCLFdBWmpCLENBQUE7Ozs7QUNDQSxJQUFBLEtBQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUNJLDBCQUFBLENBQUE7O0FBQWEsRUFBQSxlQUFBLEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBVixDQUFBO0FBQ0EsVUFBQSxDQUZTO0VBQUEsQ0FBYjs7QUFBQSxrQkFJQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUEsQ0FKUixDQUFBOztBQUFBLGtCQU9BLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDSCxJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBVixDQURHO0VBQUEsQ0FQUCxDQUFBOztBQUFBLGtCQVdBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBVixDQURJO0VBQUEsQ0FYUixDQUFBOztBQUFBLGtCQWVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7V0FDTixJQUFDLENBQUEsT0FESztFQUFBLENBZlYsQ0FBQTs7ZUFBQTs7R0FEZ0IsSUFBSSxDQUFDLE1BQXpCLENBQUE7Ozs7QUNEQSxNQUFNLENBQUMsT0FBUCxHQUNJO0FBQUEsRUFBQSxPQUFBLEVBQ0k7QUFBQSxJQUFBLFFBQUEsRUFDSTtBQUFBLE1BQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxNQUNBLE1BQUEsRUFBUSxHQURSO0tBREo7QUFBQSxJQUdBLE1BQUEsRUFDSTtBQUFBLE1BQUEsVUFBQSxFQUFZLEVBQVo7QUFBQSxNQUNBLElBQUEsRUFBTSxFQUROO0FBQUEsTUFFQSxJQUFBLEVBQU0sRUFGTjtLQUpKO0dBREo7QUFBQSxFQVFBLE1BQUEsRUFDSTtBQUFBLElBQUEsT0FBQSxFQUNJO0FBQUEsTUFBQSxRQUFBLEVBQ0k7QUFBQSxRQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsUUFDQSxNQUFBLEVBQVEsR0FEUjtPQURKO0FBQUEsTUFHQSxNQUFBLEVBQ0k7QUFBQSxRQUFBLFVBQUEsRUFBWSxFQUFaO0FBQUEsUUFDQSxJQUFBLEVBQU0sRUFETjtBQUFBLFFBRUEsSUFBQSxFQUFNLEVBRk47T0FKSjtLQURKO0FBQUEsSUFRQSxHQUFBLEVBQ0k7QUFBQSxNQUFBLFFBQUEsRUFDSTtBQUFBLFFBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxRQUNBLE1BQUEsRUFBUSxHQURSO09BREo7QUFBQSxNQUdBLE1BQUEsRUFDSTtBQUFBLFFBQUEsVUFBQSxFQUFZLEVBQVo7QUFBQSxRQUNBLElBQUEsRUFBTSxFQUROO0FBQUEsUUFFQSxJQUFBLEVBQU0sRUFGTjtPQUpKO0tBVEo7QUFBQSxJQWdCQSxPQUFBLEVBQ0k7QUFBQSxNQUFBLFFBQUEsRUFDSTtBQUFBLFFBQUEsS0FBQSxFQUFPLEdBQVA7QUFBQSxRQUNBLE1BQUEsRUFBUSxHQURSO09BREo7QUFBQSxNQUdBLE1BQUEsRUFDSTtBQUFBLFFBQUEsVUFBQSxFQUFZLEVBQVo7QUFBQSxRQUNBLElBQUEsRUFBTSxFQUROO0FBQUEsUUFFQSxJQUFBLEVBQU0sRUFGTjtPQUpKO0tBakJKO0dBVEo7QUFBQSxFQWlDQSxPQUFBLEVBQ0k7QUFBQSxJQUFBLE9BQUEsRUFDSTtBQUFBLE1BQUEsUUFBQSxFQUNJO0FBQUEsUUFBQSxLQUFBLEVBQU8sSUFBUDtBQUFBLFFBQ0EsTUFBQSxFQUFRLEdBRFI7T0FESjtBQUFBLE1BR0EsTUFBQSxFQUNJO0FBQUEsUUFBQSxVQUFBLEVBQVksRUFBWjtBQUFBLFFBQ0EsSUFBQSxFQUFNLEVBRE47QUFBQSxRQUVBLElBQUEsRUFBTSxFQUZOO09BSko7S0FESjtBQUFBLElBUUEsR0FBQSxFQUNJO0FBQUEsTUFBQSxRQUFBLEVBQ0k7QUFBQSxRQUFBLEtBQUEsRUFBTyxHQUFQO0FBQUEsUUFDQSxNQUFBLEVBQVEsR0FEUjtPQURKO0FBQUEsTUFHQSxNQUFBLEVBQ0k7QUFBQSxRQUFBLFVBQUEsRUFBWSxFQUFaO0FBQUEsUUFDQSxJQUFBLEVBQU0sRUFETjtBQUFBLFFBRUEsSUFBQSxFQUFNLEVBRk47T0FKSjtLQVRKO0dBbENKO0NBREosQ0FBQTs7OztBQ0FBLE1BQU0sQ0FBQyxPQUFQLEdBQ0k7QUFBQSxFQUFBLFNBQUEsRUFDSTtBQUFBLElBQUEsTUFBQSxFQUFRLENBQVI7QUFBQSxJQUNBLE9BQUEsRUFBUyxDQURUO0FBQUEsSUFFQSxNQUFBLEVBQVEsQ0FGUjtBQUFBLElBR0EsT0FBQSxFQUFTLENBSFQ7QUFBQSxJQUlBLFNBQUEsRUFBVyxFQUpYO0FBQUEsSUFLQSxLQUFBLEVBQU8sRUFMUDtHQURKO0FBQUEsRUFPQSxRQUFBLEVBQ0k7QUFBQSxJQUFBLFVBQUEsRUFBWSxFQUFaO0FBQUEsSUFDQSxNQUFBLEVBQVEsRUFEUjtBQUFBLElBRUEsT0FBQSxFQUFTLEVBRlQ7QUFBQSxJQUdBLE1BQUEsRUFBUSxFQUhSO0FBQUEsSUFJQSxLQUFBLEVBQU8sR0FKUDtBQUFBLElBS0EsR0FBQSxFQUFLLEdBTEw7R0FSSjtDQURKLENBQUE7Ozs7QUNBQSxJQUFBLDBEQUFBO0VBQUEsa0ZBQUE7O0FBQUEsaUJBQUEsR0FBb0IsT0FBQSxDQUFRLG1CQUFSLENBQXBCLENBQUE7O0FBQUEsVUFDQSxHQUFhLE9BQUEsQ0FBUSxZQUFSLENBRGIsQ0FBQTs7QUFBQSxNQUVBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FGVCxDQUFBOztBQUFBLE1BR0EsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUE7QUFRaUIsRUFBQSxxQkFBRSxXQUFGLEVBQWdCLFlBQWhCLEdBQUE7QUFDVCxJQURVLElBQUMsQ0FBQSxjQUFBLFdBQ1gsQ0FBQTtBQUFBLElBRHdCLElBQUMsQ0FBQSxlQUFBLFlBQ3pCLENBQUE7QUFBQSwyQ0FBQSxDQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsTUFBRCxHQUFjLElBQUEsaUJBQUEsQ0FBa0IsSUFBQyxDQUFBLFdBQW5CLEVBQWdDLElBQUMsQ0FBQSxZQUFqQyxDQUFkLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxJQUFJLENBQUMsS0FBTCxDQUFXLFFBQVgsQ0FEYixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsTUFBTSxDQUFDLFFBQVIsQ0FBaUIsSUFBQyxDQUFBLEtBQWxCLENBRkEsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLE1BQU0sQ0FBQyxTQUFSLENBQWtCLElBQUMsQ0FBQSxNQUFuQixDQUhBLENBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxNQUFELEdBQWMsSUFBQSxNQUFBLENBQU8sSUFBQyxDQUFBLFdBQVIsRUFBcUIsSUFBQyxDQUFBLFlBQXRCLEVBQW9DLElBQUMsQ0FBQSxLQUFyQyxDQUxkLENBRFM7RUFBQSxDQUFiOztBQUFBLHdCQVFBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQTtBQUNKLElBQUEsSUFBQyxDQUFBLE1BQU0sQ0FBQyxNQUFSLENBQWUsU0FBZixDQUFBLENBREk7RUFBQSxDQVJSLENBQUE7O0FBQUEsd0JBWUEsTUFBQSxHQUFRLFNBQUEsR0FBQTtXQUNKLEtBREk7RUFBQSxDQVpSLENBQUE7O3FCQUFBOztJQVJKLENBQUE7O0FBQUEsTUF1Qk0sQ0FBQyxPQUFQLEdBQWlCLFdBdkJqQixDQUFBOzs7O0FDQUEsSUFBQSxlQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLDJCQUFBLENBQUE7O0FBQWEsRUFBQSxnQkFBQyxPQUFELEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxjQUFELEdBQWtCLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBbkMsQ0FBQTtBQUFBLElBQ0Esd0NBQU0sT0FBTixDQURBLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUlBLGlCQUFBLEdBQW1CLFNBQUMsS0FBRCxHQUFBO1dBQ2YsSUFBQyxDQUFBLGNBQUQsR0FBa0IsTUFESDtFQUFBLENBSm5CLENBQUE7O0FBQUEsbUJBT0EsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO1dBQ2YsSUFBQyxDQUFBLGVBRGM7RUFBQSxDQVBuQixDQUFBOztBQUFBLG1CQVVBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNSLElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmLENBQUEsQ0FEUTtFQUFBLENBVlosQ0FBQTs7Z0JBQUE7O0dBRGlCLElBQUksQ0FBQyxPQUYxQixDQUFBOztBQUFBLE1BaUJNLENBQUMsT0FBUCxHQUFpQixNQWpCakIsQ0FBQTs7OztBQ0FBLElBQUEsbUJBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FBVixDQUFBOztBQUFBO0FBR0ksK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG9CQUFDLEdBQUQsRUFBTSxLQUFOLEdBQUE7QUFDVCxJQUFBLDRDQUFNLEdBQU4sRUFBVyxLQUFYLENBQUEsQ0FEUztFQUFBLENBQWI7O0FBQUEsdUJBR0EsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1IsSUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsQ0FBQSxDQURRO0VBQUEsQ0FIWixDQUFBOztvQkFBQTs7R0FEcUIsSUFBSSxDQUFDLEtBRjlCLENBQUE7O0FBQUEsTUFVTSxDQUFDLE9BQVAsR0FBaUIsVUFWakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxleUoyWlhKemFXOXVJam96TENKemIzVnlZMlZ6SWpwYkltMWhhVzR1WTI5bVptVmxJbDBzSW01aGJXVnpJanBiWFN3aWJXRndjR2x1WjNNaU9pSkJRV05uUWlJc0ltWnBiR1VpT2lKdFlXbHVMbXB6SWl3aWMyOTFjbU5sVW05dmRDSTZJaTl6YjNWeVkyVXZJaXdpYzI5MWNtTmxjME52Ym5SbGJuUWlPbHNpSWwxOSIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5jbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGdsb2JhbHMucHJpb3JpdHkuYmFja2dyb3VuZFxuICAgICAgICBzdXBlciB0ZXh0dXJlXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogKGxheWVyKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBsYXllclxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eVxuXG4gICAgYWRkVG9TdGFnZTogKHN0YWdlKSAtPlxuICAgICAgICBzdGFnZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tncm91bmRcbiIsIlxuY2xhc3MgQmVlclBvd2VyZWRFbmdpbmVcbiAgICBfc2NlbmVzID0gbnVsbFxuICAgIF9zY2VuZSA9IG51bGxcbiAgICBjb25zdHJ1Y3RvcjogKEB3aWR0aCwgQGhlaWdodCkgLT5cbiAgICAgICAgQGluaXQoKVxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIgQHdpZHRoLCBAaGVpZ2h0XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHJlbmRlcmVyLnZpZXdcblxuICAgICAgICBAc3RhdHMgPSBuZXcgU3RhdHNcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBAc3RhdHMuZG9tRWxlbWVudFxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZVxuICAgICAgICByZXR1cm5cblxuICAgIGNyZWF0ZVNjZW5lOiAoaWQpIC0+XG4gICAgICAgIHJldHVybiBgdW5kZWZpbmVkYCBpZiBAX3NjZW5lc1tpZF1cblxuICAgICAgICBzY2VuZSA9IG5ldyBTY2VuZTtcbiAgICAgICAgQF9zY2VuZXNbaWRdID0gc2NlbmVcbiAgICAgICAgc2NlbmVcblxuICAgIGdvVG9TY2VuZTogKGlkKSAtPlxuICAgICAgICBpZiBAX3NjZW5lc1tpZF1cbiAgICAgICAgICAgIEBfc2NlbmUucGF1c2VkKCkgaWYgQF9zY2VuZS5zY2VuZVxuICAgICAgICAgICAgQF9zY2VuZSA9IEBfc2NlbmVzW2lkXVxuICAgICAgICAgICAgQF9zY2VuZS5yZXN1bWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZmFsc2VcblxuICAgIHNldFNjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIEBfc2NlbmUgPSBzY2VuZVxuICAgICAgICByZXR1cm5cblxuICAgIHNldFBvbGxlcjogKHBvbGxlcikgLT5cbiAgICAgICAgQF9wb2xsZXIgPSBwb2xsZXJcbiAgICAgICAgcmV0dXJuXG5cbiAgICBhbmltYXRlOiAoZGVsdGFUaW1lKSA9PlxuICAgICAgICBAc3RhdHMuYmVnaW4oKVxuICAgICAgICBpZiBAX3NjZW5lP1xuICAgICAgICAgICAgQHJlbmRlcmVyLnJlbmRlciBAX3NjZW5lXG5cbiAgICAgICAgQF9wb2xsZXI/LmNhbGwoKVxuICAgICAgICBAc3RhdHMuZW5kKClcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGVcbiAgICAgICAgVFdFRU4udXBkYXRlIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJlZXJQb3dlcmVkRW5naW5lXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuQnV0dG9uQWN0aXZlU3RhdGUgPVxuICAgIGluYWN0aXZlOiAwXG4gICAgYWN0aXZlOiAxXG5cbkJ1dHRvbk1vZGUgPVxuICAgIGZvY3VzOiAxXG4gICAgY2xpY2s6IDBcbiAgICBob3ZlcjogNVxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAoQHRleHR1cmVPbiwgQHRleHR1cmVPZmYsIEB0ZXh0dXJlUHJlc3MpIC0+XG4gICAgICAgIHN1cGVyIEB0ZXh0dXJlT25cbiAgICAgICAgQGlzUHJlc3MgPSBmYWxzZVxuICAgICAgICBAbW9kZSA9IEJ1dHRvbk1vZGUuZm9jdXNcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgaWYgQGlzUHJlc1xuICAgICAgICAgICAgaWYgQG1vZGUgaXMgQnV0dG9uTW9kZS5jbGlja1xuICAgICAgICAgICAgICAgIEBzZXRUZXh0dXJlIEB0ZXh0dXJlUHJlc3NcbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzczogLT5cbiAgICAgICAgQGlzUHJlc3MgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0Qm91bmRpbmdCb3g6IC0+XG4gICAgICAgIEBnZXRCb3VuZHNcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25cbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnYmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ3NrZXRjaCdcblByb2dyZXNzQmFyID0gcmVxdWlyZSAncHJvZ3Jlc3NiYXInXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnc3lzdGVtdGV4dCdcblxuY2xhc3MgTG9hZGVyXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGFza3NEb25lID0gZmFsc2VcbiAgICAgICAgQHRhc2tzQ291bnQgPSAwXG4gICAgICAgIEB0YXNrc0NvbXBsZXRlZCA9IDBcbiAgICAgICAgQHRyYWRlT2ZmID0gZmFsc2VcbiAgICAgICAgQHRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbG9zdF9raWRzX2NvbnRlc3QuanBnJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdF9ibHVlLnBuZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXQucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgIyNAYmFja2dyb3VuZE1hc2tSYWRpdXMgPSA1MFxuICAgICAgICAjI0BiYWNrZ3JvdW5kTWFzayA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgICMjQGJhY2tncm91bmRNYXNrLmJlZ2luRmlsbCgweGZmZmZmZilcbiAgICAgICAgIyNAYmFja2dyb3VuZE1hc2suZHJhd0NpcmNsZSA0MDAsIDMyMCwgQGJhY2tncm91bmRNYXNrUmFkaXVzXG4gICAgICAgICMjQGJhY2tncm91bmRNYXNrLmVuZEZpbGwoKVxuICAgICAgICAjI0BzdGFnZS5hZGRDaGlsZCBAYmFja2dyb3VuZE1hc2tcblxuICAgICAgICBAbXlGaWx0ZXIgPSBuZXcgUElYSS5SR0JTcGxpdEZpbHRlcjtcblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kIEB0ZXh0dXJlc1swXVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi54ID0gQHNjcmVlbldpZHRoIC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi55ID0gQHNjcmVlbkhlaWdodCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQuYWRkVG9TdGFnZSBAc3RhZ2VcblxuICAgICAgICAjI0BiYWNrZ3JvdW5kLm1hc2sgPSBAYmFja2dyb3VuZE1hc2tcblxuICAgICAgICBAbG9nb05vRmlsbCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnkgPSBAc2NyZWVuSGVpZ2h0IC8gMlxuICAgICAgICBAbG9nb05vRmlsbC5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYWRkVG9TdGFnZSBAc3RhZ2VcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzJdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBAc2NyZWVuSGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TdGFnZSBAc3RhZ2VcblxuICAgICAgICBAc3RhcnRCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnUGxheScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24ucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgOTBcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFscGhhID0gMC4wXG4gICAgICAgIEBzdGFydEJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcblxuICAgICAgICBAc3RhcnRCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQudHJhZGVPZmYgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tncm91bmQuZmlsdGVycyA9IFskLm15RmlsdGVyXVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRvdWNoZW5kID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFkZFRvU3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQGxvYWRTb3VuZCA9IG5ldyBIb3dsXG4gICAgICAgICAgICB1cmxzOiBbJy9hc3NldHMvc291bmRzL2Zsb19yaWRhLm1wMyddXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2VcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgICAgIG9ubG9hZDogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZmluaXNoZWQgbG9hZGluZyBzb3VuZCdcblxuICAgICAgICB0d2VlbiA9IG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgLCA5MDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuSW5PdXQpLm9uVXBkYXRlKCAtPlxuICAgICAgICAgICAgJC5sb2dvLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5vbkNvbXBsZXRlKCAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5hbHBoYSA9IDEuMFxuICAgICAgICApLnN0YXJ0KClcblxuXG4gICAgdGFza1RvTG9hZDogKGNvdW50KSAtPlxuICAgICAgICBAdGFza3NDb3VudCA9IGNvdW50XG5cbiAgICBhZGRUb0ZpbmlzaGVkVGFzazogKCkgLT5cbiAgICAgICAgaWYgbm90IEB0YXNrc0NvdW50IGlzIEB0YXNrc0NvbXBsZXRlZFxuICAgICAgICAgICAgQHRhc2tzQ29tcGxldGVkICs9IDFcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHRhc2tzRG9uZSA9IHRydWVcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgIyNpZiBAdHJhZGVPZmYgaXMgdHJ1ZVxuICAgICAgICAjIyAgICBAYmFja2dyb3VuZE1hc2tSYWRpdXMgKz0gMC4xXG4gICAgICAgICMjICAgIEBiYWNrZ3JvdW5kTWFzay5iZWdpbkZpbGwoKVxuICAgICAgICAjIyAgICBAYmFja2dyb3VuZE1hc2suZHJhd0NpcmNsZSA0MDAsIDMyMCwgQGJhY2tncm91bmRNYXNrUmFkaXVzXG4gICAgICAgICMjICAgIEBiYWNrZ3JvdW5kTWFzay5lbmRGaWxsKClcbiAgICAgICAgIyMgICAgQGJhY2tncm91bmQubWFzayA9IEBiYWNrZ3JvdW5kTWFza1xuXG4gICAgICAgICMjaWYgQHRhc2tzRG9uZVxuICAgICAgICAjIyAgICAjIyBkbyBjaGFuZ2UgbW9kZSBoZXJlXG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI2Vsc2VcbiAgICAgICAgIyMgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZUJsYW5rLCB0ZXh0dXJlRnVsbCkgLT5cbiAgICAgICAgc3VwZXIgdGV4dHVyZUJsYW5rXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgc2V0dGluZ3M6IChvcHRzKSAtPlxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzc0JhclxuIiwiXG5jbGFzcyBTY2VuZSBleHRlbmRzIFBJWEkuU3RhZ2VcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIHBhdXNlOiAtPlxuICAgICAgICBAcGF1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIHJlc3VtZTogLT5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG4gICAgICAgIHJldHVyblxuXG4gICAgaXNQYXVzZWQ6IC0+XG4gICAgICAgIEBwYXVzZWRcbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBkZXNrdG9wOlxuICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgIHdpZHRoOiA4MDBcbiAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgZmlsbDogJydcbiAgICBwaG9uZXM6XG4gICAgICAgIGFuZHJvaWQ6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIHdpbmRvd3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MDBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICB0YWJsZXRzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMjRcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDc2OFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICBpb3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcblxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIGdhbWVNb2RlczpcbiAgICAgICAgb25Mb2FkOiAyXG4gICAgICAgIG9uTG9iYnk6IDRcbiAgICAgICAgb25HYW1lOiA2XG4gICAgICAgIG9uUGF1c2U6IDhcbiAgICAgICAgb25PcHRpb25zOiAxMFxuICAgICAgICBvbkVuZDogMTJcbiAgICBwcmlvcml0eTpcbiAgICAgICAgYmFja2dyb3VuZDogMTBcbiAgICAgICAgbm9ybWFsOiA1MFxuICAgICAgICBvdmVybGF5OiA2MFxuICAgICAgICBiYW5uZXI6IDc1XG4gICAgICAgIGFib3ZlOiAxMDBcbiAgICAgICAgbWF4OiA5OTlcblxuIiwiQmVlclBvd2VyZWRFbmdpbmUgPSByZXF1aXJlICdiZWVycG93ZXJlZGVuZ2luZSdcbkJhY2tncm91bmQgPSByZXF1aXJlICdiYWNrZ3JvdW5kJ1xuU2tldGNoID0gcmVxdWlyZSAnc2tldGNoJ1xuTG9hZGVyID0gcmVxdWlyZSAnbG9hZGVyJ1xuXG4jIFNodWZmbGVkQXBwXG4jIFRoZSBtYWluIGVudHJ5IHBvaW50IG9mIHRoZSBhcHBcbmNsYXNzIFNodWZmbGVkQXBwXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQpIC0+XG4gICAgICAgIEBlbmdpbmUgPSBuZXcgQmVlclBvd2VyZWRFbmdpbmUgQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0XG4gICAgICAgIEBzdGFnZSA9IG5ldyBQSVhJLlN0YWdlIDB4MDAwMDAwXG4gICAgICAgIEBlbmdpbmUuc2V0U3RhZ2UgQHN0YWdlXG4gICAgICAgIEBlbmdpbmUuc2V0UG9sbGVyIEB1cGRhdGVcblxuICAgICAgICBAbG9hZGVyID0gbmV3IExvYWRlciBAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZVxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSA9PlxuICAgICAgICBAbG9hZGVyLnVwZGF0ZSBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBza2V0Y2g6IC0+XG4gICAgICAgIHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBTaHVmZmxlZEFwcFxuXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgU2tldGNoIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGdsb2JhbHMucHJpb3JpdHkubm9ybWFsXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBhZGRUb1N0YWdlOiAoc3RhZ2UpIC0+XG4gICAgICAgIHN0YWdlLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2tldGNoXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgU3lzdGVtVGV4dCBleHRlbmRzIFBJWEkuVGV4dFxuICAgIGNvbnN0cnVjdG9yOiAobXNnLCBzdHlsZSkgLT5cbiAgICAgICAgc3VwZXIgbXNnLCBzdHlsZVxuXG4gICAgYWRkVG9TdGFnZTogKHN0YWdlKSAtPlxuICAgICAgICBzdGFnZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN5c3RlbVRleHRcblxuIl19
