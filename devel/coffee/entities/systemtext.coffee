Globals = require 'Globals'

class SystemText extends PIXI.Text
    constructor: (msg, style) ->
        super msg, style

    addToScene: (scene) ->
        scene.addChild @
        return

module.exports = SystemText
