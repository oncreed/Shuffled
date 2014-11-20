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
    this.background.scale.x = 0.8;
    this.background.scale.y = 0.8;
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
    var $, blur, pixi, technologies;
    $ = this;
    IntroScene.__super__.constructor.apply(this, arguments);
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/pursuit_blue.png'), PIXI.Texture.fromImage('/assets/images/pursuit.png'), PIXI.Texture.fromImage('/assets/images/html5_logo.png'), PIXI.Texture.fromImage('/assets/images/pixi_logo.png')];
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
    this.tech = new Sketch(this.textures[3]);
    this.tech.anchor.x = 0.5;
    this.tech.anchor.y = 0.5;
    this.tech.position.x = Configs.desktop.settings.width / 2;
    this.tech.position.y = Configs.desktop.settings.height / 2;
    this.tech.scale.x = 0.7;
    this.tech.scale.y = 0.7;
    this.tech.alpha = 0.0;
    this.tech.addToScene(this);
    this.htmlBackground = new PIXI.Graphics;
    this.htmlBackground.beginFill(0x101228);
    this.htmlBackground.drawRect(0, 0, Configs.desktop.settings.width, Configs.desktop.settings.height);
    this.htmlBackground.endFill();
    this.htmlBackground.alpha = 0.0;
    this.addChild(this.htmlBackground);
    this.html = new Sketch(this.textures[4]);
    this.html.anchor.x = 0.5;
    this.html.anchor.y = 0.5;
    this.html.position.x = Configs.desktop.settings.width / 2;
    this.html.position.y = Configs.desktop.settings.height / 2;
    this.html.scale.x = 0.7;
    this.html.scale.y = 0.7;
    this.html.alpha = 0.0;
    this.html.addToScene(this);
    pixi = new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.html.alpha = this.alpha;
      $.htmlBackground.alpha = this.alpha;
    }).onComplete(function() {
      console.log('completed animation');
      $._finish = true;
      $._next = 'lobby';
    });
    technologies = new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.tech.alpha = this.alpha;
    }).chain(pixi);
    new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
      $.logo.alpha = this.alpha;
      $.logoNoFill.alpha = this.alpha;
    }).chain(technologies).start();
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
    this.logo.position.x = 70;
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
    this.buttons['start'].position.x = Configs.desktop.settings.width / 2 - 10;
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
    this.buttons['option'].position.x = Configs.desktop.settings.width / 2;
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
    this.buttons['board'].position.x = Configs.desktop.settings.width / 2 + 10;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwic2NlbmVzL2JvYXJkc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwic2NlbmVzL2dhbWVzY2VuZS5jb2ZmZWUiLCJnbG9iYWxzLmNvZmZlZSIsInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSIsImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiLCJzY2VuZXMvbG9iYnlzY2VuZS5jb2ZmZWUiLCJzY2VuZXMvb3B0aW9uc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuY29mZmVlIiwic2NlbmUuY29mZmVlIiwic2h1ZmZsZWQuY29mZmVlIiwiZW50aXRpZXMvc2tldGNoLmNvZmZlZSIsImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDMkJ1Qjs7OztBQzNCdkIsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsT0FBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQW5DLENBQUE7QUFBQSxJQUNBLDRDQUFNLE9BQU4sQ0FEQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFJQSxpQkFBQSxHQUFtQixTQUFDLEtBQUQsR0FBQTtXQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLE1BREg7RUFBQSxDQUpuQixDQUFBOztBQUFBLHVCQU9BLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxlQURjO0VBQUEs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QUEsTUFGVCxDQUFBO0FBQUEsSUFHQSxJQUFDLENBQUEsT0FBRCxHQUFXLE1BSFgsQ0FBQTtXQUlBLE9BTFU7RUFBQSxDQVpkLENBQUE7O0FBQUEsbUJBbUJBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNSLElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmLENBQUEsQ0FEUTtFQUFBLENBbkJaLENBQUE7O2dCQUFBOztHQURpQixJQUFJLENBQUMsT0FMMUIsQ0FBQTs7QUFBQSxNQTZCTSxDQUFDLE9BQVAsR0FBaUIsTUE3QmpCLENBQUE7Ozs7QUNBQSxJQUFBLG1CQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLCtCQUFBLENBQUE7O0FBQWEsRUFBQSxvQkFBQyxHQUFELEVBQU0sS0FBTixHQUFBO0FBQ1QsSUFBQSw0Q0FBTSxHQUFOLEVBQVcsS0FBWCxDQUFBLENBRFM7RUFBQSxDQUFiOztBQUFBLHVCQUdBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNSLElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmLENBQUEsQ0FEUTtFQUFBLENBSFosQ0FBQTs7b0JBQUE7O0dBRHFCLElBQUksQ0FBQyxLQUY5QixDQUFBOztBQUFBLE1BVU0sQ0FBQyxPQUFQLEdBQWlCLFVBVmpCLENBQUEiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyMgRE8gTk9UIERFTEVURVxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cbmNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZSkgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gR2xvYmFscy5wcmlvcml0eS5iYWNrZ3JvdW5kXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQmFja2dyb3VuZFxuIiwiU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblxuY2xhc3MgQmVlclBvd2VyZWRFbmdpbmVcbiAgICBjb25zdHJ1Y3RvcjogKEB3aWR0aCwgQGhlaWdodCkgLT5cbiAgICAgICAgQHNjZW5lcyA9IHt9XG4gICAgICAgIEBzY2VuZSA9IG51bGxcbiAgICAgICAgQGluaXQoKVxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIgQHdpZHRoLCBAaGVpZ2h0XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHJlbmRlcmVyLnZpZXdcblxuICAgICAgICBAc3RhdHMgPSBuZXcgU3RhdHNcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBAc3RhdHMuZG9tRWxlbWVudFxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZVxuICAgICAgICByZXR1cm5cblxuICAgIGNyZWF0ZVNjZW5lOiAoaWQsIHRzY2VuZSwgY2FsbGJhY2spIC0+XG4gICAgICAgIHRzY2VuZSA/PSBTY2VuZVxuICAgICAgICBjYWxsYmFjayA/PSAtPlxuXG4gICAgICAgIHJldHVybiBgdW5kZWZpbmVkYCBpZiBAc2NlbmVzW2lkXVxuXG4gICAgICAgIHNjZW5lID0gbmV3IHRzY2VuZVxuICAgICAgICBzY2VuZS5vblVwZGF0ZSBjYWxsYmFja1xuICAgICAgICBAc2NlbmVzW2lkXSA9IHNjZW5lXG4gICAgICAgIHNjZW5lXG5cbiAgICBnb1RvU2NlbmU6IChpZCkgLT5cbiAgICAgICAgaWYgQHNjZW5lc1tpZF0/XG4gICAgICAgICAgICBAc2NlbmU/LnBhdXNlKClcbiAgICAgICAgICAgIEBzY2VuZSA9IEBzY2VuZXNbaWRdXG4gICAgICAgICAgICBAc2NlbmUucmVzdW1lKClcbiAgICAgICAgICAgIHJldHVybiB0cnVlXG4gICAgICAgIGZhbHNlXG5cbiAgICBhbmltYXRlOiAoZGVsdGFUaW1lKSA9PlxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGVcblxuICAgICAgICByZXR1cm4gaWYgbm90IEBzY2VuZT8gb3IgQHNjZW5lLmlzUGF1c2VkKClcblxuICAgICAgICBAc3RhdHMuYmVnaW4oKVxuICAgICAgICBAc2NlbmUudXBkYXRlIGRlbHRhVGltZVxuICAgICAgICBAcmVuZGVyZXIucmVuZGVyIEBzY2VuZVxuICAgICAgICBAc3RhdHMuZW5kKClcblxuICAgICAgICBUV0VFTi51cGRhdGUgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJlZXJQb3dlcmVkRW5naW5lXG4iLCJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblN5c3RlbVRleHQgPSByZXF1aXJlICdTeXN0ZW1UZXh0J1xuXG5jbGFzcyBCb2FyZFNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBzdXBlclxuICAgICAgICBAd2FybmluZyA9IG5ldyBTeXN0ZW1UZXh0ICdUaGlzIGlzIHRoZSBsZWFkZXJib2FyZCBwYWdlJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueCA9IDAuNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueSA9IDAuNVxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi55ID0gOTBcbiAgICAgICAgQHdhcm5pbmcuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnQmFjaycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJhY2tCdXR0b24uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tCdXR0b24ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyA2MFxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDIgKyAxMjBcbiAgICAgICAgQGJhY2tCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBiYWNrQnV0dG9uLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAwLjhcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ2dhbWUnXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJvYXJkU2NlbmVcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5CdXR0b25BY3RpdmVTdGF0ZSA9XG4gICAgaW5hY3RpdmU6IDBcbiAgICBhY3RpdmU6IDFcblxuQnV0dG9uTW9kZSA9XG4gICAgZm9jdXM6IDFcbiAgICBjbGljazogMFxuICAgIGhvdmVyOiA1XG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6IChAdGV4dHVyZU9uLCBAdGV4dHVyZU9mZiwgQHRleHR1cmVQcmVzcykgLT5cbiAgICAgICAgc3VwZXIgQHRleHR1cmVPblxuICAgICAgICBAaXNQcmVzcyA9IGZhbHNlXG4gICAgICAgIEBtb2RlID0gQnV0dG9uTW9kZS5mb2N1c1xuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBpZiBAaXNQcmVzXG4gICAgICAgICAgICBpZiBAbW9kZSBpcyBCdXR0b25Nb2RlLmNsaWNrXG4gICAgICAgICAgICAgICAgQHNldFRleHR1cmUgQHRleHR1cmVQcmVzc1xuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzOiAtPlxuICAgICAgICBAaXNQcmVzcyA9IHRydWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRCb3VuZGluZ0JveDogLT5cbiAgICAgICAgQGdldEJvdW5kc1xuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblxuIiwibW9kdWxlLmV4cG9ydHMgPVxuICAgIGRlc2t0b3A6XG4gICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgaGVpZ2h0OiA2MDBcbiAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICBmaWxsOiAnJ1xuICAgIHBob25lczpcbiAgICAgICAgYW5kcm9pZDpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiA0ODBcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMyMFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICBpb3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgd2luZG93czpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiA4MDBcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDYwMFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgIHRhYmxldHM6XG4gICAgICAgIGFuZHJvaWQ6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogMTAyNFxuICAgICAgICAgICAgICAgIGhlaWdodDogNzY4XG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIGlvczpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiA0ODBcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMyMFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuXG4iLCJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblN5c3RlbVRleHQgPSByZXF1aXJlICdTeXN0ZW1UZXh0J1xuXG5jbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBibHVyID0gbmV3IFBJWEkuQmx1ckZpbHRlclxuXG4gICAgICAgIEB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvY2FueW9uX29mX2FnZXMuanBnJ1xuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVcbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnNjYWxlLnggPSAwLjhcbiAgICAgICAgQGJhY2tncm91bmQuc2NhbGUueSA9IDAuOFxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gbnVsbFxuICAgICAgICBAYmFja2dyb3VuZC5hZGRUb1NjZW5lIEBcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZVNjZW5lXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgZ2FtZU1vZGVzOlxuICAgICAgICBvbkludHJvOiAyXG4gICAgICAgIG9uTG9iYnk6IDRcbiAgICAgICAgb25HYW1lOiA2XG4gICAgICAgIG9uUGF1c2U6IDhcbiAgICAgICAgb25PcHRpb25zOiAxMFxuICAgICAgICBvbkVuZDogMTJcbiAgICBwcmlvcml0eTpcbiAgICAgICAgYmFja2dyb3VuZDogMTBcbiAgICAgICAgbm9ybWFsOiA1MFxuICAgICAgICBvdmVybGF5OiA2MFxuICAgICAgICBiYW5uZXI6IDc1XG4gICAgICAgIGFib3ZlOiAxMDBcbiAgICAgICAgbWF4OiA5OTlcbiAgICB0ZXh0dXJlSW5kZXg6XG4gICAgICAgIGdhbWVfbG9nbzogMVxuICAgICAgICBiYWNrZ3JvdW5kXzE6IDJcbiAgICAgICAgYmFja2dyb3VuZF8yOiAzXG4gICAgICAgIGJhY2tncm91bmRfMzogNFxuICAgICAgICBiYWNrZ3JvdW5kXzQ6IDVcbiAgICAgICAgYmFja2dyb3VuZF82OiA2XG4gICAgICAgIGJ1dHRvbl9zdGFydDogN1xuICAgICAgICBidXR0b25fcGxheTogOFxuICAgICAgICBidXR0b25fb3B0aW9uczogOVxuICAgICAgICBidXR0b25fZXhpdDogMTBcbiAgICAgICAgYnV0dG9uX3NvdW5kczogMTFcbiAgICAgICAgYnV0dG9uX2luZm86IDEyXG4iLCJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblxuY2xhc3MgSW50cm9TY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbG9zdF9raWRzX2NvbnRlc3QuanBnJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdF9ibHVlLnBuZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXQucG5nJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvaHRtbDVfbG9nby5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9waXhpX2xvZ28ucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgYmx1ciA9IG5ldyBQSVhJLkJsdXJGaWx0ZXJcblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gW2JsdXJdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvTm9GaWxsID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5hbHBoYSA9IDAuMFxuICAgICAgICBAbG9nb05vRmlsbC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzJdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQHRlY2ggPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1szXVxuICAgICAgICBAdGVjaC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAdGVjaC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAdGVjaC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAdGVjaC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQHRlY2guc2NhbGUueCA9IDAuN1xuICAgICAgICBAdGVjaC5zY2FsZS55ID0gMC43XG4gICAgICAgIEB0ZWNoLmFscGhhID0gMC4wXG4gICAgICAgIEB0ZWNoLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBodG1sQmFja2dyb3VuZCA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgIEBodG1sQmFja2dyb3VuZC5iZWdpbkZpbGwoMHgxMDEyMjgpXG4gICAgICAgIEBodG1sQmFja2dyb3VuZC5kcmF3UmVjdCAwLCAwLFxuICAgICAgICAgICAgQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoLFxuICAgICAgICAgICAgQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodFxuICAgICAgICBAaHRtbEJhY2tncm91bmQuZW5kRmlsbCgpXG4gICAgICAgIEBodG1sQmFja2dyb3VuZC5hbHBoYSA9IDAuMFxuICAgICAgICBAYWRkQ2hpbGQgQGh0bWxCYWNrZ3JvdW5kXG5cbiAgICAgICAgQGh0bWwgPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1s0XVxuICAgICAgICBAaHRtbC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAaHRtbC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAaHRtbC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAaHRtbC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGh0bWwuc2NhbGUueCA9IDAuN1xuICAgICAgICBAaHRtbC5zY2FsZS55ID0gMC43XG4gICAgICAgIEBodG1sLmFscGhhID0gMC4wXG4gICAgICAgIEBodG1sLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIHBpeGkgPSBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgNDAwMCkucmVwZWF0KDEpLmRlbGF5KDEwMDApLnlveW8odHJ1ZSkuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLkluT3V0KS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQuaHRtbC5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgJC5odG1sQmFja2dyb3VuZC5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICkub25Db21wbGV0ZSggLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdjb21wbGV0ZWQgYW5pbWF0aW9uJ1xuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdsb2JieSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApXG5cbiAgICAgICAgdGVjaG5vbG9naWVzID0gbmV3IFRXRUVOLlR3ZWVuKFxuICAgICAgICAgICAgYWxwaGE6IDAuMFxuICAgICAgICApLnRvKFxuICAgICAgICAgICAgYWxwaGE6IDEuMFxuICAgICAgICAsIDQwMDApLnJlcGVhdCgxKS5kZWxheSgxMDAwKS55b3lvKHRydWUpLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5Jbk91dCkub25VcGRhdGUoIC0+XG4gICAgICAgICAgICAkLnRlY2guYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLmNoYWluKHBpeGkpXG5cblxuICAgICAgICBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgNDAwMCkucmVwZWF0KDEpLmRlbGF5KDEwMDApLnlveW8odHJ1ZSkuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLkluT3V0KS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQubG9nby5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgJC5sb2dvTm9GaWxsLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5jaGFpbih0ZWNobm9sb2dpZXMpLnN0YXJ0KClcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEludHJvU2NlbmVcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnQmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblByb2dyZXNzQmFyID0gcmVxdWlyZSAnUHJvZ3Jlc3NCYXInXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9hZGVyXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGFza3NEb25lID0gZmFsc2VcbiAgICAgICAgQHRhc2tzQ291bnQgPSAwXG4gICAgICAgIEB0YXNrc0NvbXBsZXRlZCA9IDBcblxuICAgICAgICBAc3RhcnRCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnUGxheScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24ucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgOTBcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFscGhhID0gMC4wXG4gICAgICAgIEBzdGFydEJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcblxuICAgICAgICBAc3RhcnRCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQudHJhZGVPZmYgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tncm91bmQuZmlsdGVycyA9IFskLm15RmlsdGVyXVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRvdWNoZW5kID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFkZFRvU3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQGxvYWRTb3VuZCA9IG5ldyBIb3dsXG4gICAgICAgICAgICB1cmxzOiBbJy9hc3NldHMvc291bmRzL2Zsb19yaWRhLm1wMyddXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2VcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgICAgIG9ubG9hZDogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZmluaXNoZWQgbG9hZGluZyBzb3VuZCdcblxuICAgIHRhc2tUb0xvYWQ6IChjb3VudCkgLT5cbiAgICAgICAgQHRhc2tzQ291bnQgPSBjb3VudFxuXG4gICAgYWRkVG9GaW5pc2hlZFRhc2s6ICgpIC0+XG4gICAgICAgIGlmIG5vdCBAdGFza3NDb3VudCBpcyBAdGFza3NDb21wbGV0ZWRcbiAgICAgICAgICAgIEB0YXNrc0NvbXBsZXRlZCArPSAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXNrc0RvbmUgPSB0cnVlXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlclxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9iYnlTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIGJsdXIgPSBuZXcgUElYSS5CbHVyRmlsdGVyXG5cbiAgICAgICAgQHRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbGlicmFyeV9jb25jZXB0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2VhcnRoX2NpcmNsZS5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gW2JsdXJdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvQW5nbGUgPSAwXG4gICAgICAgIEBsb2dvID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ28uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ28uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ28ucG9zaXRpb24ueCA9IDcwXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC43XG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjdcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnMgPSB7fVxuXG4gICAgICAgIEBidXR0b25zWydzdGFydCddID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydzdGFydCddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyIC0gMTBcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ucG9zaXRpb24ueSA9IDkwXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXSA9IG5ldyBTeXN0ZW1UZXh0ICdPcHRpb25zJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueSA9IDE2MFxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10gPSBuZXcgU3lzdGVtVGV4dCAnTGVhZGVyQm9hcmRzJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyAxMFxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5wb3NpdGlvbi55ID0gMjMwXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgICMjZWxlbWVudHMgPSBbXG4gICAgICAgICMjICAgIEBidXR0b25zWydpbnRybyddXG4gICAgICAgICMjICAgIEBidXR0b25zWydnYW1lJ11cbiAgICAgICAgIyMgICAgQGJ1dHRvbnNbJ29wdGlvbiddXG4gICAgICAgICMjXVxuXG4gICAgICAgICMjZm9yIGUsIGkgaW4gZWxlbWVudHNcbiAgICAgICAgIyMgICAgZS5tb3VzZW92ZXIgPSAoZGF0YSkgPT5cbiAgICAgICAgIyMgICAgICAgIGUuc2NhbGUueCA9IDEuMVxuICAgICAgICAjIyAgICAgICAgZS5zY2FsZS55ID0gMS4xXG4gICAgICAgICMjICAgICAgICByZXR1cm5cbiAgICAgICAgIyMgICAgZS5tb3VzZW91dCA9IChkYXRhKSA9PlxuICAgICAgICAjIyAgICAgICAgZS5zY2FsZS54ID0gMS4wXG4gICAgICAgICMjICAgICAgICBlLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgIyMgICAgICAgIHJldHVyblxuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAwLjhcbiAgICAgICAgIyMgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgIyMgICAgcmV0dXJuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaGVuZCA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICByZXR1cm5cbiAgICAgICAgIyNAc3RhcnRCdXR0b24udGFwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgICMjIFRPRE86IG5lZWQgdG8gbWluaW1pemUgY29kZVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnZ2FtZSdcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnb3B0aW9uJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGxvZ29BbmdsZSA9IDAgaWYgQGxvZ29BbmdsZSA+PSAzNjBcbiAgICAgICAgQGxvZ29BbmdsZSArPSAwLjAxXG4gICAgICAgIEBsb2dvLnJvdGF0aW9uID0gQGxvZ29BbmdsZVxuXG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2JieVNjZW5lXG4iLCJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblN5c3RlbVRleHQgPSByZXF1aXJlICdTeXN0ZW1UZXh0J1xuXG5jbGFzcyBPcHRpb25TY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHdhcm5pbmcgPSBuZXcgU3lzdGVtVGV4dCAnVGhpcyBpcyB0aGUgb3B0aW9uIHBhZ2UnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci54ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci55ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAd2FybmluZy5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbiA9IG5ldyBTeXN0ZW1UZXh0ICdCYWNrJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYmFja0J1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMiArIDEyMFxuICAgICAgICBAYmFja0J1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJhY2tCdXR0b24uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnbG9iYnknXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvblNjZW5lXG4iLCJjbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlQmxhbmssIHRleHR1cmVGdWxsKSAtPlxuICAgICAgICBzdXBlciB0ZXh0dXJlQmxhbmtcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzZXR0aW5nczogKG9wdHMpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyXG4iLCJjbGFzcyBTY2VuZSBleHRlbmRzIFBJWEkuU3RhZ2VcbiAgICBfZmluaXNoOiBmYWxzZVxuICAgIF9uZXh0OiBudWxsXG4gICAgX3BvbGw6IChkYXRhKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGNvbnN0cnVjdG9yOiAoYmFja2dyb3VuZCkgLT5cbiAgICAgICAgYmFja2dyb3VuZCA/PSAweDAwMDAwMFxuXG4gICAgICAgIEBwYXVzZWQgPSBmYWxzZVxuICAgICAgICBzdXBlciBiYWNrZ3JvdW5kXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIEBfcG9sbCBAX2ZpbmlzaCwgQF9uZXh0XG4gICAgICAgIHJldHVyblxuXG4gICAgcGF1c2U6IC0+XG4gICAgICAgIEBwYXVzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzdW1lOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcblxuICAgICAgICBAX2ZpbmlzaCA9IGZhbHNlXG4gICAgICAgIEBfbmV4dCA9IG51bGxcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmVlclBvd2VyZWRFbmdpbmUgPSByZXF1aXJlICdCZWVyUG93ZXJlZEVuZ2luZSdcbkJhY2tncm91bmQgPSByZXF1aXJlICdCYWNrZ3JvdW5kJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuTG9hZGVyID0gcmVxdWlyZSAnTG9hZGVyJ1xuXG4jIEN1cnJlbnQgU2NlbmVzXG5JbnRyb1NjZW5lID0gcmVxdWlyZSAnSW50cm9TY2VuZSdcbkxvYmJ5U2NlbmUgPSByZXF1aXJlICdMb2JieVNjZW5lJ1xuT3B0aW9uU2NlbmUgPSByZXF1aXJlICdPcHRpb25TY2VuZSdcbkdhbWVTY2VuZSA9IHJlcXVpcmUgJ0dhbWVTY2VuZSdcblxuIyBTaHVmZmxlZEFwcFxuIyBUaGUgbWFpbiBlbnRyeSBwb2ludCBvZiB0aGUgYXBwXG5jbGFzcyBTaHVmZmxlZEFwcFxuICAgIF9zdGFydHVwOiB0cnVlLFxuICAgIF9tb2RlOiBHbG9iYWxzLmdhbWVNb2Rlcy5vbkludHJvLFxuICAgIGNvbnN0cnVjdG9yOiAoQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0KSAtPlxuXG4gICAgc2tldGNoOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEBlbmdpbmUgPSBuZXcgQmVlclBvd2VyZWRFbmdpbmUgQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgQGdhbWUgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdnYW1lJywgR2FtZVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGxvYmJ5ID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnbG9iYnknLCBMb2JieVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQG9wdGlvbiA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ29wdGlvbicsIE9wdGlvblNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGludHJvID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnaW50cm8nLCBJbnRyb1NjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAZW5naW5lLmdvVG9TY2VuZSAnaW50cm8nIGlmIEBfc3RhcnR1cCBpcyB0cnVlXG5cbiAgICAgICAgdHJ1ZVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNodWZmbGVkQXBwXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblxuY2xhc3MgU2tldGNoIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEBhY3Rpb25zID0ge31cbiAgICAgICAgQGFjdGlvbiA9IG51bGxcbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gMFxuICAgICAgICBzdXBlciB0ZXh0dXJlXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogKGxheWVyKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBsYXllclxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eVxuXG4gICAgY3JlYXRlQWN0aW9uOiAoaWQpIC0+XG4gICAgICAgIHJldHVybiBgdW5kZWZpbmVkYCBpZiBAYWN0aW9uc1tpZF1cblxuICAgICAgICBhY3Rpb24gPSBuZXcgQWN0aW9uXG4gICAgICAgIEBhY3Rpb25zID0gYWN0aW9uXG4gICAgICAgIGFjdGlvblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFNrZXRjaFxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cbmNsYXNzIFN5c3RlbVRleHQgZXh0ZW5kcyBQSVhJLlRleHRcbiAgICBjb25zdHJ1Y3RvcjogKG1zZywgc3R5bGUpIC0+XG4gICAgICAgIHN1cGVyIG1zZywgc3R5bGVcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBTeXN0ZW1UZXh0XG4iXX0=
