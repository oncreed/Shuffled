var Scene,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Scene = (function(_super) {
  __extends(Scene, _super);

  function Scene() {
    this.paused = false;
    return;
  }

  Scene.prototype.update = function(deltaTime) {};

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3NjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFBLEtBQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUNJLDBCQUFBLENBQUE7O0FBQWEsRUFBQSxlQUFBLEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBVixDQUFBO0FBQ0EsVUFBQSxDQUZTO0VBQUEsQ0FBYjs7QUFBQSxrQkFJQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUEsQ0FKUixDQUFBOztBQUFBLGtCQU9BLEtBQUEsR0FBTyxTQUFBLEdBQUE7QUFDSCxJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsSUFBVixDQURHO0VBQUEsQ0FQUCxDQUFBOztBQUFBLGtCQVdBLE1BQUEsR0FBUSxTQUFBLEdBQUE7QUFDSixJQUFBLElBQUMsQ0FBQSxNQUFELEdBQVUsS0FBVixDQURJO0VBQUEsQ0FYUixDQUFBOztBQUFBLGtCQWVBLFFBQUEsR0FBVSxTQUFBLEdBQUE7V0FDTixJQUFDLENBQUEsT0FESztFQUFBLENBZlYsQ0FBQTs7ZUFBQTs7R0FEZ0IsSUFBSSxDQUFDLE1BQXpCLENBQUEiLCJmaWxlIjoiZW50aXRpZXMvc2NlbmUuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNsYXNzIFNjZW5lIGV4dGVuZHMgUElYSS5TdGFnZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgcGF1c2U6IC0+XG4gICAgICAgIEBwYXVzZWQgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgcmVzdW1lOiAtPlxuICAgICAgICBAcGF1c2VkID0gZmFsc2VcbiAgICAgICAgcmV0dXJuXG5cbiAgICBpc1BhdXNlZDogLT5cbiAgICAgICAgQHBhdXNlZFxuIl19