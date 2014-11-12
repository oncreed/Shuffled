var Button,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Button = (function(_super) {
  __extends(Button, _super);

  function Button() {
    this.width = 0;
    this.height = 0;
  }

  Button.prototype.update = function(deltaTime) {};

  Button.prototype.press = function() {};

  Button.prototype.boundingbox = function() {};

  Button.prototype.setPriority = function() {};

  Button.prototype.getPriority = function() {};

  return Button;

})(PIXI.Sprite);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2J1dHRvbi5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsSUFBQSxNQUFBO0VBQUE7aVNBQUE7O0FBQUE7QUFDSSwyQkFBQSxDQUFBOztBQUFhLEVBQUEsZ0JBQUEsR0FBQTtBQUNULElBQUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUFULENBQUE7QUFBQSxJQUNBLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FEVixDQURTO0VBQUEsQ0FBYjs7QUFBQSxtQkFJQSxNQUFBLEdBQVEsU0FBQyxTQUFELEdBQUEsQ0FKUixDQUFBOztBQUFBLG1CQU9BLEtBQUEsR0FBTyxTQUFBLEdBQUEsQ0FQUCxDQUFBOztBQUFBLG1CQVVBLFdBQUEsR0FBYSxTQUFBLEdBQUEsQ0FWYixDQUFBOztBQUFBLG1CQWFBLFdBQUEsR0FBYSxTQUFBLEdBQUEsQ0FiYixDQUFBOztBQUFBLG1CQWdCQSxXQUFBLEdBQWEsU0FBQSxHQUFBLENBaEJiLENBQUE7O2dCQUFBOztHQURpQixJQUFJLENBQUMsT0FBMUIsQ0FBQSIsImZpbGUiOiJlbnRpdGllcy9idXR0b24uanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNsYXNzIEJ1dHRvbiBleHRlbmRzIFBJWEkuU3ByaXRlXG4gICAgY29uc3RydWN0b3I6IC0+XG4gICAgICAgIEB3aWR0aCA9IDBcbiAgICAgICAgQGhlaWdodCA9IDBcblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBwcmVzczogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBib3VuZGluZ2JveDogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBzZXRQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG5cbiAgICBnZXRQcmlvcml0eTogLT5cbiAgICAgICAgcmV0dXJuXG4iXX0=