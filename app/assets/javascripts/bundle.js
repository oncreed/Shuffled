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


},{"Globals":"Globals"}],"BeerPoweredEngine":[function(require,module,exports){
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
    window.beer = this;
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
    scene.init();
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


},{"Scene":"Scene"}],"BoardScene":[function(require,module,exports){
var BoardScene, Button, Configs, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

Button = require('Button');

SystemText = require('SystemText');

BoardScene = (function(_super) {
  __extends(BoardScene, _super);

  function BoardScene() {
    BoardScene.__super__.constructor.call(this, 0xffffff);
  }

  BoardScene.prototype.init = function() {
    var $;
    $ = this;
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
      $._next = 'lobby';
    };
    this.backButton.mouseup = function(data) {
      $.backButton.scale.x = 1.0;
      $.backButton.scale.y = 1.0;
    };
  };

  BoardScene.prototype.update = function(deltaTime) {
    BoardScene.__super__.update.call(this, deltaTime);
  };

  return BoardScene;

})(Scene);

module.exports = BoardScene;


},{"Button":"Button","Configs":"Configs","Scene":"Scene","Sketch":"Sketch","SystemText":"SystemText"}],"Button":[function(require,module,exports){
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
    if (this.isPress) {
      if (this.mode === ButtonMode.click) {
        this.setTexture(this.texturePress);
      }
    }
  };

  Button.prototype.press = function() {
    this.isPress = true;
  };

  Button.prototype.setRenderPriority = function() {};

  Button.prototype.getRenderPriority = function() {};

  Button.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return Button;

})(PIXI.Sprite);

