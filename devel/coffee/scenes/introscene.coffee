Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'
Button = require 'Button'
SystemText = require 'SystemText'

class IntroScene extends Scene
    constructor: ->
        super 0xffffff

    init: ->
        $ = @

        @textures = [
            PIXI.Texture.fromImage '/assets/images/pursuit_blue.png'
            PIXI.Texture.fromImage '/assets/images/pursuit.png'
            PIXI.Texture.fromImage '/assets/images/html5_logo.png'
        ]

        @logoNoFill = new Sketch @textures[0]
        @logoNoFill.anchor.x = 0.5
        @logoNoFill.anchor.y = 0.5
        @logoNoFill.position.x = Configs.desktop.settings.width / 2
        @logoNoFill.position.y = Configs.desktop.settings.height / 2
        @logoNoFill.scale.x = 0.2
        @logoNoFill.scale.y = 0.2
        @logoNoFill.alpha = 0.0
        @logoNoFill.addToScene @

        @logo = new Sketch @textures[1]
        @logo.anchor.x = 0.5
        @logo.anchor.y = 0.5
        @logo.position.x = Configs.desktop.settings.width / 2
        @logo.position.y = Configs.desktop.settings.height / 2
        @logo.scale.x = 0.2
        @logo.scale.y = 0.2
        @logo.alpha = 0.0
        @logo.addToScene @

        @tech = new Sketch @textures[2]
        @tech.anchor.x = 0.5
        @tech.anchor.y = 0.5
        @tech.position.x = Configs.desktop.settings.width / 2
        @tech.position.y = Configs.desktop.settings.height / 2
        @tech.scale.x = 0.7
        @tech.scale.y = 0.7
        @tech.alpha = 0.0
        @tech.addToScene @

        technologies = new TWEEN.Tween(
            alpha: 0.0
        ).to(
            alpha: 1.0
        , 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Cubic.In).onUpdate( ->
            $.tech.alpha = @alpha
            return
        ).onComplete( ->
            console.log 'completed animation'
            $._finish = true
            $._next = 'lobby'
            return
        )

        new TWEEN.Tween(
            alpha: 0.0
        ).to(
            alpha: 1.0
        , 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Cubic.In).onUpdate( ->
            $.logo.alpha = @alpha
            $.logoNoFill.alpha = @alpha
            return
        ).chain(technologies).start()
        return

    update: (deltaTime) ->
        super deltaTime
        return

module.exports = IntroScene
