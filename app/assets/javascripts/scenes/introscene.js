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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtDQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQSxLQUVBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FGUixDQUFBOztBQUFBLE1BR0EsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUE7QUFNSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUEsR0FBQTtBQUNULFFBQUEsUUFBQTtBQUFBLElBQUEsQ0FBQSxHQUFJLElBQUosQ0FBQTtBQUFBLElBRUEsNkNBQUEsU0FBQSxDQUZBLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FDUixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsQ0FBdUIsc0NBQXZCLENBRFEsRUFFUixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsQ0FBdUIsaUNBQXZCLENBRlEsRUFHUixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsQ0FBdUIsNEJBQXZCLENBSFEsQ0FIWixDQUFBO0FBQUEsSUFTQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLE1BQUEsQ0FBTyxJQUFDLENBQUEsUUFBUyxDQUFBLENBQUEsQ0FBakIsQ0FUbEIsQ0FBQTtBQUFBLElBVUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbkIsR0FBdUIsR0FWdkIsQ0FBQTtBQUFBLElBV0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbkIsR0FBdUIsR0FYdkIsQ0FBQTtBQUFBLElBWUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBckIsR0FBeUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBekIsR0FBaUMsQ0FaMUQsQ0FBQTtBQUFBLElBYUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBckIsR0FBeUIs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QUMsU0FBRCxHQUFBO0FBQ0osSUFBQSx1Q0FBTSxTQUFOLENBQUEsQ0FESTtFQUFBLENBL0NSLENBQUE7O29CQUFBOztHQURxQixNQUx6QixDQUFBOztBQUFBLE1BeURNLENBQUMsT0FBUCxHQUFpQixVQXpEakIsQ0FBQSIsImZpbGUiOiJzY2VuZXMvaW50cm9zY2VuZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNvbmZpZ3MgPSByZXF1aXJlICdzaC1jb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ3NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnc2tldGNoJ1xuXG5jbGFzcyBJbnRyb1NjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBzdXBlclxuICAgICAgICBAdGV4dHVyZXMgPSBbXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9sb3N0X2tpZHNfY29udGVzdC5qcGcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0X2JsdWUucG5nJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdC5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBAYmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzBdXG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nb05vRmlsbCA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnggPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEBsb2dvTm9GaWxsLnBvc2l0aW9uLnkgPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAbG9nb05vRmlsbC5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBsb2dvTm9GaWxsLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGxvZ28gPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1syXVxuICAgICAgICBAbG9nby5hbmNob3IueCA9IDAuNVxuICAgICAgICBAbG9nby5hbmNob3IueSA9IDAuNVxuICAgICAgICBAbG9nby5wb3NpdGlvbi54ID0gY29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAbG9nby5wb3NpdGlvbi55ID0gY29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGxvZ28uc2NhbGUueCA9IDAuMlxuICAgICAgICBAbG9nby5zY2FsZS55ID0gMC4yXG4gICAgICAgIEBsb2dvLmFscGhhID0gMC4wXG4gICAgICAgIEBsb2dvLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIHR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKFxuICAgICAgICAgICAgYWxwaGE6IDAuMFxuICAgICAgICApLnRvKFxuICAgICAgICAgICAgYWxwaGE6IDEuMFxuICAgICAgICAsIDkwMDApLmVhc2luZyhUV0VFTi5FYXNpbmcuRWxhc3RpYy5Jbk91dCkub25VcGRhdGUoIC0+XG4gICAgICAgICAgICAkLmxvZ28uYWxwaGEgPSBAYWxwaGFcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICApLm9uQ29tcGxldGUoIC0+XG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5zdGFydCgpXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRyb1NjZW5lXG4iXX0=