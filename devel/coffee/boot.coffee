
WebFontConfig =
    google:
        families: [
            'Anton'
            'Pacifico'
            'Arvo:700italic'
            'Podkova:700'
        ]
    active: ->
        configs = require 'sh-configs'
        ShuffledApp = require 'shuffled'
        app = new ShuffledApp configs.desktop.settings.width,
            configs.desktop.settings.height
        app.sketch()
        return

do ->
    wf = document.createElement 'script'
    wf.src = (if 'https' is document.location.protocol then 'https' else 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js'

    wf.type = 'text/javascript'
    wf.async = 'true'
    s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore wf, s
