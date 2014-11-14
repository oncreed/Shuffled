BeerPoweredEngine = require 'beerpoweredengine'
Background = require 'background'
Sketch = require 'sketch'
Loader = require 'loader'

# ShuffledApp
# The main entry point of the app
class ShuffledApp
    constructor: (@screenWidth, @screenHeight) ->
        @engine = new BeerPoweredEngine @screenWidth, @screenHeight
        @stage = new PIXI.Stage 0x000000
        @engine.setStage @stage

        @loader = new Loader @screenWidth, @screenHeight, @stage

        @loadSound = new Howl(
            urls: ['/assets/sounds/flo_rida.mp3']
            autoplay: true
            loop: true
        ).play()

    sketch: ->
        true

module.exports = ShuffledApp

