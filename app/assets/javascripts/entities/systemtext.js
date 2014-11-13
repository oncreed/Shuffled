var SystemText, globals,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

globals = require('sh-globals');

SystemText = (function(_super) {
  __extends(SystemText, _super);

  function SystemText(msg, style) {
    SystemText.__super__.constructor.call(this, msg, style);
    this.width = 0;
    this.height = 0;
    this.fontStyle = '24px sans-serif';
    this.fontAlign = 'center';
    this.strokeColor = '#a4410e';
    this.strokeThickness = 7;
  }

  return SystemText;

})(PIXI.Text);

module.exports = SystemText;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLElBQUEsbUJBQUE7RUFBQTtpU0FBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FBVixDQUFBOztBQUFBO0FBR0ksK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG9CQUFDLEdBQUQsRUFBTSxLQUFOLEdBQUE7QUFDVCxJQUFBLDRDQUFNLEdBQU4sRUFBVyxLQUFYLENBQUEsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUZULENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FIVixDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsU0FBRCxHQUFhLGlCQUpiLENBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxTQUFELEdBQWEsUUFMYixDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsV0FBRCxHQUFlLFNBTmYsQ0FBQTtBQUFBLElBT0EsSUFBQyxDQUFBLGVBQUQsR0FBbUIsQ0FQbkIsQ0FEUztFQUFBLENBQWI7O29CQUFBOztHQURxQixJQUFJLENBQUMsS0FGOUIsQ0FBQTs7QUFBQSxNQWFNLENBQUMsT0FBUCxHQUFpQixVQWJqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL3N5c3RlbXRleHQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuY2xhc3MgU3lzdGVtVGV4dCBleHRlbmRzIFBJWEkuVGV4dFxuICAgIGNvbnN0cnVjdG9yOiAobXNnLCBzdHlsZSkgLT5cbiAgICAgICAgc3VwZXIgbXNnLCBzdHlsZVxuXG4gICAgICAgIEB3aWR0aCA9IDBcbiAgICAgICAgQGhlaWdodCA9IDBcbiAgICAgICAgQGZvbnRTdHlsZSA9ICcyNHB4IHNhbnMtc2VyaWYnXG4gICAgICAgIEBmb250QWxpZ24gPSAnY2VudGVyJ1xuICAgICAgICBAc3Ryb2tlQ29sb3IgPSAnI2E0NDEwZSdcbiAgICAgICAgQHN0cm9rZVRoaWNrbmVzcyA9IDdcblxubW9kdWxlLmV4cG9ydHMgPSBTeXN0ZW1UZXh0XG5cbiJdfQ==