globals = require 'sh-globals'

class Background extends PIXI.Sprite
    constructor: ->
        @renderPriority = globals.priority.background

    setRenderPriority: (layer) ->
        @renderPriority = layer

    getRenderPriority: ->
        @renderPriority

    addToStage: (stage) ->
        stage.addChild @
        return

module.exports = Background
