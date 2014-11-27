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
      this.scene.init();
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
    BoardScene.__super__.constructor.apply(this, arguments);
    this.init();
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
      $._next = 'game';
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
    GameScene.__super__.constructor.apply(this, arguments);
    this.init();
  }

  GameScene.prototype.init = function() {
    var blur, i, index, j, n, xpos, ypos;
    blur = new PIXI.BlurFilter;
    this.symbols = [];
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/earth_circle.png')];
    this.background = new Sketch(this.textures[0]);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = Configs.desktop.settings.width / 2;
    this.background.position.y = Configs.desktop.settings.height / 2;
    this.background.filters = [blur];
    this.background.addToScene(this);
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
      var i, index, j, n;
      $.buttons['shuffle'].scale.x = 0.8;
      $.buttons['shuffle'].scale.y = 0.8;
      i = 0;
      while (i < 6) {
        j = 0;
        while (j < 6) {
          index = i + j;
          n = $.getRandomInt(0, $.chars.length);
          $.symbols[index].setText($.chars[n]);
          j++;
        }
        i++;
      }
    };
    GameScene.__super__.update.call(this, deltaTime);
  };

  GameScene.prototype.getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

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
    IntroScene.__super__.constructor.apply(this, arguments);
    this.init();
  }

  IntroScene.prototype.init = function() {
    var $, blur, technologies;
    $ = this;
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/pursuit_blue.png'), PIXI.Texture.fromImage('/assets/images/pursuit.png'), PIXI.Texture.fromImage('/assets/images/html5_logo.png')];
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
    technologies = new TWEEN.Tween({
      alpha: 0.0
    }).to({
      alpha: 1.0
    }, 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
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
    }, 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate(function() {
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
    LobbyScene.__super__.constructor.apply(this, arguments);
    this.init();
  }

  LobbyScene.prototype.init = function() {
    var blur;
    blur = new PIXI.BlurFilter;
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/earth_circle.png')];
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
  };

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
    OptionScene.__super__.constructor.apply(this, arguments);
    this.init();
  }

  OptionScene.prototype.init = function() {
    var blur;
    blur = new PIXI.BlurFilter;
    this.textures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/earth_circle.png')];
    this.background = new Sketch(this.textures[0]);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = Configs.desktop.settings.width / 2;
    this.background.position.y = Configs.desktop.settings.height / 2;
    this.background.filters = [blur];
    this.background.addToScene(this);
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


},{"Background":"Background","BeerPoweredEngine":"BeerPoweredEngine","GameScene":"GameScene","Globals":"Globals","IntroScene":"IntroScene","Loader":"Loader","LobbyScene":"LobbyScene","OptionScene":"OptionScene","Sketch":"Sketch"}],"Sketch":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwic2NlbmVzL2JvYXJkc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwic2NlbmVzL2dhbWVzY2VuZS5jb2ZmZWUiLCJnbG9iYWxzLmNvZmZlZSIsInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSIsImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiLCJzY2VuZXMvbG9iYnlzY2VuZS5jb2ZmZWUiLCJzY2VuZXMvb3B0aW9uc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuY29mZmVlIiwic2NlbmUuY29mZmVlIiwic2h1ZmZsZWQuY29mZmVlIiwiZW50aXRpZXMvc2tldGNoLmNvZmZlZSIsImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDMkJ1Qjs7OztBQzNCdkIsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsT0FBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQW5DLENBQUE7QUFBQSxJQUNBLDRDQUFNLE9BQU4sQ0FEQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFJQSxpQkFBQSxHQUFtQixTQUFDLEtBQUQsR0FBQTtXQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLE1BREg7RUFBQSxDQUpuQixDQUFBOztBQUFBLHVCQU9BLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxlQURjO0VBQUEs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QUEsSUFFQSxNQUFBLEdBQVMsR0FBQSxDQUFBLE1BRlQsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxNQUhYLENBQUE7V0FJQSxPQUxVO0VBQUEsQ0FaZCxDQUFBOztBQUFBLG1CQW1CQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixDQUFBLENBRFE7RUFBQSxDQW5CWixDQUFBOztnQkFBQTs7R0FEaUIsSUFBSSxDQUFDLE9BTDFCLENBQUE7O0FBQUEsTUE2Qk0sQ0FBQyxPQUFQLEdBQWlCLE1BN0JqQixDQUFBOzs7O0FDQUEsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsR0FBRCxFQUFNLEtBQU4sR0FBQTtBQUNULElBQUEsNENBQU0sR0FBTixFQUFXLEtBQVgsQ0FBQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFHQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixDQUFBLENBRFE7RUFBQSxDQUhaLENBQUE7O29CQUFBOztHQURxQixJQUFJLENBQUMsS0FGOUIsQ0FBQTs7QUFBQSxNQVVNLENBQUMsT0FBUCxHQUFpQixVQVZqQixDQUFBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiMjIERPIE5PVCBERUxFVEVcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5jbGFzcyBCYWNrZ3JvdW5kIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IEdsb2JhbHMucHJpb3JpdHkuYmFja2dyb3VuZFxuICAgICAgICBzdXBlciB0ZXh0dXJlXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogKGxheWVyKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBsYXllclxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eVxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJhY2tncm91bmRcbiIsIlNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5cbmNsYXNzIEJlZXJQb3dlcmVkRW5naW5lXG4gICAgY29uc3RydWN0b3I6IChAd2lkdGgsIEBoZWlnaHQpIC0+XG4gICAgICAgIEBzY2VuZXMgPSB7fVxuICAgICAgICBAc2NlbmUgPSBudWxsXG4gICAgICAgIEBpbml0KClcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIEByZW5kZXJlci52aWV3XG5cbiAgICAgICAgQHN0YXRzID0gbmV3IFN0YXRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHN0YXRzLmRvbUVsZW1lbnRcblxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBjcmVhdGVTY2VuZTogKGlkLCB0c2NlbmUsIGNhbGxiYWNrKSAtPlxuICAgICAgICB0c2NlbmUgPz0gU2NlbmVcbiAgICAgICAgY2FsbGJhY2sgPz0gLT5cblxuICAgICAgICByZXR1cm4gYHVuZGVmaW5lZGAgaWYgQHNjZW5lc1tpZF1cblxuICAgICAgICBzY2VuZSA9IG5ldyB0c2NlbmVcbiAgICAgICAgc2NlbmUub25VcGRhdGUgY2FsbGJhY2tcbiAgICAgICAgQHNjZW5lc1tpZF0gPSBzY2VuZVxuICAgICAgICBzY2VuZVxuXG4gICAgZ29Ub1NjZW5lOiAoaWQpIC0+XG4gICAgICAgIGlmIEBzY2VuZXNbaWRdP1xuICAgICAgICAgICAgQHNjZW5lPy5wYXVzZSgpXG4gICAgICAgICAgICBAc2NlbmUgPSBAc2NlbmVzW2lkXVxuICAgICAgICAgICAgQHNjZW5lLnJlc3VtZSgpXG4gICAgICAgICAgICBAc2NlbmUuaW5pdCgpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICBmYWxzZVxuXG4gICAgYW5pbWF0ZTogKGRlbHRhVGltZSkgPT5cbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lIEBhbmltYXRlXG5cbiAgICAgICAgcmV0dXJuIGlmIG5vdCBAc2NlbmU/IG9yIEBzY2VuZS5pc1BhdXNlZCgpXG5cbiAgICAgICAgQHN0YXRzLmJlZ2luKClcbiAgICAgICAgQHNjZW5lLnVwZGF0ZSBkZWx0YVRpbWVcbiAgICAgICAgQHJlbmRlcmVyLnJlbmRlciBAc2NlbmVcbiAgICAgICAgQHN0YXRzLmVuZCgpXG5cbiAgICAgICAgVFdFRU4udXBkYXRlIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCZWVyUG93ZXJlZEVuZ2luZVxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgQm9hcmRTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIEBpbml0KClcblxuICAgIGluaXQ6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQHdhcm5pbmcgPSBuZXcgU3lzdGVtVGV4dCAnVGhpcyBpcyB0aGUgbGVhZGVyYm9hcmQgcGFnZScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHdhcm5pbmcuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQHdhcm5pbmcuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQHdhcm5pbmcucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQHdhcm5pbmcucG9zaXRpb24ueSA9IDkwXG4gICAgICAgIEB3YXJuaW5nLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBiYWNrQnV0dG9uID0gbmV3IFN5c3RlbVRleHQgJ0JhY2snLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBiYWNrQnV0dG9uLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgNjBcbiAgICAgICAgQGJhY2tCdXR0b24ucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyICsgMTIwXG4gICAgICAgIEBiYWNrQnV0dG9uLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYmFja0J1dHRvbi5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdnYW1lJ1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQm9hcmRTY2VuZVxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cbkJ1dHRvbkFjdGl2ZVN0YXRlID1cbiAgICBpbmFjdGl2ZTogMFxuICAgIGFjdGl2ZTogMVxuXG5CdXR0b25Nb2RlID1cbiAgICBmb2N1czogMVxuICAgIGNsaWNrOiAwXG4gICAgaG92ZXI6IDVcblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKEB0ZXh0dXJlT24sIEB0ZXh0dXJlT2ZmLCBAdGV4dHVyZVByZXNzKSAtPlxuICAgICAgICBzdXBlciBAdGV4dHVyZU9uXG4gICAgICAgIEBpc1ByZXNzID0gZmFsc2VcbiAgICAgICAgQG1vZGUgPSBCdXR0b25Nb2RlLmZvY3VzXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIGlmIEBpc1ByZXNzXG4gICAgICAgICAgICBpZiBAbW9kZSBpcyBCdXR0b25Nb2RlLmNsaWNrXG4gICAgICAgICAgICAgICAgQHNldFRleHR1cmUgQHRleHR1cmVQcmVzc1xuICAgICAgICByZXR1cm5cblxuICAgIHByZXNzOiAtPlxuICAgICAgICBAaXNQcmVzcyA9IHRydWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uXG4iLCJtb2R1bGUuZXhwb3J0cyA9XG4gICAgZGVza3RvcDpcbiAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICBoZWlnaHQ6IDYwMFxuICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgcGhvbmVzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIGlvczpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiA0ODBcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDMyMFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICB3aW5kb3dzOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDgwMFxuICAgICAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgdGFibGV0czpcbiAgICAgICAgYW5kcm9pZDpcbiAgICAgICAgICAgIHNldHRpbmdzOlxuICAgICAgICAgICAgICAgIHdpZHRoOiAxMDI0XG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA3NjhcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG5cbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuQnV0dG9uID0gcmVxdWlyZSAnQnV0dG9uJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIEdhbWVTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyXG4gICAgICAgIEBpbml0KClcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIGJsdXIgPSBuZXcgUElYSS5CbHVyRmlsdGVyXG5cbiAgICAgICAgQHN5bWJvbHMgPSBbXVxuICAgICAgICBAdGV4dHVyZXMgPSBbXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9sb3N0X2tpZHNfY29udGVzdC5qcGcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9lYXJ0aF9jaXJjbGUucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgQGJhY2tncm91bmQgPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1swXVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQuZmlsdGVycyA9IFtibHVyXVxuICAgICAgICBAYmFja2dyb3VuZC5hZGRUb1NjZW5lIEBcblxuICAgICAgICB4cG9zID0gW1xuICAgICAgICAgICAgODBcbiAgICAgICAgICAgIDE2MFxuICAgICAgICAgICAgMjQwXG4gICAgICAgICAgICAzMjBcbiAgICAgICAgICAgIDQwMFxuICAgICAgICAgICAgNDgwXG4gICAgICAgIF1cblxuICAgICAgICB5cG9zID0gW1xuICAgICAgICAgICAgODBcbiAgICAgICAgICAgIDE2MFxuICAgICAgICAgICAgMjQwXG4gICAgICAgICAgICAzMjBcbiAgICAgICAgICAgIDQwMFxuICAgICAgICAgICAgNDgwXG4gICAgICAgIF1cblxuICAgICAgICBAY2hhcnMgPSAnQUJDREVGJy5zcGxpdCAnJ1xuXG4gICAgICAgIGkgPSAwXG4gICAgICAgIHdoaWxlIGkgPCA2XG4gICAgICAgICAgICBqID0gMFxuICAgICAgICAgICAgd2hpbGUgaiA8IDZcbiAgICAgICAgICAgICAgICBpbmRleCA9IGkgKyBqXG5cbiAgICAgICAgICAgICAgICBuID0gQGdldFJhbmRvbUludCAwLCA1XG5cbiAgICAgICAgICAgICAgICBAc3ltYm9sc1tpbmRleF0gPSBuZXcgU3lzdGVtVGV4dCBAY2hhcnNbbl0sXG4gICAgICAgICAgICAgICAgICAgIGZvbnQ6ICdib2xkIDcycHggQW50b24nXG4gICAgICAgICAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdLmFuY2hvci54ID0gMC41XG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdLmFuY2hvci55ID0gMC41XG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdLnBvc2l0aW9uLnggPSB4cG9zW2pdXG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdLnBvc2l0aW9uLnkgPSB5cG9zW2ldXG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdLmFkZFRvU2NlbmUgQFxuICAgICAgICAgICAgICAgIGorK1xuICAgICAgICAgICAgaSsrXG5cbiAgICAgICAgQGJ1dHRvbnMgPSB7fVxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddID0gbmV3IFN5c3RlbVRleHQgJ3NodWZmbGUhJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDI2MFxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydpbmZvJ10gPSBuZXcgU3lzdGVtVGV4dCAnaW5mbycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ2luZm8nXS5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snaW5mbyddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydpbmZvJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyAyNjBcbiAgICAgICAgQGJ1dHRvbnNbJ2luZm8nXS5wb3NpdGlvbi55ID0gMTQwXG4gICAgICAgIEBidXR0b25zWydpbmZvJ10uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXSA9IG5ldyBTeXN0ZW1UZXh0ICdldXJla2EnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydmaW5kJ10uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snZmluZCddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgMjYwXG4gICAgICAgIEBidXR0b25zWydmaW5kJ10ucG9zaXRpb24ueSA9IDM0MFxuICAgICAgICBAYnV0dG9uc1snZmluZCddLmFkZFRvU2NlbmUgQFxuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueSA9IDAuOFxuXG4gICAgICAgICAgICBpID0gMFxuICAgICAgICAgICAgd2hpbGUgaSA8IDZcbiAgICAgICAgICAgICAgICBqID0gMFxuICAgICAgICAgICAgICAgIHdoaWxlIGogPCA2XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gaSArIGpcbiAgICAgICAgICAgICAgICAgICAgbiA9ICQuZ2V0UmFuZG9tSW50IDAsICQuY2hhcnMubGVuZ3RoXG5cbiAgICAgICAgICAgICAgICAgICAgJC5zeW1ib2xzW2luZGV4XS5zZXRUZXh0ICQuY2hhcnNbbl1cbiAgICAgICAgICAgICAgICAgICAgaisrXG4gICAgICAgICAgICAgICAgaSsrXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRSYW5kb21JbnQ6IChtaW4sIG1heCkgLT5cbiAgICAgICAgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW4pXG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU2NlbmVcbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBnYW1lTW9kZXM6XG4gICAgICAgIG9uSW50cm86IDJcbiAgICAgICAgb25Mb2JieTogNFxuICAgICAgICBvbkdhbWU6IDZcbiAgICAgICAgb25QYXVzZTogOFxuICAgICAgICBvbk9wdGlvbnM6IDEwXG4gICAgICAgIG9uRW5kOiAxMlxuICAgIHByaW9yaXR5OlxuICAgICAgICBiYWNrZ3JvdW5kOiAxMFxuICAgICAgICBub3JtYWw6IDUwXG4gICAgICAgIG92ZXJsYXk6IDYwXG4gICAgICAgIGJhbm5lcjogNzVcbiAgICAgICAgYWJvdmU6IDEwMFxuICAgICAgICBtYXg6IDk5OVxuICAgIHRleHR1cmVJbmRleDpcbiAgICAgICAgZ2FtZV9sb2dvOiAxXG4gICAgICAgIGJhY2tncm91bmRfMTogMlxuICAgICAgICBiYWNrZ3JvdW5kXzI6IDNcbiAgICAgICAgYmFja2dyb3VuZF8zOiA0XG4gICAgICAgIGJhY2tncm91bmRfNDogNVxuICAgICAgICBiYWNrZ3JvdW5kXzY6IDZcbiAgICAgICAgYnV0dG9uX3N0YXJ0OiA3XG4gICAgICAgIGJ1dHRvbl9wbGF5OiA4XG4gICAgICAgIGJ1dHRvbl9vcHRpb25zOiA5XG4gICAgICAgIGJ1dHRvbl9leGl0OiAxMFxuICAgICAgICBidXR0b25fc291bmRzOiAxMVxuICAgICAgICBidXR0b25faW5mbzogMTJcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuQnV0dG9uID0gcmVxdWlyZSAnQnV0dG9uJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIEludHJvU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBAaW5pdCgpXG5cbiAgICBpbml0OiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xvc3Rfa2lkc19jb250ZXN0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXRfYmx1ZS5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0LnBuZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2h0bWw1X2xvZ28ucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgYmx1ciA9IG5ldyBQSVhJLkJsdXJGaWx0ZXJcblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gW2JsdXJdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvTm9GaWxsID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5hbHBoYSA9IDAuMFxuICAgICAgICBAbG9nb05vRmlsbC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzJdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQHRlY2ggPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1szXVxuICAgICAgICBAdGVjaC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAdGVjaC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAdGVjaC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAdGVjaC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQHRlY2guc2NhbGUueCA9IDAuN1xuICAgICAgICBAdGVjaC5zY2FsZS55ID0gMC43XG4gICAgICAgIEB0ZWNoLmFscGhhID0gMC4wXG4gICAgICAgIEB0ZWNoLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIHRlY2hub2xvZ2llcyA9IG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgLCA0MDAwKS5yZXBlYXQoMSkuZGVsYXkoMTAwMCkueW95byh0cnVlKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkVsYXN0aWMuSW5PdXQpLm9uVXBkYXRlKCAtPlxuICAgICAgICAgICAgJC50ZWNoLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5vbkNvbXBsZXRlKCAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ2NvbXBsZXRlZCBhbmltYXRpb24nXG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ2xvYmJ5J1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIClcblxuICAgICAgICBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgNDAwMCkucmVwZWF0KDEpLmRlbGF5KDEwMDApLnlveW8odHJ1ZSkuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLkluT3V0KS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQubG9nby5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgJC5sb2dvTm9GaWxsLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5jaGFpbih0ZWNobm9sb2dpZXMpLnN0YXJ0KClcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRyb1NjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmFja2dyb3VuZCA9IHJlcXVpcmUgJ0JhY2tncm91bmQnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5Qcm9ncmVzc0JhciA9IHJlcXVpcmUgJ1Byb2dyZXNzQmFyJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIExvYWRlclxuICAgIGNvbnN0cnVjdG9yOiAoQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0LCBAc3RhZ2UpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQHRhc2tzRG9uZSA9IGZhbHNlXG4gICAgICAgIEB0YXNrc0NvdW50ID0gMFxuICAgICAgICBAdGFza3NDb21wbGV0ZWQgPSAwXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueCA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBzdGFydEJ1dHRvbi5wb3NpdGlvbi55ID0gQHNjcmVlbldpZHRoIC8gMiArIDkwXG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbHBoYSA9IDAuMFxuICAgICAgICBAc3RhcnRCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLnRyYWRlT2ZmID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5jbGljayA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrZ3JvdW5kLmZpbHRlcnMgPSBbJC5teUZpbHRlcl1cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAc3RhcnRCdXR0b24udG91Y2hzdGFydCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaGVuZCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50YXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5hZGRUb1N0YWdlIEBzdGFnZVxuXG4gICAgICAgIEBsb2FkU291bmQgPSBuZXcgSG93bFxuICAgICAgICAgICAgdXJsczogWycvYXNzZXRzL3NvdW5kcy9mbG9fcmlkYS5tcDMnXVxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlXG4gICAgICAgICAgICBsb29wOiB0cnVlXG4gICAgICAgICAgICBvbmxvYWQ6IC0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2ZpbmlzaGVkIGxvYWRpbmcgc291bmQnXG5cbiAgICB0YXNrVG9Mb2FkOiAoY291bnQpIC0+XG4gICAgICAgIEB0YXNrc0NvdW50ID0gY291bnRcblxuICAgIGFkZFRvRmluaXNoZWRUYXNrOiAoKSAtPlxuICAgICAgICBpZiBub3QgQHRhc2tzQ291bnQgaXMgQHRhc2tzQ29tcGxldGVkXG4gICAgICAgICAgICBAdGFza3NDb21wbGV0ZWQgKz0gMVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAdGFza3NEb25lID0gdHJ1ZVxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXJcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuQnV0dG9uID0gcmVxdWlyZSAnQnV0dG9uJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIExvYmJ5U2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBAaW5pdCgpXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBibHVyID0gbmV3IFBJWEkuQmx1ckZpbHRlclxuXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xvc3Rfa2lkc19jb250ZXN0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2VhcnRoX2NpcmNsZS5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gW2JsdXJdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvQW5nbGUgPSAwXG4gICAgICAgIEBsb2dvID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMV1cbiAgICAgICAgQGxvZ28uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ28uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ28ucG9zaXRpb24ueCA9IDcwXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC43XG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjdcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnMgPSB7fVxuXG4gICAgICAgIEBidXR0b25zWydzdGFydCddID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydzdGFydCddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyIC0gMTBcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ucG9zaXRpb24ueSA9IDkwXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXSA9IG5ldyBTeXN0ZW1UZXh0ICdPcHRpb25zJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueSA9IDE2MFxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10gPSBuZXcgU3lzdGVtVGV4dCAnTGVhZGVyQm9hcmRzJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2xlZnQnXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyAxMFxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5wb3NpdGlvbi55ID0gMjMwXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAwLjhcbiAgICAgICAgIyMgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgIyMgICAgcmV0dXJuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi50b3VjaGVuZCA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICByZXR1cm5cbiAgICAgICAgIyNAc3RhcnRCdXR0b24udGFwID0gKGRhdGEpIC0+XG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICAjIyBUT0RPOiBuZWVkIHRvIG1pbmltaXplIGNvZGVcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAwLjhcbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ2dhbWUnXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ29wdGlvbidcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBsb2dvQW5nbGUgPSAwIGlmIEBsb2dvQW5nbGUgPj0gMzYwXG4gICAgICAgIEBsb2dvQW5nbGUgKz0gMC4wMVxuICAgICAgICBAbG9nby5yb3RhdGlvbiA9IEBsb2dvQW5nbGVcblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9iYnlTY2VuZVxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgT3B0aW9uU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBAaW5pdCgpXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBibHVyID0gbmV3IFBJWEkuQmx1ckZpbHRlclxuXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xvc3Rfa2lkc19jb250ZXN0LmpwZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2VhcnRoX2NpcmNsZS5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5maWx0ZXJzID0gW2JsdXJdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEB3YXJuaW5nID0gbmV3IFN5c3RlbVRleHQgJ1RoaXMgaXMgdGhlIG9wdGlvbiBwYWdlJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueCA9IDAuNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueSA9IDAuNVxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi55ID0gOTBcbiAgICAgICAgQHdhcm5pbmcuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnQmFjaycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJhY2tCdXR0b24uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tCdXR0b24ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyA2MFxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDIgKyAxMjBcbiAgICAgICAgQGJhY2tCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBiYWNrQnV0dG9uLmFkZFRvU2NlbmUgQFxuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdsb2JieSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uU2NlbmVcbiIsImNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmVCbGFuaywgdGV4dHVyZUZ1bGwpIC0+XG4gICAgICAgIHN1cGVyIHRleHR1cmVCbGFua1xuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIHNldHRpbmdzOiAob3B0cykgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NCYXJcbiIsImNsYXNzIFNjZW5lIGV4dGVuZHMgUElYSS5TdGFnZVxuICAgIF9maW5pc2g6IGZhbHNlXG4gICAgX25leHQ6IG51bGxcbiAgICBfcG9sbDogKGRhdGEpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgY29uc3RydWN0b3I6IChiYWNrZ3JvdW5kKSAtPlxuICAgICAgICBiYWNrZ3JvdW5kID89IDB4MDAwMDAwXG5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG4gICAgICAgIHN1cGVyIGJhY2tncm91bmRcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpbml0OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBAX3BvbGwgQF9maW5pc2gsIEBfbmV4dFxuICAgICAgICByZXR1cm5cblxuICAgIHBhdXNlOiAtPlxuICAgICAgICBAcGF1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIHJlc3VtZTogLT5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG5cbiAgICAgICAgQF9maW5pc2ggPSBmYWxzZVxuICAgICAgICBAX25leHQgPSBudWxsXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmVlclBvd2VyZWRFbmdpbmUgPSByZXF1aXJlICdCZWVyUG93ZXJlZEVuZ2luZSdcbkJhY2tncm91bmQgPSByZXF1aXJlICdCYWNrZ3JvdW5kJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuTG9hZGVyID0gcmVxdWlyZSAnTG9hZGVyJ1xuXG4jIEN1cnJlbnQgU2NlbmVzXG5JbnRyb1NjZW5lID0gcmVxdWlyZSAnSW50cm9TY2VuZSdcbkxvYmJ5U2NlbmUgPSByZXF1aXJlICdMb2JieVNjZW5lJ1xuT3B0aW9uU2NlbmUgPSByZXF1aXJlICdPcHRpb25TY2VuZSdcbkdhbWVTY2VuZSA9IHJlcXVpcmUgJ0dhbWVTY2VuZSdcblxuIyBTaHVmZmxlZEFwcFxuIyBUaGUgbWFpbiBlbnRyeSBwb2ludCBvZiB0aGUgYXBwXG5jbGFzcyBTaHVmZmxlZEFwcFxuICAgIF9zdGFydHVwOiB0cnVlLFxuICAgIF9tb2RlOiBHbG9iYWxzLmdhbWVNb2Rlcy5vbkludHJvLFxuICAgIGNvbnN0cnVjdG9yOiAoQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0KSAtPlxuXG4gICAgc2tldGNoOiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEBlbmdpbmUgPSBuZXcgQmVlclBvd2VyZWRFbmdpbmUgQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0XG5cbiAgICAgICAgQGdhbWUgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdnYW1lJywgR2FtZVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGxvYmJ5ID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnbG9iYnknLCBMb2JieVNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQG9wdGlvbiA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ29wdGlvbicsIE9wdGlvblNjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGludHJvID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnaW50cm8nLCBJbnRyb1NjZW5lLCAoZmluaXNoLCBzY2VuZSkgLT5cbiAgICAgICAgICAgIGlmIGZpbmlzaCBpcyB0cnVlXG4gICAgICAgICAgICAgICAgJC5lbmdpbmUuZ29Ub1NjZW5lIHNjZW5lXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAZW5naW5lLmdvVG9TY2VuZSAnZ2FtZScgaWYgQF9zdGFydHVwIGlzIHRydWVcblxuICAgICAgICB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gU2h1ZmZsZWRBcHBcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuXG5jbGFzcyBTa2V0Y2ggZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZSkgLT5cbiAgICAgICAgQGFjdGlvbnMgPSB7fVxuICAgICAgICBAYWN0aW9uID0gbnVsbFxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSAwXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBjcmVhdGVBY3Rpb246IChpZCkgLT5cbiAgICAgICAgcmV0dXJuIGB1bmRlZmluZWRgIGlmIEBhY3Rpb25zW2lkXVxuXG4gICAgICAgIGFjdGlvbiA9IG5ldyBBY3Rpb25cbiAgICAgICAgQGFjdGlvbnMgPSBhY3Rpb25cbiAgICAgICAgYWN0aW9uXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2tldGNoXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuY2xhc3MgU3lzdGVtVGV4dCBleHRlbmRzIFBJWEkuVGV4dFxuICAgIGNvbnN0cnVjdG9yOiAobXNnLCBzdHlsZSkgLT5cbiAgICAgICAgc3VwZXIgbXNnLCBzdHlsZVxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFN5c3RlbVRleHRcbiJdfQ==
