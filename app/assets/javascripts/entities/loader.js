var Background, Loader, ProgressBar, Sketch, SystemText, globals;

globals = require('sh-globals');

Background = require('background');

Sketch = require('sketch');

ProgressBar = require('progressbar');

SystemText = require('systemtext');

Loader = (function() {
  function Loader(screenWidth, screenHeight, stage) {
    var $;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.stage = stage;
    $ = this;
    this.tasksDone = false;
    this.tasksCount = 0;
    this.tasksCompleted = 0;
    this.startButton = new SystemText('Play', {
      font: 'bold 42px Anton',
      align: 'center',
      fill: '#3e1707',
      stroke: '#a4410e',
      strokeThickness: 5
    });
    this.startButton.anchor.x = 0.5;
    this.startButton.anchor.y = 0.5;
    this.startButton.position.x = this.screenWidth / 2;
    this.startButton.position.y = this.screenWidth / 2 + 90;
    this.startButton.alpha = 0.0;
    this.startButton.interactive = true;
    this.startButton.mouseover = function(data) {};
    this.startButton.mouseout = function(data) {};
    this.startButton.mousedown = function(data) {
      $.startButton.scale.x = 0.8;
      $.startButton.scale.y = 0.8;
      $.tradeOff = true;
    };
    this.startButton.mouseup = function(data) {
      $.startButton.scale.x = 1.0;
      $.startButton.scale.y = 1.0;
    };
    this.startButton.click = function(data) {
      $.background.filters = [$.myFilter];
    };
    this.startButton.touchstart = function(data) {};
    this.startButton.touchend = function(data) {};
    this.startButton.tap = function(data) {};
    this.startButton.addToStage(this.stage);
    this.loadSound = new Howl({
      urls: ['/assets/sounds/flo_rida.mp3'],
      autoplay: false,
      loop: true,
      onload: function() {
        return console.log('finished loading sound');
      }
    });
  }

  Loader.prototype.taskToLoad = function(count) {
    return this.tasksCount = count;
  };

  Loader.prototype.addToFinishedTask = function() {
    if (!this.tasksCount === this.tasksCompleted) {
      return this.tasksCompleted += 1;
    } else {
      return this.tasksDone = true;
    }
  };

  Loader.prototype.update = function(deltaTime) {};

  return Loader;

})();

