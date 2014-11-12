
class SystemText extends PIXI.Text
    constructor: (msg, style) ->
        super msg, style

        @width = 0
        @height = 0
        @fontStyle = '24px sans-serif'
        @fontAlign = 'center'
        @strokeColor = '#a4410e'
        @strokeThickness = 7



module.exports = SystemText

