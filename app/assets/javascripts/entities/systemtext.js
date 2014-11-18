var SystemText, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

SystemText = (function(_super) {
  __extends(SystemText, _super);

  function SystemText(msg, style) {
    SystemText.__super__.constructor.call(this, msg, style);
  }

  SystemText.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return SystemText;

})(PIXI.Text);

module.exports = SystemText;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FBVixDQUFBOztBQUFBO0FBR0ksK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG9CQUFDLEdBQUQsRUFBTSxLQUFOLEdBQUE7QUFDVCxJQUFBLDRDQUFNLEdBQU4sRUFBVyxLQUFYLENBQUEsQ0FEUztFQUFBLENBQWI7O0FBQUEsdUJBR0EsVUFBQSxHQUFZLFNBQUMsS0FBRCxHQUFBO0FBQ1IsSUFBQSxLQUFLLENBQUMsUUFBTixDQUFlLElBQWYsQ0FBQSxDQURRO0VBQUEsQ0FIWixDQUFBOztvQkFBQTs7R0FEcUIsSUFBSSxDQUFDLEtBRjlCLENBQUE7O0FBQUEsTUFVTSxDQUFDLE9BQVAsR0FBaUIsVUFWakIsQ0FBQSIsImZpbGUiOiJlbnRpdGllcy9zeXN0ZW10ZXh0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xvYmFscyA9IHJlcXVpcmUgJ3NoLWdsb2JhbHMnXG5cbmNsYXNzIFN5c3RlbVRleHQgZXh0ZW5kcyBQSVhJLlRleHRcbiAgICBjb25zdHJ1Y3RvcjogKG1zZywgc3R5bGUpIC0+XG4gICAgICAgIHN1cGVyIG1zZywgc3R5bGVcblxuICAgIGFkZFRvU2NlbmU6IChzY2VuZSkgLT5cbiAgICAgICAgc2NlbmUuYWRkQ2hpbGQgQFxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBTeXN0ZW1UZXh0XG4iXX0=