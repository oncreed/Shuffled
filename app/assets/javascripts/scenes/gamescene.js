var GameScene, Scene, Sketch, configs,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

configs = require('sh-configs');

Scene = require('scene');

Sketch = require('sketch');

GameScene = (function(_super) {
  __extends(GameScene, _super);

  function GameScene() {
    GameScene.__super__.constructor.apply(this, arguments);
    this.texture = PIXI.Texture.fromImage('/assets/images/library_concept.jpg');
    this.bunny = new Sketch(this.texture);
    this.bunny.anchor.x = 0.5;
    this.bunny.anchor.y = 0.5;
    this.bunny.position.x = configs.desktop.settings.width / 2;
    this.bunny.position.y = configs.desktop.settings.height / 2;
    this.bunny.addToScene(this);
  }

  GameScene.prototype.update = function(deltaTime) {
    GameScene.__super__.update.call(this, deltaTime);
  };

  return GameScene;

})(Scene);

module.exports = GameScene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9nYW1lc2NlbmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsaUNBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FBVixDQUFBOztBQUFBLEtBRUEsR0FBUSxPQUFBLENBQVEsT0FBUixDQUZSLENBQUE7O0FBQUEsTUFHQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSFQsQ0FBQTs7QUFBQTtBQU1JLDhCQUFBLENBQUE7O0FBQWEsRUFBQSxtQkFBQSxHQUFBO0FBQ1QsSUFBQSw0Q0FBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQWIsQ0FBdUIsb0NBQXZCLENBRFgsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLEtBQUQsR0FBYSxJQUFBLE1BQUEsQ0FBTyxJQUFDLENBQUEsT0FBUixDQUZiLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQWQsR0FBa0IsR0FIbEIsQ0FBQTtBQUFBLElBSUEsSUFBQyxDQUFBLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBZCxHQUFrQixHQUpsQixDQUFBO0FBQUEsSUFLQSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFoQixHQUFvQixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUF6QixHQUFpQyxDQUxyRCxDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFoQixHQUFvQixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxNQUF6QixHQUFrQyxDQU50RCxDQUFBO0FBQUEsSUFPQSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBa0IsSUFBbEIsQ0FQQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSxzQkFVQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUE7QUFDSixJQUFBLHNDQUFNLFNBQU4sQ0FBQSxDQURJO0VBQUEsQ0FWUixDQUFBOzttQkFBQTs7R0FEb0IsTUFMeEIsQ0FBQTs7QUFBQSxNQW9CTSxDQUFDLE9BQVAsR0FBaUIsU0FwQmpCLENBQUEiLCJmaWxlIjoic2NlbmVzL2dhbWVzY2VuZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNvbmZpZ3MgPSByZXF1aXJlICdzaC1jb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ3NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnc2tldGNoJ1xuXG5jbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBAdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xpYnJhcnlfY29uY2VwdC5qcGcnXG4gICAgICAgIEBidW5ueSA9IG5ldyBTa2V0Y2ggQHRleHR1cmVcbiAgICAgICAgQGJ1bm55LmFuY2hvci54ID0gMC41XG4gICAgICAgIEBidW5ueS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnVubnkucG9zaXRpb24ueCA9IGNvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJ1bm55LnBvc2l0aW9uLnkgPSBjb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMlxuICAgICAgICBAYnVubnkuYWRkVG9TY2VuZSBAXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU2NlbmVcbiJdfQ==