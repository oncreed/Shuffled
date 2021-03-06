var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var coffee = require('gulp-coffee');
var imagemin = require('gulp-imagemin');
var mocha = require('gulp-mocha');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var del = require('del');
var rename = require('gulp-rename');

/// contants
var SERVER_PORT = 5000;
var LIVERELOAD_PORT = 5100;

var paths = {
    input: {
        javascripts: ['devel/coffee/**/*.coffee'],
        stylesheets: ['devel/less/**/*.less'],
        images: ['devel/images/**/*.jpg'],
        tests: ['tests/*.js'],
        pages: ['app/**/*.html']
    },
    output: {
        javascripts: 'app/assets/javascripts',
        stylesheets: 'app/assets/stylesheets',
        images: 'app/assets/images'
    }
};

/// clean build directories
gulp.task('clean', function(cb) {
    del([
        paths.javascripts + '/*.js',
        paths.javascripts + '/*.css',
    ], cb);
});

/// process less files
gulp.task('styles', ['clean'], function() {
    return gulp.src(paths.input.stylesheets)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.output.stylesheets))
        .pipe(connect.reload())
        .on('error', gutil.log);
});

/// process less files for production
gulp.task('styles:prod', ['clean'], function() {
    return gulp.src(paths.input.stylesheets)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.output.stylesheets))
        .pipe(connect.reload())
        .on('error', gutil.log);
});

/// process and bundle all required scripts in order to run
gulp.task('bundle', function() {
    return browserify('./app/assets/javascripts/main.js', { debug: true })
        .require('./app/assets/javascripts/globals', { expose: 'Globals' })
        .require('./app/assets/javascripts/configs', { expose: 'Configs' })
        .require('./app/assets/javascripts/scene', { expose: 'Scene' })
        .require('./app/assets/javascripts/shuffled', { expose: 'Shuffled' })
        .require('./app/assets/javascripts/beerpoweredengine', { expose: 'BeerPoweredEngine' })
        .require('./app/assets/javascripts/entities/background', { expose: 'Background' })
        .require('./app/assets/javascripts/entities/button', { expose: 'Button' })
        .require('./app/assets/javascripts/entities/loader', { expose: 'Loader' })
        .require('./app/assets/javascripts/entities/progressbar', { expose: 'ProgressBar' })
        .require('./app/assets/javascripts/entities/sketch', { expose: 'Sketch' })
        .require('./app/assets/javascripts/entities/systemtext', { expose: 'SystemText' })
        .require('./app/assets/javascripts/scenes/introscene', { expose: 'IntroScene' })
        .require('./app/assets/javascripts/scenes/lobbyscene', { expose: 'LobbyScene' })
        .require('./app/assets/javascripts/scenes/optionscene', { expose: 'OptionScene' })
        .require('./app/assets/javascripts/scenes/boardscene', { expose: 'BoardScene' })
        .require('./app/assets/javascripts/scenes/gamescene', { expose: 'GameScene' })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        //.pipe(uglify())
        .pipe(gulp.dest(paths.output.javascripts))
        .pipe(connect.reload())
        .on('end', gutil.log);
});

/// process coffeescripts
gulp.task('scripts', ['clean'], function() {
    return gulp.src(paths.input.javascripts)
        .pipe(sourcemaps.init())
        .pipe(coffee({ bare: true }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.output.javascripts))
        .pipe(connect.reload())
        .on('error', gutil.log);
});

/// process uncompress images
gulp.task('images', ['clean'], function() {
    return gulp.src(paths.input.images)
        .pipe(imagemin({ optimizationLevel: 5 }))
        .pipe(gulp.dest(paths.output.images))
        .pipe(connect.reload())
        .on('error', gutil.log);
});

/// compress and minify javascripts
gulp.task('minify', ['clean'], function() {
    return gulp.src(paths.input.javascripts)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.output.javascripts))
        .on('error', gutil.log);
});

/// watch changes over time
gulp.task('watch', function() {
    watch(paths.input.javascripts, function(files) {
        files.pipe(sourcemaps.init())
            .pipe(coffee({ bare: true }))
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.output.javascripts))
            .pipe(connect.reload())
            .on('error', gutil.log);
    });

    watch(paths.input.stylesheets, function(files) {
        files.pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(paths.output.stylesheets))
            .pipe(connect.reload())
            .on('error', gutil.log);
    });

    watch(paths.input.pages, function(files) {
        files.pipe(connect.reload());
    });
});

/// serve the app
//gulp.task('serve:app', ['watch'], function() {
//    connect.server({
//        root: 'app',
//        port: SERVER_PORT,
//        livereload: true
//    });
//});

gulp.task('serve:app', function() {
    connect.server({
        root: 'app',
        port: SERVER_PORT,
        livereload: true
    });
});

/// test the boilerplate specs
gulp.task('test', function() {
    return gulp.src(paths.input.tests)
        .pipe(mocha({
            reporter: 'spec',
            globals: {
                should: require('should')
            }
        }));
});

gulp.task('compile', ['scripts', 'bundle']);
gulp.task('default', ['scripts', 'styles', 'watch']);
