var Button, ButtonActiveState, ButtonMode, Globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Globals = require('Globals');

ButtonActiveState = {
  inactive: 0,
  active: 1
};

ButtonMode = {
  focus: 1,
  click: 0,
  hover: 5
};

Button = (function(_super) {
  __extends(Button, _super);

  function Button(textureOn, textureOff, texturePress) {
    this.textureOn = textureOn;
    this.textureOff = textureOff;
    this.texturePress = texturePress;
    Button.__super__.constructor.call(this, this.textureOn);
    this.isPress = false;
    this.mode = ButtonMode.focus;
  }

  Button.prototype.update = function(deltaTime) {
    if (this.isPress) {
      if (this.mode === ButtonMode.click) {
        this.setTexture(this.texturePress);
      }
    }
  };

  Button.prototype.press = function() {
    this.isPress = true;
  };

  Button.prototype.setRenderPriority = function() {};

  Button.prototype.getRenderPriority = function() {};

  Button.prototype.addToScene = function(scene) {
    scene.addChild(this);
  };

  return Button;

})(PIXI.Sprite);

module.exports = Button;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2J1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw4Q0FBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUEsaUJBRUEsR0FDSTtBQUFBLEVBQUEsUUFBQSxFQUFVLENBQVY7QUFBQSxFQUNBLE1BQUEsRUFBUSxDQURSO0NBSEosQ0FBQTs7QUFBQSxVQU1BLEdBQ0k7QUFBQSxFQUFBLEtBQUEsRUFBTyxDQUFQO0FBQUEsRUFDQSxLQUFBLEVBQU8sQ0FEUDtBQUFBLEVBRUEsS0FBQSxFQUFPLENBRlA7Q0FQSixDQUFBOztBQUFBO0FBWUksMkJBQUEsQ0FBQTs7QUFBYSxFQUFBLGdCQUFFLFNBQUYsRUFBYyxVQUFkLEVBQTJCLFlBQTNCLEdBQUE7QUFDVCxJQURVLElBQUMsQ0FBQSxZQUFBLFNBQ1gsQ0FBQTtBQUFBLElBRHNCLElBQUMsQ0FBQSxhQUFBLFVBQ3ZCLENBQUE7QUFBQSxJQURtQyxJQUFDLENBQUEsZUFBQSxZQUNwQyxDQUFBO0FBQUEsSUFBQSx3Q0FBTSxJQUFDLENBQUEsU0FBUCxDQUFBLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsS0FEWCxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsSUFBRCxHQUFRLFVBQVUsQ0FBQyxLQUZuQixDQURTO0VBQUEsQ0FBYjs7QUFBQSxtQkFLQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUE7QUFDSixJQUFBLElBQUcsSUFBQyxDQUFBLE9BQUo7QUFDSSxNQUFBLElBQUcsSUFBQyxDQUFBLElBQUQsS0FBUyxVQUFVLENBQUMsS0FBdkI7QUFDSSxRQUFBLElBQUMsQ0FBQSxVQUFELENBQVksSUFBQyxDQUFBLFlBQWIsQ0FBQSxDQURKO09BREo7S0FESTtFQUFBLENBTFIsQ0FBQTs7QUFBQSxtQkFXQSxLQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ0gsSUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQVgsQ0FERztFQUFBLENBWFAsQ0FBQTs7QUFBQSxtQkFlQSxpQkFBQSxHQUFtQixTQUFBLEdBQUEsQ0FmbkIsQ0FBQTs7QUFBQSxtQkFrQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBLENBbEJuQixDQUFBOztBQUFBLG1CQXFCQSxVQUFBLEdBQVksU0FBQyxLQUFELEdBQUE7QUFDUixJQUFBLEtBQUssQ0FBQyxRQUFOLENBQWUsSUFBZixDQUFBLENBRFE7RUFBQSxDQXJCWixDQUFBOztnQkFBQTs7R0FEaUIsSUFBSSxDQUFDLE9BWDFCLENBQUE7O0FBQUEsTUFxQ00sQ0FBQyxPQUFQLEdBQWlCLE1BckNqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL2J1dHRvbi5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkdsb2JhbHMgPSByZXF1aXJlICdHbG9iYWxzJ1xuXG5CdXR0b25BY3RpdmVTdGF0ZSA9XG4gICAgaW5hY3RpdmU6IDBcbiAgICBhY3RpdmU6IDFcblxuQnV0dG9uTW9kZSA9XG4gICAgZm9jdXM6IDFcbiAgICBjbGljazogMFxuICAgIGhvdmVyOiA1XG5cbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6IChAdGV4dHVyZU9uLCBAdGV4dHVyZU9mZiwgQHRleHR1cmVQcmVzcykgLT5cbiAgICAgICAgc3VwZXIgQHRleHR1cmVPblxuICAgICAgICBAaXNQcmVzcyA9IGZhbHNlXG4gICAgICAgIEBtb2RlID0gQnV0dG9uTW9kZS5mb2N1c1xuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICBpZiBAaXNQcmVzc1xuICAgICAgICAgICAgaWYgQG1vZGUgaXMgQnV0dG9uTW9kZS5jbGlja1xuICAgICAgICAgICAgICAgIEBzZXRUZXh0dXJlIEB0ZXh0dXJlUHJlc3NcbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzczogLT5cbiAgICAgICAgQGlzUHJlc3MgPSB0cnVlXG4gICAgICAgIHJldHVyblxuXG4gICAgc2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgZ2V0UmVuZGVyUHJpb3JpdHk6IC0+XG4gICAgICAgIHJldHVyblxuXG4gICAgYWRkVG9TY2VuZTogKHNjZW5lKSAtPlxuICAgICAgICBzY2VuZS5hZGRDaGlsZCBAXG4gICAgICAgIHJldHVyblxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1dHRvblxuIl19