module.exports = Button;


},{"Globals":"Globals"}],"Configs":[function(require,module,exports){
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
var Button, Configs, GameScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

Button = require('Button');

SystemText = require('SystemText');

GameScene = (function(_super) {
  __extends(GameScene, _super);

  function GameScene() {
    GameScene.__super__.constructor.call(this, 0xffffff);
  }

  GameScene.prototype.init = function() {
    var i, index, j, n, xpos, ypos;
    this.symbols = [];
    xpos = [80, 160, 240, 320, 400, 480];
    ypos = [80, 160, 240, 320, 400, 480];
    this.chars = 'ABCDEF'.split('');
    i = 0;
    while (i < 6) {
      j = 0;
      while (j < 6) {
        index = i + j;
        n = this.getRandomInt(0, 5);
        this.symbols[index] = new SystemText(this.chars[n], {
          font: 'bold 72px Anton',
          align: 'center',
          fill: '#3e1707',
          stroke: '#a4410e',
          strokeThickness: 5
        });
        this.symbols[index].anchor.x = 0.5;
        this.symbols[index].anchor.y = 0.5;
        this.symbols[index].position.x = xpos[j];
        this.symbols[index].position.y = ypos[i];
        this.symbols[index].addToScene(this);
        j++;
      }
      i++;
    }
    this.buttons = {};
    this.buttons['shuffle'] = new SystemText('shuffle!', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['shuffle'].anchor.x = 0.5;
    this.buttons['shuffle'].anchor.y = 0.5;
    this.buttons['shuffle'].position.x = Configs.desktop.settings.width / 2 + 260;
    this.buttons['shuffle'].position.y = 90;
    this.buttons['shuffle'].addToScene(this);
    this.buttons['info'] = new SystemText('info', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['info'].anchor.x = 0.5;
    this.buttons['info'].anchor.y = 0.5;
    this.buttons['info'].position.x = Configs.desktop.settings.width / 2 + 260;
    this.buttons['info'].position.y = 140;
    this.buttons['info'].addToScene(this);
    this.buttons['find'] = new SystemText('eureka', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['find'].anchor.x = 0.5;
    this.buttons['find'].anchor.y = 0.5;
    this.buttons['find'].position.x = Configs.desktop.settings.width / 2 + 260;
    this.buttons['find'].position.y = 340;
    this.buttons['find'].addToScene(this);
    this.overlay = new PIXI.Graphics;
    this.overlay.beginFill(0xfffff);
    this.overlay.drawCircle(0, 0, 300);
    this.overlay.endFill();
    this.addChild(this.overlay);
  };

  GameScene.prototype.update = function(deltaTime) {
    var $;
    $ = this;
    this.buttons['shuffle'].interactive = true;
    this.buttons['shuffle'].mouseover = function(data) {
      $.buttons['shuffle'].scale.x = 1.1;
      $.buttons['shuffle'].scale.y = 1.1;
    };
    this.buttons['shuffle'].mouseout = function(data) {
      $.buttons['shuffle'].scale.x = 1.0;
      $.buttons['shuffle'].scale.y = 1.0;
    };
    this.buttons['shuffle'].mousedown = function(data) {
      $.buttons['shuffle'].scale.x = 0.8;
      $.buttons['shuffle'].scale.y = 0.8;
      this.showOverlay();
    };
    this.buttons['shuffle'].mouseup = function(data) {
      $.buttons['shuffle'].scale.x = 1.0;
      $.buttons['shuffle'].scale.y = 1.0;
    };
    GameScene.__super__.update.call(this, deltaTime);
  };

  GameScene.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  GameScene.prototype.showOverlay = function() {};

  return GameScene;

})(Scene);

module.exports = GameScene;


},{"Button":"Button","Configs":"Configs","Scene":"Scene","Sketch":"Sketch","SystemText":"SystemText"}],"Globals":[function(require,module,exports){
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
var Button, Configs, IntroScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

Button = require('Button');

SystemText = require('SystemText');

IntroScene = (function(_super) {
  __extends(IntroScene, _super);

  function IntroScene() {
    IntroScene.__super__.constructor.call(this, 0xffffff);
  }

  IntroScene.prototype.init = function() {
    var $, technologies;
    $ = this;
    this.textures = [PIXI.Texture.fromImage('/assets/images/pursuit_blue.png'), PIXI.Texture.fromImage('/assets/images/pursuit.png'), PIXI.Texture.fromImage('/assets/images/html5_logo.png')];
    this.logoNoFill = new Sketch(this.textures[0]);
    this.logoNoFill.anchor.x = 0.5;
    this.logoNoFill.anchor.y = 0.5;
    this.logoNoFill.position.x = Configs.desktop.settings.width / 2;
    this.logoNoFill.position.y = Configs.desktop.settings.height / 2;
    this.logoNoFill.scale.x = 0.2;
    this.logoNoFill.scale.y = 0.2;
    this.logoNoFill.alpha = 0.0;
    this.logoNoFill.addToScene(this);
    this.logo = new Sketch(this.textures[1]);
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;
    this.logo.position.x = Configs.desktop.settings.width / 2;
    this.logo.position.y = Configs.desktop.settings.height / 2;
    this.logo.scale.x = 0.2;
    this.logo.scale.y = 0.2;
    this.logo.alpha = 0.0;
    this.logo.addToScene(this);
    this.tech = new Sketch(this.textures[2]);
    this.tech.anchor.x = 0.5;
    this.tech.anchor.y = 0.5;
    this.tech.position.x = Configs.desktop.settings.width / 2;
    this.tech.position.y = Configs.desktop.settings.height / 2;
    this.tech.scale.x = 0.7;
    this.tech.scale.y = 0.7;
    this.tech.alpha = 0.0;
    this.tech.addToScene(this);
    technologies = new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Cubic.In).onUpdate(function() {
      $.tech.alpha = this.alpha;
    }).onComplete(function() {
      console.log('completed animation');
      $._finish = true;
      $._next = 'lobby';
    });
    new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Cubic.In).onUpdate(function() {
      $.logo.alpha = this.alpha;
      $.logoNoFill.alpha = this.alpha;
    }).chain(technologies).start();
  };

  IntroScene.prototype.update = function(deltaTime) {
    IntroScene.__super__.update.call(this, deltaTime);
  };

  return IntroScene;

})(Scene);

module.exports = IntroScene;


},{"Button":"Button","Configs":"Configs","Scene":"Scene","Sketch":"Sketch","SystemText":"SystemText"}],"Loader":[function(require,module,exports){
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


},{"Background":"Background","Globals":"Globals","ProgressBar":"ProgressBar","Sketch":"Sketch","SystemText":"SystemText"}],"LobbyScene":[function(require,module,exports){
var Button, Configs, LobbyScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

Button = require('Button');

SystemText = require('SystemText');

LobbyScene = (function(_super) {
  __extends(LobbyScene, _super);

  function LobbyScene() {
    LobbyScene.__super__.constructor.call(this, 0xffffff);
  }

  LobbyScene.prototype.init = function() {
    this.textures = [PIXI.Texture.fromImage('/assets/images/earth_circle.png')];
    this.logoAngle = 0;
    this.logo = new Sketch(this.textures[0]);
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
      align: 'left',
      fill: '#a7dbdb',
      stroke: '#69d2e7',
      strokeThickness: 5
    });
    this.buttons['start'].anchor.y = 0.5;
    this.buttons['start'].position.x = Configs.desktop.settings.width / 2 - 10;
    this.buttons['start'].position.y = 90;
    this.buttons['start'].addToScene(this);
    this.buttons['option'] = new SystemText('Options', {
      font: 'bold 42px Anton',
      align: 'left',
      fill: '#a7dbdb',
      stroke: '#69d2e7',
      strokeThickness: 5
    });
    this.buttons['option'].anchor.y = 0.5;
    this.buttons['option'].position.x = Configs.desktop.settings.width / 2;
    this.buttons['option'].position.y = 160;
    this.buttons['option'].addToScene(this);
    this.buttons['board'] = new SystemText('LeaderBoards', {
      font: 'bold 42px Anton',
      align: 'left',
      fill: '#a7dbdb',
      stroke: '#69d2e7',
      strokeThickness: 5
    });
    this.buttons['board'].anchor.y = 0.5;
    this.buttons['board'].position.x = Configs.desktop.settings.width / 2 + 10;
    this.buttons['board'].position.y = 230;
    this.buttons['board'].addToScene(this);
  };

  LobbyScene.prototype.update = function(deltaTime) {
    var $;
    $ = this;
    this.buttons['start'].interactive = true;
    this.buttons['start'].mouseover = function(data) {
      window.beer.scenes['lobby'].buttons['start'].scale.x = 1.1;
      window.beer.scenes['lobby'].buttons['start'].scale.y = 1.1;
    };
    this.buttons['start'].mouseout = function(data) {
      window.beer.scenes['lobby'].buttons['start'].scale.x = 1.0;
      window.beer.scenes['lobby'].buttons['start'].scale.y = 1.0;
    };
    this.buttons['start'].mousedown = function(data) {
      window.beer.scenes['lobby'].buttons['start'].scale.x = 0.8;
      window.beer.scenes['lobby'].buttons['start'].scale.y = 0.8;
      $._finish = true;
      $._next = 'game';
      console.log('ehlo');
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
      console.log('ehlo');
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
    this.buttons['board'].mousedown = function(data) {
      $.buttons['board'].scale.x = 0.8;
      $.buttons['board'].scale.y = 0.8;
      $._finish = true;
      $._next = 'board';
      console.log('ehlo');
    };
    this.buttons['board'].mouseup = function(data) {
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


},{"Button":"Button","Configs":"Configs","Scene":"Scene","Sketch":"Sketch","SystemText":"SystemText"}],"OptionScene":[function(require,module,exports){
var Button, Configs, OptionScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

Button = require('Button');

SystemText = require('SystemText');

OptionScene = (function(_super) {
  __extends(OptionScene, _super);

  function OptionScene() {
    OptionScene.__super__.constructor.call(this, 0xffffff);
  }

  OptionScene.prototype.init = function() {
    this.warning = new SystemText('This is the option page', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#a7dbdb',
      stroke: '#69d2e7',
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
      fill: '#a7dbdb',
      stroke: '#69d2e7',
      strokeThickness: 5
    });
    this.backButton.anchor.y = 0.5;
    this.backButton.position.x = Configs.desktop.settings.width / 2 + 60;
    this.backButton.position.y = Configs.desktop.settings.height / 2 + 120;
    this.backButton.interactive = true;
    this.backButton.addToScene(this);
  };

  OptionScene.prototype.update = function(deltaTime) {
    var $;
    $ = this;
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
    OptionScene.__super__.update.call(this, deltaTime);
  };

  return OptionScene;

})(Scene);

module.exports = OptionScene;


},{"Button":"Button","Configs":"Configs","Scene":"Scene","Sketch":"Sketch","SystemText":"SystemText"}],"ProgressBar":[function(require,module,exports){
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

  Scene.prototype.init = function() {};

  Scene.prototype.destroy = function() {};

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

  Scene.prototype.onUpdate = function(callback) {
    this._poll = callback;
  };

  Scene.prototype.isPaused = function() {
    return this.paused;
  };

  return Scene;

})(PIXI.Stage);

module.exports = Scene;


},{}],"Shuffled":[function(require,module,exports){
var Background, BeerPoweredEngine, BoardScene, GameScene, Globals, IntroScene, Loader, LobbyScene, OptionScene, ShuffledApp, Sketch;

Globals = require('Globals');

BeerPoweredEngine = require('BeerPoweredEngine');

Background = require('Background');

Sketch = require('Sketch');

Loader = require('Loader');

IntroScene = require('IntroScene');

LobbyScene = require('LobbyScene');

BoardScene = require('BoardScene');

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
    this.board = this.engine.createScene('board', BoardScene, function(finish, scene) {
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


},{"Background":"Background","BeerPoweredEngine":"BeerPoweredEngine","BoardScene":"BoardScene","GameScene":"GameScene","Globals":"Globals","IntroScene":"IntroScene","Loader":"Loader","LobbyScene":"LobbyScene","OptionScene":"OptionScene","Sketch":"Sketch"}],"Sketch":[function(require,module,exports){
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


},{"Globals":"Globals","Scene":"Scene","Sketch":"Sketch"}],"SystemText":[function(require,module,exports){
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


},{"Globals":"Globals"}]},{},[1])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwic2NlbmVzL2JvYXJkc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwic2NlbmVzL2dhbWVzY2VuZS5jb2ZmZWUiLCJnbG9iYWxzLmNvZmZlZSIsInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSIsImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiLCJzY2VuZXMvbG9iYnlzY2VuZS5jb2ZmZWUiLCJzY2VuZXMvb3B0aW9uc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuY29mZmVlIiwic2NlbmUuY29mZmVlIiwic2h1ZmZsZWQuY29mZmVlIiwiZW50aXRpZXMvc2tldGNoLmNvZmZlZSIsImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDMkJ1Qjs7OztBQzNCdkIsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsT0FBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQW5DLENBQUE7QUFBQSxJQUNBLDRDQUFNLE9BQU4sQ0FEQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFJQSxpQkFBQSxHQUFtQixTQUFDLEtBQUQsR0FBQTtXQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLE1BREg7RUFBQSxDQUpuQixDQUFBOztBQUFBLHVCQU9BLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxlQURjO0VBQUEs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biBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyMgRE8gTk9UIERFTEVURVxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cbmNsYXNzIEJhY2tncm91bmQgZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZSkgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gR2xvYmFscy5wcmlvcml0eS5iYWNrZ3JvdW5kXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQmFja2dyb3VuZFxuIiwiU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblxuY2xhc3MgQmVlclBvd2VyZWRFbmdpbmVcbiAgICBjb25zdHJ1Y3RvcjogKEB3aWR0aCwgQGhlaWdodCkgLT5cbiAgICAgICAgQHNjZW5lcyA9IHt9XG4gICAgICAgIEBzY2VuZSA9IG51bGxcbiAgICAgICAgQGluaXQoKVxuXG4gICAgICAgIHdpbmRvdy5iZWVyID0gQFxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHJlbmRlcmVyID0gUElYSS5hdXRvRGV0ZWN0UmVuZGVyZXIgQHdpZHRoLCBAaGVpZ2h0XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHJlbmRlcmVyLnZpZXdcblxuICAgICAgICBAc3RhdHMgPSBuZXcgU3RhdHNcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCBAc3RhdHMuZG9tRWxlbWVudFxuXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZVxuICAgICAgICByZXR1cm5cblxuICAgIGNyZWF0ZVNjZW5lOiAoaWQsIHRzY2VuZSwgY2FsbGJhY2spIC0+XG4gICAgICAgIHRzY2VuZSA/PSBTY2VuZVxuICAgICAgICBjYWxsYmFjayA/PSAtPlxuXG4gICAgICAgIHJldHVybiBgdW5kZWZpbmVkYCBpZiBAc2NlbmVzW2lkXVxuXG4gICAgICAgIHNjZW5lID0gbmV3IHRzY2VuZVxuICAgICAgICBzY2VuZS5pbml0KClcbiAgICAgICAgc2NlbmUub25VcGRhdGUgY2FsbGJhY2tcbiAgICAgICAgQHNjZW5lc1tpZF0gPSBzY2VuZVxuICAgICAgICBzY2VuZVxuXG4gICAgZ29Ub1NjZW5lOiAoaWQpIC0+XG4gICAgICAgIGlmIEBzY2VuZXNbaWRdP1xuICAgICAgICAgICAgQHNjZW5lPy5wYXVzZSgpXG4gICAgICAgICAgICBAc2NlbmUgPSBAc2NlbmVzW2lkXVxuICAgICAgICAgICAgQHNjZW5lLnJlc3VtZSgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBmYWxzZVxuXG4gICAgYW5pbWF0ZTogKGRlbHRhVGltZSkgPT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBhbmltYXRlXG5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAc2NlbmU/IG9yIEBzY2VuZS5pc1BhdXNlZCgpXG5cbiAgICAgICAgQHN0YXRzLmJlZ2luKClcbiAgICAgICAgQHNjZW5lLnVwZGF0ZSBkZWx0YVRpbWVcbiAgICAgICAgQHJlbmRlcmVyLnJlbmRlciBAc2NlbmVcbiAgICAgICAgQHN0YXRzLmVuZCgpXG5cbiAgICAgICAgVFdFRU4udXBkYXRlIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCZWVyUG93ZXJlZEVuZ2luZVxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgQm9hcmRTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyIDB4ZmZmZmZmXG5cbiAgICBpbml0OiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEB3YXJuaW5nID0gbmV3IFN5c3RlbVRleHQgJ1RoaXMgaXMgdGhlIGxlYWRlcmJvYXJkIHBhZ2UnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci54ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci55ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAd2FybmluZy5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbiA9IG5ldyBTeXN0ZW1UZXh0ICdCYWNrJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYmFja0J1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMiArIDEyMFxuICAgICAgICBAYmFja0J1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJhY2tCdXR0b24uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnbG9iYnknXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQnV0dG9uQWN0aXZlU3RhdGUgPVxuICAgIGluYWN0aXZlOiAwXG4gICAgYWN0aXZlOiAxXG5cbkJ1dHRvbk1vZGUgPVxuICAgIGZvY3VzOiAxXG4gICAgY2xpY2s6IDBcbiAgICBob3ZlcjogNVxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAoQHRleHR1cmVPbiwgQHRleHR1cmVPZmYsIEB0ZXh0dXJlUHJlc3MpIC0+XG4gICAgICAgIHN1cGVyIEB0ZXh0dXJlT25cbiAgICAgICAgQGlzUHJlc3MgPSBmYWxzZVxuICAgICAgICBAbW9kZSA9IEJ1dHRvbk1vZGUuZm9jdXNcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgaWYgQGlzUHJlc3NcbiAgICAgICAgICAgIGlmIEBtb2RlIGlzIEJ1dHRvbk1vZGUuY2xpY2tcbiAgICAgICAgICAgICAgICBAc2V0VGV4dHVyZSBAdGV4dHVyZVByZXNzXG4gICAgICAgIHJldHVyblxuXG4gICAgcHJlc3M6IC0+XG4gICAgICAgIEBpc1ByZXNzID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBkZXNrdG9wOlxuICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgIHdpZHRoOiA4MDBcbiAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgZmlsbDogJydcbiAgICBwaG9uZXM6XG4gICAgICAgIGFuZHJvaWQ6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIHdpbmRvd3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MDBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICB0YWJsZXRzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMjRcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDc2OFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICBpb3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcblxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXIgMHhmZmZmZmZcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBzeW1ib2xzID0gW11cbiAgICAgICAgeHBvcyA9IFtcbiAgICAgICAgICAgIDgwXG4gICAgICAgICAgICAxNjBcbiAgICAgICAgICAgIDI0MFxuICAgICAgICAgICAgMzIwXG4gICAgICAgICAgICA0MDBcbiAgICAgICAgICAgIDQ4MFxuICAgICAgICBdXG5cbiAgICAgICAgeXBvcyA9IFtcbiAgICAgICAgICAgIDgwXG4gICAgICAgICAgICAxNjBcbiAgICAgICAgICAgIDI0MFxuICAgICAgICAgICAgMzIwXG4gICAgICAgICAgICA0MDBcbiAgICAgICAgICAgIDQ4MFxuICAgICAgICBdXG5cbiAgICAgICAgQGNoYXJzID0gJ0FCQ0RFRicuc3BsaXQgJydcblxuICAgICAgICBpID0gMFxuICAgICAgICB3aGlsZSBpIDwgNlxuICAgICAgICAgICAgaiA9IDBcbiAgICAgICAgICAgIHdoaWxlIGogPCA2XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpICsgalxuXG4gICAgICAgICAgICAgICAgbiA9IEBnZXRSYW5kb21JbnQgMCwgNVxuXG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdID0gbmV3IFN5c3RlbVRleHQgQGNoYXJzW25dLFxuICAgICAgICAgICAgICAgICAgICBmb250OiAnYm9sZCA3MnB4IEFudG9uJ1xuICAgICAgICAgICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hbmNob3IueCA9IDAuNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hbmNob3IueSA9IDAuNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5wb3NpdGlvbi54ID0geHBvc1tqXVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5wb3NpdGlvbi55ID0geXBvc1tpXVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hZGRUb1NjZW5lIEBcbiAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgIGkrK1xuXG4gICAgICAgIEBidXR0b25zID0ge31cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXSA9IG5ldyBTeXN0ZW1UZXh0ICdzaHVmZmxlIScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyAyNjBcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5wb3NpdGlvbi55ID0gOTBcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9uc1snaW5mbyddID0gbmV3IFN5c3RlbVRleHQgJ2luZm8nLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydpbmZvJ10uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2luZm8nXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snaW5mbyddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgMjYwXG4gICAgICAgIEBidXR0b25zWydpbmZvJ10ucG9zaXRpb24ueSA9IDE0MFxuICAgICAgICBAYnV0dG9uc1snaW5mbyddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydmaW5kJ10gPSBuZXcgU3lzdGVtVGV4dCAnZXVyZWthJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snZmluZCddLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBidXR0b25zWydmaW5kJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDI2MFxuICAgICAgICBAYnV0dG9uc1snZmluZCddLnBvc2l0aW9uLnkgPSAzNDBcbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAb3ZlcmxheSA9IG5ldyBQSVhJLkdyYXBoaWNzXG4gICAgICAgIEBvdmVybGF5LmJlZ2luRmlsbCAweGZmZmZmXG4gICAgICAgIEBvdmVybGF5LmRyYXdDaXJjbGUgMCwgMCwgMzAwXG4gICAgICAgIEBvdmVybGF5LmVuZEZpbGwoKVxuICAgICAgICBAYWRkQ2hpbGQgQG92ZXJsYXlcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnggPSAwLjhcbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICMjaSA9IDBcbiAgICAgICAgICAgICMjd2hpbGUgaSA8IDZcbiAgICAgICAgICAgICMjICAgIGogPSAwXG4gICAgICAgICAgICAjIyAgICB3aGlsZSBqIDwgNlxuICAgICAgICAgICAgIyMgICAgICAgIGluZGV4ID0gaSArIGpcbiAgICAgICAgICAgICMjICAgICAgICBuID0gJC5nZXRSYW5kb21JbnQgMCwgJC5jaGFycy5sZW5ndGhcblxuICAgICAgICAgICAgIyMgICAgICAgICQuc3ltYm9sc1tpbmRleF0uc2V0VGV4dCAkLmNoYXJzW25dXG4gICAgICAgICAgICAjIyAgICAgICAgaisrXG4gICAgICAgICAgICAjIyAgICBpKytcblxuICAgICAgICAgICAgQHNob3dPdmVybGF5KClcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxuICAgIGdldFJhbmRvbUludDogKG1pbiwgbWF4KSAtPlxuICAgICAgICAoTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbilcblxuICAgIHNob3dPdmVybGF5OiAtPlxuICAgICAgICBcbiAgICAgICAgcmV0dXJuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU2NlbmVcbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBnYW1lTW9kZXM6XG4gICAgICAgIG9uSW50cm86IDJcbiAgICAgICAgb25Mb2JieTogNFxuICAgICAgICBvbkdhbWU6IDZcbiAgICAgICAgb25QYXVzZTogOFxuICAgICAgICBvbk9wdGlvbnM6IDEwXG4gICAgICAgIG9uRW5kOiAxMlxuICAgIHByaW9yaXR5OlxuICAgICAgICBiYWNrZ3JvdW5kOiAxMFxuICAgICAgICBub3JtYWw6IDUwXG4gICAgICAgIG92ZXJsYXk6IDYwXG4gICAgICAgIGJhbm5lcjogNzVcbiAgICAgICAgYWJvdmU6IDEwMFxuICAgICAgICBtYXg6IDk5OVxuICAgIHRleHR1cmVJbmRleDpcbiAgICAgICAgZ2FtZV9sb2dvOiAxXG4gICAgICAgIGJhY2tncm91bmRfMTogMlxuICAgICAgICBiYWNrZ3JvdW5kXzI6IDNcbiAgICAgICAgYmFja2dyb3VuZF8zOiA0XG4gICAgICAgIGJhY2tncm91bmRfNDogNVxuICAgICAgICBiYWNrZ3JvdW5kXzY6IDZcbiAgICAgICAgYnV0dG9uX3N0YXJ0OiA3XG4gICAgICAgIGJ1dHRvbl9wbGF5OiA4XG4gICAgICAgIGJ1dHRvbl9vcHRpb25zOiA5XG4gICAgICAgIGJ1dHRvbl9leGl0OiAxMFxuICAgICAgICBidXR0b25fc291bmRzOiAxMVxuICAgICAgICBidXR0b25faW5mbzogMTJcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuQnV0dG9uID0gcmVxdWlyZSAnQnV0dG9uJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIEludHJvU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlciAweGZmZmZmZlxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGV4dHVyZXMgPSBbXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0X2JsdWUucG5nJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdC5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9odG1sNV9sb2dvLnBuZydcbiAgICAgICAgXVxuXG4gICAgICAgIEBsb2dvTm9GaWxsID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMF1cbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5hbHBoYSA9IDAuMFxuICAgICAgICBAbG9nb05vRmlsbC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQHRlY2ggPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1syXVxuICAgICAgICBAdGVjaC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAdGVjaC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAdGVjaC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAdGVjaC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQHRlY2guc2NhbGUueCA9IDAuN1xuICAgICAgICBAdGVjaC5zY2FsZS55ID0gMC43XG4gICAgICAgIEB0ZWNoLmFscGhhID0gMC4wXG4gICAgICAgIEB0ZWNoLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIHRlY2hub2xvZ2llcyA9IG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgLCA0MDAwKS5yZXBlYXQoMSkuZGVsYXkoMTAwMCkueW95byh0cnVlKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkN1YmljLkluKS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQudGVjaC5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICkub25Db21wbGV0ZSggLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdjb21wbGV0ZWQgYW5pbWF0aW9uJ1xuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdsb2JieSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApXG5cbiAgICAgICAgbmV3IFRXRUVOLlR3ZWVuKFxuICAgICAgICAgICAgYWxwaGE6IDAuMFxuICAgICAgICApLnRvKFxuICAgICAgICAgICAgYWxwaGE6IDEuMFxuICAgICAgICAsIDQwMDApLnJlcGVhdCgxKS5kZWxheSgxMDAwKS55b3lvKHRydWUpLmVhc2luZyhUV0VFTi5FYXNpbmcuQ3ViaWMuSW4pLm9uVXBkYXRlKCAtPlxuICAgICAgICAgICAgJC5sb2dvLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICAkLmxvZ29Ob0ZpbGwuYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLmNoYWluKHRlY2hub2xvZ2llcykuc3RhcnQoKVxuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEludHJvU2NlbmVcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnQmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblByb2dyZXNzQmFyID0gcmVxdWlyZSAnUHJvZ3Jlc3NCYXInXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9hZGVyXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGFza3NEb25lID0gZmFsc2VcbiAgICAgICAgQHRhc2tzQ291bnQgPSAwXG4gICAgICAgIEB0YXNrc0NvbXBsZXRlZCA9IDBcblxuICAgICAgICBAc3RhcnRCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnUGxheScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24ucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgOTBcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFscGhhID0gMC4wXG4gICAgICAgIEBzdGFydEJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcblxuICAgICAgICBAc3RhcnRCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQudHJhZGVPZmYgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tncm91bmQuZmlsdGVycyA9IFskLm15RmlsdGVyXVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRvdWNoZW5kID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFkZFRvU3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQGxvYWRTb3VuZCA9IG5ldyBIb3dsXG4gICAgICAgICAgICB1cmxzOiBbJy9hc3NldHMvc291bmRzL2Zsb19yaWRhLm1wMyddXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2VcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgICAgIG9ubG9hZDogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZmluaXNoZWQgbG9hZGluZyBzb3VuZCdcblxuICAgIHRhc2tUb0xvYWQ6IChjb3VudCkgLT5cbiAgICAgICAgQHRhc2tzQ291bnQgPSBjb3VudFxuXG4gICAgYWRkVG9GaW5pc2hlZFRhc2s6ICgpIC0+XG4gICAgICAgIGlmIG5vdCBAdGFza3NDb3VudCBpcyBAdGFza3NDb21wbGV0ZWRcbiAgICAgICAgICAgIEB0YXNrc0NvbXBsZXRlZCArPSAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXNrc0RvbmUgPSB0cnVlXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlclxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9iYnlTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyIDB4ZmZmZmZmXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBAdGV4dHVyZXMgPSBbXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9lYXJ0aF9jaXJjbGUucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgQGxvZ29BbmdsZSA9IDBcbiAgICAgICAgQGxvZ28gPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1swXVxuICAgICAgICBAbG9nby5hbmNob3IueCA9IDAuNVxuICAgICAgICBAbG9nby5hbmNob3IueSA9IDAuNVxuICAgICAgICBAbG9nby5wb3NpdGlvbi54ID0gNzBcbiAgICAgICAgQGxvZ28ucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvLnNjYWxlLnggPSAwLjdcbiAgICAgICAgQGxvZ28uc2NhbGUueSA9IDAuN1xuICAgICAgICBAbG9nby5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9ucyA9IHt9XG4gICAgICAgIEBidXR0b25zWydzdGFydCddID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnbGVmdCdcbiAgICAgICAgICAgIGZpbGw6ICcjYTdkYmRiJ1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzY5ZDJlNydcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiAtIDEwXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10gPSBuZXcgU3lzdGVtVGV4dCAnT3B0aW9ucycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgZmlsbDogJyNhN2RiZGInXG4gICAgICAgICAgICBzdHJva2U6ICcjNjlkMmU3J1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLnBvc2l0aW9uLnkgPSAxNjBcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddID0gbmV3IFN5c3RlbVRleHQgJ0xlYWRlckJvYXJkcycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgZmlsbDogJyNhN2RiZGInXG4gICAgICAgICAgICBzdHJva2U6ICcjNjlkMmU3J1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydib2FyZCddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgMTBcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ucG9zaXRpb24ueSA9IDIzMFxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5hZGRUb1NjZW5lIEBcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgIyMgVE9ETzogbmVlZCB0byBtaW5pbWl6ZSBjb2RlXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgIHdpbmRvdy5iZWVyLnNjZW5lc1snbG9iYnknXS5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgIHdpbmRvdy5iZWVyLnNjZW5lc1snbG9iYnknXS5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdnYW1lJ1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnZWhsbydcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnb3B0aW9uJ1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnZWhsbydcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdib2FyZCdcblxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ2VobG8nXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAbG9nb0FuZ2xlID0gMCBpZiBAbG9nb0FuZ2xlID49IDM2MFxuICAgICAgICBAbG9nb0FuZ2xlICs9IDAuMDFcbiAgICAgICAgQGxvZ28ucm90YXRpb24gPSBAbG9nb0FuZ2xlXG5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYmJ5U2NlbmVcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuQnV0dG9uID0gcmVxdWlyZSAnQnV0dG9uJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIE9wdGlvblNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXIgMHhmZmZmZmZcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEB3YXJuaW5nID0gbmV3IFN5c3RlbVRleHQgJ1RoaXMgaXMgdGhlIG9wdGlvbiBwYWdlJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjYTdkYmRiJ1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzY5ZDJlNydcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueCA9IDAuNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueSA9IDAuNVxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi55ID0gOTBcbiAgICAgICAgQHdhcm5pbmcuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnQmFjaycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnI2E3ZGJkYidcbiAgICAgICAgICAgIHN0cm9rZTogJyM2OWQyZTcnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJhY2tCdXR0b24uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tCdXR0b24ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyA2MFxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDIgKyAxMjBcbiAgICAgICAgQGJhY2tCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBiYWNrQnV0dG9uLmFkZFRvU2NlbmUgQFxuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdsb2JieSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uU2NlbmVcbiIsImNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmVCbGFuaywgdGV4dHVyZUZ1bGwpIC0+XG4gICAgICAgIHN1cGVyIHRleHR1cmVCbGFua1xuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIHNldHRpbmdzOiAob3B0cykgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NCYXJcbiIsImNsYXNzIFNjZW5lIGV4dGVuZHMgUElYSS5TdGFnZVxuICAgIF9maW5pc2g6IGZhbHNlXG4gICAgX25leHQ6IG51bGxcbiAgICBfcG9sbDogKGRhdGEpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgY29uc3RydWN0b3I6IChiYWNrZ3JvdW5kKSAtPlxuICAgICAgICBiYWNrZ3JvdW5kID89IDB4MDAwMDAwXG5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG4gICAgICAgIHN1cGVyIGJhY2tncm91bmRcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpbml0OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBAX3BvbGwgQF9maW5pc2gsIEBfbmV4dFxuICAgICAgICByZXR1cm5cblxuICAgIHBhdXNlOiAtPlxuICAgICAgICBAcGF1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIHJlc3VtZTogLT5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG5cbiAgICAgICAgQF9maW5pc2ggPSBmYWxzZVxuICAgICAgICBAX25leHQgPSBudWxsXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmVlclBvd2VyZWRFbmdpbmUgPSByZXF1aXJlICdCZWVyUG93ZXJlZEVuZ2luZSdcbkJhY2tncm91bmQgPSByZXF1aXJlICdCYWNrZ3JvdW5kJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuTG9hZGVyID0gcmVxdWlyZSAnTG9hZGVyJ1xuXG4jIEN1cnJlbnQgU2NlbmVzXG5JbnRyb1NjZW5lID0gcmVxdWlyZSAnSW50cm9TY2VuZSdcbkxvYmJ5U2NlbmUgPSByZXF1aXJlICdMb2JieVNjZW5lJ1xuQm9hcmRTY2VuZSA9IHJlcXVpcmUgJ0JvYXJkU2NlbmUnXG5PcHRpb25TY2VuZSA9IHJlcXVpcmUgJ09wdGlvblNjZW5lJ1xuR2FtZVNjZW5lID0gcmVxdWlyZSAnR2FtZVNjZW5lJ1xuXG4jIFNodWZmbGVkQXBwXG4jIFRoZSBtYWluIGVudHJ5IHBvaW50IG9mIHRoZSBhcHBcbmNsYXNzIFNodWZmbGVkQXBwXG4gICAgX3N0YXJ0dXA6IHRydWUsXG4gICAgX21vZGU6IEdsb2JhbHMuZ2FtZU1vZGVzLm9uSW50cm8sXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQpIC0+XG5cbiAgICBza2V0Y2g6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQGVuZ2luZSA9IG5ldyBCZWVyUG93ZXJlZEVuZ2luZSBAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHRcblxuICAgICAgICBAZ2FtZSA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ2dhbWUnLCBHYW1lU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAbG9iYnkgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdsb2JieScsIExvYmJ5U2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAb3B0aW9uID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnb3B0aW9uJywgT3B0aW9uU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYm9hcmQgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdib2FyZCcsIEJvYXJkU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAaW50cm8gPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdpbnRybycsIEludHJvU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBlbmdpbmUuZ29Ub1NjZW5lICdnYW1lJyBpZiBAX3N0YXJ0dXAgaXMgdHJ1ZVxuXG4gICAgICAgIHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBTaHVmZmxlZEFwcFxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5cbmNsYXNzIFNrZXRjaCBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlKSAtPlxuICAgICAgICBAYWN0aW9ucyA9IHt9XG4gICAgICAgIEBhY3Rpb24gPSBudWxsXG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IDBcbiAgICAgICAgc3VwZXIgdGV4dHVyZVxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IChsYXllcikgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gbGF5ZXJcblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHlcblxuICAgIGNyZWF0ZUFjdGlvbjogKGlkKSAtPlxuICAgICAgICByZXR1cm4gYHVuZGVmaW5lZGAgaWYgQGFjdGlvbnNbaWRdXG5cbiAgICAgICAgYWN0aW9uID0gbmV3IEFjdGlvblxuICAgICAgICBAYWN0aW9ucyA9IGFjdGlvblxuICAgICAgICBhY3Rpb25cblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBTa2V0Y2hcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5jbGFzcyBTeXN0ZW1UZXh0IGV4dGVuZHMgUElYSS5UZXh0XG4gICAgY29uc3RydWN0b3I6IChtc2csIHN0eWxlKSAtPlxuICAgICAgICBzdXBlciBtc2csIHN0eWxlXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU3lzdGVtVGV4dFxuIl19
