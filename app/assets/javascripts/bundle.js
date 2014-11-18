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

  Background.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return Background;

})(PIXI.Sprite);

module.exports = Background;


},{"sh-globals":undefined}],"beerpoweredengine":[function(require,module,exports){
var BeerPoweredEngine, Scene,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Scene = require('scene');

BeerPoweredEngine = (function() {
  function BeerPoweredEngine(width, height) {
    this.width = width;
    this.height = height;
    this.animate = __bind(this.animate, this);
    this.scenes = {};
    this.scene = null;
    this.init();
  }

  BeerPoweredEngine.prototype.init = function() {
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
    document.body.appendChild(this.renderer.view);
    this.stats = new Stats;
    document.body.appendChild(this.stats.domElement);
    requestAnimationFrame(this.animate);
  };

  BeerPoweredEngine.prototype.createScene = function(id, tscene, callback) {
    var scene;
    if (tscene == null) {
      tscene = Scene;
    }
    if (callback == null) {
      callback = function() {};
    }
    if (this.scenes[id]) {
      return undefined;
    }
    scene = new tscene;
    scene.onUpdate(callback);
    this.scenes[id] = scene;
    return scene;
  };

  BeerPoweredEngine.prototype.goToScene = function(id) {
    var _ref;
    if (this.scenes[id] != null) {
      if ((_ref = this.scene) != null) {
        _ref.pause();
      }
      this.scene = this.scenes[id];
      this.scene.resume();
      return true;
    }
    return false;
  };

  BeerPoweredEngine.prototype.animate = function(deltaTime) {
    requestAnimationFrame(this.animate);
    if ((this.scene == null) || this.scene.isPaused()) {
      return;
    }
    this.stats.begin();
    this.scene.update(deltaTime);
    this.renderer.render(this.scene);
    this.stats.end();
    TWEEN.update(deltaTime);
  };

  return BeerPoweredEngine;

})();

module.exports = BeerPoweredEngine;


},{"scene":undefined}],"button":[function(require,module,exports){
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

  Button.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return Button;

})(PIXI.Sprite);

module.exports = Button;


},{"sh-globals":undefined}],"gamescene":[function(require,module,exports){
var GameScene, Scene, Sketch, configs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

configs = require('sh-configs');

Scene = require('scene');

Sketch = require('sketch');

GameScene = (function(_super) {
  __extends(GameScene, _super);

  function GameScene() {
    GameScene.__super__.constructor.apply(this, arguments);
    this.texture = PIXI.Texture.fromImage('/assets/images/library_concept.jpg');
    this.bunny = new Sketch(this.texture);
    this.bunny.anchor.x = 0.5;
    this.bunny.anchor.y = 0.5;
    this.bunny.position.x = configs.desktop.settings.width / 2;
    this.bunny.position.y = configs.desktop.settings.height / 2;
    this.bunny.addToScene(this);
  }

  GameScene.prototype.update = function(deltaTime) {
    GameScene.__super__.update.call(this, deltaTime);
  };

  return GameScene;

})(Scene);

module.exports = GameScene;


},{"scene":undefined,"sh-configs":undefined,"sketch":undefined}],"introscene":[function(require,module,exports){
var IntroScene, Scene, Sketch, configs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

configs = require('sh-configs');

Scene = require('scene');

Sketch = require('sketch');

IntroScene = (function(_super) {
  __extends(IntroScene, _super);

  function IntroScene() {
    var $, fadeIn, fadeOut;
    $ = this;
    IntroScene.__super__.constructor.apply(this, arguments);
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/pursuit_blue.png'), PIXI.Texture.fromImage('/assets/images/pursuit.png')];
    this.background = new Sketch(this.textures[0]);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = configs.desktop.settings.width / 2;
    this.background.position.y = configs.desktop.settings.height / 2;
    this.background.addToScene(this);
    this.logoNoFill = new Sketch(this.textures[1]);
    this.logoNoFill.anchor.x = 0.5;
    this.logoNoFill.anchor.y = 0.5;
    this.logoNoFill.position.x = configs.desktop.settings.width / 2;
    this.logoNoFill.position.y = configs.desktop.settings.height / 2;
    this.logoNoFill.scale.x = 0.2;
    this.logoNoFill.scale.y = 0.2;
    this.logoNoFill.addToScene(this);
    this.logo = new Sketch(this.textures[2]);
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;
    this.logo.position.x = configs.desktop.settings.width / 2;
    this.logo.position.y = configs.desktop.settings.height / 2;
    this.logo.scale.x = 0.2;
    this.logo.scale.y = 0.2;
    this.logo.alpha = 0.0;
    this.logo.addToScene(this);
    fadeOut = new TWEEN.Tween({
      alpha: 1.0
    }).to({
      alpha: 0.0
    }, 9000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.logo.alpha = this.alpha;
      $.logoNoFill.alpha = this.alpha;
    }).onComplete(function() {
      console.log('completed animation');
      $._finish = true;
    });
    fadeIn = new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 9000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.logo.alpha = this.alpha;
    }).chain(fadeOut).start();
  }

  IntroScene.prototype.update = function(deltaTime) {
    IntroScene.__super__.update.call(this, deltaTime);
  };

  return IntroScene;

})(Scene);

