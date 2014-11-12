var fs = require('fs');

var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(error, list) {
        if (error) {
            return done(error);
        }

        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file)
                return done(null, results);

            file = dir + '/' + file;
            fs.stat(file, function(error, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(error, res) {
                        results = results.concat(res);
                        next();
                    });
                }
                else {
                    results.push(file);
                    next();
                }
            });
        })();
    });
};

module.exports = walk;