module.exports = Loader;

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVudGl0aWVzL2xvYWRlci5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSw0REFBQTs7QUFBQSxPQUFBLEdBQVUsT0FBQSxDQUFRLFlBQVIsQ0FBVixDQUFBOztBQUFBLFVBRUEsR0FBYSxPQUFBLENBQVEsWUFBUixDQUZiLENBQUE7O0FBQUEsTUFHQSxHQUFTLE9BQUEsQ0FBUSxRQUFSLENBSFQsQ0FBQTs7QUFBQSxXQUlBLEdBQWMsT0FBQSxDQUFRLGFBQVIsQ0FKZCxDQUFBOztBQUFBLFVBS0EsR0FBYSxPQUFBLENBQVEsWUFBUixDQUxiLENBQUE7O0FBQUE7QUFRaUIsRUFBQSxnQkFBRSxXQUFGLEVBQWdCLFlBQWhCLEVBQStCLEtBQS9CLEdBQUE7QUFDVCxRQUFBLENBQUE7QUFBQSxJQURVLElBQUMsQ0FBQSxjQUFBLFdBQ1gsQ0FBQTtBQUFBLElBRHdCLElBQUMsQ0FBQSxlQUFBLFlBQ3pCLENBQUE7QUFBQSxJQUR1QyxJQUFDLENBQUEsUUFBQSxLQUN4QyxDQUFBO0FBQUEsSUFBQSxDQUFBLEdBQUksSUFBSixDQUFBO0FBQUEsSUFFQSxJQUFDLENBQUEsU0FBRCxHQUFhLEtBRmIsQ0FBQTtBQUFBLElBR0EsSUFBQyxDQUFBLFVBQUQsR0FBYyxDQUhkLENBQUE7QUFBQSxJQUlBLElBQUMsQ0FBQSxjQUFELEdBQWtCLENBSmxCLENBQUE7QUFBQSxJQU1BLElBQUMsQ0FBQSxXQUFELEdBQW1CLElBQUEsVUFBQSxDQUFXLE1BQVgsRUFDZjtBQUFBLE1BQUEsSUFBQSxFQUFNLGlCQUFOO0FBQUEsTUFDQSxLQUFBLEVBQU8sUUFEUDtBQUFBLE1BRUEsSUFBQSxFQUFNLFNBRk47QUFBQSxNQUdBLE1BQUEsRUFBUSxTQUhSO0FBQUEsTUFJQSxlQUFBLEVBQWlCLENBSmpCO0tBRGUsQ0FObkIsQ0FBQTtBQUFBLElBWUEsSUFBQyxDQUFBLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBcEIsR0FBd0IsR0FaeEIsQ0FBQTtBQUFBLElBYUEs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R0ksSUFBQyxDQUFBLFNBQUQsR0FBYSxLQUhqQjtLQURlO0VBQUEsQ0F2RG5CLENBQUE7O0FBQUEsbUJBNkRBLE1BQUEsR0FBUSxTQUFDLFNBQUQsR0FBQSxDQTdEUixDQUFBOztnQkFBQTs7SUFSSixDQUFBOztBQUFBLE1Bd0VNLENBQUMsT0FBUCxHQUFpQixNQXhFakIsQ0FBQSIsImZpbGUiOiJlbnRpdGllcy9sb2FkZXIuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJnbG9iYWxzID0gcmVxdWlyZSAnc2gtZ2xvYmFscydcblxuQmFja2dyb3VuZCA9IHJlcXVpcmUgJ2JhY2tncm91bmQnXG5Ta2V0Y2ggPSByZXF1aXJlICdza2V0Y2gnXG5Qcm9ncmVzc0JhciA9IHJlcXVpcmUgJ3Byb2dyZXNzYmFyJ1xuU3lzdGVtVGV4dCA9IHJlcXVpcmUgJ3N5c3RlbXRleHQnXG5cbmNsYXNzIExvYWRlclxuICAgIGNvbnN0cnVjdG9yOiAoQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0LCBAc3RhZ2UpIC0+XG4gICAgICAgICQgPSBAXG5cbiAgICAgICAgQHRhc2tzRG9uZSA9IGZhbHNlXG4gICAgICAgIEB0YXNrc0NvdW50ID0gMFxuICAgICAgICBAdGFza3NDb21wbGV0ZWQgPSAwXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uID0gbmV3IFN5c3RlbVRleHQgJ1BsYXknLFxuICAgICAgICAgICAgZm9udDogJ2JvbGQgNDJweCBBbnRvbidcbiAgICAgICAgICAgIGFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICAgICBzdHJva2U6ICcjYTQ0MTBlJ1xuICAgICAgICAgICAgc3Ryb2tlVGhpY2tuZXNzOiA1XG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbmNob3IueCA9IDAuNVxuICAgICAgICBAc3RhcnRCdXR0b24uYW5jaG9yLnkgPSAwLjVcbiAgICAgICAgQHN0YXJ0QnV0dG9uLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBzdGFydEJ1dHRvbi5wb3NpdGlvbi55ID0gQHNjcmVlbldpZHRoIC8gMiArIDkwXG4gICAgICAgIEBzdGFydEJ1dHRvbi5hbHBoYSA9IDAuMFxuICAgICAgICBAc3RhcnRCdXR0b24uaW50ZXJhY3RpdmUgPSB0cnVlXG5cbiAgICAgICAgQHN0YXJ0QnV0dG9uLm1vdXNlb3ZlciA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZW91dCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZWRvd24gPSAoZGF0YSkgLT5cbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueCA9IDAuOFxuICAgICAgICAgICAgJC5zdGFydEJ1dHRvbi5zY2FsZS55ID0gMC44XG4gICAgICAgICAgICAkLnRyYWRlT2ZmID0gdHJ1ZVxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5tb3VzZXVwID0gKGRhdGEpIC0+XG4gICAgICAgICAgICAkLnN0YXJ0QnV0dG9uLnNjYWxlLnggPSAxLjBcbiAgICAgICAgICAgICQuc3RhcnRCdXR0b24uc2NhbGUueSA9IDEuMFxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5jbGljayA9IChkYXRhKSAtPlxuICAgICAgICAgICAgJC5iYWNrZ3JvdW5kLmZpbHRlcnMgPSBbJC5teUZpbHRlcl1cbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICBAc3RhcnRCdXR0b24udG91Y2hzdGFydCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50b3VjaGVuZCA9IChkYXRhKSAtPlxuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIEBzdGFydEJ1dHRvbi50YXAgPSAoZGF0YSkgLT5cbiAgICAgICAgICAgIHJldHVyblxuXG4gICAgICAgIEBzdGFydEJ1dHRvbi5hZGRUb1N0YWdlIEBzdGFnZVxuXG4gICAgICAgIEBsb2FkU291bmQgPSBuZXcgSG93bFxuICAgICAgICAgICAgdXJsczogWycvYXNzZXRzL3NvdW5kcy9mbG9fcmlkYS5tcDMnXVxuICAgICAgICAgICAgYXV0b3BsYXk6IGZhbHNlXG4gICAgICAgICAgICBsb29wOiB0cnVlXG4gICAgICAgICAgICBvbmxvYWQ6IC0+XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cgJ2ZpbmlzaGVkIGxvYWRpbmcgc291bmQnXG5cbiAgICB0YXNrVG9Mb2FkOiAoY291bnQpIC0+XG4gICAgICAgIEB0YXNrc0NvdW50ID0gY291bnRcblxuICAgIGFkZFRvRmluaXNoZWRUYXNrOiAoKSAtPlxuICAgICAgICBpZiBub3QgQHRhc2tzQ291bnQgaXMgQHRhc2tzQ29tcGxldGVkXG4gICAgICAgICAgICBAdGFza3NDb21wbGV0ZWQgKz0gMVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBAdGFza3NEb25lID0gdHJ1ZVxuXG4gICAgdXBkYXRlOiAoZGVsdGFUaW1lKSAtPlxuICAgICAgICByZXR1cm5cblxubW9kdWxlLmV4cG9ydHMgPSBMb2FkZXJcbiJdfQ==