globals = require 'sh-globals'

class Sketch extends PIXI.Sprite
    constructor: (texture) ->
        @renderPriority = globals.priority.normal
        super texture

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

module.exports = Sketch
