globals = require 'sh-globals'

class Sketch extends PIXI.Sprite
    constructor: (texture) ->
        @renderPriority = globals.priority.normal
        super texture

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

    addToScene: (scene) ->
        scene.addChild @
        return

module.exports = Sketch
