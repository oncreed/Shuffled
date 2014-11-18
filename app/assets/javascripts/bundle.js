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

  BeerPoweredEngine.prototype.createScene = function(id, tscene) {
    var scene;
    if (tscene == null) {
      tscene = Scene;
    }
    if (this.scenes[id]) {
      return undefined;
    }
    scene = new tscene;
    this.scenes[id] = scene;
    return scene;
  };

  BeerPoweredEngine.prototype.goToScene = function(id) {
    if (this.scenes[id] != null) {
      if (this.scene) {
        this.scene.paused();
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
var GameScene, Scene, Sketch,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require('scene');

Sketch = require('sketch');

GameScene = (function(_super) {
  __extends(GameScene, _super);

  function GameScene() {
    GameScene.__super__.constructor.apply(this, arguments);
    this.texture = PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg');
    this.bunny = new Sketch(this.texture);
    this.bunny.addToScene(this);
  }

  GameScene.prototype.update = function(deltaTime) {
    GameScene.__super__.update.call(this, deltaTime);
  };

  return GameScene;

})(Scene);

module.exports = GameScene;


},{"scene":undefined,"sketch":undefined}],"introscene":[function(require,module,exports){
var IntroScene, Scene, Sketch, configs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

configs = require('sh-configs');

Scene = require('scene');

Sketch = require('sketch');

IntroScene = (function(_super) {
  __extends(IntroScene, _super);

  function IntroScene() {
    var $, tween;
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
    tween = new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 9000).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.logo.alpha = this.alpha;
    }).onComplete(function() {}).start();
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

  Scene.prototype._poll = function() {};

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
    this._poll();
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
var Background, BeerPoweredEngine, GameScene, IntroScene, Loader, ShuffledApp, Sketch;

BeerPoweredEngine = require('beerpoweredengine');

Background = require('background');

Sketch = require('sketch');

Loader = require('loader');

IntroScene = require('introscene');

GameScene = require('gamescene');

ShuffledApp = (function() {
  ShuffledApp.prototype._coldStartup = true;

  function ShuffledApp(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.engine = new BeerPoweredEngine(this.screenWidth, this.screenHeight);
    this.game = this.engine.createScene('game', GameScene);
    this.intro = this.engine.createScene('intro', IntroScene);
    if (this._coldStartup === true) {
      this.engine.goToScene('intro');
    } else {
      this.engine.gotoScene('game');
    }
  }

  ShuffledApp.prototype.sketch = function() {
    return true;
  };

  return ShuffledApp;

})();

module.exports = ShuffledApp;


},{"background":undefined,"beerpoweredengine":undefined,"gamescene":undefined,"introscene":undefined,"loader":undefined,"sketch":undefined}],"sketch":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsInNjZW5lcy9nYW1lc2NlbmUuY29mZmVlIiwic2NlbmVzL2ludHJvc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvbG9hZGVyLmNvZmZlZSIsImVudGl0aWVzL3Byb2dyZXNzYmFyLmNvZmZlZSIsInNjZW5lLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwiZ2xvYmFscy5jb2ZmZWUiLCJzaHVmZmxlZC5jb2ZmZWUiLCJlbnRpdGllcy9za2V0Y2guY29mZmVlIiwiZW50aXRpZXMvc3lzdGVtdGV4dC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNjZ0I7Ozs7QUNkaEIsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsWUFBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsT0FBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQW5DLENBQUE7QUFBQSxJQUNBLDRDQUFNLE9BQU4sQ0FEQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFJQSxpQkFBQSxHQUFtQixTQUFDLEtBQUQsR0FBQTtXQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLE1BREg7RUFBQSxDQUpuQixDQUFBOztBQUFBLHVCQU9BLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxlQURjO0VBQUEsQ0FQbkIsQ0FBQTs7QUFBQSx1QkFVQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixD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QUEsQ0FBYjs7QUFBQSx1QkFHQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixDQUFBLENBRFE7RUFBQSxDQUhaLENBQUE7O29CQUFBOztHQURxQixJQUFJLENBQUMsS0FGOUIsQ0FBQTs7QUFBQSxNQVVNLENBQUMsT0FBUCxHQUFpQixVQVZqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMjIERPIE5PVCBERUxFVEVcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5jbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGdsb2JhbHMucHJpb3JpdHkuYmFja2dyb3VuZFxuICAgICAgICBzdXBlciB0ZXh0dXJlXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogKGxheWVyKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBsYXllclxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eVxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tncm91bmRcbiIsIlNjZW5lID0gcmVxdWlyZSAnc2NlbmUnXG5cbmNsYXNzIEJlZXJQb3dlcmVkRW5naW5lXG4gICAgY29uc3RydWN0b3I6IChAd2lkdGgsIEBoZWlnaHQpIC0+XG4gICAgICAgIEBzY2VuZXMgPSB7fVxuICAgICAgICBAc2NlbmUgPSBudWxsXG4gICAgICAgIEBpbml0KClcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIEByZW5kZXJlci52aWV3XG5cbiAgICAgICAgQHN0YXRzID0gbmV3IFN0YXRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHN0YXRzLmRvbUVsZW1lbnRcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBjcmVhdGVTY2VuZTogKGlkLCB0c2NlbmUpIC0+XG4gICAgICAgIHRzY2VuZSA/PSBTY2VuZVxuICAgICAgICByZXR1cm4gYHVuZGVmaW5lZGAgaWYgQHNjZW5lc1tpZF1cblxuICAgICAgICBzY2VuZSA9IG5ldyB0c2NlbmVcbiAgICAgICAgQHNjZW5lc1tpZF0gPSBzY2VuZVxuICAgICAgICBzY2VuZVxuXG4gICAgZ29Ub1NjZW5lOiAoaWQpIC0+XG4gICAgICAgIGlmIEBzY2VuZXNbaWRdP1xuICAgICAgICAgICAgQHNjZW5lLnBhdXNlZCgpIGlmIEBzY2VuZVxuICAgICAgICAgICAgQHNjZW5lID0gQHNjZW5lc1tpZF1cbiAgICAgICAgICAgIEBzY2VuZS5yZXN1bWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZmFsc2VcblxuICAgIGFuaW1hdGU6IChkZWx0YVRpbWUpID0+XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZVxuXG4gICAgICAgIHJldHVybiBpZiBub3QgQHNjZW5lPyBvciBAc2NlbmUuaXNQYXVzZWQoKVxuICAgICAgICBAc3RhdHMuYmVnaW4oKVxuICAgICAgICBAc2NlbmUudXBkYXRlIGRlbHRhVGltZVxuICAgICAgICBAcmVuZGVyZXIucmVuZGVyIEBzY2VuZVxuICAgICAgICBAc3RhdHMuZW5kKClcblxuICAgICAgICBUV0VFTi51cGRhdGUgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJlZXJQb3dlcmVkRW5naW5lXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuQnV0dG9uQWN0aXZlU3RhdGUgPVxuICAgIGluYWN0aXZlOiAwXG4gICAgYWN0aXZlOiAxXG5cbkJ1dHRvbk1vZGUgPVxuICAgIGZvY3VzOiAxXG4gICAgY2xpY2s6IDBcbiAgICBob3ZlcjogNVxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAoQHRleHR1cmVPbiwgQHRleHR1cmVPZmYsIEB0ZXh0dXJlUHJlc3MpIC0+XG4gICAgICAgIHN1cGVyIEB0ZXh0dXJlT25cbiAgICAgICAgQGlzUHJlc3MgPSBmYWxzZVxuICAgICAgICBAbW9kZSA9IEJ1dHRvbk1vZGUuZm9jdXNcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgaWYgQGlzUHJlc1xuICAgICAgICAgICAgaWYgQG1vZGUgaXMgQnV0dG9uTW9kZS5jbGlja1xuICAgICAgICAgICAgICAgIEBzZXRUZXh0dXJlIEB0ZXh0dXJlUHJlc3NcbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzczogLT5cbiAgICAgICAgQGlzUHJlc3MgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0Qm91bmRpbmdCb3g6IC0+XG4gICAgICAgIEBnZXRCb3VuZHNcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25cbiIsIlNjZW5lID0gcmVxdWlyZSAnc2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdza2V0Y2gnXG5cbmNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIEB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbG9zdF9raWRzX2NvbnRlc3QuanBnJ1xuICAgICAgICBAYnVubnkgPSBuZXcgU2tldGNoIEB0ZXh0dXJlXG4gICAgICAgIEBidW5ueS5hZGRUb1NjZW5lIEBcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTY2VuZVxuIiwiY29uZmlncyA9IHJlcXVpcmUgJ3NoLWNvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnc2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdza2V0Y2gnXG5cbmNsYXNzIEludHJvU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIHN1cGVyXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xvc3Rfa2lkc19jb250ZXN0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXRfYmx1ZS5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0LnBuZydcbiAgICAgICAgXVxuXG4gICAgICAgIEBiYWNrZ3JvdW5kID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMF1cbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueCA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueSA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvTm9GaWxsID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueCA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueSA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzJdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgdHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgOTAwMCkuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLkluT3V0KS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQubG9nby5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICkub25Db21wbGV0ZSggLT5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLnN0YXJ0KClcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEludHJvU2NlbmVcbiIsImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnYmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ3NrZXRjaCdcblByb2dyZXNzQmFyID0gcmVxdWlyZSAncHJvZ3Jlc3NiYXInXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnc3lzdGVtdGV4dCdcblxuY2xhc3MgTG9hZGVyXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGFza3NEb25lID0gZmFsc2VcbiAgICAgICAgQHRhc2tzQ291bnQgPSAwXG4gICAgICAgIEB0YXNrc0NvbXBsZXRlZCA9IDBcbiAgICAgICAgQHRyYWRlT2ZmID0gZmFsc2VcbiAgICAgICAgQHRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbG9zdF9raWRzX2NvbnRlc3QuanBnJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdF9ibHVlLnBuZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXQucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgIyNAYmFja2dyb3VuZE1hc2tSYWRpdXMgPSA1MFxuICAgICAgICAjI0BiYWNrZ3JvdW5kTWFzayA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgICMjQGJhY2tncm91bmRNYXNrLmJlZ2luRmlsbCgweGZmZmZmZilcbiAgICAgICAgIyNAYmFja2dyb3VuZE1hc2suZHJhd0NpcmNsZSA0MDAsIDMyMCwgQGJhY2tncm91bmRNYXNrUmFkaXVzXG4gICAgICAgICMjQGJhY2tncm91bmRNYXNrLmVuZEZpbGwoKVxuICAgICAgICAjI0BzdGFnZS5hZGRDaGlsZCBAYmFja2dyb3VuZE1hc2tcblxuICAgICAgICBAbXlGaWx0ZXIgPSBuZXcgUElYSS5SR0JTcGxpdEZpbHRlcjtcblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBCYWNrZ3JvdW5kIEB0ZXh0dXJlc1swXVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi54ID0gQHNjcmVlbldpZHRoIC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi55ID0gQHNjcmVlbkhlaWdodCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQuYWRkVG9TdGFnZSBAc3RhZ2VcblxuICAgICAgICAjI0BiYWNrZ3JvdW5kLm1hc2sgPSBAYmFja2dyb3VuZE1hc2tcblxuICAgICAgICBAbG9nb05vRmlsbCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnkgPSBAc2NyZWVuSGVpZ2h0IC8gMlxuICAgICAgICBAbG9nb05vRmlsbC5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYWRkVG9TdGFnZSBAc3RhZ2VcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzJdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBAc2NyZWVuSGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TdGFnZSBAc3RhZ2VcblxuICAgICAgICBAc3RhcnRCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnUGxheScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24ucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgOTBcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFscGhhID0gMC4wXG4gICAgICAgIEBzdGFydEJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcblxuICAgICAgICBAc3RhcnRCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQudHJhZGVPZmYgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tncm91bmQuZmlsdGVycyA9IFskLm15RmlsdGVyXVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRvdWNoZW5kID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFkZFRvU3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQGxvYWRTb3VuZCA9IG5ldyBIb3dsXG4gICAgICAgICAgICB1cmxzOiBbJy9hc3NldHMvc291bmRzL2Zsb19yaWRhLm1wMyddXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2VcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgICAgIG9ubG9hZDogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZmluaXNoZWQgbG9hZGluZyBzb3VuZCdcblxuICAgICAgICB0d2VlbiA9IG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgLCA5MDAwKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuSW5PdXQpLm9uVXBkYXRlKCAtPlxuICAgICAgICAgICAgJC5sb2dvLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5vbkNvbXBsZXRlKCAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5hbHBoYSA9IDEuMFxuICAgICAgICApLnN0YXJ0KClcblxuXG4gICAgdGFza1RvTG9hZDogKGNvdW50KSAtPlxuICAgICAgICBAdGFza3NDb3VudCA9IGNvdW50XG5cbiAgICBhZGRUb0ZpbmlzaGVkVGFzazogKCkgLT5cbiAgICAgICAgaWYgbm90IEB0YXNrc0NvdW50IGlzIEB0YXNrc0NvbXBsZXRlZFxuICAgICAgICAgICAgQHRhc2tzQ29tcGxldGVkICs9IDFcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgQHRhc2tzRG9uZSA9IHRydWVcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgIyNpZiBAdHJhZGVPZmYgaXMgdHJ1ZVxuICAgICAgICAjIyAgICBAYmFja2dyb3VuZE1hc2tSYWRpdXMgKz0gMC4xXG4gICAgICAgICMjICAgIEBiYWNrZ3JvdW5kTWFzay5iZWdpbkZpbGwoKVxuICAgICAgICAjIyAgICBAYmFja2dyb3VuZE1hc2suZHJhd0NpcmNsZSA0MDAsIDMyMCwgQGJhY2tncm91bmRNYXNrUmFkaXVzXG4gICAgICAgICMjICAgIEBiYWNrZ3JvdW5kTWFzay5lbmRGaWxsKClcbiAgICAgICAgIyMgICAgQGJhY2tncm91bmQubWFzayA9IEBiYWNrZ3JvdW5kTWFza1xuXG4gICAgICAgICMjaWYgQHRhc2tzRG9uZVxuICAgICAgICAjIyAgICAjIyBkbyBjaGFuZ2UgbW9kZSBoZXJlXG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI2Vsc2VcbiAgICAgICAgIyMgICAgcmV0dXJuXG5cbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9hZGVyXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZUJsYW5rLCB0ZXh0dXJlRnVsbCkgLT5cbiAgICAgICAgc3VwZXIgdGV4dHVyZUJsYW5rXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgc2V0dGluZ3M6IChvcHRzKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBQcm9ncmVzc0JhclxuIiwiZ2xvYmFscyA9IHJlcXVpcmUgJ3NoLWdsb2JhbHMnXG5cbmNsYXNzIFNjZW5lIGV4dGVuZHMgUElYSS5TdGFnZVxuICAgIF9wb2xsOiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGNvbnN0cnVjdG9yOiAoYmFja2dyb3VuZCkgLT5cbiAgICAgICAgYmFja2dyb3VuZCA/PSAweDAwMDAwMFxuXG4gICAgICAgIEBwYXVzZWQgPSBmYWxzZVxuICAgICAgICBzdXBlciBiYWNrZ3JvdW5kXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIEBfcG9sbCgpXG4gICAgICAgIHJldHVyblxuXG4gICAgcGF1c2U6IC0+XG4gICAgICAgIEBwYXVzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzdW1lOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgZGVza3RvcDpcbiAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMFxuICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgcGhvbmVzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIGlvczpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiA0ODBcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMyMFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICB3aW5kb3dzOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgdGFibGV0czpcbiAgICAgICAgYW5kcm9pZDpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDI0XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA3NjhcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG5cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBnYW1lTW9kZXM6XG4gICAgICAgIG9uTG9hZDogMlxuICAgICAgICBvbkxvYmJ5OiA0XG4gICAgICAgIG9uR2FtZTogNlxuICAgICAgICBvblBhdXNlOiA4XG4gICAgICAgIG9uT3B0aW9uczogMTBcbiAgICAgICAgb25FbmQ6IDEyXG4gICAgcHJpb3JpdHk6XG4gICAgICAgIGJhY2tncm91bmQ6IDEwXG4gICAgICAgIG5vcm1hbDogNTBcbiAgICAgICAgb3ZlcmxheTogNjBcbiAgICAgICAgYmFubmVyOiA3NVxuICAgICAgICBhYm92ZTogMTAwXG4gICAgICAgIG1heDogOTk5XG5cbiIsIkJlZXJQb3dlcmVkRW5naW5lID0gcmVxdWlyZSAnYmVlcnBvd2VyZWRlbmdpbmUnXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnYmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ3NrZXRjaCdcbkxvYWRlciA9IHJlcXVpcmUgJ2xvYWRlcidcblxuIyBDdXJyZW50IFNjZW5lc1xuSW50cm9TY2VuZSA9IHJlcXVpcmUgJ2ludHJvc2NlbmUnXG5HYW1lU2NlbmUgPSByZXF1aXJlICdnYW1lc2NlbmUnXG5cbiMgU2h1ZmZsZWRBcHBcbiMgVGhlIG1haW4gZW50cnkgcG9pbnQgb2YgdGhlIGFwcFxuY2xhc3MgU2h1ZmZsZWRBcHBcbiAgICBfY29sZFN0YXJ0dXA6IHRydWUsXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQpIC0+XG4gICAgICAgIEBlbmdpbmUgPSBuZXcgQmVlclBvd2VyZWRFbmdpbmUgQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgQGdhbWUgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdnYW1lJywgR2FtZVNjZW5lXG4gICAgICAgIEBpbnRybyA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ2ludHJvJywgSW50cm9TY2VuZVxuXG4gICAgICAgIGlmIEBfY29sZFN0YXJ0dXAgaXMgdHJ1ZVxuICAgICAgICAgICAgQGVuZ2luZS5nb1RvU2NlbmUgJ2ludHJvJ1xuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAZW5naW5lLmdvdG9TY2VuZSAnZ2FtZSdcblxuICAgIHNrZXRjaDogLT5cbiAgICAgICAgdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNodWZmbGVkQXBwXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgU2tldGNoIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGdsb2JhbHMucHJpb3JpdHkubm9ybWFsXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2tldGNoXG4iLCJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgU3lzdGVtVGV4dCBleHRlbmRzIFBJWEkuVGV4dFxuICAgIGNvbnN0cnVjdG9yOiAobXNnLCBzdHlsZSkgLT5cbiAgICAgICAgc3VwZXIgbXNnLCBzdHlsZVxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN5c3RlbVRleHRcbiJdfQ==
