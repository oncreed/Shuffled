globals = require 'sh-globals'

class Sketch extends PIXI.Sprite
    constructor: (texture) ->
        super texture
        @renderPriority = globals.priority.background

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

module.exports = Sketch
