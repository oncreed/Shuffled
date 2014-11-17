
class BeerPoweredEngine
    _scenes = null
    _scene = null
    constructor: (@width, @height) ->
        @init()

    init: ->
        @renderer = PIXI.autoDetectRenderer @width, @height
        document.body.appendChild @renderer.view

        @stats = new Stats
        document.body.appendChild @stats.domElement

        requestAnimationFrame @animate
        return

    createScene: (id) ->
        return `undefined` if @_scenes[id]

        scene = new Scene;
        @_scenes[id] = scene
        scene

    goToScene: (id) ->
        if @_scenes[id]
            @_scene.paused() if @_scene.scene
            @_scene = @_scenes[id]
            @_scene.resume()
            return true
        false

    setScene: (scene) ->
        @_scene = scene
        return

    setPoller: (poller) ->
        @_poller = poller
        return

    animate: (deltaTime) =>
        @stats.begin()
        if @_scene?
            @renderer.render @_scene

        @_poller?.call()
        @stats.end()

        requestAnimationFrame @animate
        TWEEN.update deltaTime
        return


module.exports = BeerPoweredEngine
