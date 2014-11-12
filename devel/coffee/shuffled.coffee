
##SystemText = require 'systemtext'

# ShuffledApp
# The main entry point of the app
class ShuffledApp
    constructor: (@screenWidth, @screenHeight) ->
        @renderer = PIXI.autoDetectRenderer @screenWidth, @screenHeight
        document.body.appendChild @renderer.view

        @stats = new Stats
        @stats.domElement.style.position = 'absolute'
        @stats.domElement.style.left = '0px'
        @stats.domElement.style.top = '0px'
        document.body.appendChild @stats.domElement

        @stage = new PIXI.Stage 0x000000

        @sampleTextures = [
            PIXI.Texture.fromImage '/assets/images/lost_kids_contest.jpg'
            PIXI.Texture.fromImage '/assets/images/pursuit.png'
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

        ##@sampleText = new PIXI.Text 'loading: 0',
        ##    font: 'bold italic 60px Arvo'
        ##    align: 'center'
        ##    fill: '#3e1707'
        ##    stroke: '#a4410e'
        ##    strokeThickness: 8
        ##@sampleText.anchor.x = 0.5
        ##@sampleText.anchor.y = 0.5
        ##@sampleText.position.x = @screenWidth / 2
        ##@sampleText.position.y = @screenWidth / 2 + 80
        ##@stage.addChild @sampleText

        window.renderer = @renderer
        window.animate = @animate
        window.stage = @stage
        window.stats = @stats

        ##@count = 0

        requestAnimationFrame @animate

    # animate callback
    animate: =>
        @stats.begin()
        @renderer.render @stage
        @stats.end()

        ##@count += 0.1
        ##@sampleText.setText 'loading: ' + (@count | 0)

        requestAnimationFrame @animate
        return

    sketch: ->
        true

module.exports = ShuffledApp

