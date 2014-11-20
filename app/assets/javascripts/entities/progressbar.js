var ProgressBar,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ProgressBar = (function(_super) {
  __extends(ProgressBar, _super);

  function ProgressBar(textureBlank, textureFull) {
    ProgressBar.__super__.constructor.call(this, textureBlank);
  }

  ProgressBar.prototype.update = function(deltaTime) {};

  ProgressBar.prototype.settings = function(opts) {};

  ProgressBar.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return ProgressBar;

})(PIXI.Sprite);

module.exports = ProgressBar;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3Byb2dyZXNzYmFyLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLFdBQUE7RUFBQTtpU0FBQTs7QUFBQTtBQUNJLGdDQUFBLENBQUE7O0FBQWEsRUFBQSxxQkFBQyxZQUFELEVBQWUsV0FBZixHQUFBO0FBQ1QsSUFBQSw2Q0FBTSxZQUFOLENBQUEsQ0FEUztFQUFBLENBQWI7O0FBQUEsd0JBR0EsTUFBQSxHQUFRLFNBQUMsU0FBRCxHQUFBLENBSFIsQ0FBQTs7QUFBQSx3QkFNQSxRQUFBLEdBQVUsU0FBQyxJQUFELEdBQUEsQ0FOVixDQUFBOztBQUFBLHdCQVNBLFVBQUEsR0FBWSxTQUFDLEtBQUQsR0FBQTtBQUNSLElBQUEsS0FBSyxDQUFDLFFBQU4sQ0FBZSxJQUFmLENBQUEsQ0FEUTtFQUFBLENBVFosQ0FBQTs7cUJBQUE7O0dBRHNCLElBQUksQ0FBQyxPQUEvQixDQUFBOztBQUFBLE1BY00sQ0FBQyxPQUFQLEdBQWlCLFdBZGpCLENBQUEiLCJmaWxlIjoiZW50aXRpZXMvcHJvZ3Jlc3NiYXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQcm9ncmVzc0JhciBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6ICh0ZXh0dXJlQmxhbmssIHRleHR1cmVGdWxsKSAtPlxuICAgICAgICBzdXBlciB0ZXh0dXJlQmxhbmtcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzZXR0aW5nczogKG9wdHMpIC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2dyZXNzQmFyXG4iXX0=