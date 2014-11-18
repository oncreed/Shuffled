configs = require 'sh-configs'

Scene = require 'scene'
Sketch = require 'sketch'

class GameScene extends Scene
    constructor: ->
        super
        @texture = PIXI.Texture.fromImage '/assets/images/library_concept.jpg'
        @bunny = new Sketch @texture
        @bunny.anchor.x = 0.5
        @bunny.anchor.y = 0.5
        @bunny.position.x = configs.desktop.settings.width / 2
        @bunny.position.y = configs.desktop.settings.height / 2
        @bunny.addToScene @

    update: (deltaTime) ->
        super deltaTime
        return

module.exports = GameScene
