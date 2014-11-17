
class BeerPoweredEngine
    constructor: (@screenWidth, @screenHeight) ->
        @init()

    init: ->
        @renderer = PIXI.autoDetectRenderer @screenWidth, @screenHeight
        document.body.appendChild @renderer.view

        @stats = new Stats
        document.body.appendChild @stats.domElement

        @stage = new PIXI.Stage 0x00ff00

        canvas = document.createElement 'canvas'
        canvas.width = @screenWidth
        canvas.height = @screenHeight

        context = canvas.getContext '2d'
        drawLine = (fX, fY, tX, tY, width, color) ->
            context.beginPath()
            context.moveTo fX, fY
            context.lineTo tX, tY
            context.lineWidth = width
            context.strokeStyle = color
            context.stroke()

        drawLine  57,   0,  57, 450, 114, '#808080'
        drawLine 171,   0, 171, 450, 114, '#ffff00'
        drawLine 285,   0, 285, 450, 114, '#00ffff'
        drawLine 399,   0, 399, 450, 114, '#00ff00'
        drawLine 513,   0, 513, 450, 114, '#ff00ff'
        drawLine 627,   0, 627, 450, 114, '#ff0000'
        drawLine 741,   0, 741, 450, 114, '#0000ff'

        drawLine 100, 450, 100, 500, 200, '#0000ff'
        drawLine 300, 450, 300, 500, 200, '#ff00ff'
        drawLine 500, 450, 500, 500, 200, '#00ffff'
        drawLine 700, 450, 700, 500, 200, '#ffffff'

        drawLine 200, 500, 200, 600, 400, '#ffffff'
        drawLine 600, 500, 600, 600, 400, '#000000'

        @sprite = new PIXI.Sprite PIXI.Texture.fromCanvas canvas
        @stage.addChild @sprite

        window.renderer = @renderer
        window.animate = @animate
        window.stats = @stats
        window.stage = @stage

        @poller = null

        requestAnimationFrame @animate
        return

    setStage: (@stage) ->
        window.stage = @stage
        return

    setPoller: (@poller) ->
        return

    animate: (deltaTime) =>
        @stats.begin()
        if @stage?
            @renderer.render @stage

        @poller?.call()
        @stats.end()

        requestAnimationFrame @animate
        TWEEN.update deltaTime
        return


module.exports = BeerPoweredEngine
