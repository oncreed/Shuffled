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

/// contants
var SERVER_PORT = 5000;
var LIVERELOAD_PORT = 35729;

var paths = {
    input: {
        javascripts: ['devel/coffee/**/*.coffee'],
        stylesheets: ['devel/less/**/*.less'],
        images: ['devel/images/**/*.jpg'],
        tests: ['test/*.js'],
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

/// process and bundle all required scripts in order to run
gulp.task('bundle', function() {
    return browserify('./app/assets/javascripts/main.js', { debug: true })
        .require('./app/assets/javascripts/shuffled', { expose: 'shuffled' })
        .require('./app/assets/javascripts/entities/systemtext', { expose: 'systemtext' })
        .bundle()
        .on('error', gutil.log)
        .pipe(source('bundle.js'))
        .pipe(buffer())
        /// skip compressing as not yet on production environment
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
gulp.task('serve:app', ['watch'], function() {
    connect.server({
        root: 'app',
        port: SERVER_PORT,
        livereload: true
    });
});

/// test the boilerplate specs
gulp.task('test', function() {
    return gulp.src(paths.input.tests)
        .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('compile', ['scripts', 'bundle']);
gulp.task('default', ['scripts', 'styles', 'watch']);
