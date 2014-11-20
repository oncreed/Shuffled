class Scene extends PIXI.Stage
    _finish: false
    _next: null
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
        @_poll @_finish, @_next
        return

    pause: ->
        @paused = true
        return

    resume: ->
        @paused = false

        @_finish = false
        @_next = null
        return

    isPaused: ->
        @paused

module.exports = Scene
