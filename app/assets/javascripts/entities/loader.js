var Loader, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

Loader = (function(_super) {
  __extends(Loader, _super);

  function Loader() {
    this.width = 0;
    this.height = 0;
  }

  Loader.prototype.update = function(deltaTime) {};

  return Loader;

})(PIXI.MovieClip);

module.exports = Loader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxlQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLDJCQUFBLENBQUE7O0FBQWEsRUFBQSxnQkFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQVQsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQURWLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUlBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQSxDQUpSLENBQUE7O2dCQUFBOztHQURpQixJQUFJLENBQUMsVUFGMUIsQ0FBQTs7QUFBQSxNQVVNLENBQUMsT0FBUCxHQUFpQixNQVZqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL2xvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5jbGFzcyBMb2FkZXIgZXh0ZW5kcyBQSVhJLk1vdmllQ2xpcFxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAd2lkdGggPSAwXG4gICAgICAgIEBoZWlnaHQgPSAwXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IExvYWRlclxuIl19