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
    context.fillStyle = 'rgba(0, 0, 0, 0.5)';
    context.fill();
    this.overlay = new PIXI.Sprite(PIXI.Texture.fromCanvas(canvas));
    this.overlay.visible = true;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9nYW1lc2NlbmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEscURBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FBVixDQUFBOztBQUFBLEtBRUEsR0FBUSxPQUFBLENBQVEsT0FBUixDQUZSLENBQUE7O0FBQUEsTUFHQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSFQsQ0FBQTs7QUFBQSxNQUlBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FKVCxDQUFBOztBQUFBLFVBS0EsR0FBYSxPQUFBLENBQVEsWUFBUixDQUxiLENBQUE7O0FBQUE7QUFRSSw4QkFBQSxDQUFBOztBQUFhLEVBQUEsbUJBQUEsR0FBQTtBQUNULElBQUEsMkNBQU0sUUFBTixDQUFBLENBRFM7RUFBQSxDQUFiOztBQUFBLHNCQUdBLElBQUEsR0FBTSxTQUFBLEdBQUE7QUFDRixRQUFBLDJDQUFBO0FBQUEsSUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLEVBQVgsQ0FBQTtBQUFBLElBQ0EsSUFBQSxHQUFPLENBQ0gsRUFERyxFQUVILEdBRkcsRUFHSCxHQUhHLEVBSUgsR0FKRyxFQUtILEdBTEcsRUFNSCxHQU5HLENBRFAsQ0FBQTtBQUFBLElBVUEsSUFBQSxHQUFPLENBQ0gsRUFERyxFQUVILEdBRkcsRUFHSCxHQUhHLEVBSUgsR0FKRyxFQUtILEdBTEcsRUFNSCxHQU5HLENBVlAsQ0FBQTtBQUFBLElBbUJBLElBQUMsQ0FBQSxLQUFELEdBQVMsUUFBUSxDQUFDLEtBQVQsQ0FBZSxFQUFmLENBbkJULENBQUE7QUFBQSxJQXFCQSxDQUFBLEdBQUksQ0FyQkosQ0FBQTtBQXNCQSxXQUFNLENBQUEsR0FBSSxDQUFWLEdBQUE7QUFDSSxNQUFBLENBQUEsR0FBSSxDQUFKLENBQUE7QUFDQSxhQUFNLENBQUEsR0FBSSxDQUFWLEdBQUE7QUFDSSxRQUFBLEtBQUEsR0FBUSxDQUFBLEdBQUksQ0FBWixDQUFBO0FBQUEsUUFFQSxD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Q0FBQSxDQUZBLENBRDRCO0lBQUEsQ0FYaEMsQ0FBQTtBQUFBLElBZ0JBLElBQUMsQ0FBQSxPQUFRLENBQUEsU0FBQSxDQUFVLENBQUMsT0FBcEIsR0FBOEIsU0FBQyxJQUFELEdBQUE7QUFDMUIsTUFBQSxDQUFDLENBQUMsT0FBUSxDQUFBLFNBQUEsQ0FBVSxDQUFDLEtBQUssQ0FBQyxDQUEzQixHQUErQixHQUEvQixDQUFBO0FBQUEsTUFDQSxDQUFDLENBQUMsT0FBUSxDQUFBLFNBQUEsQ0FBVSxDQUFDLEtBQUssQ0FBQyxDQUEzQixHQUErQixHQUQvQixDQUQwQjtJQUFBLENBaEI5QixDQUFBO0FBQUEsSUFxQkEsc0NBQU0sU0FBTixDQXJCQSxDQURJO0VBQUEsQ0FyR1IsQ0FBQTs7QUFBQSxzQkE4SEEsWUFBQSxHQUFjLFNBQUMsR0FBRCxFQUFNLEdBQU4sR0FBQTtXQUNULElBQUksQ0FBQyxLQUFMLENBQVcsSUFBSSxDQUFDLE1BQUwsQ0FBQSxDQUFBLEdBQWdCLENBQUMsR0FBQSxHQUFNLEdBQU4sR0FBWSxDQUFiLENBQTNCLENBQUEsR0FBOEMsSUFEckM7RUFBQSxDQTlIZCxDQUFBOztBQUFBLHNCQWlJQSxXQUFBLEdBQWEsU0FBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsT0FBTyxDQUFDLE9BQVQsR0FBbUIsSUFBbkIsQ0FEUztFQUFBLENBakliLENBQUE7O21CQUFBOztHQURvQixNQVB4QixDQUFBOztBQUFBLE1BOElNLENBQUMsT0FBUCxHQUFpQixTQTlJakIsQ0FBQSIsImZpbGUiOiJzY2VuZXMvZ2FtZXNjZW5lLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgR2FtZVNjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXIgMHg2QjkyQjlcblxuICAgIGluaXQ6IC0+XG4gICAgICAgIEBzeW1ib2xzID0gW11cbiAgICAgICAgeHBvcyA9IFtcbiAgICAgICAgICAgIDgwXG4gICAgICAgICAgICAxNjBcbiAgICAgICAgICAgIDI0MFxuICAgICAgICAgICAgMzIwXG4gICAgICAgICAgICA0MDBcbiAgICAgICAgICAgIDQ4MFxuICAgICAgICBdXG5cbiAgICAgICAgeXBvcyA9IFtcbiAgICAgICAgICAgIDgwXG4gICAgICAgICAgICAxNjBcbiAgICAgICAgICAgIDI0MFxuICAgICAgICAgICAgMzIwXG4gICAgICAgICAgICA0MDBcbiAgICAgICAgICAgIDQ4MFxuICAgICAgICBdXG5cbiAgICAgICAgQGNoYXJzID0gJ0FCQ0RFRicuc3BsaXQgJydcblxuICAgICAgICBpID0gMFxuICAgICAgICB3aGlsZSBpIDwgNlxuICAgICAgICAgICAgaiA9IDBcbiAgICAgICAgICAgIHdoaWxlIGogPCA2XG4gICAgICAgICAgICAgICAgaW5kZXggPSBpICsgalxuXG4gICAgICAgICAgICAgICAgbiA9IEBnZXRSYW5kb21JbnQgMCwgNVxuXG4gICAgICAgICAgICAgICAgQHN5bWJvbHNbaW5kZXhdID0gbmV3IFN5c3RlbVRleHQgQGNoYXJzW25dLFxuICAgICAgICAgICAgICAgICAgICBmb250OiAnYm9sZCA3MnB4IEFudG9uJ1xuICAgICAgICAgICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hbmNob3IueCA9IDAuNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hbmNob3IueSA9IDAuNVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5wb3NpdGlvbi54ID0geHBvc1tqXVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5wb3NpdGlvbi55ID0geXBvc1tpXVxuICAgICAgICAgICAgICAgIEBzeW1ib2xzW2luZGV4XS5hZGRUb1NjZW5lIEBcbiAgICAgICAgICAgICAgICBqKytcbiAgICAgICAgICAgIGkrK1xuXG4gICAgICAgIEBidXR0b25zID0ge31cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXSA9IG5ldyBTeXN0ZW1UZXh0ICdzaHVmZmxlIScsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICAgICBmaWxsOiAnIzNlMTcwNydcbiAgICAgICAgICAgIHN0cm9rZTogJyNhNDQxMGUnXG4gICAgICAgICAgICBzdHJva2VUaGlja25lc3M6IDVcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snc2h1ZmZsZSddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDIgKyAyNjBcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5wb3NpdGlvbi55ID0gOTBcbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9uc1snaW5mbyddID0gbmV3IFN5c3RlbVRleHQgJ2luZm8nLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydpbmZvJ10uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2luZm8nXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snaW5mbyddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgMjYwXG4gICAgICAgIEBidXR0b25zWydpbmZvJ10ucG9zaXRpb24ueSA9IDE0MFxuICAgICAgICBAYnV0dG9uc1snaW5mbyddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydmaW5kJ10gPSBuZXcgU3lzdGVtVGV4dCAnZXVyZWthJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snZmluZCddLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBidXR0b25zWydmaW5kJ10uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDI2MFxuICAgICAgICBAYnV0dG9uc1snZmluZCddLnBvc2l0aW9uLnkgPSAzNDBcbiAgICAgICAgQGJ1dHRvbnNbJ2ZpbmQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50ICdjYW52YXMnXG4gICAgICAgIGNhbnZhcy53aWR0aCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aFxuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodFxuXG4gICAgICAgIGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCAnMmQnXG4gICAgICAgIGNvbnRleHQuYmVnaW5QYXRoKClcbiAgICAgICAgY29udGV4dC5yZWN0IDAsIDAsXG4gICAgICAgICAgICBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGgsXG4gICAgICAgICAgICBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0XG4gICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMC41KSdcbiAgICAgICAgY29udGV4dC5maWxsKClcblxuICAgICAgICBAb3ZlcmxheSA9IG5ldyBQSVhJLlNwcml0ZSBQSVhJLlRleHR1cmUuZnJvbUNhbnZhcyBjYW52YXNcbiAgICAgICAgQG92ZXJsYXkudmlzaWJsZSA9IHRydWVcbiAgICAgICAgQGFkZENoaWxkIEBvdmVybGF5XG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10ubW91c2VvdmVyID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3NodWZmbGUnXS5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10ubW91c2Vkb3duID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS54ID0gMC44XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3NodWZmbGUnXS5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICBAc2hvd092ZXJsYXkoKVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydzaHVmZmxlJ10ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydzaHVmZmxlJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG5cbiAgICAgICAgc3VwZXIgZGVsdGFUaW1lXG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0UmFuZG9tSW50OiAobWluLCBtYXgpIC0+XG4gICAgICAgIChNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluICsgMSkpICsgbWluKVxuXG4gICAgc2hvd092ZXJsYXk6IC0+XG4gICAgICAgIEBvdmVybGF5LnZpc2libGUgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG5cbm1vZHVsZS5leHBvcnRzID0gR2FtZVNjZW5lXG4iXX0=