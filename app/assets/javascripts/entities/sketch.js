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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3NrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxzQkFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUEsS0FFQSxHQUFRLE9BQUEsQ0FBUSxPQUFSLENBRlIsQ0FBQTs7QUFBQSxNQUdBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FIVCxDQUFBOztBQUFBO0FBTUksMkJBQUEsQ0FBQTs7QUFBYSxFQUFBLGdCQUFDLE9BQUQsR0FBQTtBQUNULElBQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxFQUFYLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFEVixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsY0FBRCxHQUFrQixDQUZsQixDQUFBO0FBQUEsSUFHQSx3Q0FBTSxPQUFOLENBSEEsQ0FEUztFQUFBLENBQWI7O0FBQUEsbUJBTUEsaUJBQUEsR0FBbUIsU0FBQyxLQUFELEdBQUE7V0FDZixJQUFDLENBQUEsY0FBRCxHQUFrQixNQURIO0VBQUEsQ0FObkIsQ0FBQTs7QUFBQSxtQkFTQSxpQkFBQSxHQUFtQixTQUFBLEdBQUE7V0FDZixJQUFDLENBQUEsZUFEYztFQUFBLENBVG5CLENBQUE7O0FBQUEsbUJBWUEsWUFBQSxHQUFjLFNBQUMsRUFBRCxHQUFBO0FBQ1YsUUFBQSxNQUFBO0FBQUEsSUFBQSxJQUFzQixJQUFDLENBQUEsT0FBUSxDQUFBLEVBQUEsQ0FBL0I7QUFBQSxhQUFPLFNBQVAsQ0FBQTtLQUFBO0FBQUEsSUFFQSxNQUFBLEdBQVMsR0FBQSxDQUFBLE1BRlQsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLE9BQUQsR0FBVyxNQUhYLENBQUE7V0FJQSxPQUxVO0VBQUEsQ0FaZCxDQUFBOztBQUFBLG1CQW1CQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixDQUFBLENBRFE7RUFBQSxDQW5CWixDQUFBOztnQkFBQTs7R0FEaUIsSUFBSSxDQUFDLE9BTDFCLENBQUE7O0FBQUEsTUE2Qk0sQ0FBQyxPQUFQLEdBQWlCLE1BN0JqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL3NrZXRjaC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuXG5jbGFzcyBTa2V0Y2ggZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAodGV4dHVyZSkgLT5cbiAgICAgICAgQGFjdGlvbnMgPSB7fVxuICAgICAgICBAYWN0aW9uID0gbnVsbFxuICAgICAgICBAcmVuZGVyUHJpb3JpdHkgPSAwXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBjcmVhdGVBY3Rpb246IChpZCkgLT5cbiAgICAgICAgcmV0dXJuIGB1bmRlZmluZWRgIGlmIEBhY3Rpb25zW2lkXVxuXG4gICAgICAgIGFjdGlvbiA9IG5ldyBBY3Rpb25cbiAgICAgICAgQGFjdGlvbnMgPSBhY3Rpb25cbiAgICAgICAgYWN0aW9uXG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2tldGNoXG4iXX0=