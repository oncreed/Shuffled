Scene = require 'scene'
Sketch = require 'sketch'

class GameScene extends Scene
    constructor: ->
        super
        @texture = PIXI.Texture.fromImage '/assets/images/lost_kids_contest.jpg'
        @bunny = new Sketch @texture
        @bunny.addToScene @

    update: (deltaTime) ->
        super deltaTime
        return

module.exports = GameScene
