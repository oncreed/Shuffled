
class Scene extends PIXI.Stage
    constructor: ->
        @paused = false
        return

    update: (deltaTime) ->
        return

    pause: ->
        @paused = true
        return

    resume: ->
        @paused = false
        return

    isPaused: ->
        @paused
