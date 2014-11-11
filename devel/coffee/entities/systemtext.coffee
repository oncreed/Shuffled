
    ##@sampleText = new PIXI.Text 'SHUFFLED',
    ##    font: 'bold italic 60px Pacifico'
    ##    fill: '#3e1707'
    ##    align: 'center'
    ##    stroke: '#a4410e'
    ##    strokeThickness: 7

    ##@sampleText.anchor.x = 0.5
    ##@sampleText.position.x = @screenWidth / 2
    ##@sampleText.position.y = 90
    ##@stage.addChild @sampleText

class SystemText extends PIXI.Text
    constructor: ->
        @width = 0
        @height = 0
        @fontStyle = '24px sans-serif'
        @setStyle @fontStyle

module.exports = SystemText

