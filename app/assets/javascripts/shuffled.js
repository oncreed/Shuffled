var BeerPoweredEngine, ShuffledApp, Sketch;

BeerPoweredEngine = require('beerpoweredengine');

Sketch = require('sketch');

ShuffledApp = (function() {
  function ShuffledApp(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.engine = new BeerPoweredEngine(this.screenWidth, this.screenHeight);
    this.stage = new PIXI.Stage(0x000000);
    this.engine.setStage(this.stage);
    this.sampleTextures = [PIXI.Texture.fromImage('/assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('/assets/images/pursuit.png')];
    this.sampleBackground = new Sketch(this.sampleTextures[0]);
    this.sampleBackground.anchor.x = 0.5;
    this.sampleBackground.anchor.y = 0.5;
    this.sampleBackground.position.x = this.screenWidth / 2;
    this.sampleBackground.position.y = this.screenHeight / 2;
    this.stage.addChild(this.sampleBackground);
    this.sampleLogo = new Sketch(this.sampleTextures[1]);
    this.sampleLogo.anchor.x = 0.5;
    this.sampleLogo.anchor.y = 0.5;
    this.sampleLogo.position.x = this.screenWidth / 2;
    this.sampleLogo.position.y = this.screenHeight / 2;
    this.sampleLogo.scale.x = 0.2;
    this.sampleLogo.scale.y = 0.2;
    this.stage.addChild(this.sampleLogo);
  }

  ShuffledApp.prototype.sketch = function() {
    return true;
  };

  return ShuffledApp;

})();

module.exports = ShuffledApp;

//# sourceMappingURL=data:application/json;base64,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TSxDQUFDLE9BQVAsR0FBaUIsV0FuRGpCLENBQUEiLCJmaWxlIjoic2h1ZmZsZWQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyJCZWVyUG93ZXJlZEVuZ2luZSA9IHJlcXVpcmUgJ2JlZXJwb3dlcmVkZW5naW5lJ1xuU2tldGNoID0gcmVxdWlyZSAnc2tldGNoJ1xuXG4jIFNodWZmbGVkQXBwXG4jIFRoZSBtYWluIGVudHJ5IHBvaW50IG9mIHRoZSBhcHBcbmNsYXNzIFNodWZmbGVkQXBwXG4gICAgY29uc3RydWN0b3I6IChAc2NyZWVuV2lkdGgsIEBzY3JlZW5IZWlnaHQpIC0+XG4gICAgICAgIEBlbmdpbmUgPSBuZXcgQmVlclBvd2VyZWRFbmdpbmUgQHNjcmVlbldpZHRoLCBAc2NyZWVuSGVpZ2h0XG4gICAgICAgIEBzdGFnZSA9IG5ldyBQSVhJLlN0YWdlIDB4MDAwMDAwXG4gICAgICAgIEBlbmdpbmUuc2V0U3RhZ2UgQHN0YWdlXG5cbiAgICAgICAgQHNhbXBsZVRleHR1cmVzID0gW1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvbG9zdF9raWRzX2NvbnRlc3QuanBnJ1xuICAgICAgICAgICAgUElYSS5UZXh0dXJlLmZyb21JbWFnZSAnL2Fzc2V0cy9pbWFnZXMvcHVyc3VpdC5wbmcnXG4gICAgICAgIF1cblxuICAgICAgICBAc2FtcGxlQmFja2dyb3VuZCA9IG5ldyBTa2V0Y2ggQHNhbXBsZVRleHR1cmVzWzBdXG4gICAgICAgIEBzYW1wbGVCYWNrZ3JvdW5kLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzYW1wbGVCYWNrZ3JvdW5kLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBzYW1wbGVCYWNrZ3JvdW5kLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBzYW1wbGVCYWNrZ3JvdW5kLnBvc2l0aW9uLnkgPSBAc2NyZWVuSGVpZ2h0IC8gMlxuICAgICAgICBAc3RhZ2UuYWRkQ2hpbGQgQHNhbXBsZUJhY2tncm91bmRcblxuICAgICAgICBAc2FtcGxlTG9nbyA9IG5ldyBTa2V0Y2ggQHNhbXBsZVRleHR1cmVzWzFdXG4gICAgICAgIEBzYW1wbGVMb2dvLmFuY2hvci54ID0gMC41XG4gICAgICAgIEBzYW1wbGVMb2dvLmFuY2hvci55ID0gMC41XG4gICAgICAgIEBzYW1wbGVMb2dvLnBvc2l0aW9uLnggPSBAc2NyZWVuV2lkdGggLyAyXG4gICAgICAgIEBzYW1wbGVMb2dvLnBvc2l0aW9uLnkgPSBAc2NyZWVuSGVpZ2h0IC8gMlxuICAgICAgICBAc2FtcGxlTG9nby5zY2FsZS54ID0gMC4yXG4gICAgICAgIEBzYW1wbGVMb2dvLnNjYWxlLnkgPSAwLjJcbiAgICAgICAgQHN0YWdlLmFkZENoaWxkIEBzYW1wbGVMb2dvXG5cbiAgICAgICAgIyNAc2FtcGxlU291bmQgPSBuZXcgSG93bChcbiAgICAgICAgIyMgICAgdXJsczogWycvYXNzZXRzL3NvdW5kcy9wYWNtYW5faW50cm8ubXAzJ11cbiAgICAgICAgIyMpLnBsYXkoKVxuXG4gICAgICAgICMjIyNAc2FtcGxlVGV4dCA9IG5ldyBQSVhJLlRleHQgJ2xvYWRpbmc6IDAnLFxuICAgICAgICAjIyMjICAgIGZvbnQ6ICdib2xkIGl0YWxpYyA2MHB4IEFydm8nXG4gICAgICAgICMjIyMgICAgYWxpZ246ICdjZW50ZXInXG4gICAgICAgICMjIyMgICAgZmlsbDogJyMzZTE3MDcnXG4gICAgICAgICMjIyMgICAgc3Ryb2tlOiAnI2E0NDEwZSdcbiAgICAgICAgIyMjIyAgICBzdHJva2VUaGlja25lc3M6IDhcbiAgICAgICAgIyMjI0BzYW1wbGVUZXh0LmFuY2hvci54ID0gMC41XG4gICAgICAgICMjIyNAc2FtcGxlVGV4dC5hbmNob3IueSA9IDAuNVxuICAgICAgICAjIyMjQHNhbXBsZVRleHQucG9zaXRpb24ueCA9IEBzY3JlZW5XaWR0aCAvIDJcbiAgICAgICAgIyMjI0BzYW1wbGVUZXh0LnBvc2l0aW9uLnkgPSBAc2NyZWVuV2lkdGggLyAyICsgODBcbiAgICAgICAgIyMjI0BzdGFnZS5hZGRDaGlsZCBAc2FtcGxlVGV4dFxuXG4gICAgc2tldGNoOiAtPlxuICAgICAgICB0cnVlXG5cbm1vZHVsZS5leHBvcnRzID0gU2h1ZmZsZWRBcHBcblxuIl19