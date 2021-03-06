var Button, Configs, OptionScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

Button = require('Button');

SystemText = require('SystemText');

OptionScene = (function(_super) {
  __extends(OptionScene, _super);

  function OptionScene() {
    OptionScene.__super__.constructor.call(this, 0xffffff);
  }

  OptionScene.prototype.init = function() {
    this.warning = new SystemText('This is the option page', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#a7dbdb',
      stroke: '#69d2e7',
      strokeThickness: 5
    });
    this.warning.anchor.x = 0.5;
    this.warning.anchor.y = 0.5;
    this.warning.position.x = Configs.desktop.settings.width / 2;
    this.warning.position.y = 90;
    this.warning.addToScene(this);
    this.backButton = new SystemText('Back', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#a7dbdb',
      stroke: '#69d2e7',
      strokeThickness: 5
    });
    this.backButton.anchor.y = 0.5;
    this.backButton.position.x = Configs.desktop.settings.width / 2 + 60;
    this.backButton.position.y = Configs.desktop.settings.height / 2 + 120;
    this.backButton.interactive = true;
    this.backButton.addToScene(this);
  };

  OptionScene.prototype.update = function(deltaTime) {
    var $;
    $ = this;
    this.backButton.mouseover = function(data) {
      $.backButton.scale.x = 1.1;
      $.backButton.scale.y = 1.1;
    };
    this.backButton.mouseout = function(data) {
      $.backButton.scale.x = 1.0;
      $.backButton.scale.y = 1.0;
    };
    this.backButton.mousedown = function(data) {
      $.backButton.scale.x = 0.8;
      $.backButton.scale.y = 0.8;
      $._finish = true;
      $._next = 'lobby';
    };
    this.backButton.mouseup = function(data) {
      $.backButton.scale.x = 1.0;
      $.backButton.scale.y = 1.0;
    };
    OptionScene.__super__.update.call(this, deltaTime);
  };

  return OptionScene;

})(Scene);

module.exports = OptionScene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9vcHRpb25zY2VuZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSx1REFBQTtFQUFBO2lTQUFBOztBQUFBLE9BQUEsR0FBVSxPQUFBLENBQVEsU0FBUixDQUFWLENBQUE7O0FBQUEsS0FFQSxHQUFRLE9BQUEsQ0FBUSxPQUFSLENBRlIsQ0FBQTs7QUFBQSxNQUdBLEdBQVMsT0FBQSxDQUFRLFFBQVIsQ0FIVCxDQUFBOztBQUFBLE1BSUEsR0FBUyxPQUFBLENBQVEsUUFBUixDQUpULENBQUE7O0FBQUEsVUFLQSxHQUFhLE9BQUEsQ0FBUSxZQUFSLENBTGIsQ0FBQTs7QUFBQTtBQVFJLGdDQUFBLENBQUE7O0FBQWEsRUFBQSxxQkFBQSxHQUFBO0FBQ1QsSUFBQSw2Q0FBTSxRQUFOLENBQUEsQ0FEUztFQUFBLENBQWI7O0FBQUEsd0JBR0EsSUFBQSxHQUFNLFNBQUEsR0FBQTtBQUNGLElBQUEsSUFBQyxDQUFBLE9BQUQsR0FBZSxJQUFBLFVBQUEsQ0FBVyx5QkFBWCxFQUNYO0FBQUEsTUFBQSxJQUFBLEVBQU0saUJBQU47QUFBQSxNQUNBLEtBQUEsRUFBTyxRQURQO0FBQUEsTUFFQSxJQUFBLEVBQU0sU0FGTjtBQUFBLE1BR0EsTUFBQSxFQUFRLFNBSFI7QUFBQSxNQUlBLGVBQUEsRUFBaUIsQ0FKakI7S0FEVyxDQUFmLENBQUE7QUFBQSxJQU1BLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQWhCLEdBQW9CLEdBTnBCLENBQUE7QUFBQSxJQU9BLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQWhCLEdBQW9CLEdBUHBCLENBQUE7QUFBQSxJQVFBLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQWxCLEdBQXNCLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEtBQXpCLEdBQWlDLENBUnZELENBQUE7QUFBQSxJQVNBLElBQUMsQ0FBQSxPQUFPLENBQUMsUUFBUSxDQUFDLENBQWxC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L29wdGlvbnNjZW5lLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiQ29uZmlncyA9IHJlcXVpcmUgJ0NvbmZpZ3MnXG5cblNjZW5lID0gcmVxdWlyZSAnU2NlbmUnXG5Ta2V0Y2ggPSByZXF1aXJlICdTa2V0Y2gnXG5CdXR0b24gPSByZXF1aXJlICdCdXR0b24nXG5TeXN0ZW1UZXh0ID0gcmVxdWlyZSAnU3lzdGVtVGV4dCdcblxuY2xhc3MgT3B0aW9uU2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlciAweGZmZmZmZlxuXG4gICAgaW5pdDogLT5cbiAgICAgICAgQHdhcm5pbmcgPSBuZXcgU3lzdGVtVGV4dCAnVGhpcyBpcyB0aGUgb3B0aW9uIHBhZ2UnLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyNhN2RiZGInXG4gICAgICAgICAgICBzdHJva2U6ICcjNjlkMmU3J1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci54ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLmFuY2hvci55ID0gMC41XG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyXG4gICAgICAgIEB3YXJuaW5nLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAd2FybmluZy5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYmFja0J1dHRvbiA9IG5ldyBTeXN0ZW1UZXh0ICdCYWNrJyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjYTdkYmRiJ1xuICAgICAgICAgICAgc3Ryb2tlOiAnIzY5ZDJlNydcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYmFja0J1dHRvbi5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja0J1dHRvbi5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiArIDYwXG4gICAgICAgIEBiYWNrQnV0dG9uLnBvc2l0aW9uLnkgPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3MuaGVpZ2h0IC8gMiArIDEyMFxuICAgICAgICBAYmFja0J1dHRvbi5pbnRlcmFjdGl2ZSA9IHRydWVcbiAgICAgICAgQGJhY2tCdXR0b24uYWRkVG9TY2VuZSBAXG4gICAgICAgIHJldHVyblxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICAkID0gQFxuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJhY2tCdXR0b24ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrQnV0dG9uLnNjYWxlLnggPSAwLjhcbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ2xvYmJ5J1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBiYWNrQnV0dG9uLm1vdXNldXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYmFja0J1dHRvbi5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJhY2tCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIHN1cGVyIGRlbHRhVGltZVxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBPcHRpb25TY2VuZVxuIl19