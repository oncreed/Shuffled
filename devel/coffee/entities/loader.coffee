globals = require 'sh-globals'

Background = require 'background'
Sketch = require 'sketch'
ProgressBar = require 'progressbar'
SystemText = require 'systemtext'

class Loader
    constructor: (@screenWidth, @screenHeight, @stage) ->
        @textures = [
            PIXI.Texture.fromImage '/assets/images/lost_kids_contest.jpg'
            PIXI.Texture.fromImage '/assets/images/pursuit_blue.png'
            PIXI.Texture.fromImage '/assets/images/pursuit.png'
        ]

        @background = new Background @textures[0]
        @background.anchor.x = 0.5
        @background.anchor.y = 0.5
        @background.position.x = @screenWidth / 2
        @background.position.y = @screenHeight / 2
        @background.addToStage @stage

        @logoNoFill = new Sketch @textures[1]
        @logoNoFill.anchor.x = 0.5
        @logoNoFill.anchor.y = 0.5
        @logoNoFill.position.x = @screenWidth / 2
        @logoNoFill.position.y = @screenHeight / 2
        @logoNoFill.scale.x = 0.2
        @logoNoFill.scale.y = 0.2
        @logoNoFill.addToStage @stage

        @logo = new Sketch @textures[2]
        @logo.anchor.x = 0.5
        @logo.anchor.y = 0.5
        @logo.position.x = @screenWidth / 2
        @logo.position.y = @screenHeight / 2
        @logo.scale.x = 0.2
        @logo.scale.y = 0.2
        @logo.alpha = 0.0
        @logo.addToStage @stage

        @startButton = new SystemText 'Click here to start the game...',
            font: 'bold italic 42px Arvo'
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @startButton.anchor.x = 0.5
        @startButton.anchor.y = 0.5
        @startButton.position.x = @screenWidth / 2
        @startButton.position.y = @screenWidth / 2 + 90
        @startButton.alpha = 0.0
        @startButton.addToStage @stage

        $ = @
        tween = new TWEEN.Tween(
            alpha: 0.0
        ).to(
            alpha: 1.0
        , 16000).easing(TWEEN.Easing.Elastic.InOut).onUpdate( ->
            $.logo.alpha = @alpha
            return
        ).onComplete( ->
            $.startButton.alpha = 1.0
        ).start()

    update: (deltaTime) ->
        return

module.exports = Loader
