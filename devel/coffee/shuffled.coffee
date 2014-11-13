BeerPoweredEngine = require 'beerpoweredengine'
Sketch = require 'sketch'

# ShuffledApp
# The main entry point of the app
class ShuffledApp
    constructor: (@screenWidth, @screenHeight) ->
        @engine = new BeerPoweredEngine @screenWidth, @screenHeight
        @stage = new PIXI.Stage 0x000000
        @engine.setStage @stage

        @sampleTextures = [
            PIXI.Texture.fromImage '/assets/images/lost_kids_contest.jpg'
            PIXI.Texture.fromImage '/assets/images/pursuit.png'
        ]

        @sampleBackground = new Sketch @sampleTextures[0]
        @sampleBackground.anchor.x = 0.5
        @sampleBackground.anchor.y = 0.5
        @sampleBackground.position.x = @screenWidth / 2
        @sampleBackground.position.y = @screenHeight / 2
        @stage.addChild @sampleBackground

        @sampleLogo = new Sketch @sampleTextures[1]
        @sampleLogo.anchor.x = 0.5
        @sampleLogo.anchor.y = 0.5
        @sampleLogo.position.x = @screenWidth / 2
        @sampleLogo.position.y = @screenHeight / 2
        @sampleLogo.scale.x = 0.2
        @sampleLogo.scale.y = 0.2
        @stage.addChild @sampleLogo

        ##@sampleSound = new Howl(
        ##    urls: ['/assets/sounds/pacman_intro.mp3']
        ##).play()

        ####@sampleText = new PIXI.Text 'loading: 0',
        ####    font: 'bold italic 60px Arvo'
        ####    align: 'center'
        ####    fill: '#3e1707'
        ####    stroke: '#a4410e'
        ####    strokeThickness: 8
        ####@sampleText.anchor.x = 0.5
        ####@sampleText.anchor.y = 0.5
        ####@sampleText.position.x = @screenWidth / 2
        ####@sampleText.position.y = @screenWidth / 2 + 80
        ####@stage.addChild @sampleText

    sketch: ->
        true

module.exports = ShuffledApp

