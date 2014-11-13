var ProgressBar, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

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

module.exports = ProgressBar;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3Byb2dyZXNzYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLG9CQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLGdDQUFBLENBQUE7O0FBQWEsRUFBQSxxQkFBQSxHQUFBO0FBQ1QsSUFBQSxJQUFDLENBQUEsS0FBRCxHQUFTLENBQVQsQ0FBQTtBQUFBLElBQ0EsSUFBQyxDQUFBLE1BQUQsR0FBVSxDQURWLENBQUE7QUFBQSxJQUVBLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FGVixDQURTO0VBQUEsQ0FBYjs7QUFBQSx3QkFLQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUEsQ0FMUixDQUFBOztBQUFBLHdCQVFBLFFBQUEsR0FBVSxTQUFDLElBQUQsR0FBQSxDQVJWLENBQUE7O3FCQUFBOztHQURzQixJQUFJLENBQUMsT0FGL0IsQ0FBQTs7QUFBQSxNQWNNLENBQUMsT0FBUCxHQUFpQixXQWRqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL3Byb2dyZXNzYmFyLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xvYmFscyA9IHJlcXVpcmUgJ3NoLWdsb2JhbHMnXG5cbmNsYXNzIFByb2dyZXNzQmFyIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogLT5cbiAgICAgICAgQHdpZHRoID0gMFxuICAgICAgICBAaGVpZ2h0ID0gMFxuICAgICAgICBAc3RhdHVzID0gMFxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxuICAgIHNldHRpbmdzOiAob3B0cykgLT5cbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gUHJvZ3Jlc3NCYXJcbiJdfQ==