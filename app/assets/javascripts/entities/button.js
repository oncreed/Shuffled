var Button, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

Button = (function(_super) {
  __extends(Button, _super);

  function Button() {
    this.width = 0;
    this.height = 0;
  }

  Button.prototype.update = function(deltaTime) {};

  Button.prototype.press = function() {};

  Button.prototype.getBoundingBox = function() {};

  Button.prototype.setRenderPriority = function() {};

  Button.prototype.getRenderPriority = function() {};

  return Button;

})(PIXI.Sprite);

module.exports = Button;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2J1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxlQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLDJCQUFBLENBQUE7O0FBQWEsRUFBQSxnQkFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQVQsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQURWLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUlBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQSxDQUpSLENBQUE7O0FBQUEsbUJBT0EsS0FBQSxHQUFPLFNBQUEsR0FBQSxDQVBQLENBQUE7O0FBQUEsbUJBVUEsY0FBQSxHQUFnQixTQUFBLEdBQUEsQ0FWaEIsQ0FBQTs7QUFBQSxtQkFhQSxpQkFBQSxHQUFtQixTQUFBLEdBQUEsQ0FibkIsQ0FBQTs7QUFBQSxtQkFnQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBLENBaEJuQixDQUFBOztnQkFBQTs7R0FEaUIsSUFBSSxDQUFDLE9BRjFCLENBQUE7O0FBQUEsTUFzQk0sQ0FBQyxPQUFQLEdBQWlCLE1BdEJqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL2J1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbImdsb2JhbHMgPSByZXF1aXJlICdzaC1nbG9iYWxzJ1xuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBQSVhJLlNwcml0ZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBAd2lkdGggPSAwXG4gICAgICAgIEBoZWlnaHQgPSAwXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgcHJlc3M6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0Qm91bmRpbmdCb3g6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblxuIl19