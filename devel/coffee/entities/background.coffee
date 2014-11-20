Globals = require 'Globals'

class Background extends PIXI.Sprite
    constructor: (texture) ->
        @renderPriority = Globals.priority.background
        super texture

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

    addToScene: (scene) ->
        scene.addChild @
        return

module.exports = Background
