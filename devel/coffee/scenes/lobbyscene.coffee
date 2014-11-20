Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'
SystemText = require 'SystemText'

class LobbyScene extends Scene
    constructor: ->
        super
        blur = new PIXI.BlurFilter

        @textures = [
            PIXI.Texture.fromImage '/assets/images/library_concept.jpg'
            PIXI.Texture.fromImage '/assets/images/earth_circle.png'
        ]

        @background = new Sketch @textures[0]
        @background.anchor.x = 0.5
        @background.anchor.y = 0.5
        @background.position.x = Configs.desktop.settings.width / 2
        @background.position.y = Configs.desktop.settings.height / 2
        @background.filters = [blur]
        @background.addToScene @

        @logoAngle = 0
        @logo = new Sketch @textures[1]
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
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @buttons['start'].anchor.y = 0.5
        @buttons['start'].position.x = Configs.desktop.settings.width / 2 - 10
        @buttons['start'].position.y = 90
        @buttons['start'].addToScene @

        @buttons['option'] = new SystemText 'Options',
            font: 'bold 42px Anton'
            align: 'left'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @buttons['option'].anchor.y = 0.5
        @buttons['option'].position.x = Configs.desktop.settings.width / 2
        @buttons['option'].position.y = 160
        @buttons['option'].addToScene @

        @buttons['board'] = new SystemText 'LeaderBoards',
            font: 'bold 42px Anton'
            align: 'left'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @buttons['board'].anchor.y = 0.5
        @buttons['board'].position.x = Configs.desktop.settings.width / 2 + 10
        @buttons['board'].position.y = 230
        @buttons['board'].addToScene @

        ##elements = [
        ##    @buttons['intro']
        ##    @buttons['game']
        ##    @buttons['option']
        ##]

        ##for e, i in elements
        ##    e.mouseover = (data) =>
        ##        e.scale.x = 1.1
        ##        e.scale.y = 1.1
        ##        return
        ##    e.mouseout = (data) =>
        ##        e.scale.x = 1.0
        ##        e.scale.y = 1.0
        ##        return

        ##@startButton.mousedown = (data) ->
        ##    $.startButton.scale.x = 0.8
        ##    $.startButton.scale.y = 0.8
        ##    return
        ##@startButton.mouseup = (data) ->
        ##    $.startButton.scale.x = 1.0
        ##    $.startButton.scale.y = 1.0
        ##    return
        ##@startButton.click = (data) ->
        ##    return
        ##@startButton.touchstart = (data) ->
        ##    return
        ##@startButton.touchend = (data) ->
        ##    return
        ##@startButton.tap = (data) ->
        ##    return

    update: (deltaTime) ->
        $ = @

        ## TODO: need to minimize code
        @buttons['start'].interactive = true
        @buttons['start'].mouseover = (data) ->
            $.buttons['start'].scale.x = 1.1
            $.buttons['start'].scale.y = 1.1
            return
        @buttons['start'].mouseout = (data) ->
            $.buttons['start'].scale.x = 1.0
            $.buttons['start'].scale.y = 1.0
            return
        @buttons['start'].mousedown = (data) ->
            $.buttons['start'].scale.x = 0.8
            $.buttons['start'].scale.y = 0.8
            $._finish = true
            $._next = 'game'
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

        @logoAngle = 0 if @logoAngle >= 360
        @logoAngle += 0.01
        @logo.rotation = @logoAngle

        super deltaTime
        return

module.exports = LobbyScene
