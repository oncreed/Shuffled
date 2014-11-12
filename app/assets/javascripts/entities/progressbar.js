var ProgressBar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ProgressBar = (function(_super) {
  __extends(ProgressBar, _super);

  function ProgressBar() {
    this.width = 0;
    this.height = 0;
    this.status = 0;
  }

  ProgressBar.prototype.update = function(deltaTime) {};

  ProgressBar.prototype.settings = function(opts) {};

  return ProgressBar;

})(PIXI.Sprite);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3Byb2dyZXNzYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUNJLGdDQUFBLENBQUE7O0FBQWEsRUFBQSxxQkFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQVQsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQURWLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FGVixDQURTO0VBQUEsQ0FBYjs7QUFBQSx3QkFLQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUEsQ0FMUixDQUFBOztBQUFBLHdCQVFBLFFBQUEsR0FBVSxTQUFDLElBQUQsR0FBQSxDQVJWLENBQUE7O3FCQUFBOztHQURzQixJQUFJLENBQUMsT0FBL0IsQ0FBQSIsImZpbGUiOiJlbnRpdGllcy9wcm9ncmVzc2Jhci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIlxuY2xhc3MgUHJvZ3Jlc3NCYXIgZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAd2lkdGggPSAwXG4gICAgICAgIEBoZWlnaHQgPSAwXG4gICAgICAgIEBzdGF0dXMgPSAwXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgc2V0dGluZ3M6IChvcHRzKSAtPlxuICAgICAgICByZXR1cm5cbiJdfQ==