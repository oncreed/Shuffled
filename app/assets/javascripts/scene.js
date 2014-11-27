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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEtBQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUNJLDBCQUFBLENBQUE7O0FBQUEsa0JBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSxrQkFDQSxLQUFBLEdBQU8sSUFEUCxDQUFBOztBQUFBLGtCQUVBLEtBQUEsR0FBTyxTQUFDLElBQUQsR0FBQSxDQUZQLENBQUE7O0FBS2EsRUFBQSxlQUFDLFVBQUQsR0FBQTs7TUFDVCxhQUFjO0tBQWQ7QUFBQSxJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FGVixDQUFBO0FBQUEsSUFHQSx1Q0FBTSxVQUFOLENBSEEsQ0FBQTtBQUlBLFVBQUEsQ0FMUztFQUFBLENBTGI7O0FBQUEsa0JBWUEsSUFBQSxHQUFNLFNBQUEsR0FBQSxDQVpOLENBQUE7O0FBQUEsa0JBZUEsT0FBQSxHQUFTLFNBQUEsR0FBQSxDQWZULENBQUE7O0FBQUEsa0JBa0JBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQTtBQUNKLElBQUEsSUFBQyxDQUFBLEtBQUQsQ0FBTyxJQUFDLENBQUEsT0FBUixFQUFpQixJQUFDLENBQUEsS0FBbEIsQ0FBQSxDQURJO0VBQUEsQ0FsQlIsQ0FBQTs7QUFBQSxrQkFzQkEsS0FBQSxHQUFPLFNBQUEsR0FBQTtBQUNILElBQUEsSUFBQyxDQUFBLE1BQUQsR0FBVSxJQUFWLENBREc7RUFBQSxDQXRCUCxDQUFBOztBQUFBLGtCQTBCQSxNQUFBLEdBQVEsU0FBQSxHQUFBO0FBQ0osSUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLEtBQVYsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxLQUZYLENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxLQUFELEdBQVMsSUFIVCxDQURJO0VBQUEsQ0ExQlIsQ0FBQTs7QUFBQSxrQkFpQ0EsUUFBQSxHQUFVLFNBQUMsUUFBRCxHQUFBO0FBQ04sSUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLFFBQVQsQ0FETTtFQUFBLENBakNWLENBQUE7O0FBQUEsa0JBcUNBLFFBQUEsR0FBVSxTQUFBLEdBQUE7V0FDTixJQUFDLENBQUEsT0FESztFQUFBLENBckNWLENBQUE7O2VBQUE7O0dBRGdCLElBQUksQ0FBQyxNQUF6QixDQUFBOztBQUFBLE1BeUNNLENBQUMsT0FBUCxHQUFpQixLQXpDakIsQ0FBQSIsImZpbGUiOiJzY2VuZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImNsYXNzIFNjZW5lIGV4dGVuZHMgUElYSS5TdGFnZVxuICAgIF9maW5pc2g6IGZhbHNlXG4gICAgX25leHQ6IG51bGxcbiAgICBfcG9sbDogKGRhdGEpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgY29uc3RydWN0b3I6IChiYWNrZ3JvdW5kKSAtPlxuICAgICAgICBiYWNrZ3JvdW5kID89IDB4MDAwMDAwXG5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG4gICAgICAgIHN1cGVyIGJhY2tncm91bmRcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpbml0OiAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGRlc3Ryb3k6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBAX3BvbGwgQF9maW5pc2gsIEBfbmV4dFxuICAgICAgICByZXR1cm5cblxuICAgIHBhdXNlOiAtPlxuICAgICAgICBAcGF1c2VkID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIHJlc3VtZTogLT5cbiAgICAgICAgQHBhdXNlZCA9IGZhbHNlXG5cbiAgICAgICAgQF9maW5pc2ggPSBmYWxzZVxuICAgICAgICBAX25leHQgPSBudWxsXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iXX0=