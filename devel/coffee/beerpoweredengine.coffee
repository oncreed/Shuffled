Scene = require 'Scene'

class BeerPoweredEngine
    constructor: (@width, @height) ->
        @scenes = {}
        @scene = null
        @init()

        window.beer = @

    init: ->
        $ = @

        @renderer = PIXI.autoDetectRenderer @width, @height
        document.body.appendChild @renderer.view

        @renderer.onProtonUpdate = ->
            return
        @renderer.onParticleCreated = (particle) ->
            particleSprite = new PIXI.Sprite particle.target
            particle.sprite = particleSprite
            $.scene.addChild particle.sprite
            return
        @renderer.onParticleUpdate = (particle) ->
            transformSprite particle.sprite, particle
            return
        @renderer.onParticleDead = (particle) ->
            $.scene.removeChild particle.sprite
            return

        @stats = new Stats
        document.body.appendChild @stats.domElement

        texture = new PIXI.Texture.fromImage '/assets/images/bunny.png'

        @proton = new Proton
        @emitter = new Proton.BehaviourEmitter
        @emitter.rate = new Proton.Rate new Proton.Span(15, 13),
            new Proton.Span(.2, .5)
        @emitter.addInitialize new Proton.Mass 1
        @emitter.addInitialize new Proton.ImageTarget texture
        @emitter.addInitialize new Proton.Life 2, 3
        @emitter.addInitialize new Proton.Velocity new Proton.Span(3, 9),
            new Proton.Span(0, 30, true), 'polar'
        @emitter.addBehaviour new Proton.Gravity 8
        @emitter.addBehaviour new Proton.Scale new Proton.Span(1, 3), .3
        @emitter.addBehaviour new Proton.Alpha 1, .5
        @emitter.addBehaviour new Proton.Rotate 0, Proton.getSpan(-8, 9), 'add'
        @emitter.p.x = 1003 / 2
        @emitter.p.y = 100
        @emitter.emit()
        @proton.addEmitter @emitter

        @emitter.addSelfBehaviour new Proton.Gravity 5
        @emitter.addSelfBehaviour new Proton.RandomDrift 30, 30, .1
        @emitter.addSelfBehaviour new Proton.CrossZone new Proton.RectZone(50, 0, 936, 610), 'bound'
        requestAnimationFrame @animate
        return

    createScene: (id, tscene, callback) ->
        tscene ?= Scene
        callback ?= ->

        return `undefined` if @scenes[id]

        scene = new tscene
        scene.init()
        scene.onUpdate callback
        @scenes[id] = scene
        scene

    goToScene: (id) ->
        if @scenes[id]?
            @scene?.pause()
            @scene = @scenes[id]
            @scene.resume()
            return true
        false

    transformSprite: (particleSprite, particle) ->
        particleSprite.position.x = particle.p.x
        particleSprite.position.y = particle.p.y
        particleSprite.scale.x = particle.scale
        particleSprite.scale.y = particle.scale
        particleSprite.anchor.x = .5
        particleSprite.anchor.y = .5
        particleSprite.alpha = particle.alpha
        particleSprite.rotation = particle.rotation * Math.PI / 180

    animate: (deltaTime) =>
        requestAnimationFrame @animate

        return if not @scene? or @scene.isPaused()

        @stats.begin()
        @scene.update deltaTime
        @proton.update()
        @renderer.render @scene
        @stats.end()

        TWEEN.update deltaTime
        return

module.exports = BeerPoweredEngine
