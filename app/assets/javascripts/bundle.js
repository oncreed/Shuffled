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
    var $;
    $ = this;
    this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
    document.body.appendChild(this.renderer.view);
    this.renderer.onProtonUpdate = function() {};
    this.renderer.onParticleCreated = function(particle) {
      var particleSprite;
      particleSprite = new PIXI.Sprite(particle.target);
      particle.sprite = particleSprite;
      $.scene.addChild(particle.sprite);
    };
    this.renderer.onParticleUpdate = function(particle) {
      transformSprite(particle.sprite, particle);
    };
    this.renderer.onParticleDead = function(particle) {
      $.scene.removeChild(particle.sprite);
    };
    this.stats = new Stats;
    document.body.appendChild(this.stats.domElement);
    this.proton = new Proton;
    this.emitter = new Proton.BehaviourEmitter;
    this.emitter.rate = new Proton.Rate(new Proton.Span(15, 13), new Proton.Span(.2, .5));
    this.emitter.addInitialize(new Proton.Mass(1));
    this.emitter.addInitialize(new Proton.ImageTarget(texture));
    this.emitter.addInitialize(new Proton.Life(2, 3));
    this.emitter.addInitialize(new Proton.Velocity(new Proton.Span(3, 9), new Proton.Span(0, 30, true), 'polar'));
    this.emitter.addBehaviour(new Proton.Gravity(8));
    this.emitter.addBehaviour(new Proton.Scale(new Proton.Span(1, 3), .3));
    this.emitter.addBehaviour(new Proton.Alpha(1, .5));
    this.emitter.addBehaviour(new Proton.Rotate(0, Proton.getSpan(-8, 9), 'add'));
    this.emitter.p.x = 1003 / 2;
    this.emitter.p.y = 100;
    this.emitter.emit();
    this.proton.addEmitter(this.emitter);
    this.emitter.addSelfBehaviour(new Proton.Gravity(5));
    this.emitter.addSelfBehaviour(new Proton.RandomDrift(30, 30, .1));
    this.emitter.addSelfBehaviour(new Proton.CrossZone(new Proton.RectZone(50, 0, 936, 610), 'bound'));
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

  BeerPoweredEngine.prototype.transformSprite = function(particleSprite, particle) {
    particleSprite.position.x = particle.p.x;
    particleSprite.position.y = particle.p.y;
    particleSprite.scale.x = particle.scale;
    particleSprite.scale.y = particle.scale;
    particleSprite.anchor.x = .5;
    particleSprite.anchor.y = .5;
    particleSprite.alpha = particle.alpha;
    return particleSprite.rotation = particle.rotation * Math.PI / 180;
  };

  BeerPoweredEngine.prototype.animate = function(deltaTime) {
    requestAnimationFrame(this.animate);
    if ((this.scene == null) || this.scene.isPaused()) {
      return;
    }
    this.stats.begin();
    this.scene.update(deltaTime);
    this.proton.update();
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
    GameScene.__super__.constructor.call(this, 0x6B92B9);
  }

  GameScene.prototype.init = function() {
    var canvas, context, i, index, j, n, xpos, ypos;
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
    canvas = document.createElement('canvas');
    canvas.width = Configs.desktop.settings.width;
    canvas.height = Configs.desktop.settings.height;
    context = canvas.getContext('2d');
    context.beginPath();
    context.rect(0, 0, Configs.desktop.settings.width, Configs.desktop.settings.height);
    context.fillStyle = 'rgba(0, 0, 0, 0.99)';
    context.fill();
    this.overlay = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
    this.overlay.alpha = 0.7;
    this.overlay.visible = false;
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

  GameScene.prototype.showOverlay = function() {
    this.overlay.visible = true;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtYWluLmNvZmZlZSIsImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIiwiYmVlcnBvd2VyZWRlbmdpbmUuY29mZmVlIiwic2NlbmVzL2JvYXJkc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvYnV0dG9uLmNvZmZlZSIsImNvbmZpZ3MuY29mZmVlIiwic2NlbmVzL2dhbWVzY2VuZS5jb2ZmZWUiLCJnbG9iYWxzLmNvZmZlZSIsInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSIsImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiLCJzY2VuZXMvbG9iYnlzY2VuZS5jb2ZmZWUiLCJzY2VuZXMvb3B0aW9uc2NlbmUuY29mZmVlIiwiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuY29mZmVlIiwic2NlbmUuY29mZmVlIiwic2h1ZmZsZWQuY29mZmVlIiwiZW50aXRpZXMvc2tldGNoLmNvZmZlZSIsImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDMkJ1Qjs7OztBQzNCdkIsSUFBQSxtQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUE7QUFHSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUMsT0FBRCxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsY0FBRCxHQUFrQixPQUFPLENBQUMsUUFBUSxDQUFDLFVBQW5DLENBQUE7QUFBQSxJQUNBLDRDQUFNLE9BQU4sQ0FEQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFJQSxpQkFBQSxHQUFtQixTQUFDLEtBQUQsR0FBQTtXQUNmLElBQUMsQ0FBQSxjQUFELEdBQWtCLE1BREg7RUFBQSxDQUpuQixDQUFBOztBQUFBLHVCQU9BLGlCQUFBLEdBQW1CLFNBQUEsR0FBQTtXQUNmLElBQUMsQ0FBQSxlQURjO0VBQUEs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QkFBQTs7R0FEcUIsSUFBSSxDQUFDLEtBRjlCLENBQUE7O0FBQUEsTUFVTSxDQUFDLE9BQVAsR0FBaUIsVUFWakIsQ0FBQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIjIyBETyBOT1QgREVMRVRFXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBHbG9iYWxzLnByaW9yaXR5LmJhY2tncm91bmRcbiAgICAgICAgc3VwZXIgdGV4dHVyZVxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IChsYXllcikgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gbGF5ZXJcblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHlcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iLCJTY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuXG5jbGFzcyBCZWVyUG93ZXJlZEVuZ2luZVxuICAgIGNvbnN0cnVjdG9yOiAoQHdpZHRoLCBAaGVpZ2h0KSAtPlxuICAgICAgICBAc2NlbmVzID0ge31cbiAgICAgICAgQHNjZW5lID0gbnVsbFxuICAgICAgICBAaW5pdCgpXG5cbiAgICAgICAgd2luZG93LmJlZXIgPSBAXG5cbiAgICBpbml0OiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEByZW5kZXJlciA9IFBJWEkuYXV0b0RldGVjdFJlbmRlcmVyIEB3aWR0aCwgQGhlaWdodFxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkIEByZW5kZXJlci52aWV3XG5cbiAgICAgICAgQHJlbmRlcmVyLm9uUHJvdG9uVXBkYXRlID0gLT5cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAcmVuZGVyZXIub25QYXJ0aWNsZUNyZWF0ZWQgPSAocGFydGljbGUpIC0+XG4gICAgICAgICAgICBwYXJ0aWNsZVNwcml0ZSA9IG5ldyBQSVhJLlNwcml0ZSBwYXJ0aWNsZS50YXJnZXRcbiAgICAgICAgICAgIHBhcnRpY2xlLnNwcml0ZSA9IHBhcnRpY2xlU3ByaXRlXG4gICAgICAgICAgICAkLnNjZW5lLmFkZENoaWxkIHBhcnRpY2xlLnNwcml0ZVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEByZW5kZXJlci5vblBhcnRpY2xlVXBkYXRlID0gKHBhcnRpY2xlKSAtPlxuICAgICAgICAgICAgdHJhbnNmb3JtU3ByaXRlIHBhcnRpY2xlLnNwcml0ZSwgcGFydGljbGVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAcmVuZGVyZXIub25QYXJ0aWNsZURlYWQgPSAocGFydGljbGUpIC0+XG4gICAgICAgICAgICAkLnNjZW5lLnJlbW92ZUNoaWxkIHBhcnRpY2xlLnNwcml0ZVxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXRzID0gbmV3IFN0YXRzXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQgQHN0YXRzLmRvbUVsZW1lbnRcblxuICAgICAgICBAcHJvdG9uID0gbmV3IFByb3RvblxuICAgICAgICBAZW1pdHRlciA9IG5ldyBQcm90b24uQmVoYXZpb3VyRW1pdHRlclxuICAgICAgICBAZW1pdHRlci5yYXRlID0gbmV3IFByb3Rvbi5SYXRlIG5ldyBQcm90b24uU3BhbigxNSwgMTMpLFxuICAgICAgICAgICAgbmV3IFByb3Rvbi5TcGFuKC4yLCAuNSlcbiAgICAgICAgQGVtaXR0ZXIuYWRkSW5pdGlhbGl6ZSBuZXcgUHJvdG9uLk1hc3MgMVxuICAgICAgICBAZW1pdHRlci5hZGRJbml0aWFsaXplIG5ldyBQcm90b24uSW1hZ2VUYXJnZXQgdGV4dHVyZVxuICAgICAgICBAZW1pdHRlci5hZGRJbml0aWFsaXplIG5ldyBQcm90b24uTGlmZSAyLCAzXG4gICAgICAgIEBlbWl0dGVyLmFkZEluaXRpYWxpemUgbmV3IFByb3Rvbi5WZWxvY2l0eSBuZXcgUHJvdG9uLlNwYW4oMywgOSksXG4gICAgICAgICAgICBuZXcgUHJvdG9uLlNwYW4oMCwgMzAsIHRydWUpLCAncG9sYXInXG4gICAgICAgIEBlbWl0dGVyLmFkZEJlaGF2aW91ciBuZXcgUHJvdG9uLkdyYXZpdHkgOFxuICAgICAgICBAZW1pdHRlci5hZGRCZWhhdmlvdXIgbmV3IFByb3Rvbi5TY2FsZSBuZXcgUHJvdG9uLlNwYW4oMSwgMyksIC4zXG4gICAgICAgIEBlbWl0dGVyLmFkZEJlaGF2aW91ciBuZXcgUHJvdG9uLkFscGhhIDEsIC41XG4gICAgICAgIEBlbWl0dGVyLmFkZEJlaGF2aW91ciBuZXcgUHJvdG9uLlJvdGF0ZSAwLCBQcm90b24uZ2V0U3BhbigtOCwgOSksICdhZGQnXG4gICAgICAgIEBlbWl0dGVyLnAueCA9IDEwMDMgLyAyXG4gICAgICAgIEBlbWl0dGVyLnAueSA9IDEwMFxuICAgICAgICBAZW1pdHRlci5lbWl0KClcbiAgICAgICAgQHByb3Rvbi5hZGRFbWl0dGVyIEBlbWl0dGVyXG5cbiAgICAgICAgQGVtaXR0ZXIuYWRkU2VsZkJlaGF2aW91ciBuZXcgUHJvdG9uLkdyYXZpdHkgNVxuICAgICAgICBAZW1pdHRlci5hZGRTZWxmQmVoYXZpb3VyIG5ldyBQcm90b24uUmFuZG9tRHJpZnQgMzAsIDMwLCAuMVxuICAgICAgICBAZW1pdHRlci5hZGRTZWxmQmVoYXZpb3VyIG5ldyBQcm90b24uQ3Jvc3Nab25lIG5ldyBQcm90b24uUmVjdFpvbmUoNTAsIDAsIDkzNiwgNjEwKSwgJ2JvdW5kJ1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgQGFuaW1hdGVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBjcmVhdGVTY2VuZTogKGlkLCB0c2NlbmUsIGNhbGxiYWNrKSAtPlxuICAgICAgICB0c2NlbmUgPz0gU2NlbmVcbiAgICAgICAgY2FsbGJhY2sgPz0gLT5cblxuICAgICAgICByZXR1cm4gYHVuZGVmaW5lZGAgaWYgQHNjZW5lc1tpZF1cblxuICAgICAgICBzY2VuZSA9IG5ldyB0c2NlbmVcbiAgICAgICAgc2NlbmUuaW5pdCgpXG4gICAgICAgIHNjZW5lLm9uVXBkYXRlIGNhbGxiYWNrXG4gICAgICAgIEBzY2VuZXNbaWRdID0gc2NlbmVcbiAgICAgICAgc2NlbmVcblxuICAgIGdvVG9TY2VuZTogKGlkKSAtPlxuICAgICAgICBpZiBAc2NlbmVzW2lkXT9cbiAgICAgICAgICAgIEBzY2VuZT8ucGF1c2UoKVxuICAgICAgICAgICAgQHNjZW5lID0gQHNjZW5lc1tpZF1cbiAgICAgICAgICAgIEBzY2VuZS5yZXN1bWUoKVxuICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgZmFsc2VcblxuICAgIHRyYW5zZm9ybVNwcml0ZTogKHBhcnRpY2xlU3ByaXRlLCBwYXJ0aWNsZSkgLT5cbiAgICAgICAgcGFydGljbGVTcHJpdGUucG9zaXRpb24ueCA9IHBhcnRpY2xlLnAueFxuICAgICAgICBwYXJ0aWNsZVNwcml0ZS5wb3NpdGlvbi55ID0gcGFydGljbGUucC55XG4gICAgICAgIHBhcnRpY2xlU3ByaXRlLnNjYWxlLnggPSBwYXJ0aWNsZS5zY2FsZVxuICAgICAgICBwYXJ0aWNsZVNwcml0ZS5zY2FsZS55ID0gcGFydGljbGUuc2NhbGVcbiAgICAgICAgcGFydGljbGVTcHJpdGUuYW5jaG9yLnggPSAuNVxuICAgICAgICBwYXJ0aWNsZVNwcml0ZS5hbmNob3IueSA9IC41XG4gICAgICAgIHBhcnRpY2xlU3ByaXRlLmFscGhhID0gcGFydGljbGUuYWxwaGFcbiAgICAgICAgcGFydGljbGVTcHJpdGUucm90YXRpb24gPSBwYXJ0aWNsZS5yb3RhdGlvbiAqIE1hdGguUEkgLyAxODBcblxuICAgIGFuaW1hdGU6IChkZWx0YVRpbWUpID0+XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBAYW5pbWF0ZVxuXG4gICAgICAgIHJldHVybiBpZiBub3QgQHNjZW5lPyBvciBAc2NlbmUuaXNQYXVzZWQoKVxuXG4gICAgICAgIEBzdGF0cy5iZWdpbigpXG4gICAgICAgIEBzY2VuZS51cGRhdGUgZGVsdGFUaW1lXG4gICAgICAgIEBwcm90b24udXBkYXRlKClcbiAgICAgICAgQHJlbmRlcmVyLnJlbmRlciBAc2NlbmVcbiAgICAgICAgQHN0YXRzLmVuZCgpXG5cbiAgICAgICAgVFdFRU4udXBkYXRlIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCZWVyUG93ZXJlZEVuZ2luZVxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgQm9hcmRTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyIDB4ZmZmZmZmXG5cbiAgICBpbml0OiAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEB3YXJuaW5nID0gbmV3IFN5c3RlbVRleHQgJ1RoaXMgaXMgdGhlIGxlYWRlcmJvYXJkIHBhZ2UnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci54ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci55ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAd2FybmluZy5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbiA9IG5ldyBTeXN0ZW1UZXh0ICdCYWNrJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYmFja0J1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMiArIDEyMFxuICAgICAgICBAYmFja0J1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJhY2tCdXR0b24uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnbG9iYnknXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCb2FyZFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQnV0dG9uQWN0aXZlU3RhdGUgPVxuICAgIGluYWN0aXZlOiAwXG4gICAgYWN0aXZlOiAxXG5cbkJ1dHRvbk1vZGUgPVxuICAgIGZvY3VzOiAxXG4gICAgY2xpY2s6IDBcbiAgICBob3ZlcjogNVxuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAoQHRleHR1cmVPbiwgQHRleHR1cmVPZmYsIEB0ZXh0dXJlUHJlc3MpIC0+XG4gICAgICAgIHN1cGVyIEB0ZXh0dXJlT25cbiAgICAgICAgQGlzUHJlc3MgPSBmYWxzZVxuICAgICAgICBAbW9kZSA9IEJ1dHRvbk1vZGUuZm9jdXNcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgaWYgQGlzUHJlc3NcbiAgICAgICAgICAgIGlmIEBtb2RlIGlzIEJ1dHRvbk1vZGUuY2xpY2tcbiAgICAgICAgICAgICAgICBAc2V0VGV4dHVyZSBAdGV4dHVyZVByZXNzXG4gICAgICAgIHJldHVyblxuXG4gICAgcHJlc3M6IC0+XG4gICAgICAgIEBpc1ByZXNzID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCdXR0b25cbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBkZXNrdG9wOlxuICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgIHdpZHRoOiA4MDBcbiAgICAgICAgICAgIGhlaWdodDogNjAwXG4gICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgZmlsbDogJydcbiAgICBwaG9uZXM6XG4gICAgICAgIGFuZHJvaWQ6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICAgICAgaW9zOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDQ4MFxuICAgICAgICAgICAgICAgIGhlaWdodDogMzIwXG4gICAgICAgICAgICBsb2FkZXI6XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZDogJydcbiAgICAgICAgICAgICAgICBsb2dvOiAnJ1xuICAgICAgICAgICAgICAgIGZpbGw6ICcnXG4gICAgICAgIHdpbmRvd3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogODAwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiA2MDBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcbiAgICB0YWJsZXRzOlxuICAgICAgICBhbmRyb2lkOlxuICAgICAgICAgICAgc2V0dGluZ3M6XG4gICAgICAgICAgICAgICAgd2lkdGg6IDEwMjRcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IDc2OFxuICAgICAgICAgICAgbG9hZGVyOlxuICAgICAgICAgICAgICAgIGJhY2tncm91bmQ6ICcnXG4gICAgICAgICAgICAgICAgbG9nbzogJydcbiAgICAgICAgICAgICAgICBmaWxsOiAnJ1xuICAgICAgICBpb3M6XG4gICAgICAgICAgICBzZXR0aW5nczpcbiAgICAgICAgICAgICAgICB3aWR0aDogNDgwXG4gICAgICAgICAgICAgICAgaGVpZ2h0OiAzMjBcbiAgICAgICAgICAgIGxvYWRlcjpcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kOiAnJ1xuICAgICAgICAgICAgICAgIGxvZ286ICcnXG4gICAgICAgICAgICAgICAgZmlsbDogJydcblxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXIgMHg2QjkyQjlcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBzeW1ib2xzID0gW11cbiAgICAgICAgeHBvcyA9IFtcbiAgICAgICAgICAgIDgwXG4gICAgICAgICAgICAxNjBcbiAgICAgICAgICAgIDI0MFxuICAgICAgICAgICAgMzIwXG4gICAgICAgICAgICA0MDBcbiAgICAgICAgICAgIDQ4MFxuICAgICAgICBdXG5cbiAgICAgICAgeXBvcyA9IFtcbiAgICAgICAgICAgIDgwXG4gICAgICAgICAgICAxNjBcbiAgICAgICAgICAgIDI0MFxuICAgICAgICAgICAgMzIwXG4gICAgICAgICAgICA0MDBcbiAgICAgICAgICAgIDQ4MFxuICAgICAgICBdXG5cbiAgICAgICAgQGNoYXJzID0gJ0FCQ0RFRicuc3BsaXQgJydcblxuICAgICAgICBpID0gMFxuICAgICAgICB3aGlsZSBpIDwgNlxuICAgICAgICAgICAgaiA9IDBcbiAgICAgICAgICAgIHdoaWxlIGogPCA2XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpICsgalxuXG4gICAgICAgICAgICAgICAgbiA9IEBnZXRSYW5kb21JbnQgMCwgNVxuXG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdID0gbmV3IFN5c3RlbVRleHQgQGNoYXJzW25dLFxuICAgICAgICAgICAgICAgICAgICBmb250OiAnYm9sZCA3MnB4IEFudG9uJ1xuICAgICAgICAgICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hbmNob3IueCA9IDAuNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hbmNob3IueSA9IDAuNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5wb3NpdGlvbi54ID0geHBvc1tqXVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5wb3NpdGlvbi55ID0geXBvc1tpXVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hZGRUb1NjZW5lIEBcbiAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgIGkrK1xuXG4gICAgICAgIEBidXR0b25zID0ge31cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXSA9IG5ldyBTeXN0ZW1UZXh0ICdzaHVmZmxlIScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyAyNjBcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5wb3NpdGlvbi55ID0gOTBcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9uc1snaW5mbyddID0gbmV3IFN5c3RlbVRleHQgJ2luZm8nLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydpbmZvJ10uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2luZm8nXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snaW5mbyddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgMjYwXG4gICAgICAgIEBidXR0b25zWydpbmZvJ10ucG9zaXRpb24ueSA9IDE0MFxuICAgICAgICBAYnV0dG9uc1snaW5mbyddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydmaW5kJ10gPSBuZXcgU3lzdGVtVGV4dCAnZXVyZWthJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snZmluZCddLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBidXR0b25zWydmaW5kJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDI2MFxuICAgICAgICBAYnV0dG9uc1snZmluZCddLnBvc2l0aW9uLnkgPSAzNDBcbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdjYW52YXMnXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aFxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodFxuXG4gICAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCAnMmQnXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgICAgICAgY29udGV4dC5yZWN0IDAsIDAsXG4gICAgICAgICAgICBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGgsXG4gICAgICAgICAgICBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMC45OSknXG4gICAgICAgIGNvbnRleHQuZmlsbCgpXG5cbiAgICAgICAgQG92ZXJsYXkgPSBuZXcgUElYSS5TcHJpdGUgUElYSS5UZXh0dXJlLmZyb21DYW52YXMgY2FudmFzXG4gICAgICAgIEBvdmVybGF5LmFscGhhID0gMC43XG4gICAgICAgIEBvdmVybGF5LnZpc2libGUgPSBmYWxzZVxuICAgICAgICBAYWRkQ2hpbGQgQG92ZXJsYXlcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnggPSAwLjhcbiAgICAgICAgICAgICQuYnV0dG9uc1snc2h1ZmZsZSddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgIEBzaG93T3ZlcmxheSgpXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRSYW5kb21JbnQ6IChtaW4sIG1heCkgLT5cbiAgICAgICAgKE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4gKyAxKSkgKyBtaW4pXG5cbiAgICBzaG93T3ZlcmxheTogLT5cbiAgICAgICAgQG92ZXJsYXkudmlzaWJsZSA9IHRydWVcbiAgICAgICAgcmV0dXJuXG5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU2NlbmVcbiIsIm1vZHVsZS5leHBvcnRzID1cbiAgICBnYW1lTW9kZXM6XG4gICAgICAgIG9uSW50cm86IDJcbiAgICAgICAgb25Mb2JieTogNFxuICAgICAgICBvbkdhbWU6IDZcbiAgICAgICAgb25QYXVzZTogOFxuICAgICAgICBvbk9wdGlvbnM6IDEwXG4gICAgICAgIG9uRW5kOiAxMlxuICAgIHByaW9yaXR5OlxuICAgICAgICBiYWNrZ3JvdW5kOiAxMFxuICAgICAgICBub3JtYWw6IDUwXG4gICAgICAgIG92ZXJsYXk6IDYwXG4gICAgICAgIGJhbm5lcjogNzVcbiAgICAgICAgYWJvdmU6IDEwMFxuICAgICAgICBtYXg6IDk5OVxuICAgIHRleHR1cmVJbmRleDpcbiAgICAgICAgZ2FtZV9sb2dvOiAxXG4gICAgICAgIGJhY2tncm91bmRfMTogMlxuICAgICAgICBiYWNrZ3JvdW5kXzI6IDNcbiAgICAgICAgYmFja2dyb3VuZF8zOiA0XG4gICAgICAgIGJhY2tncm91bmRfNDogNVxuICAgICAgICBiYWNrZ3JvdW5kXzY6IDZcbiAgICAgICAgYnV0dG9uX3N0YXJ0OiA3XG4gICAgICAgIGJ1dHRvbl9wbGF5OiA4XG4gICAgICAgIGJ1dHRvbl9vcHRpb25zOiA5XG4gICAgICAgIGJ1dHRvbl9leGl0OiAxMFxuICAgICAgICBidXR0b25fc291bmRzOiAxMVxuICAgICAgICBidXR0b25faW5mbzogMTJcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuQnV0dG9uID0gcmVxdWlyZSAnQnV0dG9uJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIEludHJvU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlciAweGZmZmZmZlxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGV4dHVyZXMgPSBbXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0X2JsdWUucG5nJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdC5wbmcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9odG1sNV9sb2dvLnBuZydcbiAgICAgICAgXVxuXG4gICAgICAgIEBsb2dvTm9GaWxsID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMF1cbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5hbHBoYSA9IDAuMFxuICAgICAgICBAbG9nb05vRmlsbC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ28uYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ28uYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQHRlY2ggPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1syXVxuICAgICAgICBAdGVjaC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAdGVjaC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAdGVjaC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAdGVjaC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQHRlY2guc2NhbGUueCA9IDAuN1xuICAgICAgICBAdGVjaC5zY2FsZS55ID0gMC43XG4gICAgICAgIEB0ZWNoLmFscGhhID0gMC4wXG4gICAgICAgIEB0ZWNoLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIHRlY2hub2xvZ2llcyA9IG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgLCA0MDAwKS5yZXBlYXQoMSkuZGVsYXkoMTAwMCkueW95byh0cnVlKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkN1YmljLkluKS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQudGVjaC5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICkub25Db21wbGV0ZSggLT5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nICdjb21wbGV0ZWQgYW5pbWF0aW9uJ1xuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdsb2JieSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApXG5cbiAgICAgICAgbmV3IFRXRUVOLlR3ZWVuKFxuICAgICAgICAgICAgYWxwaGE6IDAuMFxuICAgICAgICApLnRvKFxuICAgICAgICAgICAgYWxwaGE6IDEuMFxuICAgICAgICAsIDQwMDApLnJlcGVhdCgxKS5kZWxheSgxMDAwKS55b3lvKHRydWUpLmVhc2luZyhUV0VFTi5FYXNpbmcuQ3ViaWMuSW4pLm9uVXBkYXRlKCAtPlxuICAgICAgICAgICAgJC5sb2dvLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICAkLmxvZ29Ob0ZpbGwuYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLmNoYWluKHRlY2hub2xvZ2llcykuc3RhcnQoKVxuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEludHJvU2NlbmVcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5CYWNrZ3JvdW5kID0gcmVxdWlyZSAnQmFja2dyb3VuZCdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcblByb2dyZXNzQmFyID0gcmVxdWlyZSAnUHJvZ3Jlc3NCYXInXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9hZGVyXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQsIEBzdGFnZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAdGFza3NEb25lID0gZmFsc2VcbiAgICAgICAgQHRhc2tzQ291bnQgPSAwXG4gICAgICAgIEB0YXNrc0NvbXBsZXRlZCA9IDBcblxuICAgICAgICBAc3RhcnRCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnUGxheScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24ucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgOTBcbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFscGhhID0gMC4wXG4gICAgICAgIEBzdGFydEJ1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcblxuICAgICAgICBAc3RhcnRCdXR0b24ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQudHJhZGVPZmYgPSB0cnVlXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmNsaWNrID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tncm91bmQuZmlsdGVycyA9IFskLm15RmlsdGVyXVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaHN0YXJ0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRvdWNoZW5kID0gKGRhdGEpIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLmFkZFRvU3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQGxvYWRTb3VuZCA9IG5ldyBIb3dsXG4gICAgICAgICAgICB1cmxzOiBbJy9hc3NldHMvc291bmRzL2Zsb19yaWRhLm1wMyddXG4gICAgICAgICAgICBhdXRvcGxheTogZmFsc2VcbiAgICAgICAgICAgIGxvb3A6IHRydWVcbiAgICAgICAgICAgIG9ubG9hZDogLT5cbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyAnZmluaXNoZWQgbG9hZGluZyBzb3VuZCdcblxuICAgIHRhc2tUb0xvYWQ6IChjb3VudCkgLT5cbiAgICAgICAgQHRhc2tzQ291bnQgPSBjb3VudFxuXG4gICAgYWRkVG9GaW5pc2hlZFRhc2s6ICgpIC0+XG4gICAgICAgIGlmIG5vdCBAdGFza3NDb3VudCBpcyBAdGFza3NDb21wbGV0ZWRcbiAgICAgICAgICAgIEB0YXNrc0NvbXBsZXRlZCArPSAxXG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIEB0YXNrc0RvbmUgPSB0cnVlXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlclxuIiwiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgTG9iYnlTY2VuZSBleHRlbmRzIFNjZW5lXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIHN1cGVyIDB4ZmZmZmZmXG5cbiAgICBpbml0OiAtPlxuICAgICAgICBAdGV4dHVyZXMgPSBbXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9lYXJ0aF9jaXJjbGUucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgQGxvZ29BbmdsZSA9IDBcbiAgICAgICAgQGxvZ28gPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1swXVxuICAgICAgICBAbG9nby5hbmNob3IueCA9IDAuNVxuICAgICAgICBAbG9nby5hbmNob3IueSA9IDAuNVxuICAgICAgICBAbG9nby5wb3NpdGlvbi54ID0gNzBcbiAgICAgICAgQGxvZ28ucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvLnNjYWxlLnggPSAwLjdcbiAgICAgICAgQGxvZ28uc2NhbGUueSA9IDAuN1xuICAgICAgICBAbG9nby5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9ucyA9IHt9XG4gICAgICAgIEBidXR0b25zWydzdGFydCddID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnbGVmdCdcbiAgICAgICAgICAgIGZpbGw6ICcjYTdkYmRiJ1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzY5ZDJlNydcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiAtIDEwXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10gPSBuZXcgU3lzdGVtVGV4dCAnT3B0aW9ucycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgZmlsbDogJyNhN2RiZGInXG4gICAgICAgICAgICBzdHJva2U6ICcjNjlkMmU3J1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLnBvc2l0aW9uLnkgPSAxNjBcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddID0gbmV3IFN5c3RlbVRleHQgJ0xlYWRlckJvYXJkcycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgZmlsbDogJyNhN2RiZGInXG4gICAgICAgICAgICBzdHJva2U6ICcjNjlkMmU3J1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydib2FyZCddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgMTBcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ucG9zaXRpb24ueSA9IDIzMFxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5hZGRUb1NjZW5lIEBcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgIyMgVE9ETzogbmVlZCB0byBtaW5pbWl6ZSBjb2RlXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgIHdpbmRvdy5iZWVyLnNjZW5lc1snbG9iYnknXS5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgIHdpbmRvdy5iZWVyLnNjZW5lc1snbG9iYnknXS5idXR0b25zWydzdGFydCddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgd2luZG93LmJlZXIuc2NlbmVzWydsb2JieSddLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdnYW1lJ1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnZWhsbydcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAwLjhcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnb3B0aW9uJ1xuXG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnZWhsbydcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdib2FyZCdcblxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ2VobG8nXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS55ID0gMS4wXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAbG9nb0FuZ2xlID0gMCBpZiBAbG9nb0FuZ2xlID49IDM2MFxuICAgICAgICBAbG9nb0FuZ2xlICs9IDAuMDFcbiAgICAgICAgQGxvZ28ucm90YXRpb24gPSBAbG9nb0FuZ2xlXG5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYmJ5U2NlbmVcbiIsIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuQnV0dG9uID0gcmVxdWlyZSAnQnV0dG9uJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIE9wdGlvblNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXIgMHhmZmZmZmZcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEB3YXJuaW5nID0gbmV3IFN5c3RlbVRleHQgJ1RoaXMgaXMgdGhlIG9wdGlvbiBwYWdlJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjYTdkYmRiJ1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzY5ZDJlNydcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueCA9IDAuNVxuICAgICAgICBAd2FybmluZy5hbmNob3IueSA9IDAuNVxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAd2FybmluZy5wb3NpdGlvbi55ID0gOTBcbiAgICAgICAgQHdhcm5pbmcuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGJhY2tCdXR0b24gPSBuZXcgU3lzdGVtVGV4dCAnQmFjaycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnI2E3ZGJkYidcbiAgICAgICAgICAgIHN0cm9rZTogJyM2OWQyZTcnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJhY2tCdXR0b24uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tCdXR0b24ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyA2MFxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDIgKyAxMjBcbiAgICAgICAgQGJhY2tCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBiYWNrQnV0dG9uLmFkZFRvU2NlbmUgQFxuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDAuOFxuICAgICAgICAgICAgJC5fZmluaXNoID0gdHJ1ZVxuICAgICAgICAgICAgJC5fbmV4dCA9ICdsb2JieSdcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYmFja0J1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gT3B0aW9uU2NlbmVcbiIsImNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmVCbGFuaywgdGV4dHVyZUZ1bGwpIC0+XG4gICAgICAgIHN1cGVyIHRleHR1cmVCbGFua1xuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIHNldHRpbmdzOiAob3B0cykgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NCYXJcbiIsImNsYXNzIFNjZW5lIGV4dGVuZHMgUElYSS5TdGFnZVxuICAgIF9maW5pc2g6IGZhbHNlXG4gICAgX25leHQ6IG51bGxcbiAgICBfcG9sbDogKGRhdGEpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgY29uc3RydWN0b3I6IChiYWNrZ3JvdW5kKSAtPlxuICAgICAgICBiYWNrZ3JvdW5kID89IDB4MDAwMDAwXG5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG4gICAgICAgIHN1cGVyIGJhY2tncm91bmRcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpbml0OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBAX3BvbGwgQF9maW5pc2gsIEBfbmV4dFxuICAgICAgICByZXR1cm5cblxuICAgIHBhdXNlOiAtPlxuICAgICAgICBAcGF1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIHJlc3VtZTogLT5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG5cbiAgICAgICAgQF9maW5pc2ggPSBmYWxzZVxuICAgICAgICBAX25leHQgPSBudWxsXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iLCJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuQmVlclBvd2VyZWRFbmdpbmUgPSByZXF1aXJlICdCZWVyUG93ZXJlZEVuZ2luZSdcbkJhY2tncm91bmQgPSByZXF1aXJlICdCYWNrZ3JvdW5kJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuTG9hZGVyID0gcmVxdWlyZSAnTG9hZGVyJ1xuXG4jIEN1cnJlbnQgU2NlbmVzXG5JbnRyb1NjZW5lID0gcmVxdWlyZSAnSW50cm9TY2VuZSdcbkxvYmJ5U2NlbmUgPSByZXF1aXJlICdMb2JieVNjZW5lJ1xuQm9hcmRTY2VuZSA9IHJlcXVpcmUgJ0JvYXJkU2NlbmUnXG5PcHRpb25TY2VuZSA9IHJlcXVpcmUgJ09wdGlvblNjZW5lJ1xuR2FtZVNjZW5lID0gcmVxdWlyZSAnR2FtZVNjZW5lJ1xuXG4jIFNodWZmbGVkQXBwXG4jIFRoZSBtYWluIGVudHJ5IHBvaW50IG9mIHRoZSBhcHBcbmNsYXNzIFNodWZmbGVkQXBwXG4gICAgX3N0YXJ0dXA6IHRydWUsXG4gICAgX21vZGU6IEdsb2JhbHMuZ2FtZU1vZGVzLm9uSW50cm8sXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQpIC0+XG5cbiAgICBza2V0Y2g6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQGVuZ2luZSA9IG5ldyBCZWVyUG93ZXJlZEVuZ2luZSBAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHRcblxuICAgICAgICBAZ2FtZSA9IEBlbmdpbmUuY3JlYXRlU2NlbmUgJ2dhbWUnLCBHYW1lU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAbG9iYnkgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdsb2JieScsIExvYmJ5U2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAb3B0aW9uID0gQGVuZ2luZS5jcmVhdGVTY2VuZSAnb3B0aW9uJywgT3B0aW9uU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYm9hcmQgPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdib2FyZCcsIEJvYXJkU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAaW50cm8gPSBAZW5naW5lLmNyZWF0ZVNjZW5lICdpbnRybycsIEludHJvU2NlbmUsIChmaW5pc2gsIHNjZW5lKSAtPlxuICAgICAgICAgICAgaWYgZmluaXNoIGlzIHRydWVcbiAgICAgICAgICAgICAgICAkLmVuZ2luZS5nb1RvU2NlbmUgc2NlbmVcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBlbmdpbmUuZ29Ub1NjZW5lICdnYW1lJyBpZiBAX3N0YXJ0dXAgaXMgdHJ1ZVxuXG4gICAgICAgIHRydWVcblxubW9kdWxlLmV4cG9ydHMgPSBTaHVmZmxlZEFwcFxuIiwiR2xvYmFscyA9IHJlcXVpcmUgJ0dsb2JhbHMnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5cbmNsYXNzIFNrZXRjaCBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlKSAtPlxuICAgICAgICBAYWN0aW9ucyA9IHt9XG4gICAgICAgIEBhY3Rpb24gPSBudWxsXG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IDBcbiAgICAgICAgc3VwZXIgdGV4dHVyZVxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IChsYXllcikgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gbGF5ZXJcblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHlcblxuICAgIGNyZWF0ZUFjdGlvbjogKGlkKSAtPlxuICAgICAgICByZXR1cm4gYHVuZGVmaW5lZGAgaWYgQGFjdGlvbnNbaWRdXG5cbiAgICAgICAgYWN0aW9uID0gbmV3IEFjdGlvblxuICAgICAgICBAYWN0aW9ucyA9IGFjdGlvblxuICAgICAgICBhY3Rpb25cblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBTa2V0Y2hcbiIsIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5jbGFzcyBTeXN0ZW1UZXh0IGV4dGVuZHMgUElYSS5UZXh0XG4gICAgY29uc3RydWN0b3I6IChtc2csIHN0eWxlKSAtPlxuICAgICAgICBzdXBlciBtc2csIHN0eWxlXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU3lzdGVtVGV4dFxuIl19
