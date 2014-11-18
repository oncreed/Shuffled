globals = require 'sh-globals'

class Background extends PIXI.Sprite
    constructor: (texture) ->
        @renderPriority = globals.priority.background
        super texture

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

    addToScene: (scene) ->
        scene.addChild @
        return

module.exports = Background
