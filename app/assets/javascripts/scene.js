var Scene, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

Scene = (function(_super) {
  __extends(Scene, _super);

  Scene.prototype._poll = function() {};

  function Scene(background) {
    if (background == null) {
      background = 0x000000;
    }
    this.paused = false;
    Scene.__super__.constructor.call(this, background);
    return;
  }

  Scene.prototype.onUpdate = function(callback) {
    this._poll = callback;
  };

  Scene.prototype.update = function(deltaTime) {
    this._poll();
  };

  Scene.prototype.pause = function() {
    this.paused = true;
  };

  Scene.prototype.resume = function() {
    this.paused = false;
  };

  Scene.prototype.isPaused = function() {
    return this.paused;
  };

  return Scene;

})(PIXI.Stage);

module.exports = Scene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLGNBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FBVixDQUFBOztBQUFBO0FBR0ksMEJBQUEsQ0FBQTs7QUFBQSxrQkFBQSxLQUFBLEdBQU8sU0FBQSxHQUFBLENBQVAsQ0FBQTs7QUFHYSxFQUFBLGVBQUMsVUFBRCxHQUFBOztNQUNULGFBQWM7S0FBZDtBQUFBLElBRUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxLQUZWLENBQUE7QUFBQSxJQUdBLHVDQUFNLFVBQU4sQ0FIQSxDQUFBO0FBSUEsVUFBQSxDQUxTO0VBQUEsQ0FIYjs7QUFBQSxrQkFVQSxRQUFBLEdBQVUsU0FBQyxRQUFELEdBQUE7QUFDTixJQUFBLElBQUMsQ0FBQSxLQUFELEdBQVMsUUFBVCxDQURNO0VBQUEsQ0FWVixDQUFBOztBQUFBLGtCQWNBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQTtBQUNKLElBQUEsSUFBQyxDQUFBLEtBQUQsQ0FBQSxDQUFBLENBREk7RUFBQSxDQWRSLENBQUE7O0FBQUEsa0JBa0JBLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDSCxJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBVixDQURHO0VBQUEsQ0FsQlAsQ0FBQTs7QUFBQSxrQkFzQkEsTUFBQSxHQUFRLFNBQUEsR0FBQTtBQUNKLElBQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxLQUFWLENBREk7RUFBQSxDQXRCUixDQUFBOztBQUFBLGtCQTBCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO1dBQ04sSUFBQyxDQUFBLE9BREs7RUFBQSxDQTFCVixDQUFBOztlQUFBOztHQURnQixJQUFJLENBQUMsTUFGekIsQ0FBQTs7QUFBQSxNQWdDTSxDQUFDLE9BQVAsR0FBaUIsS0FoQ2pCLENBQUEiLCJmaWxlIjoic2NlbmUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgU2NlbmUgZXh0ZW5kcyBQSVhJLlN0YWdlXG4gICAgX3BvbGw6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgY29uc3RydWN0b3I6IChiYWNrZ3JvdW5kKSAtPlxuICAgICAgICBiYWNrZ3JvdW5kID89IDB4MDAwMDAwXG5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG4gICAgICAgIHN1cGVyIGJhY2tncm91bmRcbiAgICAgICAgcmV0dXJuXG5cbiAgICBvblVwZGF0ZTogKGNhbGxiYWNrKSAtPlxuICAgICAgICBAX3BvbGwgPSBjYWxsYmFja1xuICAgICAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgQF9wb2xsKClcbiAgICAgICAgcmV0dXJuXG5cbiAgICBwYXVzZTogLT5cbiAgICAgICAgQHBhdXNlZCA9IHRydWVcbiAgICAgICAgcmV0dXJuXG5cbiAgICByZXN1bWU6IC0+XG4gICAgICAgIEBwYXVzZWQgPSBmYWxzZVxuICAgICAgICByZXR1cm5cblxuICAgIGlzUGF1c2VkOiAtPlxuICAgICAgICBAcGF1c2VkXG5cbm1vZHVsZS5leHBvcnRzID0gU2NlbmVcbiJdfQ==