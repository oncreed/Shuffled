globals = require 'sh-globals'

class Background extends PIXI.Sprite
    constructor: (texture) ->
        @renderPriority = globals.priority.background
        super texture

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

    addToStage: (stage) ->
        stage.addChild @
        return

module.exports = Background
