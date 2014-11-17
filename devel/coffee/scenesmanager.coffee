class ScenesManager
    @renderer: null
    @scenes: null
    @scene: null

    @create: (width, height) =>
        return @ if ScenesManager.renderer

        ScenesManager.renderer = PIXI.autoDetectRenderer width, height
        document.body.appendChild ScenesManager.renderer.view
        requestAnimationFrame ScenesManager.loop
        @

    @loop: ->
        requestAnimationFrame ->
            ScenesManager.loop
            return
        return

    @createScene: (id) ->
        return `undefined` if ScenesManager.scenes[id]

        scene = new Scene;
        ScenesManager.scenes[id] = scene
        scene

    @goToScene: (id) ->
        if ScenesManager.scenes[id]
            ScenesManager.scene.paused() if ScenesManager.scene

            ScenesManager.scene = ScenesManager.scenes[id]
            ScenesManager.scene.resume()
            return true
        false
