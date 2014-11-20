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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2JhY2tncm91bmQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFNBQVIsQ0FBVixDQUFBOztBQUFBO0FBR0ksK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG9CQUFDLE9BQUQsR0FBQTtBQUNULElBQUEsSUFBQyxDQUFBLGNBQUQsR0FBa0IsT0FBTyxDQUFDLFFBQVEsQ0FBQyxVQUFuQyxDQUFBO0FBQUEsSUFDQSw0Q0FBTSxPQUFOLENBREEsQ0FEUztFQUFBLENBQWI7O0FBQUEsdUJBSUEsaUJBQUEsR0FBbUIsU0FBQyxLQUFELEdBQUE7V0FDZixJQUFDLENBQUEsY0FBRCxHQUFrQixNQURIO0VBQUEsQ0FKbkIsQ0FBQTs7QUFBQSx1QkFPQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7V0FDZixJQUFDLENBQUEsZUFEYztFQUFBLENBUG5CLENBQUE7O0FBQUEsdUJBVUEsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1IsSUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsQ0FBQSxDQURRO0VBQUEsQ0FWWixDQUFBOztvQkFBQTs7R0FEcUIsSUFBSSxDQUFDLE9BRjlCLENBQUE7O0FBQUEsTUFpQk0sQ0FBQyxPQUFQLEdBQWlCLFVBakJqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL2JhY2tncm91bmQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJHbG9iYWxzID0gcmVxdWlyZSAnR2xvYmFscydcblxuY2xhc3MgQmFja2dyb3VuZCBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlKSAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSBHbG9iYWxzLnByaW9yaXR5LmJhY2tncm91bmRcbiAgICAgICAgc3VwZXIgdGV4dHVyZVxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IChsYXllcikgLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5ID0gbGF5ZXJcblxuICAgIGdldFJlbmRlclByaW9yaXR5OiAtPlxuICAgICAgICBAcmVuZGVyUHJpb3JpdHlcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBCYWNrZ3JvdW5kXG4iXX0=