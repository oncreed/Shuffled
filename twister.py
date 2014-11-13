from twisted.web import server
from twisted.web.server import Site
from twisted.web.static import File
from twisted.python import log
from twisted.internet import reactor

import sys

class RootSite(Site):
    def getResourceFor(self, request):
        request.setHeader('server', 'Espresso')
        request.setHeader('Access-Control-Allow-Origin', '*')
        request.setHeader('Access-Control-Allow-Methods', 'GET POST PULL')
        request.setHeader('Access-Control-Allow-Headers', 'x-prototype-version,x-requested-with')
        request.setHeader('Access-Control-Max-Age', '2520')
        return Site.getResourceFor(self, request)


if __name__ == '__main__':
    root = File('app')
    log.startLogging(sys.stdout)
    reactor.listenTCP(5000, RootSite(root))
    reactor.run()
