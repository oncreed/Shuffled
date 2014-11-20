Configs = require 'Configs'

Scene = require 'Scene'
Sketch = require 'Sketch'

class IntroScene extends Scene
    constructor: ->
        $ = @

        super
        @textures = [
            PIXI.Texture.fromImage '/assets/images/lost_kids_contest.jpg'
            PIXI.Texture.fromImage '/assets/images/pursuit_blue.png'
            PIXI.Texture.fromImage '/assets/images/pursuit.png'
            PIXI.Texture.fromImage '/assets/images/html5_logo.png'
            PIXI.Texture.fromImage '/assets/images/pixi_logo.png'
        ]

        blur = new PIXI.BlurFilter

        @background = new Sketch @textures[0]
        @background.anchor.x = 0.5
        @background.anchor.y = 0.5
        @background.position.x = Configs.desktop.settings.width / 2
        @background.position.y = Configs.desktop.settings.height / 2
        @background.filters = [blur]
        @background.addToScene @

        @logoNoFill = new Sketch @textures[1]
        @logoNoFill.anchor.x = 0.5
        @logoNoFill.anchor.y = 0.5
        @logoNoFill.position.x = Configs.desktop.settings.width / 2
        @logoNoFill.position.y = Configs.desktop.settings.height / 2
        @logoNoFill.scale.x = 0.2
        @logoNoFill.scale.y = 0.2
        @logoNoFill.alpha = 0.0
        @logoNoFill.addToScene @

        @logo = new Sketch @textures[2]
        @logo.anchor.x = 0.5
        @logo.anchor.y = 0.5
        @logo.position.x = Configs.desktop.settings.width / 2
        @logo.position.y = Configs.desktop.settings.height / 2
        @logo.scale.x = 0.2
        @logo.scale.y = 0.2
        @logo.alpha = 0.0
        @logo.addToScene @

        @tech = new Sketch @textures[3]
        @tech.anchor.x = 0.5
        @tech.anchor.y = 0.5
        @tech.position.x = Configs.desktop.settings.width / 2
        @tech.position.y = Configs.desktop.settings.height / 2
        @tech.scale.x = 0.7
        @tech.scale.y = 0.7
        @tech.alpha = 0.0
        @tech.addToScene @

        @htmlBackground = new PIXI.Graphics
        @htmlBackground.beginFill(0x101228)
        @htmlBackground.drawRect 0, 0,
            Configs.desktop.settings.width,
            Configs.desktop.settings.height
        @htmlBackground.endFill()
        @htmlBackground.alpha = 0.0
        @addChild @htmlBackground

        @html = new Sketch @textures[4]
        @html.anchor.x = 0.5
        @html.anchor.y = 0.5
        @html.position.x = Configs.desktop.settings.width / 2
        @html.position.y = Configs.desktop.settings.height / 2
        @html.scale.x = 0.7
        @html.scale.y = 0.7
        @html.alpha = 0.0
        @html.addToScene @

        pixi = new TWEEN.Tween(
            alpha: 0.0
        ).to(
            alpha: 1.0
        , 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate( ->
            $.html.alpha = @alpha
            $.htmlBackground.alpha = @alpha
            return
        ).onComplete( ->
            console.log 'completed animation'
            $._finish = true
            $._next = 'lobby'
            return
        )

        technologies = new TWEEN.Tween(
            alpha: 0.0
        ).to(
            alpha: 1.0
        , 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate( ->
            $.tech.alpha = @alpha
            return
        ).chain(pixi)


        new TWEEN.Tween(
            alpha: 0.0
        ).to(
            alpha: 1.0
        , 4000).repeat(1).delay(1000).yoyo(true).easing(TWEEN.Easing.Elastic.InOut).onUpdate( ->
            $.logo.alpha = @alpha
            $.logoNoFill.alpha = @alpha
            return
        ).chain(technologies).start()

    update: (deltaTime) ->
        super deltaTime
        return

module.exports = IntroScene
