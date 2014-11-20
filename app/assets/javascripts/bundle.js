require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){



},{}],"Background":[function(require,module,exports){
var Background, Globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Globals = require('Globals');

Background = (function(_super) {
  __extends(Background, _super);

  function Background(texture) {
    this.renderPriority = Globals.priority.background;
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


},{"Globals":undefined}],"BeerPoweredEngine":[function(require,module,exports){
var BeerPoweredEngine, Scene,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Scene = require('Scene');

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


},{"Scene":undefined}],"BoardScene":[function(require,module,exports){
var BoardScene, Configs, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

SystemText = require('SystemText');

BoardScene = (function(_super) {
  __extends(BoardScene, _super);

  function BoardScene() {
    var $;
    $ = this;
    BoardScene.__super__.constructor.apply(this, arguments);
    this.warning = new SystemText('This is the leaderboard page', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.warning.anchor.x = 0.5;
    this.warning.anchor.y = 0.5;
    this.warning.position.x = Configs.desktop.settings.width / 2;
    this.warning.position.y = 90;
    this.warning.addToScene(this);
    this.backButton = new SystemText('Back', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.backButton.anchor.y = 0.5;
    this.backButton.position.x = Configs.desktop.settings.width / 2 + 60;
    this.backButton.position.y = Configs.desktop.settings.height / 2 + 120;
    this.backButton.interactive = true;
    this.backButton.addToScene(this);
    this.backButton.mouseover = function(data) {
      $.backButton.scale.x = 1.1;
      $.backButton.scale.y = 1.1;
    };
    this.backButton.mouseout = function(data) {
      $.backButton.scale.x = 1.0;
      $.backButton.scale.y = 1.0;
    };
    this.backButton.mousedown = function(data) {
      $.backButton.scale.x = 0.8;
      $.backButton.scale.y = 0.8;
      $._finish = true;
      $._next = 'game';
    };
    this.backButton.mouseup = function(data) {
      $.backButton.scale.x = 1.0;
      $.backButton.scale.y = 1.0;
    };
  }

  BoardScene.prototype.update = function(deltaTime) {
    BoardScene.__super__.update.call(this, deltaTime);
  };

  return BoardScene;

})(Scene);

module.exports = BoardScene;


},{"Configs":undefined,"Scene":undefined,"Sketch":undefined,"SystemText":undefined}],"Button":[function(require,module,exports){
var Button, ButtonActiveState, ButtonMode, Globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Globals = require('Globals');

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


},{"Globals":undefined}],"Configs":[function(require,module,exports){
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


},{}],"GameScene":[function(require,module,exports){
var Configs, GameScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

SystemText = require('SystemText');

GameScene = (function(_super) {
  __extends(GameScene, _super);

  function GameScene() {
    var blur;
    GameScene.__super__.constructor.apply(this, arguments);
    blur = new PIXI.BlurFilter;
    this.texture = PIXI.Texture.fromImage('/assets/images/canyon_of_ages.jpg');
    this.background = new Sketch(this.texture);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = Configs.desktop.settings.width / 2;
    this.background.position.y = Configs.desktop.settings.height / 2;
    this.background.scale.x = 0.5;
    this.background.scale.y = 0.5;
    this.background.filters = null;
    this.background.addToScene(this);
  }

  GameScene.prototype.update = function(deltaTime) {
    var $;
    $ = this;
    GameScene.__super__.update.call(this, deltaTime);
  };

  return GameScene;

})(Scene);

module.exports = GameScene;


},{"Configs":undefined,"Scene":undefined,"Sketch":undefined,"SystemText":undefined}],"Globals":[function(require,module,exports){
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


},{}],"IntroScene":[function(require,module,exports){
var Configs, IntroScene, Scene, Sketch,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

IntroScene = (function(_super) {
  __extends(IntroScene, _super);

  function IntroScene() {
    var $, blur;
    $ = this;
    IntroScene.__super__.constructor.apply(this, arguments);
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/pursuit_blue.png'), PIXI.Texture.fromImage('/assets/images/pursuit.png')];
    blur = new PIXI.BlurFilter;
    this.background = new Sketch(this.textures[0]);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = Configs.desktop.settings.width / 2;
    this.background.position.y = Configs.desktop.settings.height / 2;
    this.background.filters = [blur];
    this.background.addToScene(this);
    this.logoNoFill = new Sketch(this.textures[1]);
    this.logoNoFill.anchor.x = 0.5;
    this.logoNoFill.anchor.y = 0.5;
    this.logoNoFill.position.x = Configs.desktop.settings.width / 2;
    this.logoNoFill.position.y = Configs.desktop.settings.height / 2;
    this.logoNoFill.scale.x = 0.2;
    this.logoNoFill.scale.y = 0.2;
    this.logoNoFill.alpha = 0.0;
    this.logoNoFill.addToScene(this);
    this.logo = new Sketch(this.textures[2]);
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;
    this.logo.position.x = Configs.desktop.settings.width / 2;
    this.logo.position.y = Configs.desktop.settings.height / 2;
    this.logo.scale.x = 0.2;
    this.logo.scale.y = 0.2;
    this.logo.alpha = 0.0;
    this.logo.addToScene(this);
    new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 9000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.logo.alpha = this.alpha;
      $.logoNoFill.alpha = this.alpha;
    }).onComplete(function() {
      console.log('completed animation');
      $._finish = true;
      $._next = 'lobby';
    }).start();
  }

  IntroScene.prototype.update = function(deltaTime) {
    IntroScene.__super__.update.call(this, deltaTime);
  };

  return IntroScene;

})(Scene);

module.exports = IntroScene;


},{"Configs":undefined,"Scene":undefined,"Sketch":undefined}],"Loader":[function(require,module,exports){
var Background, Globals, Loader, ProgressBar, Sketch, SystemText;

Globals = require('Globals');

Background = require('Background');

Sketch = require('Sketch');

ProgressBar = require('ProgressBar');

SystemText = require('SystemText');

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


},{"Background":undefined,"Globals":undefined,"ProgressBar":undefined,"Sketch":undefined,"SystemText":undefined}],"LobbyScene":[function(require,module,exports){
var Configs, LobbyScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

SystemText = require('SystemText');

LobbyScene = (function(_super) {
  __extends(LobbyScene, _super);

  function LobbyScene() {
    var blur;
    LobbyScene.__super__.constructor.apply(this, arguments);
    blur = new PIXI.BlurFilter;
    this.textures = [PIXI.Texture.fromImage('/assets/images/library_concept.jpg'), PIXI.Texture.fromImage('/assets/images/earth_circle.png')];
    this.background = new Sketch(this.textures[0]);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = Configs.desktop.settings.width / 2;
    this.background.position.y = Configs.desktop.settings.height / 2;
    this.background.filters = [blur];
    this.background.addToScene(this);
    this.logoAngle = 0;
    this.logo = new Sketch(this.textures[1]);
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;
    this.logo.position.x = 50;
    this.logo.position.y = Configs.desktop.settings.height / 2;
    this.logo.scale.x = 0.7;
    this.logo.scale.y = 0.7;
    this.logo.addToScene(this);
    this.buttons = {};
    this.buttons['start'] = new SystemText('Play', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['start'].anchor.y = 0.5;
    this.buttons['start'].position.x = Configs.desktop.settings.width / 2 + 60;
    this.buttons['start'].position.y = 90;
    this.buttons['start'].addToScene(this);
    this.buttons['option'] = new SystemText('Options', {
      font: 'bold 42px Anton',
      align: 'left',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['option'].anchor.y = 0.5;
    this.buttons['option'].position.x = Configs.desktop.settings.width / 2 + 60;
    this.buttons['option'].position.y = 160;
    this.buttons['option'].addToScene(this);
    this.buttons['board'] = new SystemText('LeaderBoards', {
      font: 'bold 42px Anton',
      align: 'left',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['board'].anchor.y = 0.5;
    this.buttons['board'].position.x = Configs.desktop.settings.width / 2 + 60;
    this.buttons['board'].position.y = 230;
    this.buttons['board'].addToScene(this);
  }

  LobbyScene.prototype.update = function(deltaTime) {
    var $;
    $ = this;
    this.buttons['start'].interactive = true;
    this.buttons['start'].mouseover = function(data) {
      $.buttons['start'].scale.x = 1.1;
      $.buttons['start'].scale.y = 1.1;
    };
    this.buttons['start'].mouseout = function(data) {
      $.buttons['start'].scale.x = 1.0;
      $.buttons['start'].scale.y = 1.0;
    };
    this.buttons['start'].mousedown = function(data) {
      $.buttons['start'].scale.x = 0.8;
      $.buttons['start'].scale.y = 0.8;
      $._finish = true;
      $._next = 'game';
    };
    this.buttons['option'].interactive = true;
    this.buttons['option'].mouseover = function(data) {
      $.buttons['option'].scale.x = 1.1;
      $.buttons['option'].scale.y = 1.1;
    };
    this.buttons['option'].mouseout = function(data) {
      $.buttons['option'].scale.x = 1.0;
      $.buttons['option'].scale.y = 1.0;
    };
    this.buttons['option'].mousedown = function(data) {
      $.buttons['option'].scale.x = 0.8;
      $.buttons['option'].scale.y = 0.8;
      $._finish = true;
      $._next = 'option';
    };
    this.buttons['option'].mouseup = function(data) {
      $.buttons['option'].scale.x = 1.0;
      $.buttons['option'].scale.y = 1.0;
    };
    this.buttons['board'].interactive = true;
    this.buttons['board'].mouseover = function(data) {
      $.buttons['board'].scale.x = 1.1;
      $.buttons['board'].scale.y = 1.1;
    };
    this.buttons['board'].mouseout = function(data) {
      $.buttons['board'].scale.x = 1.0;
      $.buttons['board'].scale.y = 1.0;
    };
    if (this.logoAngle >= 360) {
      this.logoAngle = 0;
    }
    this.logoAngle += 0.01;
    this.logo.rotation = this.logoAngle;
    LobbyScene.__super__.update.call(this, deltaTime);
  };

  return LobbyScene;

})(Scene);

module.exports = LobbyScene;


},{"Configs":undefined,"Scene":undefined,"Sketch":undefined,"SystemText":undefined}],"OptionScene":[function(require,module,exports){
var Configs, OptionScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

SystemText = require('SystemText');

OptionScene = (function(_super) {
  __extends(OptionScene, _super);

  function OptionScene() {
    var $;
    $ = this;
    OptionScene.__super__.constructor.apply(this, arguments);
    this.warning = new SystemText('This is the option page', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.warning.anchor.x = 0.5;
    this.warning.anchor.y = 0.5;
    this.warning.position.x = Configs.desktop.settings.width / 2;
    this.warning.position.y = 90;
    this.warning.addToScene(this);
    this.backButton = new SystemText('Back', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.backButton.anchor.y = 0.5;
    this.backButton.position.x = Configs.desktop.settings.width / 2 + 60;
    this.backButton.position.y = Configs.desktop.settings.height / 2 + 120;
    this.backButton.interactive = true;
    this.backButton.addToScene(this);
    this.backButton.mouseover = function(data) {
      $.backButton.scale.x = 1.1;
      $.backButton.scale.y = 1.1;
    };
    this.backButton.mouseout = function(data) {
      $.backButton.scale.x = 1.0;
      $.backButton.scale.y = 1.0;
    };
    this.backButton.mousedown = function(data) {
      $.backButton.scale.x = 0.8;
      $.backButton.scale.y = 0.8;
      $._finish = true;
      $._next = 'lobby';
    };
    this.backButton.mouseup = function(data) {
      $.backButton.scale.x = 1.0;
      $.backButton.scale.y = 1.0;
    };
  }

  OptionScene.prototype.update = function(deltaTime) {
    OptionScene.__super__.update.call(this, deltaTime);
  };

  return OptionScene;

})(Scene);

module.exports = OptionScene;


},{"Configs":undefined,"Scene":undefined,"Sketch":undefined,"SystemText":undefined}],"ProgressBar":[function(require,module,exports){
var ProgressBar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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


},{}],"Scene":[function(require,module,exports){
var Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = (function(_super) {
  __extends(Scene, _super);

  Scene.prototype._finish = false;

  Scene.prototype._next = null;

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
    this._poll(this._finish, this._next);
  };

  Scene.prototype.pause = function() {
    this.paused = true;
  };

  Scene.prototype.resume = function() {
    this.paused = false;
    this._finish = false;
    this._next = null;
  };

  Scene.prototype.isPaused = function() {
    return this.paused;
  };

  return Scene;

})(PIXI.Stage);

module.exports = Scene;


},{}],"Shuffled":[function(require,module,exports){
var Background, BeerPoweredEngine, GameScene, Globals, IntroScene, Loader, LobbyScene, OptionScene, ShuffledApp, Sketch;

Globals = require('Globals');

BeerPoweredEngine = require('BeerPoweredEngine');

Background = require('Background');

Sketch = require('Sketch');

Loader = require('Loader');

IntroScene = require('IntroScene');

LobbyScene = require('LobbyScene');

OptionScene = require('OptionScene');

GameScene = require('GameScene');

ShuffledApp = (function() {
  ShuffledApp.prototype._startup = true;

  ShuffledApp.prototype._mode = Globals.gameModes.onIntro;

  function ShuffledApp(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  ShuffledApp.prototype.sketch = function() {
    var $;
    $ = this;
    this.engine = new BeerPoweredEngine(this.screenWidth, this.screenHeight);
    this.game = this.engine.createScene('game', GameScene, function(finish, scene) {
      if (finish === true) {
        $.engine.goToScene(scene);
      }
    });
    this.lobby = this.engine.createScene('lobby', LobbyScene, function(finish, scene) {
      if (finish === true) {
        $.engine.goToScene(scene);
      }
    });
    this.option = this.engine.createScene('option', OptionScene, function(finish, scene) {
      if (finish === true) {
        $.engine.goToScene(scene);
      }
    });
    this.intro = this.engine.createScene('intro', IntroScene, function(finish, scene) {
      if (finish === true) {
        $.engine.goToScene(scene);
      }
    });
    if (this._startup === true) {
      this.engine.goToScene('intro');
    }
    return true;
  };

  return ShuffledApp;

})();

module.exports = ShuffledApp;


},{"Background":undefined,"BeerPoweredEngine":undefined,"GameScene":undefined,"Globals":undefined,"IntroScene":undefined,"Loader":undefined,"LobbyScene":undefined,"OptionScene":undefined,"Sketch":undefined}],"Sketch":[function(require,module,exports){
var Globals, Scene, Sketch,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Globals = require('Globals');

Scene = require('Scene');

Sketch = require('Sketch');

Sketch = (function(_super) {
  __extends(Sketch, _super);

  function Sketch(texture) {
    this.actions = {};
    this.action = null;
    this.renderPriority = 0;
    Sketch.__super__.constructor.call(this, texture);
  }

  Sketch.prototype.setRenderPriority = function(layer) {
    return this.renderPriority = layer;
  };

  Sketch.prototype.getRenderPriority = function() {
    return this.renderPriority;
  };

  Sketch.prototype.createAction = function(id) {
    var action;
    if (this.actions[id]) {
      return undefined;
    }
    action = new Action;
    this.actions = action;
    return action;
  };

  Sketch.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return Sketch;

})(PIXI.Sprite);

module.exports = Sketch;


},{"Globals":undefined,"Scene":undefined,"Sketch":undefined}],"SystemText":[function(require,module,exports){
var Globals, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Globals = require('Globals');

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


},{"Globals":undefined}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwic2NlbmVzL2JvYXJkc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwic2NlbmVzL2dhbWVzY2VuZS5jb2ZmZWUiLCJnbG9iYWxzLmNvZmZlZSIsInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSIsImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiLCJzY2VuZXMvbG9iYnlzY2VuZS5jb2ZmZWUiLCJzY2VuZXMvb3B0aW9uc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuY29mZmVlIiwic2NlbmUuY29mZmVlIiwic2h1ZmZsZWQuY29mZmVlIiwiZW50aXRpZXMvc2tldGNoLmNvZmZlZSIsImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDMkJ1Qjs7OztBQzNCdkIsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsT0FBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQW5DLENBQUE7QUFBQSxJQUNBLDRDQUFNLE9BQU4sQ0FEQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFJQSxpQkFBQSxHQUFtQixTQUFDLEtBQUQsR0FBQTtXQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLE1BREg7RUFBQSxDQUpuQixDQUFBOztBQUFBLHVCQU9BLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxlQURjO0VBQUEs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ZCxDQUFBOztBQUFBLG1CQW1CQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixDQUFBLENBRFE7RUFBQSxDQW5CWixDQUFBOztnQkFBQTs7R0FEaUIsSUFBSSxDQUFDLE9BTDFCLENBQUE7O0FBQUEsTUE2Qk0sQ0FBQyxPQUFQLEdBQWlCLE1BN0JqQixDQUFBOzs7O0FDQUEsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsR0FBRCxFQUFNLEtBQU4sR0FBQTtBQUNULElBQUEsNENBQU0sR0FBTixFQUFXLEtBQVgsQ0FBQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFHQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixDQUFBLENBRFE7RUFBQSxDQUhaLENBQUE7O29CQUFBOztHQURxQixJQUFJLENBQUMsS0FGOUIsQ0FBQTs7QUFBQSxNQVVNLENBQUMsT0FBUCxHQUFpQixVQVZqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMjIERPIE5PVCBERUxFVEVcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5jbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IEdsb2JhbHMucHJpb3JpdHkuYmFja2dyb3VuZFxuICAgICAgICBzdXBlciB0ZXh0dXJlXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogKGxheWVyKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBsYXllclxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eVxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tncm91bmRcbiIsIlNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5cbmNsYXNzIEJlZXJQb3dlcmVkRW5naW5lXG4gICAgY29uc3RydWN0b3I6IChAd2lkdGgsIEBoZWlnaHQpIC0+XG4gICAgICAgIEBzY2VuZXMgPSB7fVxuICAgICAgICBAc2NlbmUgPSBudWxsXG4gICAgICAgIEBpbml0KClcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIEByZW5kZXJlci52aWV3XG5cbiAgICAgICAgQHN0YXRzID0gbmV3IFN0YXRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHN0YXRzLmRvbUVsZW1lbnRcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBjcmVhdGVTY2VuZTogKGlkLCB0c2NlbmUsIGNhbGxiYWNrKSAtPlxuICAgICAgICB0c2NlbmUgPz0gU2NlbmVcbiAgICAgICAgY2FsbGJhY2sgPz0gLT5cblxuICAgICAgICByZXR1cm4gYHVuZGVmaW5lZGAgaWYgQHNjZW5lc1tpZF1cblxuICAgICAgICBzY2VuZSA9IG5ldyB0c2NlbmVcbiAgICAgICAgc2NlbmUub25VcGRhdGUgY2FsbGJhY2tcbiAgICAgICAgQHNjZW5lc1tpZF0gPSBzY2VuZVxuICAgICAgICBzY2VuZVxuXG4gICAgZ29Ub1NjZW5lOiAoaWQpIC0+XG4gICAgICAgIGlmIEBzY2VuZXNbaWRdP1xuICAgICAgICAgICAgQHNjZW5lPy5wYXVzZSgpXG4gICAgICAgICAgICBAc2NlbmUgPSBAc2NlbmVzW2lkXVxuICAgICAgICAgICAgQHNjZW5lLnJlc3VtZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBmYWxzZVxuXG4gICAgYW5pbWF0ZTogKGRlbHRhVGltZSkgPT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBhbmltYXRlXG5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAc2NlbmU/IG9yIEBzY2VuZS5pc1BhdXNlZCgpXG5cbiAgICAgICAgQHN0YXRzLmJlZ2luKClcbiAgICAgICAgQHNjZW5lLnVwZGF0ZSBkZWx0YVRpbWVcbiAgICAgICAgQHJlbmRlcmVyLnJlbmRlciBAc2NlbmVcbiAgICAgICAgQHN0YXRzLmVuZCgpXG5cbiAgICAgICAgVFdFRU4udXBkYXRlIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCZWVyUG93ZXJlZEVuZ2luZVxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgQm9hcmRTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHdhcm5pbmcgPSBuZXcgU3lzdGVtVGV4dCAnVGhpcyBpcyB0aGUgbGVhZGVyYm9hcmQgcGFnZScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHdhcm5pbmcuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQHdhcm5pbmcuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQHdhcm5pbmcucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQHdhcm5pbmcucG9zaXRpb24ueSA9IDkwXG4gICAgICAgIEB3YXJuaW5nLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBiYWNrQnV0dG9uID0gbmV3IFN5c3RlbVRleHQgJ0JhY2snLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBiYWNrQnV0dG9uLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgNjBcbiAgICAgICAgQGJhY2tCdXR0b24ucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyICsgMTIwXG4gICAgICAgIEBiYWNrQnV0dG9uLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYmFja0J1dHRvbi5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdnYW1lJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQnV0dG9uQWN0aXZlU3RhdGUgPVxuICAgIGluYWN0aXZlOiAwXG4gICAgYWN0aXZlOiAxXG5cbkJ1dHRvbk1vZGUgPVxuICAgIGZvY3VzOiAxXG4gICAgY2xpY2s6IDBcbiAgICBob3ZlcjogNVxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAoQHRleHR1cmVPbiwgQHRleHR1cmVPZmYsIEB0ZXh0dXJlUHJlc3MpIC0+XG4gICAgICAgIHN1cGVyIEB0ZXh0dXJlT25cbiAgICAgICAgQGlzUHJlc3MgPSBmYWxzZVxuICAgICAgICBAbW9kZSA9IEJ1dHRvbk1vZGUuZm9jdXNcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgaWYgQGlzUHJlc1xuICAgICAgICAgICAgaWYgQG1vZGUgaXMgQnV0dG9uTW9kZS5jbGlja1xuICAgICAgICAgICAgICAgIEBzZXRUZXh0dXJlIEB0ZXh0dXJlUHJlc3NcbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzczogLT5cbiAgICAgICAgQGlzUHJlc3MgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0Qm91bmRpbmdCb3g6IC0+XG4gICAgICAgIEBnZXRCb3VuZHNcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBkZXNrdG9wOlxuICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgIHdpZHRoOiA4MDBcbiAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgZmlsbDogJydcbiAgICBwaG9uZXM6XG4gICAgICAgIGFuZHJvaWQ6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIHdpbmRvd3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MDBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICB0YWJsZXRzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMjRcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDc2OFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICBpb3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcblxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXJcbiAgICAgICAgYmx1ciA9IG5ldyBQSVhJLkJsdXJGaWx0ZXJcblxuICAgICAgICBAdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2Nhbnlvbl9vZl9hZ2VzLmpwZydcbiAgICAgICAgQGJhY2tncm91bmQgPSBuZXcgU2tldGNoIEB0ZXh0dXJlXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5zY2FsZS54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnNjYWxlLnkgPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQuZmlsdGVycyA9IG51bGxcbiAgICAgICAgQGJhY2tncm91bmQuYWRkVG9TY2VuZSBAXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVTY2VuZVxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIGdhbWVNb2RlczpcbiAgICAgICAgb25JbnRybzogMlxuICAgICAgICBvbkxvYmJ5OiA0XG4gICAgICAgIG9uR2FtZTogNlxuICAgICAgICBvblBhdXNlOiA4XG4gICAgICAgIG9uT3B0aW9uczogMTBcbiAgICAgICAgb25FbmQ6IDEyXG4gICAgcHJpb3JpdHk6XG4gICAgICAgIGJhY2tncm91bmQ6IDEwXG4gICAgICAgIG5vcm1hbDogNTBcbiAgICAgICAgb3ZlcmxheTogNjBcbiAgICAgICAgYmFubmVyOiA3NVxuICAgICAgICBhYm92ZTogMTAwXG4gICAgICAgIG1heDogOTk5XG4gICAgdGV4dHVyZUluZGV4OlxuICAgICAgICBnYW1lX2xvZ286IDFcbiAgICAgICAgYmFja2dyb3VuZF8xOiAyXG4gICAgICAgIGJhY2tncm91bmRfMjogM1xuICAgICAgICBiYWNrZ3JvdW5kXzM6IDRcbiAgICAgICAgYmFja2dyb3VuZF80OiA1XG4gICAgICAgIGJhY2tncm91bmRfNjogNlxuICAgICAgICBidXR0b25fc3RhcnQ6IDdcbiAgICAgICAgYnV0dG9uX3BsYXk6IDhcbiAgICAgICAgYnV0dG9uX29wdGlvbnM6IDlcbiAgICAgICAgYnV0dG9uX2V4aXQ6IDEwXG4gICAgICAgIGJ1dHRvbl9zb3VuZHM6IDExXG4gICAgICAgIGJ1dHRvbl9pbmZvOiAxMlxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5cbmNsYXNzIEludHJvU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIHN1cGVyXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xvc3Rfa2lkc19jb250ZXN0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXRfYmx1ZS5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0LnBuZydcbiAgICAgICAgXVxuXG4gICAgICAgIGJsdXIgPSBuZXcgUElYSS5CbHVyRmlsdGVyXG5cbiAgICAgICAgQGJhY2tncm91bmQgPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1swXVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQuZmlsdGVycyA9IFtibHVyXVxuICAgICAgICBAYmFja2dyb3VuZC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nb05vRmlsbCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nb05vRmlsbC5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGxvZ28gPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1syXVxuICAgICAgICBAbG9nby5hbmNob3IueCA9IDAuNVxuICAgICAgICBAbG9nby5hbmNob3IueSA9IDAuNVxuICAgICAgICBAbG9nby5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAbG9nby5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGxvZ28uc2NhbGUueCA9IDAuMlxuICAgICAgICBAbG9nby5zY2FsZS55ID0gMC4yXG4gICAgICAgIEBsb2dvLmFscGhhID0gMC4wXG4gICAgICAgIEBsb2dvLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgLCA5MDAwKS5yZXBlYXQoMSkuZGVsYXkoMTAwMCkueW95byh0cnVlKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuSW5PdXQpLm9uVXBkYXRlKCAtPlxuICAgICAgICAgICAgJC5sb2dvLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICAkLmxvZ29Ob0ZpbGwuYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLm9uQ29tcGxldGUoIC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnY29tcGxldGVkIGFuaW1hdGlvbidcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnbG9iYnknXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5zdGFydCgpXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRyb1NjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmFja2dyb3VuZCA9IHJlcXVpcmUgJ0JhY2tncm91bmQnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5Qcm9ncmVzc0JhciA9IHJlcXVpcmUgJ1Byb2dyZXNzQmFyJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIExvYWRlclxuICAgIGNvbnN0cnVjdG9yOiAoQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0LCBAc3RhZ2UpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQHRhc2tzRG9uZSA9IGZhbHNlXG4gICAgICAgIEB0YXNrc0NvdW50ID0gMFxuICAgICAgICBAdGFza3NDb21wbGV0ZWQgPSAwXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueCA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBzdGFydEJ1dHRvbi5wb3NpdGlvbi55ID0gQHNjcmVlbldpZHRoIC8gMiArIDkwXG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbHBoYSA9IDAuMFxuICAgICAgICBAc3RhcnRCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLnRyYWRlT2ZmID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5jbGljayA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrZ3JvdW5kLmZpbHRlcnMgPSBbJC5teUZpbHRlcl1cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAc3RhcnRCdXR0b24udG91Y2hzdGFydCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaGVuZCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50YXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5hZGRUb1N0YWdlIEBzdGFnZVxuXG4gICAgICAgIEBsb2FkU291bmQgPSBuZXcgSG93bFxuICAgICAgICAgICAgdXJsczogWycvYXNzZXRzL3NvdW5kcy9mbG9fcmlkYS5tcDMnXVxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlXG4gICAgICAgICAgICBsb29wOiB0cnVlXG4gICAgICAgICAgICBvbmxvYWQ6IC0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2ZpbmlzaGVkIGxvYWRpbmcgc291bmQnXG5cbiAgICB0YXNrVG9Mb2FkOiAoY291bnQpIC0+XG4gICAgICAgIEB0YXNrc0NvdW50ID0gY291bnRcblxuICAgIGFkZFRvRmluaXNoZWRUYXNrOiAoKSAtPlxuICAgICAgICBpZiBub3QgQHRhc2tzQ291bnQgaXMgQHRhc2tzQ29tcGxldGVkXG4gICAgICAgICAgICBAdGFza3NDb21wbGV0ZWQgKz0gMVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAdGFza3NEb25lID0gdHJ1ZVxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXJcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIExvYmJ5U2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBibHVyID0gbmV3IFBJWEkuQmx1ckZpbHRlclxuXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xpYnJhcnlfY29uY2VwdC5qcGcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9lYXJ0aF9jaXJjbGUucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgQGJhY2tncm91bmQgPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1swXVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQuZmlsdGVycyA9IFtibHVyXVxuICAgICAgICBAYmFja2dyb3VuZC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nb0FuZ2xlID0gMFxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSA1MFxuICAgICAgICBAbG9nby5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGxvZ28uc2NhbGUueCA9IDAuN1xuICAgICAgICBAbG9nby5zY2FsZS55ID0gMC43XG4gICAgICAgIEBsb2dvLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zID0ge31cblxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXSA9IG5ldyBTeXN0ZW1UZXh0ICdQbGF5JyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10gPSBuZXcgU3lzdGVtVGV4dCAnT3B0aW9ucycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyA2MFxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueSA9IDE2MFxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10gPSBuZXcgU3lzdGVtVGV4dCAnTGVhZGVyQm9hcmRzJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyA2MFxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5wb3NpdGlvbi55ID0gMjMwXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgICMjZWxlbWVudHMgPSBbXG4gICAgICAgICMjICAgIEBidXR0b25zWydpbnRybyddXG4gICAgICAgICMjICAgIEBidXR0b25zWydnYW1lJ11cbiAgICAgICAgIyMgICAgQGJ1dHRvbnNbJ29wdGlvbiddXG4gICAgICAgICMjXVxuXG4gICAgICAgICMjZm9yIGUsIGkgaW4gZWxlbWVudHNcbiAgICAgICAgIyMgICAgZS5tb3VzZW92ZXIgPSAoZGF0YSkgPT5cbiAgICAgICAgIyMgICAgICAgIGUuc2NhbGUueCA9IDEuMVxuICAgICAgICAjIyAgICAgICAgZS5zY2FsZS55ID0gMS4xXG4gICAgICAgICMjICAgICAgICByZXR1cm5cbiAgICAgICAgIyMgICAgZS5tb3VzZW91dCA9IChkYXRhKSA9PlxuICAgICAgICAjIyAgICAgICAgZS5zY2FsZS54ID0gMS4wXG4gICAgICAgICMjICAgICAgICBlLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgIyMgICAgICAgIHJldHVyblxuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAwLjhcbiAgICAgICAgIyMgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgIyMgICAgcmV0dXJuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaGVuZCA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICByZXR1cm5cbiAgICAgICAgIyNAc3RhcnRCdXR0b24udGFwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgICMjIFRPRE86IG5lZWQgdG8gbWluaW1pemUgY29kZVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnZ2FtZSdcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnb3B0aW9uJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGxvZ29BbmdsZSA9IDAgaWYgQGxvZ29BbmdsZSA+PSAzNjBcbiAgICAgICAgQGxvZ29BbmdsZSArPSAwLjAxXG4gICAgICAgIEBsb2dvLnJvdGF0aW9uID0gQGxvZ29BbmdsZVxuXG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2JieVNjZW5lXG4iLCJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblN5c3RlbVRleHQgPSByZXF1aXJlICdTeXN0ZW1UZXh0J1xuXG5jbGFzcyBPcHRpb25TY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHdhcm5pbmcgPSBuZXcgU3lzdGVtVGV4dCAnVGhpcyBpcyB0aGUgb3B0aW9uIHBhZ2UnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci54ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci55ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAd2FybmluZy5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbiA9IG5ldyBTeXN0ZW1UZXh0ICdCYWNrJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYmFja0J1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMiArIDEyMFxuICAgICAgICBAYmFja0J1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJhY2tCdXR0b24uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnbG9iYnknXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvblNjZW5lXG4iLCJjbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlQmxhbmssIHRleHR1cmVGdWxsKSAtPlxuICAgICAgICBzdXBlciB0ZXh0dXJlQmxhbmtcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzZXR0aW5nczogKG9wdHMpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyXG4iLCJjbGFzcyBTY2VuZSBleHRlbmRzIFBJWEkuU3RhZ2VcbiAgICBfZmluaXNoOiBmYWxzZVxuICAgIF9uZXh0OiBudWxsXG4gICAgX3BvbGw6IChkYXRhKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGNvbnN0cnVjdG9yOiAoYmFja2dyb3VuZCkgLT5cbiAgICAgICAgYmFja2dyb3VuZCA/PSAweDAwMDAwMFxuXG4gICAgICAgIEBwYXVzZWQgPSBmYWxzZVxuICAgICAgICBzdXBlciBiYWNrZ3JvdW5kXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIEBfcG9sbCBAX2ZpbmlzaCwgQF9uZXh0XG4gICAgICAgIHJldHVyblxuXG4gICAgcGF1c2U6IC0+XG4gICAgICAgIEBwYXVzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzdW1lOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcblxuICAgICAgICBAX2ZpbmlzaCA9IGZhbHNlXG4gICAgICAgIEBfbmV4dCA9IG51bGxcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmVlclBvd2VyZWRFbmdpbmUgPSByZXF1aXJlICdCZWVyUG93ZXJlZEVuZ2luZSdcbkJhY2tncm91bmQgPSByZXF1aXJlICdCYWNrZ3JvdW5kJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuTG9hZGVyID0gcmVxdWlyZSAnTG9hZGVyJ1xuXG4jIEN1cnJlbnQgU2NlbmVzXG5JbnRyb1NjZW5lID0gcmVxdWlyZSAnSW50cm9TY2VuZSdcbkxvYmJ5U2NlbmUgPSByZXF1aXJlICdMb2JieVNjZW5lJ1xuT3B0aW9uU2NlbmUgPSByZXF1aXJlICdPcHRpb25TY2VuZSdcbkdhbWVTY2VuZSA9IHJlcXVpcmUgJ0dhbWVTY2VuZSdcblxuIyBTaHVmZmxlZEFwcFxuIyBUaGUgbWFpbiBlbnRyeSBwb2ludCBvZiB0aGUgYXBwXG5jbGFzcyBTaHVmZmxlZEFwcFxuICAgIF9zdGFydHVwOiB0cnVlLFxuICAgIF9tb2RlOiBHbG9iYWxzLmdhbWVNb2Rlcy5vbkludHJvLFxuICAgIGNvbnN0cnVjdG9yOiAoQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0KSAtPlxuXG4gICAgc2tldGNoOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEBlbmdpbmUgPSBuZXcgQmVlclBvd2VyZWRFbmdpbmUgQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgQGdhbWUgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdnYW1lJywgR2FtZVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGxvYmJ5ID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnbG9iYnknLCBMb2JieVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQG9wdGlvbiA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ29wdGlvbicsIE9wdGlvblNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGludHJvID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnaW50cm8nLCBJbnRyb1NjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAZW5naW5lLmdvVG9TY2VuZSAnaW50cm8nIGlmIEBfc3RhcnR1cCBpcyB0cnVlXG5cbiAgICAgICAgdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNodWZmbGVkQXBwXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblxuY2xhc3MgU2tldGNoIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEBhY3Rpb25zID0ge31cbiAgICAgICAgQGFjdGlvbiA9IG51bGxcbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gMFxuICAgICAgICBzdXBlciB0ZXh0dXJlXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogKGxheWVyKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBsYXllclxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eVxuXG4gICAgY3JlYXRlQWN0aW9uOiAoaWQpIC0+XG4gICAgICAgIHJldHVybiBgdW5kZWZpbmVkYCBpZiBAYWN0aW9uc1tpZF1cblxuICAgICAgICBhY3Rpb24gPSBuZXcgQWN0aW9uXG4gICAgICAgIEBhY3Rpb25zID0gYWN0aW9uXG4gICAgICAgIGFjdGlvblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNrZXRjaFxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cbmNsYXNzIFN5c3RlbVRleHQgZXh0ZW5kcyBQSVhJLlRleHRcbiAgICBjb25zdHJ1Y3RvcjogKG1zZywgc3R5bGUpIC0+XG4gICAgICAgIHN1cGVyIG1zZywgc3R5bGVcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBTeXN0ZW1UZXh0XG4iXX0=
