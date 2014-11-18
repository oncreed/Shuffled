Scene = require 'scene'

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

    createScene: (id, tscene) ->
        tscene ?= Scene
        return `undefined` if @scenes[id]

        scene = new tscene
        @scenes[id] = scene
        scene

    goToScene: (id) ->
        if @scenes[id]?
            @scene.paused() if @scene
            @scene = @scenes[id]
            @scene.resume()
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
