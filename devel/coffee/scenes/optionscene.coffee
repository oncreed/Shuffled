Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'
Button = require 'Button'
SystemText = require 'SystemText'

class OptionScene extends Scene
    constructor: ->
        super
        @init()

    init: ->
        blur = new PIXI.BlurFilter

        @textures = [
            PIXI.Texture.fromImage '/assets/images/lost_kids_contest.jpg'
            PIXI.Texture.fromImage '/assets/images/earth_circle.png'
        ]

        @background = new Sketch @textures[0]
        @background.anchor.x = 0.5
        @background.anchor.y = 0.5
        @background.position.x = Configs.desktop.settings.width / 2
        @background.position.y = Configs.desktop.settings.height / 2
        @background.filters = [blur]
        @background.addToScene @

        @warning = new SystemText 'This is the option page',
            font: 'bold 42px Anton'
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @warning.anchor.x = 0.5
        @warning.anchor.y = 0.5
        @warning.position.x = Configs.desktop.settings.width / 2
        @warning.position.y = 90
        @warning.addToScene @

        @backButton = new SystemText 'Back',
            font: 'bold 42px Anton'
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @backButton.anchor.y = 0.5
        @backButton.position.x = Configs.desktop.settings.width / 2 + 60
        @backButton.position.y = Configs.desktop.settings.height / 2 + 120
        @backButton.interactive = true
        @backButton.addToScene @
        return

    update: (deltaTime) ->
        $ = @

        @backButton.mouseover = (data) ->
            $.backButton.scale.x = 1.1
            $.backButton.scale.y = 1.1
            return
        @backButton.mouseout = (data) ->
            $.backButton.scale.x = 1.0
            $.backButton.scale.y = 1.0
            return
        @backButton.mousedown = (data) ->
            $.backButton.scale.x = 0.8
            $.backButton.scale.y = 0.8
            $._finish = true
            $._next = 'lobby'
            return
        @backButton.mouseup = (data) ->
            $.backButton.scale.x = 1.0
            $.backButton.scale.y = 1.0
            return
        super deltaTime
        return

module.exports = OptionScene
