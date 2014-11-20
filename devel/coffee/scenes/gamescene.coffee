Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'
SystemText = require 'SystemText'

class GameScene extends Scene
    constructor: ->
        super
        blur = new PIXI.BlurFilter

        @symbols = []

        @texture = PIXI.Texture.fromImage '/assets/images/canyon_of_ages.jpg'
        @background = new Sketch @texture
        @background.anchor.x = 0.5
        @background.anchor.y = 0.5
        @background.position.x = Configs.desktop.settings.width / 2
        @background.position.y = Configs.desktop.settings.height / 2 + 60
        @background.scale.x = 0.8
        @background.scale.y = 1.2
        @background.filters = null
        @background.addToScene @

        xpos = [
            60
            104
            148
            192
            236
        ]

        ypos = [
            60
            104
            148
            192
            236
        ]

        i = 0
        while i < 16
            @symbols[i] = new SystemText 'A',
                font: 'bold 42px Anton'
                align: 'center'
                fill: '#3e1707'
                stroke: '#a4410e'
                strokeThickness: 5
            @symbols[i].anchor.x = 0.5
            @symbols[i].anchor.y = 0.5
            @symbols[i].position.x = xpos[i]
            @symbols[i].position.y = ypos[i]
            @symbols[i].addToScene @
            i++

    update: (deltaTime) ->
        $ = @

        super deltaTime
        return

module.exports = GameScene
