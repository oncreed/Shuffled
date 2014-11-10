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

var paths = {
   input: {
      javascripts: ['devel/javascripts/**/*.js'],
      stylesheets: ['devel/less/**/*.less']
   },
   output: {
      javascripts: 'javascripts',
      stylesheets: 'stylesheets'
   }
};

gulp.task('clean', function(cb) {
   del(['build'], cb);
});

gulp.task('styles', ['clean'], function() {
   return gulp.src(paths.input.stylesheets)
      .pipe(sourcemaps.init())
      .pipe(less())
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(paths.output.stylesheets))
      .on('error', gutil.log);
});

gulp.task('minify', function() {
   gulp.src(paths.input.javascripts)
      .pipe(uglify())
      .pipe(gulp.dest(paths.output.javascripts));
});

gulp.task('watch', function() {
   watch(paths.input.stylesheets, function(files) {
      files.pipe(sourcemaps.init())
         .pipe(less())
         .pipe(sourcemaps.write())
         .pipe(gulp.dest(paths.output.stylesheets))
         .on('error', gutil.log);
   });
});

gulp.task('serve:app', function() {
   connect.server();
});

gulp.task('default', ['styles', 'watch']);