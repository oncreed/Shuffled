configs = require 'sh-configs'

Scene = require 'scene'
Sketch = require 'sketch'

class IntroScene extends Scene
    constructor: ->
        $ = @

        super
        @textures = [
            PIXI.Texture.fromImage '/assets/images/lost_kids_contest.jpg'
            PIXI.Texture.fromImage '/assets/images/pursuit_blue.png'
            PIXI.Texture.fromImage '/assets/images/pursuit.png'
        ]

        @background = new Sketch @textures[0]
        @background.anchor.x = 0.5
        @background.anchor.y = 0.5
        @background.position.x = configs.desktop.settings.width / 2
        @background.position.y = configs.desktop.settings.height / 2
        @background.addToScene @

        @logoNoFill = new Sketch @textures[1]
        @logoNoFill.anchor.x = 0.5
        @logoNoFill.anchor.y = 0.5
        @logoNoFill.position.x = configs.desktop.settings.width / 2
        @logoNoFill.position.y = configs.desktop.settings.height / 2
        @logoNoFill.scale.x = 0.2
        @logoNoFill.scale.y = 0.2
        @logoNoFill.addToScene @

        @logo = new Sketch @textures[2]
        @logo.anchor.x = 0.5
        @logo.anchor.y = 0.5
        @logo.position.x = configs.desktop.settings.width / 2
        @logo.position.y = configs.desktop.settings.height / 2
        @logo.scale.x = 0.2
        @logo.scale.y = 0.2
        @logo.alpha = 0.0
        @logo.addToScene @

        fadeOut = new TWEEN.Tween(
            alpha: 1.0
        ).to(
            alpha: 0.0
        , 9000).easing(TWEEN.Easing.Elastic.InOut).onUpdate( ->
            $.logo.alpha = @alpha
            $.logoNoFill.alpha = @alpha
            return
        ).onComplete( ->
            console.log 'completed animation'
            $._finish = true
            return
        )

        fadeIn = new TWEEN.Tween(
            alpha: 0.0
        ).to(
            alpha: 1.0
        , 9000).easing(TWEEN.Easing.Elastic.InOut).onUpdate( ->
            $.logo.alpha = @alpha
            return
        ).chain(fadeOut).start()

    update: (deltaTime) ->
        super deltaTime
        return

module.exports = IntroScene