module.exports = IntroScene;


},{"scene":undefined,"sh-configs":undefined,"sketch":undefined}],"loader":[function(require,module,exports){
var Background, Loader, ProgressBar, Sketch, SystemText, globals;

globals = require('sh-globals');

Background = require('background');

Sketch = require('sketch');

ProgressBar = require('progressbar');

SystemText = require('systemtext');

Loader = (function() {
  function Loader(screenWidth, screenHeight, stage) {
    var $;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.stage = stage;
    $ = this;
    this.tasksDone = false;
    this.tasksCount = 0;
    this.tasksCompleted = 0;
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

  ProgressBar.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return ProgressBar;

})(PIXI.Sprite);

module.exports = ProgressBar;


},{"sh-globals":undefined}],"scene":[function(require,module,exports){
var Scene, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

Scene = (function(_super) {
  __extends(Scene, _super);

  Scene.prototype._finish = false;

  Scene.prototype._poll = function(data) {};

  function Scene(background) {
    if (background == null) {
      background = 0x000000;
    }
    this.paused = false;
    Scene.__super__.constructor.call(this, background);
    return;
  }

  Scene.prototype.onUpdate = function(callback) {
    this._poll = callback;
  };

  Scene.prototype.update = function(deltaTime) {
    this._poll(this._finish);
  };

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

module.exports = Scene;


},{"sh-globals":undefined}],"sh-configs":[function(require,module,exports){
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
    onIntro: 2,
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
  },
  textureIndex: {
    game_logo: 1,
    background_1: 2,
    background_2: 3,
    background_3: 4,
    background_4: 5,
    background_6: 6,
    button_start: 7,
    button_play: 8,
    button_options: 9,
    button_exit: 10,
    button_sounds: 11,
    button_info: 12
  }
};


},{}],"shuffled":[function(require,module,exports){
var Background, BeerPoweredEngine, GameScene, IntroScene, Loader, ShuffledApp, Sketch, globals;

globals = require('sh-globals');

BeerPoweredEngine = require('beerpoweredengine');

Background = require('background');

Sketch = require('sketch');

Loader = require('loader');

IntroScene = require('introscene');

GameScene = require('gamescene');

ShuffledApp = (function() {
  ShuffledApp.prototype._startup = true;

  ShuffledApp.prototype._mode = globals.gameModes.onIntro;

  function ShuffledApp(screenWidth, screenHeight) {
    var $;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    $ = this;
    this.engine = new BeerPoweredEngine(this.screenWidth, this.screenHeight);
    this.game = this.engine.createScene('game', GameScene, function(finish) {
      console.log('onGame');
    });
    this.intro = this.engine.createScene('intro', IntroScene, function(finish) {
      if (finish === true) {
        console.log('finish');
        $.engine.goToScene('game');
      }
    });
    this.engine.goToScene('intro');
  }

  ShuffledApp.prototype.sketch = function() {
    return true;
  };

  return ShuffledApp;

})();

module.exports = ShuffledApp;


},{"background":undefined,"beerpoweredengine":undefined,"gamescene":undefined,"introscene":undefined,"loader":undefined,"sh-globals":undefined,"sketch":undefined}],"sketch":[function(require,module,exports){
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

  Sketch.prototype.addToScene = function(scene) {
    scene.addChild(this);
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

  SystemText.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return SystemText;

})(PIXI.Text);

module.exports = SystemText;


},{"sh-globals":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsInNjZW5lcy9nYW1lc2NlbmUuY29mZmVlIiwic2NlbmVzL2ludHJvc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvbG9hZGVyLmNvZmZlZSIsImVudGl0aWVzL3Byb2dyZXNzYmFyLmNvZmZlZSIsInNjZW5lLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwiZ2xvYmFscy5jb2ZmZWUiLCJzaHVmZmxlZC5jb2ZmZWUiLCJlbnRpdGllcy9za2V0Y2guY29mZmVlIiwiZW50aXRpZXMvc3lzdGVtdGV4dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUMyQnVCOzs7O0FDM0J2QixJQUFBLG1CQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLCtCQUFBLENBQUE7O0FBQWEsRUFBQSxvQkFBQyxPQUFELEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxjQUFELEdBQWtCLE9BQU8sQ0FBQyxRQUFRLENBQUMsVUFBbkMsQ0FBQTtBQUFBLElBQ0EsNENBQU0sT0FBTixDQURBLENBRFM7RUFBQSxDQUFiOztBQUFBLHVCQUlBLGlCQUFBLEdBQW1CLFNBQUMsS0FBRCxHQUFBO1dBQ2YsSUFBQyxDQUFBLGNBQUQsR0FBa0IsTUFESDtFQUFBLENBSm5CLENBQUE7O0FBQUEsdUJBT0EsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO1dBQ2YsSUFBQyxDQUFBLGVBRGM7RUFBQSxDQVBuQixDQUFBOztBQUFBLHVCQVVBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNSLElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFm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QUFDLEdBQUQsRUFBTSxLQUFOLEdBQUE7QUFDVCxJQUFBLDRDQUFNLEdBQU4sRUFBVyxLQUFYLENBQUEsQ0FEUztFQUFBLENBQWI7O0FBQUEsdUJBR0EsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1IsSUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsQ0FBQSxDQURRO0VBQUEsQ0FIWixDQUFBOztvQkFBQTs7R0FEcUIsSUFBSSxDQUFDLEtBRjlCLENBQUE7O0FBQUEsTUFVTSxDQUFDLE9BQVAsR0FBaUIsVUFWakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIyBETyBOT1QgREVMRVRFXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBnbG9iYWxzLnByaW9yaXR5LmJhY2tncm91bmRcbiAgICAgICAgc3VwZXIgdGV4dHVyZVxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IChsYXllcikgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gbGF5ZXJcblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHlcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iLCJTY2VuZSA9IHJlcXVpcmUgJ3NjZW5lJ1xuXG5jbGFzcyBCZWVyUG93ZXJlZEVuZ2luZVxuICAgIGNvbnN0cnVjdG9yOiAoQHdpZHRoLCBAaGVpZ2h0KSAtPlxuICAgICAgICBAc2NlbmVzID0ge31cbiAgICAgICAgQHNjZW5lID0gbnVsbFxuICAgICAgICBAaW5pdCgpXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBAcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlciBAd2lkdGgsIEBoZWlnaHRcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBAcmVuZGVyZXIudmlld1xuXG4gICAgICAgIEBzdGF0cyA9IG5ldyBTdGF0c1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIEBzdGF0cy5kb21FbGVtZW50XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBhbmltYXRlXG4gICAgICAgIHJldHVyblxuXG4gICAgY3JlYXRlU2NlbmU6IChpZCwgdHNjZW5lLCBjYWxsYmFjaykgLT5cbiAgICAgICAgdHNjZW5lID89IFNjZW5lXG4gICAgICAgIGNhbGxiYWNrID89IC0+XG5cbiAgICAgICAgcmV0dXJuIGB1bmRlZmluZWRgIGlmIEBzY2VuZXNbaWRdXG5cbiAgICAgICAgc2NlbmUgPSBuZXcgdHNjZW5lXG4gICAgICAgIHNjZW5lLm9uVXBkYXRlIGNhbGxiYWNrXG4gICAgICAgIEBzY2VuZXNbaWRdID0gc2NlbmVcbiAgICAgICAgc2NlbmVcblxuICAgIGdvVG9TY2VuZTogKGlkKSAtPlxuICAgICAgICBpZiBAc2NlbmVzW2lkXT9cbiAgICAgICAgICAgIEBzY2VuZT8ucGF1c2UoKVxuICAgICAgICAgICAgQHNjZW5lID0gQHNjZW5lc1tpZF1cbiAgICAgICAgICAgIEBzY2VuZS5yZXN1bWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZmFsc2VcblxuICAgIGFuaW1hdGU6IChkZWx0YVRpbWUpID0+XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZVxuXG4gICAgICAgIHJldHVybiBpZiBub3QgQHNjZW5lPyBvciBAc2NlbmUuaXNQYXVzZWQoKVxuXG4gICAgICAgIEBzdGF0cy5iZWdpbigpXG4gICAgICAgIEBzY2VuZS51cGRhdGUgZGVsdGFUaW1lXG4gICAgICAgIEByZW5kZXJlci5yZW5kZXIgQHNjZW5lXG4gICAgICAgIEBzdGF0cy5lbmQoKVxuXG4gICAgICAgIFRXRUVOLnVwZGF0ZSBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQmVlclBvd2VyZWRFbmdpbmVcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5CdXR0b25BY3RpdmVTdGF0ZSA9XG4gICAgaW5hY3RpdmU6IDBcbiAgICBhY3RpdmU6IDFcblxuQnV0dG9uTW9kZSA9XG4gICAgZm9jdXM6IDFcbiAgICBjbGljazogMFxuICAgIGhvdmVyOiA1XG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6IChAdGV4dHVyZU9uLCBAdGV4dHVyZU9mZiwgQHRleHR1cmVQcmVzcykgLT5cbiAgICAgICAgc3VwZXIgQHRleHR1cmVPblxuICAgICAgICBAaXNQcmVzcyA9IGZhbHNlXG4gICAgICAgIEBtb2RlID0gQnV0dG9uTW9kZS5mb2N1c1xuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBpZiBAaXNQcmVzXG4gICAgICAgICAgICBpZiBAbW9kZSBpcyBCdXR0b25Nb2RlLmNsaWNrXG4gICAgICAgICAgICAgICAgQHNldFRleHR1cmUgQHRleHR1cmVQcmVzc1xuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzOiAtPlxuICAgICAgICBAaXNQcmVzcyA9IHRydWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRCb3VuZGluZ0JveDogLT5cbiAgICAgICAgQGdldEJvdW5kc1xuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblxuIiwiY29uZmlncyA9IHJlcXVpcmUgJ3NoLWNvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnc2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdza2V0Y2gnXG5cbmNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIEB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbGlicmFyeV9jb25jZXB0LmpwZydcbiAgICAgICAgQGJ1bm55ID0gbmV3IFNrZXRjaCBAdGV4dHVyZVxuICAgICAgICBAYnVubnkuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJ1bm55LmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidW5ueS5wb3NpdGlvbi54ID0gY29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYnVubnkucG9zaXRpb24ueSA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBidW5ueS5hZGRUb1NjZW5lIEBcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTY2VuZVxuIiwiY29uZmlncyA9IHJlcXVpcmUgJ3NoLWNvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnc2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdza2V0Y2gnXG5cbmNsYXNzIEludHJvU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIHN1cGVyXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xvc3Rfa2lkc19jb250ZXN0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXRfYmx1ZS5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0LnBuZydcbiAgICAgICAgXVxuXG4gICAgICAgIEBiYWNrZ3JvdW5kID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMF1cbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueCA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueSA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvTm9GaWxsID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueCA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueSA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzJdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgZmFkZU91dCA9IG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgLCA5MDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuSW5PdXQpLm9uVXBkYXRlKCAtPlxuICAgICAgICAgICAgJC5sb2dvLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICAkLmxvZ29Ob0ZpbGwuYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLm9uQ29tcGxldGUoIC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnY29tcGxldGVkIGFuaW1hdGlvbidcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApXG5cbiAgICAgICAgZmFkZUluID0gbmV3IFRXRUVOLlR3ZWVuKFxuICAgICAgICAgICAgYWxwaGE6IDAuMFxuICAgICAgICApLnRvKFxuICAgICAgICAgICAgYWxwaGE6IDEuMFxuICAgICAgICAsIDkwMDApLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5Jbk91dCkub25VcGRhdGUoIC0+XG4gICAgICAgICAgICAkLmxvZ28uYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLmNoYWluKGZhZGVPdXQpLnN0YXJ0KClcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEludHJvU2NlbmVcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnYmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ3NrZXRjaCdcblByb2dyZXNzQmFyID0gcmVxdWlyZSAncHJvZ3Jlc3NiYXInXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnc3lzdGVtdGV4dCdcblxuY2xhc3MgTG9hZGVyXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGFza3NEb25lID0gZmFsc2VcbiAgICAgICAgQHRhc2tzQ291bnQgPSAwXG4gICAgICAgIEB0YXNrc0NvbXBsZXRlZCA9IDBcblxuICAgICAgICBAc3RhcnRCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnUGxheScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24ucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgOTBcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFscGhhID0gMC4wXG4gICAgICAgIEBzdGFydEJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcblxuICAgICAgICBAc3RhcnRCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQudHJhZGVPZmYgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tncm91bmQuZmlsdGVycyA9IFskLm15RmlsdGVyXVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRvdWNoZW5kID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFkZFRvU3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQGxvYWRTb3VuZCA9IG5ldyBIb3dsXG4gICAgICAgICAgICB1cmxzOiBbJy9hc3NldHMvc291bmRzL2Zsb19yaWRhLm1wMyddXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2VcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgICAgIG9ubG9hZDogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZmluaXNoZWQgbG9hZGluZyBzb3VuZCdcblxuICAgIHRhc2tUb0xvYWQ6IChjb3VudCkgLT5cbiAgICAgICAgQHRhc2tzQ291bnQgPSBjb3VudFxuXG4gICAgYWRkVG9GaW5pc2hlZFRhc2s6ICgpIC0+XG4gICAgICAgIGlmIG5vdCBAdGFza3NDb3VudCBpcyBAdGFza3NDb21wbGV0ZWRcbiAgICAgICAgICAgIEB0YXNrc0NvbXBsZXRlZCArPSAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXNrc0RvbmUgPSB0cnVlXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlclxuIiwiZ2xvYmFscyA9IHJlcXVpcmUgJ3NoLWdsb2JhbHMnXG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmVCbGFuaywgdGV4dHVyZUZ1bGwpIC0+XG4gICAgICAgIHN1cGVyIHRleHR1cmVCbGFua1xuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIHNldHRpbmdzOiAob3B0cykgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NCYXJcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5jbGFzcyBTY2VuZSBleHRlbmRzIFBJWEkuU3RhZ2VcbiAgICBfZmluaXNoOiBmYWxzZVxuICAgIF9wb2xsOiAoZGF0YSkgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBjb25zdHJ1Y3RvcjogKGJhY2tncm91bmQpIC0+XG4gICAgICAgIGJhY2tncm91bmQgPz0gMHgwMDAwMDBcblxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcbiAgICAgICAgc3VwZXIgYmFja2dyb3VuZFxuICAgICAgICByZXR1cm5cblxuICAgIG9uVXBkYXRlOiAoY2FsbGJhY2spIC0+XG4gICAgICAgIEBfcG9sbCA9IGNhbGxiYWNrXG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBAX3BvbGwoQF9maW5pc2gpXG4gICAgICAgIHJldHVyblxuXG4gICAgcGF1c2U6IC0+XG4gICAgICAgIEBwYXVzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzdW1lOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgZGVza3RvcDpcbiAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMFxuICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgcGhvbmVzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIGlvczpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiA0ODBcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMyMFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICB3aW5kb3dzOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgdGFibGV0czpcbiAgICAgICAgYW5kcm9pZDpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDI0XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA3NjhcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG5cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBnYW1lTW9kZXM6XG4gICAgICAgIG9uSW50cm86IDJcbiAgICAgICAgb25Mb2JieTogNFxuICAgICAgICBvbkdhbWU6IDZcbiAgICAgICAgb25QYXVzZTogOFxuICAgICAgICBvbk9wdGlvbnM6IDEwXG4gICAgICAgIG9uRW5kOiAxMlxuICAgIHByaW9yaXR5OlxuICAgICAgICBiYWNrZ3JvdW5kOiAxMFxuICAgICAgICBub3JtYWw6IDUwXG4gICAgICAgIG92ZXJsYXk6IDYwXG4gICAgICAgIGJhbm5lcjogNzVcbiAgICAgICAgYWJvdmU6IDEwMFxuICAgICAgICBtYXg6IDk5OVxuICAgIHRleHR1cmVJbmRleDpcbiAgICAgICAgZ2FtZV9sb2dvOiAxXG4gICAgICAgIGJhY2tncm91bmRfMTogMlxuICAgICAgICBiYWNrZ3JvdW5kXzI6IDNcbiAgICAgICAgYmFja2dyb3VuZF8zOiA0XG4gICAgICAgIGJhY2tncm91bmRfNDogNVxuICAgICAgICBiYWNrZ3JvdW5kXzY6IDZcbiAgICAgICAgYnV0dG9uX3N0YXJ0OiA3XG4gICAgICAgIGJ1dHRvbl9wbGF5OiA4XG4gICAgICAgIGJ1dHRvbl9vcHRpb25zOiA5XG4gICAgICAgIGJ1dHRvbl9leGl0OiAxMFxuICAgICAgICBidXR0b25fc291bmRzOiAxMVxuICAgICAgICBidXR0b25faW5mbzogMTJcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5CZWVyUG93ZXJlZEVuZ2luZSA9IHJlcXVpcmUgJ2JlZXJwb3dlcmVkZW5naW5lJ1xuQmFja2dyb3VuZCA9IHJlcXVpcmUgJ2JhY2tncm91bmQnXG5Ta2V0Y2ggPSByZXF1aXJlICdza2V0Y2gnXG5Mb2FkZXIgPSByZXF1aXJlICdsb2FkZXInXG5cbiMgQ3VycmVudCBTY2VuZXNcbkludHJvU2NlbmUgPSByZXF1aXJlICdpbnRyb3NjZW5lJ1xuR2FtZVNjZW5lID0gcmVxdWlyZSAnZ2FtZXNjZW5lJ1xuXG4jIFNodWZmbGVkQXBwXG4jIFRoZSBtYWluIGVudHJ5IHBvaW50IG9mIHRoZSBhcHBcbmNsYXNzIFNodWZmbGVkQXBwXG4gICAgX3N0YXJ0dXA6IHRydWUsXG4gICAgX21vZGU6IGdsb2JhbHMuZ2FtZU1vZGVzLm9uSW50cm8sXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQGVuZ2luZSA9IG5ldyBCZWVyUG93ZXJlZEVuZ2luZSBAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHRcblxuICAgICAgICBAZ2FtZSA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ2dhbWUnLCBHYW1lU2NlbmUsIChmaW5pc2gpIC0+XG4gICAgICAgICAgICAjI0BlbmdpbmUuZ29Ub1NjZW5lICdpbnRybycgaWYgJC5nYW1lLmlzRmluaXNoKCkgaXMgdHJ1ZVxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ29uR2FtZSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAaW50cm8gPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdpbnRybycsIEludHJvU2NlbmUsIChmaW5pc2gpIC0+XG4gICAgICAgICAgICBpZiBmaW5pc2ggaXMgdHJ1ZVxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nICdmaW5pc2gnXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lICdnYW1lJ1xuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgIyNpZiBAX3N0YXJ0dXAgaXMgdHJ1ZVxuICAgICAgICBAZW5naW5lLmdvVG9TY2VuZSAnaW50cm8nXG4gICAgICAgICMjZWxzZVxuICAgICAgICAjIyAgICBAZW5naW5lLmdvdG9TY2VuZSAnZ2FtZSdcblxuICAgICAgICAjI3N3aXRjaCBAX21vZGVcbiAgICAgICAgIyMgICAgd2hlbiBnbG9iYWxzLmdhbWVNb2Rlcy5vbkludHJvIHRoZW4gQGVuZ2luZS5nb1RvU2NlbmUgJ2ludHJvJ1xuICAgICAgICAjIyAgICB3aGVuIGdsb2JhbHMuZ2FtZU1vZGVzLm9uR2FtZSB0aGVuIEBlbmdpbmUuZ29Ub1NjZW5lICdnYW1lJ1xuICAgICAgICAjIyAgICBlbHNlIEBlbmdpbmUuZ29Ub1NjZW5lICdnYW1lJ1xuXG4gICAgc2tldGNoOiAtPlxuICAgICAgICB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gU2h1ZmZsZWRBcHBcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5jbGFzcyBTa2V0Y2ggZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZSkgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gZ2xvYmFscy5wcmlvcml0eS5ub3JtYWxcbiAgICAgICAgc3VwZXIgdGV4dHVyZVxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IChsYXllcikgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gbGF5ZXJcblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHlcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBTa2V0Y2hcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5jbGFzcyBTeXN0ZW1UZXh0IGV4dGVuZHMgUElYSS5UZXh0XG4gICAgY29uc3RydWN0b3I6IChtc2csIHN0eWxlKSAtPlxuICAgICAgICBzdXBlciBtc2csIHN0eWxlXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU3lzdGVtVGV4dFxuIl19
