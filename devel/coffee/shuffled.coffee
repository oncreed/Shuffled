globals = require 'sh-globals'

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
    _startup: true,
    _mode: globals.gameModes.onIntro,
    constructor: (@screenWidth, @screenHeight) ->
        $ = @

        @engine = new BeerPoweredEngine @screenWidth, @screenHeight

        @game = @engine.createScene 'game', GameScene, (finish) ->
            ##@engine.goToScene 'intro' if $.game.isFinish() is true
            console.log 'onGame'
            return
        @intro = @engine.createScene 'intro', IntroScene, (finish) ->
            if finish is true
                console.log 'finish'
                $.engine.goToScene 'game'
            return

        ##if @_startup is true
        @engine.goToScene 'intro'
        ##else
        ##    @engine.gotoScene 'game'

        ##switch @_mode
        ##    when globals.gameModes.onIntro then @engine.goToScene 'intro'
        ##    when globals.gameModes.onGame then @engine.goToScene 'game'
        ##    else @engine.goToScene 'game'

    sketch: ->
        true

module.exports = ShuffledApp
