Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'
Button = require 'Button'
SystemText = require 'SystemText'

class LobbyScene extends Scene
    constructor: ->
        super 0xffffff

    init: ->
        @textures = [
            PIXI.Texture.fromImage '/assets/images/earth_circle.png'
        ]

        @logoAngle = 0
        @logo = new Sketch @textures[0]
        @logo.anchor.x = 0.5
        @logo.anchor.y = 0.5
        @logo.position.x = 70
        @logo.position.y = Configs.desktop.settings.height / 2
        @logo.scale.x = 0.7
        @logo.scale.y = 0.7
        @logo.addToScene @

        @buttons = {}
        @buttons['start'] = new SystemText 'Play',
            font: 'bold 42px Anton'
            align: 'left'
            fill: '#a7dbdb'
            stroke: '#69d2e7'
            strokeThickness: 5
        @buttons['start'].anchor.y = 0.5
        @buttons['start'].position.x = Configs.desktop.settings.width / 2 - 10
        @buttons['start'].position.y = 90
        @buttons['start'].addToScene @

        @buttons['option'] = new SystemText 'Options',
            font: 'bold 42px Anton'
            align: 'left'
            fill: '#a7dbdb'
            stroke: '#69d2e7'
            strokeThickness: 5
        @buttons['option'].anchor.y = 0.5
        @buttons['option'].position.x = Configs.desktop.settings.width / 2
        @buttons['option'].position.y = 160
        @buttons['option'].addToScene @

        @buttons['board'] = new SystemText 'LeaderBoards',
            font: 'bold 42px Anton'
            align: 'left'
            fill: '#a7dbdb'
            stroke: '#69d2e7'
            strokeThickness: 5
        @buttons['board'].anchor.y = 0.5
        @buttons['board'].position.x = Configs.desktop.settings.width / 2 + 10
        @buttons['board'].position.y = 230
        @buttons['board'].addToScene @
        return

    update: (deltaTime) ->
        $ = @

        ## TODO: need to minimize code
        @buttons['start'].interactive = true
        @buttons['start'].mouseover = (data) ->
            window.beer.scenes['lobby'].buttons['start'].scale.x = 1.1
            window.beer.scenes['lobby'].buttons['start'].scale.y = 1.1
            return
        @buttons['start'].mouseout = (data) ->
            window.beer.scenes['lobby'].buttons['start'].scale.x = 1.0
            window.beer.scenes['lobby'].buttons['start'].scale.y = 1.0
            return
        @buttons['start'].mousedown = (data) ->
            window.beer.scenes['lobby'].buttons['start'].scale.x = 0.8
            window.beer.scenes['lobby'].buttons['start'].scale.y = 0.8
            $._finish = true
            $._next = 'game'

            console.log 'ehlo'
            return

        @buttons['option'].interactive = true
        @buttons['option'].mouseover = (data) ->
            $.buttons['option'].scale.x = 1.1
            $.buttons['option'].scale.y = 1.1
            return
        @buttons['option'].mouseout = (data) ->
            $.buttons['option'].scale.x = 1.0
            $.buttons['option'].scale.y = 1.0
            return
        @buttons['option'].mousedown = (data) ->
            $.buttons['option'].scale.x = 0.8
            $.buttons['option'].scale.y = 0.8
            $._finish = true
            $._next = 'option'

            console.log 'ehlo'
            return
        @buttons['option'].mouseup = (data) ->
            $.buttons['option'].scale.x = 1.0
            $.buttons['option'].scale.y = 1.0
            return

        @buttons['board'].interactive = true
        @buttons['board'].mouseover = (data) ->
            $.buttons['board'].scale.x = 1.1
            $.buttons['board'].scale.y = 1.1
            return
        @buttons['board'].mouseout = (data) ->
            $.buttons['board'].scale.x = 1.0
            $.buttons['board'].scale.y = 1.0
            return
        @buttons['board'].mousedown = (data) ->
            $.buttons['board'].scale.x = 0.8
            $.buttons['board'].scale.y = 0.8
            $._finish = true
            $._next = 'board'

            console.log 'ehlo'
            return
        @buttons['board'].mouseup = (data) ->
            $.buttons['board'].scale.x = 1.0
            $.buttons['board'].scale.y = 1.0
            return

        @logoAngle = 0 if @logoAngle >= 360
        @logoAngle += 0.01
        @logo.rotation = @logoAngle

        super deltaTime
        return

module.exports = LobbyScene
