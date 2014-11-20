var Configs, LobbyScene, Scene, Sketch, SystemText,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Configs = require('Configs');

Scene = require('Scene');

Sketch = require('Sketch');

SystemText = require('SystemText');

LobbyScene = (function(_super) {
  __extends(LobbyScene, _super);

  function LobbyScene() {
    var blur;
    LobbyScene.__super__.constructor.apply(this, arguments);
    blur = new PIXI.BlurFilter;
    this.textures = [PIXI.Texture.fromImage('/assets/images/library_concept.jpg'), PIXI.Texture.fromImage('/assets/images/earth_circle.png')];
    this.background = new Sketch(this.textures[0]);
    this.background.anchor.x = 0.5;
    this.background.anchor.y = 0.5;
    this.background.position.x = Configs.desktop.settings.width / 2;
    this.background.position.y = Configs.desktop.settings.height / 2;
    this.background.filters = [blur];
    this.background.addToScene(this);
    this.logoAngle = 0;
    this.logo = new Sketch(this.textures[1]);
    this.logo.anchor.x = 0.5;
    this.logo.anchor.y = 0.5;
    this.logo.position.x = 70;
    this.logo.position.y = Configs.desktop.settings.height / 2;
    this.logo.scale.x = 0.7;
    this.logo.scale.y = 0.7;
    this.logo.addToScene(this);
    this.buttons = {};
    this.buttons['start'] = new SystemText('Play', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['start'].anchor.y = 0.5;
    this.buttons['start'].position.x = Configs.desktop.settings.width / 2 - 10;
    this.buttons['start'].position.y = 90;
    this.buttons['start'].addToScene(this);
    this.buttons['option'] = new SystemText('Options', {
      font: 'bold 42px Anton',
      align: 'left',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['option'].anchor.y = 0.5;
    this.buttons['option'].position.x = Configs.desktop.settings.width / 2;
    this.buttons['option'].position.y = 160;
    this.buttons['option'].addToScene(this);
    this.buttons['board'] = new SystemText('LeaderBoards', {
      font: 'bold 42px Anton',
      align: 'left',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.buttons['board'].anchor.y = 0.5;
    this.buttons['board'].position.x = Configs.desktop.settings.width / 2 + 10;
    this.buttons['board'].position.y = 230;
    this.buttons['board'].addToScene(this);
  }

  LobbyScene.prototype.update = function(deltaTime) {
    var $;
    $ = this;
    this.buttons['start'].interactive = true;
    this.buttons['start'].mouseover = function(data) {
      $.buttons['start'].scale.x = 1.1;
      $.buttons['start'].scale.y = 1.1;
    };
    this.buttons['start'].mouseout = function(data) {
      $.buttons['start'].scale.x = 1.0;
      $.buttons['start'].scale.y = 1.0;
    };
    this.buttons['start'].mousedown = function(data) {
      $.buttons['start'].scale.x = 0.8;
      $.buttons['start'].scale.y = 0.8;
      $._finish = true;
      $._next = 'game';
    };
    this.buttons['option'].interactive = true;
    this.buttons['option'].mouseover = function(data) {
      $.buttons['option'].scale.x = 1.1;
      $.buttons['option'].scale.y = 1.1;
    };
    this.buttons['option'].mouseout = function(data) {
      $.buttons['option'].scale.x = 1.0;
      $.buttons['option'].scale.y = 1.0;
    };
    this.buttons['option'].mousedown = function(data) {
      $.buttons['option'].scale.x = 0.8;
      $.buttons['option'].scale.y = 0.8;
      $._finish = true;
      $._next = 'option';
    };
    this.buttons['option'].mouseup = function(data) {
      $.buttons['option'].scale.x = 1.0;
      $.buttons['option'].scale.y = 1.0;
    };
    this.buttons['board'].interactive = true;
    this.buttons['board'].mouseover = function(data) {
      $.buttons['board'].scale.x = 1.1;
      $.buttons['board'].scale.y = 1.1;
    };
    this.buttons['board'].mouseout = function(data) {
      $.buttons['board'].scale.x = 1.0;
      $.buttons['board'].scale.y = 1.0;
    };
    if (this.logoAngle >= 360) {
      this.logoAngle = 0;
    }
    this.logoAngle += 0.01;
    this.logo.rotation = this.logoAngle;
    LobbyScene.__super__.update.call(this, deltaTime);
  };

  return LobbyScene;

})(Scene);

module.exports = LobbyScene;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNjZW5lcy9sb2JieXNjZW5lLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLDhDQUFBO0VBQUE7aVNBQUE7O0FBQUEsT0FBQSxHQUFVLE9BQUEsQ0FBUSxTQUFSLENBQVYsQ0FBQTs7QUFBQSxLQUVBLEdBQVEsT0FBQSxDQUFRLE9BQVIsQ0FGUixDQUFBOztBQUFBLE1BR0EsR0FBUyxPQUFBLENBQVEsUUFBUixDQUhULENBQUE7O0FBQUEsVUFJQSxHQUFhLE9BQUEsQ0FBUSxZQUFSLENBSmIsQ0FBQTs7QUFBQTtBQU9JLCtCQUFBLENBQUE7O0FBQWEsRUFBQSxvQkFBQSxHQUFBO0FBQ1QsUUFBQSxJQUFBO0FBQUEsSUFBQSw2Q0FBQSxTQUFBLENBQUEsQ0FBQTtBQUFBLElBQ0EsSUFBQSxHQUFPLEdBQUEsQ0FBQSxJQUFRLENBQUMsVUFEaEIsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLFFBQUQsR0FBWSxDQUNSLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBYixDQUF1QixvQ0FBdkIsQ0FEUSxFQUVSLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBYixDQUF1QixpQ0FBdkIsQ0FGUSxDQUhaLENBQUE7QUFBQSxJQVFBLElBQUMsQ0FBQSxVQUFELEdBQWtCLElBQUEsTUFBQSxDQUFPLElBQUMsQ0FBQSxRQUFTLENBQUEsQ0FBQSxDQUFqQixDQVJsQixDQUFBO0FBQUEsSUFTQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFuQixHQUF1QixHQVR2QixDQUFBO0FBQUEsSUFVQSxJQUFDLENBQUEsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFuQixHQUF1QixHQVZ2QixDQUFBO0FBQUEsSUFXQSxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFyQixHQUF5QixPQUFPLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxLQUF6QixHQUFpQyxDQVgxRCxDQUFBO0FBQUEsSUFZQSxJQUFDLENBQUEsVUFBVSxDQUFDLFFBQVEsQ0FB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YyxJQWxEZCxDQUFBO0FBQUEsSUFtREEsSUFBQyxDQUFBLElBQUksQ0FBQyxRQUFOLEdBQWlCLElBQUMsQ0FBQSxTQW5EbEIsQ0FBQTtBQUFBLElBcURBLHVDQUFNLFNBQU4sQ0FyREEsQ0FESTtFQUFBLENBL0ZSLENBQUE7O29CQUFBOztHQURxQixNQU56QixDQUFBOztBQUFBLE1BK0pNLENBQUMsT0FBUCxHQUFpQixVQS9KakIsQ0FBQSIsImZpbGUiOiJzY2VuZXMvbG9iYnlzY2VuZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkNvbmZpZ3MgPSByZXF1aXJlICdDb25maWdzJ1xuXG5TY2VuZSA9IHJlcXVpcmUgJ1NjZW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnU2tldGNoJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ1N5c3RlbVRleHQnXG5cbmNsYXNzIExvYmJ5U2NlbmUgZXh0ZW5kcyBTY2VuZVxuICAgIGNvbnN0cnVjdG9yOiAtPlxuICAgICAgICBzdXBlclxuICAgICAgICBibHVyID0gbmV3IFBJWEkuQmx1ckZpbHRlclxuXG4gICAgICAgIEB0ZXh0dXJlcyA9IFtcbiAgICAgICAgICAgIFBJWEkuVGV4dHVyZS5mcm9tSW1hZ2UgJy9hc3NldHMvaW1hZ2VzL2xpYnJhcnlfY29uY2VwdC5qcGcnXG4gICAgICAgICAgICBQSVhJLlRleHR1cmUuZnJvbUltYWdlICcvYXNzZXRzL2ltYWdlcy9lYXJ0aF9jaXJjbGUucG5nJ1xuICAgICAgICBdXG5cbiAgICAgICAgQGJhY2tncm91bmQgPSBuZXcgU2tldGNoIEB0ZXh0dXJlc1swXVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueCA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMlxuICAgICAgICBAYmFja2dyb3VuZC5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGJhY2tncm91bmQuZmlsdGVycyA9IFtibHVyXVxuICAgICAgICBAYmFja2dyb3VuZC5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAbG9nb0FuZ2xlID0gMFxuICAgICAgICBAbG9nbyA9IG5ldyBTa2V0Y2ggQHRleHR1cmVzWzFdXG4gICAgICAgIEBsb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBsb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBsb2dvLnBvc2l0aW9uLnggPSA3MFxuICAgICAgICBAbG9nby5wb3NpdGlvbi55ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLmhlaWdodCAvIDJcbiAgICAgICAgQGxvZ28uc2NhbGUueCA9IDAuN1xuICAgICAgICBAbG9nby5zY2FsZS55ID0gMC43XG4gICAgICAgIEBsb2dvLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zID0ge31cblxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXSA9IG5ldyBTeXN0ZW1UZXh0ICdQbGF5JyxcbiAgICAgICAgICAgIGZvbnQ6ICdib2xkIDQycHggQW50b24nXG4gICAgICAgICAgICBhbGlnbjogJ2NlbnRlcidcbiAgICAgICAgICAgIGZpbGw6ICcjM2UxNzA3J1xuICAgICAgICAgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgICAgIHN0cm9rZVRoaWNrbmVzczogNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5wb3NpdGlvbi54ID0gQ29uZmlncy5kZXNrdG9wLnNldHRpbmdzLndpZHRoIC8gMiAtIDEwXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLnBvc2l0aW9uLnkgPSA5MFxuICAgICAgICBAYnV0dG9uc1snc3RhcnQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10gPSBuZXcgU3lzdGVtVGV4dCAnT3B0aW9ucycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5hbmNob3IueSA9IDAuNVxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ucG9zaXRpb24ueCA9IENvbmZpZ3MuZGVza3RvcC5zZXR0aW5ncy53aWR0aCAvIDJcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLnBvc2l0aW9uLnkgPSAxNjBcbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLmFkZFRvU2NlbmUgQFxuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddID0gbmV3IFN5c3RlbVRleHQgJ0xlYWRlckJvYXJkcycsXG4gICAgICAgICAgICBmb250OiAnYm9sZCA0MnB4IEFudG9uJ1xuICAgICAgICAgICAgYWxpZ246ICdsZWZ0J1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBidXR0b25zWydib2FyZCddLnBvc2l0aW9uLnggPSBDb25maWdzLmRlc2t0b3Auc2V0dGluZ3Mud2lkdGggLyAyICsgMTBcbiAgICAgICAgQGJ1dHRvbnNbJ2JvYXJkJ10ucG9zaXRpb24ueSA9IDIzMFxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5hZGRUb1NjZW5lIEBcblxuICAgICAgICAjI2VsZW1lbnRzID0gW1xuICAgICAgICAjIyAgICBAYnV0dG9uc1snaW50cm8nXVxuICAgICAgICAjIyAgICBAYnV0dG9uc1snZ2FtZSddXG4gICAgICAgICMjICAgIEBidXR0b25zWydvcHRpb24nXVxuICAgICAgICAjI11cblxuICAgICAgICAjI2ZvciBlLCBpIGluIGVsZW1lbnRzXG4gICAgICAgICMjICAgIGUubW91c2VvdmVyID0gKGRhdGEpID0+XG4gICAgICAgICMjICAgICAgICBlLnNjYWxlLnggPSAxLjFcbiAgICAgICAgIyMgICAgICAgIGUuc2NhbGUueSA9IDEuMVxuICAgICAgICAjIyAgICAgICAgcmV0dXJuXG4gICAgICAgICMjICAgIGUubW91c2VvdXQgPSAoZGF0YSkgPT5cbiAgICAgICAgIyMgICAgICAgIGUuc2NhbGUueCA9IDEuMFxuICAgICAgICAjIyAgICAgICAgZS5zY2FsZS55ID0gMS4wXG4gICAgICAgICMjICAgICAgICByZXR1cm5cblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgIyMgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS54ID0gMC44XG4gICAgICAgICMjICAgICQuc3RhcnRCdXR0b24uc2NhbGUueSA9IDAuOFxuICAgICAgICAjIyAgICByZXR1cm5cbiAgICAgICAgIyNAc3RhcnRCdXR0b24ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgIyMgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMS4wXG4gICAgICAgICMjICAgIHJldHVyblxuICAgICAgICAjI0BzdGFydEJ1dHRvbi5jbGljayA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICByZXR1cm5cbiAgICAgICAgIyNAc3RhcnRCdXR0b24udG91Y2hzdGFydCA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICByZXR1cm5cbiAgICAgICAgIyNAc3RhcnRCdXR0b24udG91Y2hlbmQgPSAoZGF0YSkgLT5cbiAgICAgICAgIyMgICAgcmV0dXJuXG4gICAgICAgICMjQHN0YXJ0QnV0dG9uLnRhcCA9IChkYXRhKSAtPlxuICAgICAgICAjIyAgICByZXR1cm5cblxuICAgIHVwZGF0ZTogKGRlbHRhVGltZSkgLT5cbiAgICAgICAgJCA9IEBcblxuICAgICAgICAjIyBUT0RPOiBuZWVkIHRvIG1pbmltaXplIGNvZGVcbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAxLjFcbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ3N0YXJ0J10ubW91c2VvdXQgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ3N0YXJ0J10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydzdGFydCddLm1vdXNlZG93biA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydzdGFydCddLnNjYWxlLnggPSAwLjhcbiAgICAgICAgICAgICQuYnV0dG9uc1snc3RhcnQnXS5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ2dhbWUnXG4gICAgICAgICAgICByZXR1cm5cblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10uaW50ZXJhY3RpdmUgPSB0cnVlXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDEuMVxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMS4xXG4gICAgICAgICAgICByZXR1cm5cbiAgICAgICAgQGJ1dHRvbnNbJ29wdGlvbiddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydvcHRpb24nXS5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snb3B0aW9uJ10uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLl9maW5pc2ggPSB0cnVlXG4gICAgICAgICAgICAkLl9uZXh0ID0gJ29wdGlvbidcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAYnV0dG9uc1snb3B0aW9uJ10ubW91c2V1cCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5idXR0b25zWydvcHRpb24nXS5zY2FsZS54ID0gMS4wXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ29wdGlvbiddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLmludGVyYWN0aXZlID0gdHJ1ZVxuICAgICAgICBAYnV0dG9uc1snYm9hcmQnXS5tb3VzZW92ZXIgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuYnV0dG9uc1snYm9hcmQnXS5zY2FsZS54ID0gMS4xXG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueSA9IDEuMVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBidXR0b25zWydib2FyZCddLm1vdXNlb3V0ID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLmJ1dHRvbnNbJ2JvYXJkJ10uc2NhbGUueCA9IDEuMFxuICAgICAgICAgICAgJC5idXR0b25zWydib2FyZCddLnNjYWxlLnkgPSAxLjBcbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBsb2dvQW5nbGUgPSAwIGlmIEBsb2dvQW5nbGUgPj0gMzYwXG4gICAgICAgIEBsb2dvQW5nbGUgKz0gMC4wMVxuICAgICAgICBAbG9nby5yb3RhdGlvbiA9IEBsb2dvQW5nbGVcblxuICAgICAgICBzdXBlciBkZWx0YVRpbWVcbiAgICAgICAgcmV0dXJuXG5cbm1vZHVsZS5leHBvcnRzID0gTG9iYnlTY2VuZVxuIl19