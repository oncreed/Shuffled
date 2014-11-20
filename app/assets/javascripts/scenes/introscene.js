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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9pbnRyb3NjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGtDQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTs7QUFBQSxLQUVBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FGUixDQUFBOztBQUFBLE1BR0EsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUE7QUFNSSwrQkFBQSxDQUFBOztBQUFhLEVBQUEsb0JBQUEsR0FBQTtBQUNULFFBQUEsT0FBQTtBQUFBLElBQUEsQ0FBQSxHQUFJLElBQUosQ0FBQTtBQUFBLElBRUEsNkNBQUEsU0FBQSxDQUZBLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxRQUFELEdBQVksQ0FDUixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsQ0FBdUIsc0NBQXZCLENBRFEsRUFFUixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsQ0FBdUIsaUNBQXZCLENBRlEsRUFHUixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsQ0FBdUIsNEJBQXZCLENBSFEsQ0FIWixDQUFBO0FBQUEsSUFTQSxJQUFBLEdBQU8sR0FBQSxDQUFBLElBQVEsQ0FBQyxVQVRoQixDQUFBO0FBQUEsSUFXQSxJQUFDLENBQUEsVUFBRCxHQUFrQixJQUFBLE1BQUEsQ0FBTyxJQUFDLENBQUEsUUFBUyxDQUFBLENBQUEsQ0FBakIsQ0FYbEIsQ0FBQTtBQUFBLElBWUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbkIsR0FBdUIsR0FadkIsQ0FBQTtBQUFBLElBYUEsSUFBQyxDQUFBLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBbkIsR0FBdUIsR0FidkIsQ0FBQTtBQUFBLElBY0EsSUFBQyxDQUFBLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBckIsR0FBeUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsS0FBekIsR0FBaUMsQ0FkMUQsQ0FBQTtB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LEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEtBSmpFLENBSXVFLENBQUMsUUFKeEUsQ0FJa0YsU0FBQSxHQUFBO0FBQ2xGLE1BQUEsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFQLEdBQWUsSUFBQyxDQUFBLEtBQWhCLENBQUE7QUFBQSxNQUNBLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBYixHQUFxQixJQUFDLENBQUEsS0FEdEIsQ0FEa0Y7SUFBQSxDQUpsRixDQVFILENBQUMsVUFSRSxDQVFVLFNBQUEsR0FBQTtBQUNWLE1BQUEsT0FBTyxDQUFDLEdBQVIsQ0FBWSxxQkFBWixDQUFBLENBQUE7QUFBQSxNQUNBLENBQUMsQ0FBQyxPQUFGLEdBQVksSUFEWixDQUFBO0FBQUEsTUFFQSxDQUFDLENBQUMsS0FBRixHQUFVLE9BRlYsQ0FEVTtJQUFBLENBUlYsQ0FhSCxDQUFDLEtBYkUsQ0FBQSxDQXZDSixDQURTO0VBQUEsQ0FBYjs7QUFBQSx1QkF1REEsTUFBQSxHQUFRLFNBQUMsU0FBRCxHQUFBO0FBQ0osSUFBQSx1Q0FBTSxTQUFOLENBQUEsQ0FESTtFQUFBLENBdkRSLENBQUE7O29CQUFBOztHQURxQixNQUx6QixDQUFBOztBQUFBLE1BaUVNLENBQUMsT0FBUCxHQUFpQixVQWpFakIsQ0FBQSIsImZpbGUiOiJzY2VuZXMvaW50cm9zY2VuZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuXG5jbGFzcyBJbnRyb1NjZW5lIGV4dGVuZHMgU2NlbmVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICBzdXBlclxuICAgICAgICBAdGV4dHVyZXMgPSBbXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9sb3N0X2tpZHNfY29udGVzdC5qcGcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9wdXJzdWl0X2JsdWUucG5nJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdC5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBibHVyID0gbmV3IFBJWEkuQmx1ckZpbHRlclxuXG4gICAgICAgIEBiYWNrZ3JvdW5kID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMF1cbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQuYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBiYWNrZ3JvdW5kLmZpbHRlcnMgPSBbYmx1cl1cbiAgICAgICAgQGJhY2tncm91bmQuYWRkVG9TY2VuZSBAXG5cbiAgICAgICAgQGxvZ29Ob0ZpbGwgPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1sxXVxuICAgICAgICBAbG9nb05vRmlsbC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAbG9nb05vRmlsbC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAbG9nb05vRmlsbC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAbG9nb05vRmlsbC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGxvZ29Ob0ZpbGwuc2NhbGUueCA9IDAuMlxuICAgICAgICBAbG9nb05vRmlsbC5zY2FsZS55ID0gMC4yXG4gICAgICAgIEBsb2dvTm9GaWxsLmFscGhhID0gMC4wXG4gICAgICAgIEBsb2dvTm9GaWxsLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBsb2dvID0gbmV3IFNrZXRjaCBAdGV4dHVyZXNbMl1cbiAgICAgICAgQGxvZ28uYW5jaG9yLnggPSAwLjVcbiAgICAgICAgQGxvZ28uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQGxvZ28ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGxvZ28ucG9zaXRpb24ueSA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy5oZWlnaHQgLyAyXG4gICAgICAgIEBsb2dvLnNjYWxlLnggPSAwLjJcbiAgICAgICAgQGxvZ28uc2NhbGUueSA9IDAuMlxuICAgICAgICBAbG9nby5hbHBoYSA9IDAuMFxuICAgICAgICBAbG9nby5hZGRUb1NjZW5lIEBcblxuICAgICAgICBuZXcgVFdFRU4uVHdlZW4oXG4gICAgICAgICAgICBhbHBoYTogMC4wXG4gICAgICAgICkudG8oXG4gICAgICAgICAgICBhbHBoYTogMS4wXG4gICAgICAgICwgOTAwMCkucmVwZWF0KDEpLmRlbGF5KDEwMDApLnlveW8odHJ1ZSkuZWFzaW5nKFRXRUVOLkVhc2luZy5FbGFzdGljLkluT3V0KS5vblVwZGF0ZSggLT5cbiAgICAgICAgICAgICQubG9nby5hbHBoYSA9IEBhbHBoYVxuICAgICAgICAgICAgJC5sb2dvTm9GaWxsLmFscGhhID0gQGFscGhhXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgKS5vbkNvbXBsZXRlKCAtPlxuICAgICAgICAgICAgY29uc29sZS5sb2cgJ2NvbXBsZXRlZCBhbmltYXRpb24nXG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ2xvYmJ5J1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgICkuc3RhcnQoKVxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gSW50cm9TY2VuZVxuIl19