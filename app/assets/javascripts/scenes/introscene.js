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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLHNEQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTs7QUFBQSxLQUVBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FGUixDQUFBOztBQUFBLE1BR0EsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUEsTUFJQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSlQsQ0FBQTs7QUFBQSxVQUtBLEdBQWEsT0FBQSxDQUFRLFlBQVIsQ0FMYixDQUFBOztBQUFBO0FBUUksK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG9CQUFBLEdBQUE7QUFDVCxJQUFBLDRDQUFNLFFBQU4sQ0FBQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkFHQSxJQUFBLEdBQU0sU0FBQSxHQUFBO0FBQ0YsUUFBQSxlQUFBO0FBQUEsSUFBQSxDQUFBLEdBQUksSUFBSixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsUUFBRCxHQUFZLENBQ1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFiLENBQXVCLGlDQUF2QixDQURRLEVBRVIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFiLENBQXVCLDRCQUF2QixDQUZRLEVBR1IsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFiLENBQXVCLCtCQUF2QixDQUhRLENBRlosQ0FBQTtBQUFBLElBUUEsSUFBQyxDQUFBLFVBQUQsR0FBa0IsSUFBQSxNQUFBLENBQU8sSUFBQyxDQUFBLFFBQVMsQ0FBQSxDQUFBLENBQWpCLENBUmxCLENBQUE7QUFBQSxJQVNBLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQW5CLEdBQXVCLEdBVHZCLENBQUE7QUFBQSxJQVVBLElBQUMsQ0FBQSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQW5CLEdBQXVCLEdBVnZCLENBQUE7QUFBQSxJQVdBLElBQUMsQ0FBQSxVQUFVLENBQUMsUUFB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QUMsS0FBYixHQUFxQixJQUFDLENBQUEsS0FEdEIsQ0FENkU7SUFBQSxDQUo3RSxDQVFILENBQUMsS0FSRSxDQVFJLFlBUkosQ0FRaUIsQ0FBQyxLQVJsQixDQUFBLENBcERKLENBREU7RUFBQSxDQUhOLENBQUE7O0FBQUEsdUJBbUVBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQTtBQUNKLElBQUEsdUNBQU0sU0FBTixDQUFBLENBREk7RUFBQSxDQW5FUixDQUFBOztvQkFBQTs7R0FEcUIsTUFQekIsQ0FBQTs7QUFBQSxNQStFTSxDQUFDLE9BQVAsR0FBaUIsVUEvRWpCLENBQUEiLCJmaWxlIjoic2NlbmVzL2ludHJvc2NlbmUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJDb25maWdzID0gcmVxdWlyZSAnQ29uZmlncydcblxuU2NlbmUgPSByZXF1aXJlICdTY2VuZSdcblNrZXRjaCA9IHJlcXVpcmUgJ1NrZXRjaCdcbkJ1dHRvbiA9IHJlcXVpcmUgJ0J1dHRvbidcblN5c3RlbVRleHQgPSByZXF1aXJlICdTeXN0ZW1UZXh0J1xuXG5jbGFzcyBJbnRyb1NjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgc3VwZXIgMHhmZmZmZmZcblxuICAgIGluaXQ6IC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQHRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdF9ibHVlLnBuZydcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL3B1cnN1aXQucG5nJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvaHRtbDVfbG9nby5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBAbG9nb05vRmlsbCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nb05vRmlsbC5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYWxwaGEgPSAwLjBcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGxvZ28gPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1sxXVxuICAgICAgICBAbG9nby5hbmNob3IueCA9IDAuNVxuICAgICAgICBAbG9nby5hbmNob3IueSA9IDAuNVxuICAgICAgICBAbG9nby5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAbG9nby5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGxvZ28uc2NhbGUueCA9IDAuMlxuICAgICAgICBAbG9nby5zY2FsZS55ID0gMC4yXG4gICAgICAgIEBsb2dvLmFscGhhID0gMC4wXG4gICAgICAgIEBsb2dvLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEB0ZWNoID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMl1cbiAgICAgICAgQHRlY2guYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQHRlY2guYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQHRlY2gucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQHRlY2gucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEB0ZWNoLnNjYWxlLnggPSAwLjdcbiAgICAgICAgQHRlY2guc2NhbGUueSA9IDAuN1xuICAgICAgICBAdGVjaC5hbHBoYSA9IDAuMFxuICAgICAgICBAdGVjaC5hZGRUb1NjZW5lIEBcblxuICAgICAgICB0ZWNobm9sb2dpZXMgPSBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgNDAwMCkucmVwZWF0KDEpLmRlbGF5KDEwMDApLnlveW8odHJ1ZSkuZWFzaW5nKFRXRUVOLkVhc2luZy5DdWJpYy5Jbikub25VcGRhdGUoIC0+XG4gICAgICAgICAgICAkLnRlY2guYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLm9uQ29tcGxldGUoIC0+XG4gICAgICAgICAgICBjb25zb2xlLmxvZyAnY29tcGxldGVkIGFuaW1hdGlvbidcbiAgICAgICAgICAgICQuX2ZpbmlzaCA9IHRydWVcbiAgICAgICAgICAgICQuX25leHQgPSAnbG9iYnknXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKVxuXG4gICAgICAgIG5ldyBUV0VFTi5Ud2VlbihcbiAgICAgICAgICAgIGFscGhhOiAwLjBcbiAgICAgICAgKS50byhcbiAgICAgICAgICAgIGFscGhhOiAxLjBcbiAgICAgICAgLCA0MDAwKS5yZXBlYXQoMSkuZGVsYXkoMTAwMCkueW95byh0cnVlKS5lYXNpbmcoVFdFRU4uRWFzaW5nLkN1YmljLkluKS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQubG9nby5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgJC5sb2dvTm9GaWxsLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5jaGFpbih0ZWNobm9sb2dpZXMpLnN0YXJ0KClcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRyb1NjZW5lXG4iXX0=