Scene = require 'Scene'

class BeerPoweredEngine
    constructor: (@width, @height) ->
        @scenes = {}
        @scene = null
        @init()

    init: ->
        @renderer = PIXI.autoDetectRenderer @width, @height
        document.body.appendChild @renderer.view

        @stats = new Stats
        document.body.appendChild @stats.domElement

        requestAnimationFrame @animate
        return

    createScene: (id, tscene, callback) ->
        tscene ?= Scene
        callback ?= ->

        return `undefined` if @scenes[id]

        scene = new tscene
        scene.onUpdate callback
        @scenes[id] = scene
        scene

    goToScene: (id) ->
        if @scenes[id]?
            @scene?.pause()
            @scene = @scenes[id]
            @scene.resume()
            @scene.init()
            return true
        false

    animate: (deltaTime) =>
        requestAnimationFrame @animate

        return if not @scene? or @scene.isPaused()

        @stats.begin()
        @scene.update deltaTime
        @renderer.render @scene
        @stats.end()

        TWEEN.update deltaTime
        return

module.exports = BeerPoweredEngine
