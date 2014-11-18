var GameScene, Scene, Sketch,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = require('scene');

Sketch = require('sketch');

GameScene = (function(_super) {
  __extends(GameScene, _super);

  function GameScene() {
    GameScene.__super__.constructor.apply(this, arguments);
    this.texture = PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg');
    this.bunny = new Sketch(this.texture);
    this.bunny.addToScene(this);
  }

  GameScene.prototype.update = function(deltaTime) {
    GameScene.__super__.update.call(this, deltaTime);
  };

  return GameScene;

})(Scene);

module.exports = GameScene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9nYW1lc2NlbmUuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsd0JBQUE7RUFBQTtpU0FBQTs7QUFBQSxLQUFBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FBUixDQUFBOztBQUFBLE1BQ0EsR0FBUyxPQUFBLENBQVEsUUFBUixDQURULENBQUE7O0FBQUE7QUFJSSw4QkFBQSxDQUFBOztBQUFhLEVBQUEsbUJBQUEsR0FBQTtBQUNULElBQUEsNENBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFiLENBQXVCLHNDQUF2QixDQURYLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxLQUFELEdBQWEsSUFBQSxNQUFBLENBQU8sSUFBQyxDQUFBLE9BQVIsQ0FGYixDQUFBO0FBQUEsSUFHQSxJQUFDLENBQUEsS0FBSyxDQUFDLFVBQVAsQ0FBa0IsSUFBbEIsQ0FIQSxDQURTO0VBQUEsQ0FBYjs7QUFBQSxzQkFNQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUE7QUFDSixJQUFBLHNDQUFNLFNBQU4sQ0FBQSxDQURJO0VBQUEsQ0FOUixDQUFBOzttQkFBQTs7R0FEb0IsTUFIeEIsQ0FBQTs7QUFBQSxNQWNNLENBQUMsT0FBUCxHQUFpQixTQWRqQixDQUFBIiwiZmlsZSI6InNjZW5lcy9nYW1lc2NlbmUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJTY2VuZSA9IHJlcXVpcmUgJ3NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnc2tldGNoJ1xuXG5jbGFzcyBHYW1lU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBAdGV4dHVyZSA9IFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xvc3Rfa2lkc19jb250ZXN0LmpwZydcbiAgICAgICAgQGJ1bm55ID0gbmV3IFNrZXRjaCBAdGV4dHVyZVxuICAgICAgICBAYnVubnkuYWRkVG9TY2VuZSBAXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBHYW1lU2NlbmVcbiJdfQ==