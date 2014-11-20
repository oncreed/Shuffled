Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'
SystemText = require 'SystemText'

class GameScene extends Scene
    constructor: ->
        super
        blur = new PIXI.BlurFilter

        @texture = PIXI.Texture.fromImage '/assets/images/canyon_of_ages.jpg'
        @background = new Sketch @texture
        @background.anchor.x = 0.5
        @background.anchor.y = 0.5
        @background.position.x = Configs.desktop.settings.width / 2
        @background.position.y = Configs.desktop.settings.height / 2
        @background.scale.x = 0.5
        @background.scale.y = 0.5
        @background.filters = null
        @background.addToScene @

    update: (deltaTime) ->
        $ = @

        super deltaTime
        return

module.exports = GameScene
