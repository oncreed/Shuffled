var Button, ButtonActiveState, ButtonMode, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

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
    if (this.isPres) {
      if (this.mode === ButtonMode.click) {
        this.setTexture(this.texturePress);
      }
    }
  };

  Button.prototype.press = function() {
    this.isPress = true;
  };

  Button.prototype.getBoundingBox = function() {
    return this.getBounds;
  };

  Button.prototype.setRenderPriority = function() {};

  Button.prototype.getRenderPriority = function() {};

  return Button;

})(PIXI.Sprite);

module.exports = Button;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2J1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw4Q0FBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsWUFBUixDQUFWLENBQUE7O0FBQUEsaUJBRUEsR0FDSTtBQUFBLEVBQUEsUUFBQSxFQUFVLENBQVY7QUFBQSxFQUNBLE1BQUEsRUFBUSxDQURSO0NBSEosQ0FBQTs7QUFBQSxVQU1BLEdBQ0k7QUFBQSxFQUFBLEtBQUEsRUFBTyxDQUFQO0FBQUEsRUFDQSxLQUFBLEVBQU8sQ0FEUDtBQUFBLEVBRUEsS0FBQSxFQUFPLENBRlA7Q0FQSixDQUFBOztBQUFBO0FBWUksMkJBQUEsQ0FBQTs7QUFBYSxFQUFBLGdCQUFFLFNBQUYsRUFBYyxVQUFkLEVBQTJCLFlBQTNCLEdBQUE7QUFDVCxJQURVLElBQUMsQ0FBQSxZQUFBLFNBQ1gsQ0FBQTtBQUFBLElBRHNCLElBQUMsQ0FBQSxhQUFBLFVBQ3ZCLENBQUE7QUFBQSxJQURtQyxJQUFDLENBQUEsZUFBQSxZQUNwQyxDQUFBO0FBQUEsSUFBQSx3Q0FBTSxJQUFDLENBQUEsU0FBUCxDQUFBLENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxPQUFELEdBQVcsS0FEWCxDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsSUFBRCxHQUFRLFVBQVUsQ0FBQyxLQUZuQixDQURTO0VBQUEsQ0FBYjs7QUFBQSxtQkFLQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUE7QUFDSixJQUFBLElBQUcsSUFBQyxDQUFBLE1BQUo7QUFDSSxNQUFBLElBQUcsSUFBQyxDQUFBLElBQUQsS0FBUyxVQUFVLENBQUMsS0FBdkI7QUFDSSxRQUFBLElBQUMsQ0FBQSxVQUFELENBQVksSUFBQyxDQUFBLFlBQWIsQ0FBQSxDQURKO09BREo7S0FESTtFQUFBLENBTFIsQ0FBQTs7QUFBQSxtQkFXQSxLQUFBLEdBQU8sU0FBQSxHQUFBO0FBQ0gsSUFBQSxJQUFDLENBQUEsT0FBRCxHQUFXLElBQVgsQ0FERztFQUFBLENBWFAsQ0FBQTs7QUFBQSxtQkFlQSxjQUFBLEdBQWdCLFNBQUEsR0FBQTtXQUNaLElBQUMsQ0FBQSxVQURXO0VBQUEsQ0FmaEIsQ0FBQTs7QUFBQSxtQkFrQkEsaUJBQUEsR0FBbUIsU0FBQSxHQUFBLENBbEJuQixDQUFBOztBQUFBLG1CQXFCQSxpQkFBQSxHQUFtQixTQUFBLEdBQUEsQ0FyQm5CLENBQUE7O2dCQUFBOztHQURpQixJQUFJLENBQUMsT0FYMUIsQ0FBQTs7QUFBQSxNQW9DTSxDQUFDLE9BQVAsR0FBaUIsTUFwQ2pCLENBQUEiLCJmaWxlIjoiZW50aXRpZXMvYnV0dG9uLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZ2xvYmFscyA9IHJlcXVpcmUgJ3NoLWdsb2JhbHMnXG5cbkJ1dHRvbkFjdGl2ZVN0YXRlID1cbiAgICBpbmFjdGl2ZTogMFxuICAgIGFjdGl2ZTogMVxuXG5CdXR0b25Nb2RlID1cbiAgICBmb2N1czogMVxuICAgIGNsaWNrOiAwXG4gICAgaG92ZXI6IDVcblxuY2xhc3MgQnV0dG9uIGV4dGVuZHMgUElYSS5TcHJpdGVcbiAgICBjb25zdHJ1Y3RvcjogKEB0ZXh0dXJlT24sIEB0ZXh0dXJlT2ZmLCBAdGV4dHVyZVByZXNzKSAtPlxuICAgICAgICBzdXBlciBAdGV4dHVyZU9uXG4gICAgICAgIEBpc1ByZXNzID0gZmFsc2VcbiAgICAgICAgQG1vZGUgPSBCdXR0b25Nb2RlLmZvY3VzXG5cbiAgICB1cGRhdGU6IChkZWx0YVRpbWUpIC0+XG4gICAgICAgIGlmIEBpc1ByZXNcbiAgICAgICAgICAgIGlmIEBtb2RlIGlzIEJ1dHRvbk1vZGUuY2xpY2tcbiAgICAgICAgICAgICAgICBAc2V0VGV4dHVyZSBAdGV4dHVyZVByZXNzXG4gICAgICAgIHJldHVyblxuXG4gICAgcHJlc3M6IC0+XG4gICAgICAgIEBpc1ByZXNzID0gdHJ1ZVxuICAgICAgICByZXR1cm5cblxuICAgIGdldEJvdW5kaW5nQm94OiAtPlxuICAgICAgICBAZ2V0Qm91bmRzXG5cbiAgICBzZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRSZW5kZXJQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gQnV0dG9uXG4iXX0=