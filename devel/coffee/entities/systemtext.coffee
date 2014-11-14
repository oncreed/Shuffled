globals = require 'sh-globals'

class SystemText extends PIXI.Text
    constructor: (msg, style) ->
        super msg, style

    addToStage: (stage) ->
        stage.addChild @
        return

module.exports = SystemText

