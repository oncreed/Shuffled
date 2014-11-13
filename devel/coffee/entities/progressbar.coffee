globals = require 'sh-globals'

class ProgressBar extends PIXI.Sprite
    constructor: ->
        @width = 0
        @height = 0
        @status = 0

    update: (deltaTime) ->
        return

    settings: (opts) ->
        return

module.exports = ProgressBar
