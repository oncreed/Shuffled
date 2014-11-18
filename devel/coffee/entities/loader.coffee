globals = require 'sh-globals'

Background = require 'background'
Sketch = require 'sketch'
ProgressBar = require 'progressbar'
SystemText = require 'systemtext'

class Loader
    constructor: (@screenWidth, @screenHeight, @stage) ->
        $ = @

        @tasksDone = false
        @tasksCount = 0
        @tasksCompleted = 0

        @startButton = new SystemText 'Play',
            font: 'bold 42px Anton'
            align: 'center'
            fill: '#3e1707'
            stroke: '#a4410e'
            strokeThickness: 5
        @startButton.anchor.x = 0.5
        @startButton.anchor.y = 0.5
        @startButton.position.x = @screenWidth / 2
        @startButton.position.y = @screenWidth / 2 + 90
        @startButton.alpha = 0.0
        @startButton.interactive = true

        @startButton.mouseover = (data) ->
            return
        @startButton.mouseout = (data) ->
            return
        @startButton.mousedown = (data) ->
            $.startButton.scale.x = 0.8
            $.startButton.scale.y = 0.8
            $.tradeOff = true
            return
        @startButton.mouseup = (data) ->
            $.startButton.scale.x = 1.0
            $.startButton.scale.y = 1.0
            return
        @startButton.click = (data) ->
            $.background.filters = [$.myFilter]
            return
        @startButton.touchstart = (data) ->
            return
        @startButton.touchend = (data) ->
            return
        @startButton.tap = (data) ->
            return

        @startButton.addToStage @stage

        @loadSound = new Howl
            urls: ['/assets/sounds/flo_rida.mp3']
            autoplay: false
            loop: true
            onload: ->
                console.log 'finished loading sound'

    taskToLoad: (count) ->
        @tasksCount = count

    addToFinishedTask: () ->
        if not @tasksCount is @tasksCompleted
            @tasksCompleted += 1
        else
            @tasksDone = true

    update: (deltaTime) ->
        return

module.exports = Loader
