(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ShuffledApp,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

ShuffledApp = (function() {
  function ShuffledApp(screenWidth, screenHeight) {
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
    this.animate = __bind(this.animate, this);
    this.renderer = PIXI.autoDetectRenderer(this.screenWidth, this.screenHeight);
    document.body.appendChild(this.renderer.view);
    this.stage = new PIXI.Stage(0x000000);
    this.sampleTextures = [PIXI.Texture.fromImage('assets/images/lost_kids_contest.jpg'), PIXI.Texture.fromImage('assets/images/pursuit.png')];
    this.sampleBackground = new PIXI.Sprite(this.sampleTextures[0]);
    this.sampleBackground.anchor.x = 0.5;
    this.sampleBackground.anchor.y = 0.5;
    this.sampleBackground.position.x = this.screenWidth / 2;
    this.sampleBackground.position.y = this.screenHeight / 2;
    this.stage.addChild(this.sampleBackground);
    this.sampleLogo = new PIXI.Sprite(this.sampleTextures[1]);
    this.sampleLogo.anchor.x = 0.5;
    this.sampleLogo.anchor.y = 0.5;
    this.sampleLogo.position.x = this.screenWidth / 2;
    this.sampleLogo.position.y = this.screenHeight / 2;
    this.sampleLogo.scale.x = 0.2;
    this.sampleLogo.scale.y = 0.2;
    this.stage.addChild(this.sampleLogo);
    requestAnimationFrame(this.animate);
  }

  ShuffledApp.prototype.animate = function() {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.stage);
  };

  ShuffledApp.prototype.sketch = function() {
    return true;
  };

  return ShuffledApp;

})();

module.exports = ShuffledApp;


},{}]},{},[1]);
