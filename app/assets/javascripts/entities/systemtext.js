var SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL3N5c3RlbXRleHQuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLElBQUEsVUFBQTtFQUFBO2lTQUFBOztBQUFBO0FBQ0ksK0JBQUEsQ0FBQTs7QUFBYSxFQUFBLG9CQUFDLEdBQUQsRUFBTSxLQUFOLEdBQUE7QUFDVCxJQUFBLDRDQUFNLEdBQU4sRUFBVyxLQUFYLENBQUEsQ0FBQTtBQUFBLElBRUEsSUFBQyxDQUFBLEtBQUQsR0FBUyxDQUZULENBQUE7QUFBQSxJQUdBLElBQUMsQ0FBQSxNQUFELEdBQVUsQ0FIVixDQUFBO0FBQUEsSUFJQSxJQUFDLENBQUEsU0FBRCxHQUFhLGlCQUpiLENBQUE7QUFBQSxJQUtBLElBQUMsQ0FBQSxTQUFELEdBQWEsUUFMYixDQUFBO0FBQUEsSUFNQSxJQUFDLENBQUEsV0FBRCxHQUFlLFNBTmYsQ0FBQTtBQUFBLElBT0EsSUFBQyxDQUFBLGVBQUQsR0FBbUIsQ0FQbkIsQ0FEUztFQUFBLENBQWI7O29CQUFBOztHQURxQixJQUFJLENBQUMsS0FBOUIsQ0FBQTs7QUFBQSxNQVdNLENBQUMsT0FBUCxHQUFpQixVQVhqQixDQUFBIiwiZmlsZSI6ImVudGl0aWVzL3N5c3RlbXRleHQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJcbmNsYXNzIFN5c3RlbVRleHQgZXh0ZW5kcyBQSVhJLlRleHRcbiAgICBjb25zdHJ1Y3RvcjogKG1zZywgc3R5bGUpIC0+XG4gICAgICAgIHN1cGVyIG1zZywgc3R5bGVcblxuICAgICAgICBAd2lkdGggPSAwXG4gICAgICAgIEBoZWlnaHQgPSAwXG4gICAgICAgIEBmb250U3R5bGUgPSAnMjRweCBzYW5zLXNlcmlmJ1xuICAgICAgICBAZm9udEFsaWduID0gJ2NlbnRlcidcbiAgICAgICAgQHN0cm9rZUNvbG9yID0gJyNhNDQxMGUnXG4gICAgICAgIEBzdHJva2VUaGlja25lc3MgPSA3XG5cbm1vZHVsZS5leHBvcnRzID0gU3lzdGVtVGV4dFxuXG4iXX0=