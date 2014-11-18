globals = require 'sh-globals'

class ProgressBar extends PIXI.Sprite
    constructor: (textureBlank, textureFull) ->
        super textureBlank

    update: (deltaTime) ->
        return

    settings: (opts) ->
        return

    addToScene: (scene) ->
        scene.addChild @
        return

module.exports = ProgressBar
