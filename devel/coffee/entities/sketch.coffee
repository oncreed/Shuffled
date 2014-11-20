Globals = require 'Globals'

Scene = require 'Scene'
Sketch = require 'Sketch'

class Sketch extends PIXI.Sprite
    constructor: (texture) ->
        @actions = {}
        @action = null
        @renderPriority = 0
        super texture

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

    createAction: (id) ->
        return `undefined` if @actions[id]

        action = new Action
        @actions = action
        action

    addToScene: (scene) ->
        scene.addChild @
        return

module.exports = Sketch
