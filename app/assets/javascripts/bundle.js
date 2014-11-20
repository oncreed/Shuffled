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
    var blur, i, xpos, ypos;
    GameScene.__super__.constructor.apply(this, arguments);
    blur = new PIXI.BlurFilter;
    this.symbols = [];
    this.texture = PIXI.Texture.fromImage('/assets/images/canyon_of_ages.jpg');
    this.background = new Sketch(this.texture);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = Configs.desktop.settings.width / 2;
    this.background.position.y = Configs.desktop.settings.height / 2 + 60;
    this.background.scale.x = 0.8;
    this.background.scale.y = 1.2;
    this.background.filters = null;
    this.background.addToScene(this);
    xpos = [60, 104, 148, 192, 236];
    ypos = [60, 104, 148, 192, 236];
    i = 0;
    while (i < 16) {
      this.symbols[i] = new SystemText('A', {
        font: 'bold 42px Anton',
        align: 'center',
        fill: '#3e1707',
        stroke: '#a4410e',
        strokeThickness: 5
      });
      this.symbols[i].anchor.x = 0.5;
      this.symbols[i].anchor.y = 0.5;
      this.symbols[i].position.x = xpos[i];
      this.symbols[i].position.y = ypos[i];
      this.symbols[i].addToScene(this);
      i++;
    }
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
      this.engine.goToScene('game');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwic2NlbmVzL2JvYXJkc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwic2NlbmVzL2dhbWVzY2VuZS5jb2ZmZWUiLCJnbG9iYWxzLmNvZmZlZSIsInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSIsImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiLCJzY2VuZXMvbG9iYnlzY2VuZS5jb2ZmZWUiLCJzY2VuZXMvb3B0aW9uc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuY29mZmVlIiwic2NlbmUuY29mZmVlIiwic2h1ZmZsZWQuY29mZmVlIiwiZW50aXRpZXMvc2tldGNoLmNvZmZlZSIsImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDMkJ1Qjs7OztBQzNCdkIsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsT0FBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQW5DLENBQUE7QUFBQSxJQUNBLDRDQUFNLE9BQU4sQ0FEQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFJQSxpQkFBQSxHQUFtQixTQUFDLEtBQUQsR0FBQTtXQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLE1BREg7RUFBQSxDQUpuQixDQUFBOztBQUFBLHVCQU9BLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxlQURjO0VBQUEs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YUFBTyxTQUFQLENBQUE7S0FBQTtBQUFBLElBRUEsTUFBQSxHQUFTLEdBQUEsQ0FBQSxNQUZULENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxPQUFELEdBQVcsTUFIWCxDQUFBO1dBSUEsT0FMVTtFQUFBLENBWmQsQ0FBQTs7QUFBQSxtQkFtQkEsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1IsSUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsQ0FBQSxDQURRO0VBQUEsQ0FuQlosQ0FBQTs7Z0JBQUE7O0dBRGlCLElBQUksQ0FBQyxPQUwxQixDQUFBOztBQUFBLE1BNkJNLENBQUMsT0FBUCxHQUFpQixNQTdCakIsQ0FBQTs7OztBQ0FBLElBQUEsbUJBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FBVixDQUFBOztBQUFBO0FBR0ksK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG9CQUFDLEdBQUQsRUFBTSxLQUFOLEdBQUE7QUFDVCxJQUFBLDRDQUFNLEdBQU4sRUFBVyxLQUFYLENBQUEsQ0FEUztFQUFBLENBQWI7O0FBQUEsdUJBR0EsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1IsSUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsQ0FBQSxDQURRO0VBQUEsQ0FIWixDQUFBOztvQkFBQTs7R0FEcUIsSUFBSSxDQUFDLEtBRjlCLENBQUE7O0FBQUEsTUFVTSxDQUFDLE9BQVAsR0FBaUIsVUFWakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIyBETyBOT1QgREVMRVRFXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBHbG9iYWxzLnByaW9yaXR5LmJhY2tncm91bmRcbiAgICAgICAgc3VwZXIgdGV4dHVyZVxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IChsYXllcikgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gbGF5ZXJcblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHlcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iLCJTY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuXG5jbGFzcyBCZWVyUG93ZXJlZEVuZ2luZVxuICAgIGNvbnN0cnVjdG9yOiAoQHdpZHRoLCBAaGVpZ2h0KSAtPlxuICAgICAgICBAc2NlbmVzID0ge31cbiAgICAgICAgQHNjZW5lID0gbnVsbFxuICAgICAgICBAaW5pdCgpXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBAcmVuZGVyZXIgPSBQSVhJLmF1dG9EZXRlY3RSZW5kZXJlciBAd2lkdGgsIEBoZWlnaHRcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBAcmVuZGVyZXIudmlld1xuXG4gICAgICAgIEBzdGF0cyA9IG5ldyBTdGF0c1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIEBzdGF0cy5kb21FbGVtZW50XG5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBhbmltYXRlXG4gICAgICAgIHJldHVyblxuXG4gICAgY3JlYXRlU2NlbmU6IChpZCwgdHNjZW5lLCBjYWxsYmFjaykgLT5cbiAgICAgICAgdHNjZW5lID89IFNjZW5lXG4gICAgICAgIGNhbGxiYWNrID89IC0+XG5cbiAgICAgICAgcmV0dXJuIGB1bmRlZmluZWRgIGlmIEBzY2VuZXNbaWRdXG5cbiAgICAgICAgc2NlbmUgPSBuZXcgdHNjZW5lXG4gICAgICAgIHNjZW5lLm9uVXBkYXRlIGNhbGxiYWNrXG4gICAgICAgIEBzY2VuZXNbaWRdID0gc2NlbmVcbiAgICAgICAgc2NlbmVcblxuICAgIGdvVG9TY2VuZTogKGlkKSAtPlxuICAgICAgICBpZiBAc2NlbmVzW2lkXT9cbiAgICAgICAgICAgIEBzY2VuZT8ucGF1c2UoKVxuICAgICAgICAgICAgQHNjZW5lID0gQHNjZW5lc1tpZF1cbiAgICAgICAgICAgIEBzY2VuZS5yZXN1bWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZmFsc2VcblxuICAgIGFuaW1hdGU6IChkZWx0YVRpbWUpID0+XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZVxuXG4gICAgICAgIHJldHVybiBpZiBub3QgQHNjZW5lPyBvciBAc2NlbmUuaXNQYXVzZWQoKVxuXG4gICAgICAgIEBzdGF0cy5iZWdpbigpXG4gICAgICAgIEBzY2VuZS51cGRhdGUgZGVsdGFUaW1lXG4gICAgICAgIEByZW5kZXJlci5yZW5kZXIgQHNjZW5lXG4gICAgICAgIEBzdGF0cy5lbmQoKVxuXG4gICAgICAgIFRXRUVOLnVwZGF0ZSBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQmVlclBvd2VyZWRFbmdpbmVcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIEJvYXJkU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIHN1cGVyXG4gICAgICAgIEB3YXJuaW5nID0gbmV3IFN5c3RlbVRleHQgJ1RoaXMgaXMgdGhlIGxlYWRlcmJvYXJkIHBhZ2UnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci54ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci55ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAd2FybmluZy5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbiA9IG5ldyBTeXN0ZW1UZXh0ICdCYWNrJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYmFja0J1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMiArIDEyMFxuICAgICAgICBAYmFja0J1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJhY2tCdXR0b24uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnZ2FtZSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQm9hcmRTY2VuZVxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cbkJ1dHRvbkFjdGl2ZVN0YXRlID1cbiAgICBpbmFjdGl2ZTogMFxuICAgIGFjdGl2ZTogMVxuXG5CdXR0b25Nb2RlID1cbiAgICBmb2N1czogMVxuICAgIGNsaWNrOiAwXG4gICAgaG92ZXI6IDVcblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKEB0ZXh0dXJlT24sIEB0ZXh0dXJlT2ZmLCBAdGV4dHVyZVByZXNzKSAtPlxuICAgICAgICBzdXBlciBAdGV4dHVyZU9uXG4gICAgICAgIEBpc1ByZXNzID0gZmFsc2VcbiAgICAgICAgQG1vZGUgPSBCdXR0b25Nb2RlLmZvY3VzXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIGlmIEBpc1ByZXNcbiAgICAgICAgICAgIGlmIEBtb2RlIGlzIEJ1dHRvbk1vZGUuY2xpY2tcbiAgICAgICAgICAgICAgICBAc2V0VGV4dHVyZSBAdGV4dHVyZVByZXNzXG4gICAgICAgIHJldHVyblxuXG4gICAgcHJlc3M6IC0+XG4gICAgICAgIEBpc1ByZXNzID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIGdldEJvdW5kaW5nQm94OiAtPlxuICAgICAgICBAZ2V0Qm91bmRzXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgZGVza3RvcDpcbiAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMFxuICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgcGhvbmVzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIGlvczpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiA0ODBcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMyMFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICB3aW5kb3dzOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgdGFibGV0czpcbiAgICAgICAgYW5kcm9pZDpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDI0XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA3NjhcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG5cbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIGJsdXIgPSBuZXcgUElYSS5CbHVyRmlsdGVyXG5cbiAgICAgICAgQHN5bWJvbHMgPSBbXVxuXG4gICAgICAgIEB0ZXh0dXJlID0gUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvY2FueW9uX29mX2FnZXMuanBnJ1xuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVcbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyICsgNjBcbiAgICAgICAgQGJhY2tncm91bmQuc2NhbGUueCA9IDAuOFxuICAgICAgICBAYmFja2dyb3VuZC5zY2FsZS55ID0gMS4yXG4gICAgICAgIEBiYWNrZ3JvdW5kLmZpbHRlcnMgPSBudWxsXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIHhwb3MgPSBbXG4gICAgICAgICAgICA2MFxuICAgICAgICAgICAgMTA0XG4gICAgICAgICAgICAxNDhcbiAgICAgICAgICAgIDE5MlxuICAgICAgICAgICAgMjM2XG4gICAgICAgIF1cblxuICAgICAgICB5cG9zID0gW1xuICAgICAgICAgICAgNjBcbiAgICAgICAgICAgIDEwNFxuICAgICAgICAgICAgMTQ4XG4gICAgICAgICAgICAxOTJcbiAgICAgICAgICAgIDIzNlxuICAgICAgICBdXG5cbiAgICAgICAgaSA9IDBcbiAgICAgICAgd2hpbGUgaSA8IDE2XG4gICAgICAgICAgICBAc3ltYm9sc1tpXSA9IG5ldyBTeXN0ZW1UZXh0ICdBJyxcbiAgICAgICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgICAgICBAc3ltYm9sc1tpXS5hbmNob3IueCA9IDAuNVxuICAgICAgICAgICAgQHN5bWJvbHNbaV0uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgICAgIEBzeW1ib2xzW2ldLnBvc2l0aW9uLnggPSB4cG9zW2ldXG4gICAgICAgICAgICBAc3ltYm9sc1tpXS5wb3NpdGlvbi55ID0geXBvc1tpXVxuICAgICAgICAgICAgQHN5bWJvbHNbaV0uYWRkVG9TY2VuZSBAXG4gICAgICAgICAgICBpKytcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZVNjZW5lXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgZ2FtZU1vZGVzOlxuICAgICAgICBvbkludHJvOiAyXG4gICAgICAgIG9uTG9iYnk6IDRcbiAgICAgICAgb25HYW1lOiA2XG4gICAgICAgIG9uUGF1c2U6IDhcbiAgICAgICAgb25PcHRpb25zOiAxMFxuICAgICAgICBvbkVuZDogMTJcbiAgICBwcmlvcml0eTpcbiAgICAgICAgYmFja2dyb3VuZDogMTBcbiAgICAgICAgbm9ybWFsOiA1MFxuICAgICAgICBvdmVybGF5OiA2MFxuICAgICAgICBiYW5uZXI6IDc1XG4gICAgICAgIGFib3ZlOiAxMDBcbiAgICAgICAgbWF4OiA5OTlcbiAgICB0ZXh0dXJlSW5kZXg6XG4gICAgICAgIGdhbWVfbG9nbzogMVxuICAgICAgICBiYWNrZ3JvdW5kXzE6IDJcbiAgICAgICAgYmFja2dyb3VuZF8yOiAzXG4gICAgICAgIGJhY2tncm91bmRfMzogNFxuICAgICAgICBiYWNrZ3JvdW5kXzQ6IDVcbiAgICAgICAgYmFja2dyb3VuZF82OiA2XG4gICAgICAgIGJ1dHRvbl9zdGFydDogN1xuICAgICAgICBidXR0b25fcGxheTogOFxuICAgICAgICBidXR0b25fb3B0aW9uczogOVxuICAgICAgICBidXR0b25fZXhpdDogMTBcbiAgICAgICAgYnV0dG9uX3NvdW5kczogMTFcbiAgICAgICAgYnV0dG9uX2luZm86IDEyXG4iLCJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblxuY2xhc3MgSW50cm9TY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbG9zdF9raWRzX2NvbnRlc3QuanBnJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdF9ibHVlLnBuZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXQucG5nJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvaHRtbDVfbG9nby5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9waXhpX2xvZ28ucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgYmx1ciA9IG5ldyBQSVhJLkJsdXJGaWx0ZXJcblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gW2JsdXJdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvTm9GaWxsID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5hbHBoYSA9IDAuMFxuICAgICAgICBAbG9nb05vRmlsbC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzJdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQHRlY2ggPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1szXVxuICAgICAgICBAdGVjaC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAdGVjaC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAdGVjaC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAdGVjaC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQHRlY2guc2NhbGUueCA9IDAuN1xuICAgICAgICBAdGVjaC5zY2FsZS55ID0gMC43XG4gICAgICAgIEB0ZWNoLmFscGhhID0gMC4wXG4gICAgICAgIEB0ZWNoLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBodG1sQmFja2dyb3VuZCA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgIEBodG1sQmFja2dyb3VuZC5iZWdpbkZpbGwoMHgxMDEyMjgpXG4gICAgICAgIEBodG1sQmFja2dyb3VuZC5kcmF3UmVjdCAwLCAwLFxuICAgICAgICAgICAgQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoLFxuICAgICAgICAgICAgQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodFxuICAgICAgICBAaHRtbEJhY2tncm91bmQuZW5kRmlsbCgpXG4gICAgICAgIEBodG1sQmFja2dyb3VuZC5hbHBoYSA9IDAuMFxuICAgICAgICBAYWRkQ2hpbGQgQGh0bWxCYWNrZ3JvdW5kXG5cbiAgICAgICAgQGh0bWwgPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1s0XVxuICAgICAgICBAaHRtbC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAaHRtbC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAaHRtbC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAaHRtbC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGh0bWwuc2NhbGUueCA9IDAuN1xuICAgICAgICBAaHRtbC5zY2FsZS55ID0gMC43XG4gICAgICAgIEBodG1sLmFscGhhID0gMC4wXG4gICAgICAgIEBodG1sLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIHBpeGkgPSBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgNDAwMCkucmVwZWF0KDEpLmRlbGF5KDEwMDApLnlveW8odHJ1ZSkuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLkluT3V0KS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQuaHRtbC5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgJC5odG1sQmFja2dyb3VuZC5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICkub25Db21wbGV0ZSggLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdjb21wbGV0ZWQgYW5pbWF0aW9uJ1xuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdsb2JieSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApXG5cbiAgICAgICAgdGVjaG5vbG9naWVzID0gbmV3IFRXRUVOLlR3ZWVuKFxuICAgICAgICAgICAgYWxwaGE6IDAuMFxuICAgICAgICApLnRvKFxuICAgICAgICAgICAgYWxwaGE6IDEuMFxuICAgICAgICAsIDQwMDApLnJlcGVhdCgxKS5kZWxheSgxMDAwKS55b3lvKHRydWUpLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5Jbk91dCkub25VcGRhdGUoIC0+XG4gICAgICAgICAgICAkLnRlY2guYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLmNoYWluKHBpeGkpXG5cblxuICAgICAgICBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgNDAwMCkucmVwZWF0KDEpLmRlbGF5KDEwMDApLnlveW8odHJ1ZSkuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLkluT3V0KS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQubG9nby5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgJC5sb2dvTm9GaWxsLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5jaGFpbih0ZWNobm9sb2dpZXMpLnN0YXJ0KClcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEludHJvU2NlbmVcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnQmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblByb2dyZXNzQmFyID0gcmVxdWlyZSAnUHJvZ3Jlc3NCYXInXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9hZGVyXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGFza3NEb25lID0gZmFsc2VcbiAgICAgICAgQHRhc2tzQ291bnQgPSAwXG4gICAgICAgIEB0YXNrc0NvbXBsZXRlZCA9IDBcblxuICAgICAgICBAc3RhcnRCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnUGxheScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24ucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgOTBcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFscGhhID0gMC4wXG4gICAgICAgIEBzdGFydEJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcblxuICAgICAgICBAc3RhcnRCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQudHJhZGVPZmYgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tncm91bmQuZmlsdGVycyA9IFskLm15RmlsdGVyXVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRvdWNoZW5kID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFkZFRvU3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQGxvYWRTb3VuZCA9IG5ldyBIb3dsXG4gICAgICAgICAgICB1cmxzOiBbJy9hc3NldHMvc291bmRzL2Zsb19yaWRhLm1wMyddXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2VcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgICAgIG9ubG9hZDogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZmluaXNoZWQgbG9hZGluZyBzb3VuZCdcblxuICAgIHRhc2tUb0xvYWQ6IChjb3VudCkgLT5cbiAgICAgICAgQHRhc2tzQ291bnQgPSBjb3VudFxuXG4gICAgYWRkVG9GaW5pc2hlZFRhc2s6ICgpIC0+XG4gICAgICAgIGlmIG5vdCBAdGFza3NDb3VudCBpcyBAdGFza3NDb21wbGV0ZWRcbiAgICAgICAgICAgIEB0YXNrc0NvbXBsZXRlZCArPSAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXNrc0RvbmUgPSB0cnVlXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlclxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9iYnlTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIGJsdXIgPSBuZXcgUElYSS5CbHVyRmlsdGVyXG5cbiAgICAgICAgQHRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbGlicmFyeV9jb25jZXB0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2VhcnRoX2NpcmNsZS5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gW2JsdXJdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvQW5nbGUgPSAwXG4gICAgICAgIEBsb2dvID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ28uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ28uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ28ucG9zaXRpb24ueCA9IDcwXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC43XG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjdcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnMgPSB7fVxuXG4gICAgICAgIEBidXR0b25zWydzdGFydCddID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydzdGFydCddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyIC0gMTBcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ucG9zaXRpb24ueSA9IDkwXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXSA9IG5ldyBTeXN0ZW1UZXh0ICdPcHRpb25zJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueSA9IDE2MFxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10gPSBuZXcgU3lzdGVtVGV4dCAnTGVhZGVyQm9hcmRzJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyAxMFxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5wb3NpdGlvbi55ID0gMjMwXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgICMjZWxlbWVudHMgPSBbXG4gICAgICAgICMjICAgIEBidXR0b25zWydpbnRybyddXG4gICAgICAgICMjICAgIEBidXR0b25zWydnYW1lJ11cbiAgICAgICAgIyMgICAgQGJ1dHRvbnNbJ29wdGlvbiddXG4gICAgICAgICMjXVxuXG4gICAgICAgICMjZm9yIGUsIGkgaW4gZWxlbWVudHNcbiAgICAgICAgIyMgICAgZS5tb3VzZW92ZXIgPSAoZGF0YSkgPT5cbiAgICAgICAgIyMgICAgICAgIGUuc2NhbGUueCA9IDEuMVxuICAgICAgICAjIyAgICAgICAgZS5zY2FsZS55ID0gMS4xXG4gICAgICAgICMjICAgICAgICByZXR1cm5cbiAgICAgICAgIyMgICAgZS5tb3VzZW91dCA9IChkYXRhKSA9PlxuICAgICAgICAjIyAgICAgICAgZS5zY2FsZS54ID0gMS4wXG4gICAgICAgICMjICAgICAgICBlLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgIyMgICAgICAgIHJldHVyblxuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAwLjhcbiAgICAgICAgIyMgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgIyMgICAgcmV0dXJuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaGVuZCA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICByZXR1cm5cbiAgICAgICAgIyNAc3RhcnRCdXR0b24udGFwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgICMjIFRPRE86IG5lZWQgdG8gbWluaW1pemUgY29kZVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnZ2FtZSdcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnb3B0aW9uJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQGxvZ29BbmdsZSA9IDAgaWYgQGxvZ29BbmdsZSA+PSAzNjBcbiAgICAgICAgQGxvZ29BbmdsZSArPSAwLjAxXG4gICAgICAgIEBsb2dvLnJvdGF0aW9uID0gQGxvZ29BbmdsZVxuXG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2JieVNjZW5lXG4iLCJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblN5c3RlbVRleHQgPSByZXF1aXJlICdTeXN0ZW1UZXh0J1xuXG5jbGFzcyBPcHRpb25TY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgc3VwZXJcbiAgICAgICAgQHdhcm5pbmcgPSBuZXcgU3lzdGVtVGV4dCAnVGhpcyBpcyB0aGUgb3B0aW9uIHBhZ2UnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci54ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci55ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAd2FybmluZy5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbiA9IG5ldyBTeXN0ZW1UZXh0ICdCYWNrJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYmFja0J1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMiArIDEyMFxuICAgICAgICBAYmFja0J1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJhY2tCdXR0b24uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnbG9iYnknXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IE9wdGlvblNjZW5lXG4iLCJjbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlQmxhbmssIHRleHR1cmVGdWxsKSAtPlxuICAgICAgICBzdXBlciB0ZXh0dXJlQmxhbmtcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzZXR0aW5nczogKG9wdHMpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyXG4iLCJjbGFzcyBTY2VuZSBleHRlbmRzIFBJWEkuU3RhZ2VcbiAgICBfZmluaXNoOiBmYWxzZVxuICAgIF9uZXh0OiBudWxsXG4gICAgX3BvbGw6IChkYXRhKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGNvbnN0cnVjdG9yOiAoYmFja2dyb3VuZCkgLT5cbiAgICAgICAgYmFja2dyb3VuZCA/PSAweDAwMDAwMFxuXG4gICAgICAgIEBwYXVzZWQgPSBmYWxzZVxuICAgICAgICBzdXBlciBiYWNrZ3JvdW5kXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIEBfcG9sbCBAX2ZpbmlzaCwgQF9uZXh0XG4gICAgICAgIHJldHVyblxuXG4gICAgcGF1c2U6IC0+XG4gICAgICAgIEBwYXVzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzdW1lOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcblxuICAgICAgICBAX2ZpbmlzaCA9IGZhbHNlXG4gICAgICAgIEBfbmV4dCA9IG51bGxcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmVlclBvd2VyZWRFbmdpbmUgPSByZXF1aXJlICdCZWVyUG93ZXJlZEVuZ2luZSdcbkJhY2tncm91bmQgPSByZXF1aXJlICdCYWNrZ3JvdW5kJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuTG9hZGVyID0gcmVxdWlyZSAnTG9hZGVyJ1xuXG4jIEN1cnJlbnQgU2NlbmVzXG5JbnRyb1NjZW5lID0gcmVxdWlyZSAnSW50cm9TY2VuZSdcbkxvYmJ5U2NlbmUgPSByZXF1aXJlICdMb2JieVNjZW5lJ1xuT3B0aW9uU2NlbmUgPSByZXF1aXJlICdPcHRpb25TY2VuZSdcbkdhbWVTY2VuZSA9IHJlcXVpcmUgJ0dhbWVTY2VuZSdcblxuIyBTaHVmZmxlZEFwcFxuIyBUaGUgbWFpbiBlbnRyeSBwb2ludCBvZiB0aGUgYXBwXG5jbGFzcyBTaHVmZmxlZEFwcFxuICAgIF9zdGFydHVwOiB0cnVlLFxuICAgIF9tb2RlOiBHbG9iYWxzLmdhbWVNb2Rlcy5vbkludHJvLFxuICAgIGNvbnN0cnVjdG9yOiAoQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0KSAtPlxuXG4gICAgc2tldGNoOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEBlbmdpbmUgPSBuZXcgQmVlclBvd2VyZWRFbmdpbmUgQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgQGdhbWUgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdnYW1lJywgR2FtZVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGxvYmJ5ID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnbG9iYnknLCBMb2JieVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQG9wdGlvbiA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ29wdGlvbicsIE9wdGlvblNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGludHJvID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnaW50cm8nLCBJbnRyb1NjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAZW5naW5lLmdvVG9TY2VuZSAnZ2FtZScgaWYgQF9zdGFydHVwIGlzIHRydWVcblxuICAgICAgICB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gU2h1ZmZsZWRBcHBcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuXG5jbGFzcyBTa2V0Y2ggZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZSkgLT5cbiAgICAgICAgQGFjdGlvbnMgPSB7fVxuICAgICAgICBAYWN0aW9uID0gbnVsbFxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSAwXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBjcmVhdGVBY3Rpb246IChpZCkgLT5cbiAgICAgICAgcmV0dXJuIGB1bmRlZmluZWRgIGlmIEBhY3Rpb25zW2lkXVxuXG4gICAgICAgIGFjdGlvbiA9IG5ldyBBY3Rpb25cbiAgICAgICAgQGFjdGlvbnMgPSBhY3Rpb25cbiAgICAgICAgYWN0aW9uXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2tldGNoXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuY2xhc3MgU3lzdGVtVGV4dCBleHRlbmRzIFBJWEkuVGV4dFxuICAgIGNvbnN0cnVjdG9yOiAobXNnLCBzdHlsZSkgLT5cbiAgICAgICAgc3VwZXIgbXNnLCBzdHlsZVxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN5c3RlbVRleHRcbiJdfQ==
