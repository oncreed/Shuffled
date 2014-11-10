var gulp = require('gulp');
var changed = require('gulp-changed');
var concat = require('gulp-concat');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var connect = require('gulp-connect');
var del = require('del');

/// contants
var SERVER_PORT = 5000;
var LIVERELOAD_PORT = 35729;

var paths = {
   input: {
      javascripts: ['devel/javascripts/**/*.js'],
      stylesheets: ['devel/less/**/*.less'],
      pages: ['**/*.html']
   },
   output: {
      javascripts: 'app/assets/javascripts',
      stylesheets: 'app/assets/stylesheets'
   }
};

gulp.task('clean', function(cb) {
   del([
      paths.javascripts + '/*.js',
      paths.javascripts + '/*.css',
   ], cb);
});

gulp.task('styles', ['clean'], function() {
   return gulp.src(paths.input.stylesheets)
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.output.stylesheets))
      .pipe(connect.reload())
      .on('error', gutil.log);
});

gulp.task('minify', ['clean'] function() {
   gulp.src(paths.input.javascripts)
      .pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.output.javascripts));
});

gulp.task('watch', function() {
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

gulp.task('serve:app', function() {
   connect.server({
      root: 'app',
      port: SERVER_PORT,
      livereload: true
   });
});

gulp.task('default', ['styles', 'watch']);