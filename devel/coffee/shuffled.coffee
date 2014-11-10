
WebFontConfig =
    google:
        families: [
            'Snippet'
            'Pacifico'
            'Arvo:700italic'
            'Podkova:700'
        ]
    active: ->
        app = new ShuffledApp
        app.sketch()
        return

do ->
    wf = document.createElement 'script'
    wf.src = (if 'https' is document.location.protocol then 'https' else 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'

    wf.type = 'text/javascript'
    wf.async = 'true'
    s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore wf, s

class ShuffledApp
    constructor: ->
        @screenWidth = 800
        @screenHeight = 600

        @renderer = PIXI.autoDetectRenderer @screenWidth, @screenHeight
        document.body.appendChild @renderer.view

        @stage = new PIXI.Stage 0x000000

        @sampleText = new PIXI.Text 'SHUFFLED',
            font: 'bold 60px Pacifico'
            fill: '#3e1707'
            align: 'left'
            stroke: '#a4410e'
            strokeThickness: 7

        @sampleText.anchor.x = 0.5
        @sampleText.anchor.y = 0.5
        @sampleText.position.x = @screenWidth / 2
        @sampleText.position.y = 90

        @stage.addChild @sampleText

        requestAnimationFrame @animate

    animate: =>
        requestAnimationFrame @animate
        @renderer.render @stage
        return

    sketch: ->
        true
