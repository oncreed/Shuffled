globals = require 'sh-globals'

class Scene extends PIXI.Stage
    _finish: false
    _poll: (data) ->
        return

    constructor: (background) ->
        background ?= 0x000000

        @paused = false
        super background
        return

    onUpdate: (callback) ->
        @_poll = callback
        return

    update: (deltaTime) ->
        @_poll(@_finish)
        return

    pause: ->
        @paused = true
        return

    resume: ->
        @paused = false
        return

    isPaused: ->
        @paused

module.exports = Scene
