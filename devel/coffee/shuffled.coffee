BeerPoweredEngine = require 'beerpoweredengine'
Background = require 'background'
Sketch = require 'sketch'
Loader = require 'loader'

# Current Scenes
IntroScene = require 'introscene'
GameScene = require 'gamescene'

# ShuffledApp
# The main entry point of the app
class ShuffledApp
    _coldStartup: true,
    constructor: (@screenWidth, @screenHeight) ->
        @engine = new BeerPoweredEngine @screenWidth, @screenHeight

        @game = @engine.createScene 'game', GameScene
        @intro = @engine.createScene 'intro', IntroScene

        if @_coldStartup is true
            @engine.goToScene 'intro'
        else
            @engine.gotoScene 'game'

    sketch: ->
        true

module.exports = ShuffledApp
