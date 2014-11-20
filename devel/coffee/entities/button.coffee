Globals = require 'Globals'

ButtonActiveState =
    inactive: 0
    active: 1

ButtonMode =
    focus: 1
    click: 0
    hover: 5

class Button extends PIXI.Sprite
    constructor: (@textureOn, @textureOff, @texturePress) ->
        super @textureOn
        @isPress = false
        @mode = ButtonMode.focus

    update: (deltaTime) ->
        if @isPres
            if @mode is ButtonMode.click
                @setTexture @texturePress
        return

    press: ->
        @isPress = true
        return

    getBoundingBox: ->
        @getBounds

    setRenderPriority: ->
        return

    getRenderPriority: ->
        return

    addToScene: (scene) ->
        scene.addChild @
        return

module.exports = Button
