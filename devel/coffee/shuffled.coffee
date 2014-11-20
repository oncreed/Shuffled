Globals = require 'Globals'

BeerPoweredEngine = require 'BeerPoweredEngine'
Background = require 'Background'
Sketch = require 'Sketch'
Loader = require 'Loader'

# Current Scenes
IntroScene = require 'IntroScene'
LobbyScene = require 'LobbyScene'
OptionScene = require 'OptionScene'
GameScene = require 'GameScene'

# ShuffledApp
# The main entry point of the app
class ShuffledApp
    _startup: true,
    _mode: Globals.gameModes.onIntro,
    constructor: (@screenWidth, @screenHeight) ->

    sketch: ->
        $ = @

        @engine = new BeerPoweredEngine @screenWidth, @screenHeight

        @game = @engine.createScene 'game', GameScene, (finish, scene) ->
            if finish is true
                $.engine.goToScene scene
            return
        @lobby = @engine.createScene 'lobby', LobbyScene, (finish, scene) ->
            if finish is true
                $.engine.goToScene scene
            return
        @option = @engine.createScene 'option', OptionScene, (finish, scene) ->
            if finish is true
                $.engine.goToScene scene
            return
        @intro = @engine.createScene 'intro', IntroScene, (finish, scene) ->
            if finish is true
                $.engine.goToScene scene
            return

        @engine.goToScene 'intro' if @_startup is true

        true

module.exports = ShuffledApp
