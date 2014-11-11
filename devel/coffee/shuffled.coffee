
##SystemText = require './entities/systemtext'

# ShuffledApp
# The main entry point of the app
class ShuffledApp
    constructor: (@screenWidth, @screenHeight) ->
        @renderer = PIXI.autoDetectRenderer @screenWidth, @screenHeight
        document.body.appendChild @renderer.view

        @stage = new PIXI.Stage 0x000000

        @sampleTextures = [
            PIXI.Texture.fromImage 'assets/images/lost_kids_contest.jpg'
            PIXI.Texture.fromImage 'assets/images/pursuit.png'
        ]
        @sampleBackground = new PIXI.Sprite @sampleTextures[0]
        @sampleBackground.anchor.x = 0.5
        @sampleBackground.anchor.y = 0.5
        @sampleBackground.position.x = @screenWidth / 2
        @sampleBackground.position.y = @screenHeight / 2
        @stage.addChild @sampleBackground

        @sampleLogo = new PIXI.Sprite @sampleTextures[1]
        @sampleLogo.anchor.x = 0.5
        @sampleLogo.anchor.y = 0.5
        @sampleLogo.position.x = @screenWidth / 2
        @sampleLogo.position.y = @screenHeight / 2
        @sampleLogo.scale.x = 0.2
        @sampleLogo.scale.y = 0.2
        @stage.addChild @sampleLogo

        #@sampleText = SystemText
        #@stage.addChild @sampleText

        requestAnimationFrame @animate

    # animate callback
    animate: =>
        requestAnimationFrame @animate
        @renderer.render @stage
        return

    sketch: ->
        true

##window.ShuffledApp = ShuffledApp
module.exports = ShuffledApp

