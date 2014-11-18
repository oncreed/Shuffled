var Sketch, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

Sketch = (function(_super) {
  __extends(Sketch, _super);

  function Sketch(texture) {
    this.renderPriority = globals.priority.normal;
    Sketch.__super__.constructor.call(this, texture);
  }

  Sketch.prototype.setRenderPriority = function(layer) {
    return this.renderPriority = layer;
  };

  Sketch.prototype.getRenderPriority = function() {
    return this.renderPriority;
  };

  Sketch.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return Sketch;

})(PIXI.Sprite);

module.exports = Sketch;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3NrZXRjaC5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxlQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxZQUFSLENBQVYsQ0FBQTs7QUFBQTtBQUdJLDJCQUFBLENBQUE7O0FBQWEsRUFBQSxnQkFBQyxPQUFELEdBQUE7QUFDVCxJQUFBLElBQUMsQ0FBQSxjQUFELEdBQWtCLE9BQU8sQ0FBQyxRQUFRLENBQUMsTUFBbkMsQ0FBQTtBQUFBLElBQ0Esd0NBQU0sT0FBTixDQURBLENBRFM7RUFBQSxDQUFiOztBQUFBLG1CQUlBLGlCQUFBLEdBQW1CLFNBQUMsS0FBRCxHQUFBO1dBQ2YsSUFBQyxDQUFBLGNBQUQsR0FBa0IsTUFESDtFQUFBLENBSm5CLENBQUE7O0FBQUEsbUJBT0EsaUJBQUEsR0FBbUIsU0FBQSxHQUFBO1dBQ2YsSUFBQyxDQUFBLGVBRGM7RUFBQSxDQVBuQixDQUFBOztBQUFBLG1CQVVBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNSLElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmLENBQUEsQ0FEUTtFQUFBLENBVlosQ0FBQTs7Z0JBQUE7O0dBRGlCLElBQUksQ0FBQyxPQUYxQixDQUFBOztBQUFBLE1BaUJNLENBQUMsT0FBUCxHQUFpQixNQWpCakIsQ0FBQSIsImZpbGUiOiJlbnRpdGllcy9za2V0Y2guanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgU2tldGNoIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKHRleHR1cmUpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGdsb2JhbHMucHJpb3JpdHkubm9ybWFsXG4gICAgICAgIHN1cGVyIHRleHR1cmVcblxuICAgIHNldFJlbmRlclByaW9yaXR5OiAobGF5ZXIpIC0+XG4gICAgICAgIEByZW5kZXJQcmlvcml0eSA9IGxheWVyXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgQHJlbmRlclByaW9yaXR5XG5cbiAgICBhZGRUb1NjZW5lOiAoc2NlbmUpIC0+XG4gICAgICAgIHNjZW5lLmFkZENoaWxkIEBcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gU2tldGNoXG4iXX0=