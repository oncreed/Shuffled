Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'
Button = require 'Button'
SystemText = require 'SystemText'

class GameScene extends Scene
    constructor: ->
        super 0xffffff

    init: ->
        @symbols = []
        xpos = [
            80
            160
            240
            320
            400
            480
        ]

        ypos = [
            80
            160
            240
            320
            400
            480
        ]

        @chars = 'ABCDEF'.split ''

        i = 0
        while i < 6
            j = 0
            while j < 6
                index = i + j

                n = @getRandomInt 0, 5

                @symbols[index] = new SystemText @chars[n],
                    font: 'bold 72px Anton'
                    align: 'center'
                    fill: '#3e1707'
                    stroke: '#a4410e'
                    strokeThickness: 5
                @symbols[index].anchor.x = 0.5
                @symbols[index].anchor.y = 0.5
                @symbols[index].position.x = xpos[j]
                @symbols[index].position.y = ypos[i]
                @symbols[index].addToScene @
                j++
            i++

        @buttons = {}
        @buttons['shuffle'] = new SystemText 'shuffle!',
            font: 'bold 42px Anton'
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @buttons['shuffle'].anchor.x = 0.5
        @buttons['shuffle'].anchor.y = 0.5
        @buttons['shuffle'].position.x = Configs.desktop.settings.width / 2 + 260
        @buttons['shuffle'].position.y = 90
        @buttons['shuffle'].addToScene @

        @buttons['info'] = new SystemText 'info',
            font: 'bold 42px Anton'
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @buttons['info'].anchor.x = 0.5
        @buttons['info'].anchor.y = 0.5
        @buttons['info'].position.x = Configs.desktop.settings.width / 2 + 260
        @buttons['info'].position.y = 140
        @buttons['info'].addToScene @

        @buttons['find'] = new SystemText 'eureka',
            font: 'bold 42px Anton'
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @buttons['find'].anchor.x = 0.5
        @buttons['find'].anchor.y = 0.5
        @buttons['find'].position.x = Configs.desktop.settings.width / 2 + 260
        @buttons['find'].position.y = 340
        @buttons['find'].addToScene @

        @overlay = new PIXI.Graphics
        @overlay.beginFill 0xfffff
        @overlay.drawCircle 0, 0, 300
        @overlay.endFill()
        @addChild @overlay
        return

    update: (deltaTime) ->
        $ = @

        @buttons['shuffle'].interactive = true
        @buttons['shuffle'].mouseover = (data) ->
            $.buttons['shuffle'].scale.x = 1.1
            $.buttons['shuffle'].scale.y = 1.1
            return
        @buttons['shuffle'].mouseout = (data) ->
            $.buttons['shuffle'].scale.x = 1.0
            $.buttons['shuffle'].scale.y = 1.0
            return
        @buttons['shuffle'].mousedown = (data) ->
            $.buttons['shuffle'].scale.x = 0.8
            $.buttons['shuffle'].scale.y = 0.8
            ##i = 0
            ##while i < 6
            ##    j = 0
            ##    while j < 6
            ##        index = i + j
            ##        n = $.getRandomInt 0, $.chars.length

            ##        $.symbols[index].setText $.chars[n]
            ##        j++
            ##    i++

            @showOverlay()
            return
        @buttons['shuffle'].mouseup = (data) ->
            $.buttons['shuffle'].scale.x = 1.0
            $.buttons['shuffle'].scale.y = 1.0
            return

        super deltaTime
        return

    getRandomInt: (min, max) ->
        (Math.floor(Math.random() * (max - min + 1)) + min)

    showOverlay: ->
        
        return


module.exports = GameScene
