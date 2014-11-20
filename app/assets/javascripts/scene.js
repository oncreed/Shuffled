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

  Scene.prototype.onUpdate = function(callback) {
    this._poll = callback;
  };

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

  Scene.prototype.isPaused = function() {
    return this.paused;
  };

  return Scene;

})(PIXI.Stage);

module.exports = Scene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLEtBQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUNJLDBCQUFBLENBQUE7O0FBQUEsa0JBQUEsT0FBQSxHQUFTLEtBQVQsQ0FBQTs7QUFBQSxrQkFDQSxLQUFBLEdBQU8sSUFEUCxDQUFBOztBQUFBLGtCQUVBLEtBQUEsR0FBTyxTQUFDLElBQUQsR0FBQSxDQUZQLENBQUE7O0FBS2EsRUFBQSxlQUFDLFVBQUQsR0FBQTs7TUFDVCxhQUFjO0tBQWQ7QUFBQSxJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FGVixDQUFBO0FBQUEsSUFHQSx1Q0FBTSxVQUFOLENBSEEsQ0FBQTtBQUlBLFVBQUEsQ0FMUztFQUFBLENBTGI7O0FBQUEsa0JBWUEsUUFBQSxHQUFVLFNBQUMsUUFBRCxHQUFBO0FBQ04sSUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLFFBQVQsQ0FETTtFQUFBLENBWlYsQ0FBQTs7QUFBQSxrQkFnQkEsTUFBQSxHQUFRLFNBQUMsU0FBRCxHQUFBO0FBQ0osSUFBQSxJQUFDLENBQUEsS0FBRCxDQUFPLElBQUMsQ0FBQSxPQUFSLEVBQWlCLElBQUMsQ0FBQSxLQUFsQixDQUFBLENBREk7RUFBQSxDQWhCUixDQUFBOztBQUFBLGtCQW9CQSxLQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ0gsSUFBQSxJQUFDLENBQUEsTUFBRCxHQUFVLElBQVYsQ0FERztFQUFBLENBcEJQLENBQUE7O0FBQUEsa0JBd0JBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBVixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsT0FBRCxHQUFXLEtBRlgsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLEtBQUQsR0FBUyxJQUhULENBREk7RUFBQSxDQXhCUixDQUFBOztBQUFBLGtCQStCQSxRQUFBLEdBQVUsU0FBQSxHQUFBO1dBQ04sSUFBQyxDQUFBLE9BREs7RUFBQSxDQS9CVixDQUFBOztlQUFBOztHQURnQixJQUFJLENBQUMsTUFBekIsQ0FBQTs7QUFBQSxNQW1DTSxDQUFDLE9BQVAsR0FBaUIsS0FuQ2pCLENBQUEiLCJmaWxlIjoic2NlbmUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBTY2VuZSBleHRlbmRzIFBJWEkuU3RhZ2VcbiAgICBfZmluaXNoOiBmYWxzZVxuICAgIF9uZXh0OiBudWxsXG4gICAgX3BvbGw6IChkYXRhKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIGNvbnN0cnVjdG9yOiAoYmFja2dyb3VuZCkgLT5cbiAgICAgICAgYmFja2dyb3VuZCA/PSAweDAwMDAwMFxuXG4gICAgICAgIEBwYXVzZWQgPSBmYWxzZVxuICAgICAgICBzdXBlciBiYWNrZ3JvdW5kXG4gICAgICAgIHJldHVyblxuXG4gICAgb25VcGRhdGU6IChjYWxsYmFjaykgLT5cbiAgICAgICAgQF9wb2xsID0gY2FsbGJhY2tcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIEBfcG9sbCBAX2ZpbmlzaCwgQF9uZXh0XG4gICAgICAgIHJldHVyblxuXG4gICAgcGF1c2U6IC0+XG4gICAgICAgIEBwYXVzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzdW1lOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcblxuICAgICAgICBAX2ZpbmlzaCA9IGZhbHNlXG4gICAgICAgIEBfbmV4dCA9IG51bGxcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lXG4iXX0=