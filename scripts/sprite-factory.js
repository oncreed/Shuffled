var Canvas = require('canvas');
var Image = Canvas.Image;
var walk = require('./johnny-walker')

walk('.', function(error, results) {
    if (error)
        throw error;

    console.log(results);
});

/// to be tested image copy
//var a = fs.readdirSync(__dirname);
//console.log(a);

//function imageCheck(error) {
//    if (error) {
//        console.log("got an error");
//    }
//}

//module.exports = function(image, callback) {
//    fs.stat(__dirname + '/build/images/' + image, function(error, stats) {
//        if (error) {
//            if (error.code == 'ENOENT') {
//                generate(image, callback);
//            }
//            else {
//                callback();
//            }
//        }
//    });
//
//    function generate(name, callback) {
//        var canvas = new Canvas(512, 512);
//        var context = canvas.getContext('2d');
//
//        draw();
//
//        function draw() {
//            var part = parts.shift();
//            var img = new Image;
//            img.onload = function() {
//                context.drawImage(img, 0, 0, 45, 45);
//            };
//            img.src = __dirname + '/sprites/' + part + '.png';
//        }
//    }
//
//
//    function save() {
//        bread.toBuffer(function(error, buffer) {
//            if (error) {
//                callback(error);
//            }
//            else {
//                fs.writeFile(__dirname + 'sprites', buffer, function() {
//                    callback();
//                });
//            }
//        });
//    }
//}
