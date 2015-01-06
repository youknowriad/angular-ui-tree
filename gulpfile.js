var fs = require('fs');
var gulp = require('gulp');
var karma = require('karma').server;
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var header = require('gulp-header');
var rename = require('gulp-rename');
var wrap = require("gulp-wrap");
var del = require('del');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCSS = require('gulp-minify-css');
var templateCache = require('gulp-angular-templatecache');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');//To prevent pipe breaking caused by errors at 'watch'

var config = {
  pkg : JSON.parse(fs.readFileSync('./package.json')),
  banner:
      '/*!\n' +
      ' * <%= pkg.name %>\n' +
      ' * <%= pkg.homepage %>\n' +
      ' * Version: <%= pkg.version %> - <%= timestamp %>\n' +
      ' * License: <%= pkg.license %>\n' +
      ' */\n\n\n'
};

gulp.task('default', ['build','test']);
gulp.task('build', ['scripts', 'styles']);
gulp.task('test', ['build', 'karma']);

gulp.task('watch', ['build','karma-watch'], function() {
  gulp.watch(['src/**/*.{js,html,css}'], ['build']);
});

gulp.task('clean', function(cb) {
  del(['.tmp', 'dist'], cb);
});

gulp.task('buildLib', function(cb) {
  return gulp.src(['src/main.js', 'src/controllers/*.js', 'src/directives/*.js'])
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(concat('tree-src.js'))
    .pipe(wrap('(function(){\n\t"use strict";\n<%= contents %>\n})();\n'))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('buildTemplates', function(cb) {
  return gulp.src('src/template/**/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(templateCache({module: 'ui.tree'}))
    .pipe(gulp.dest('.tmp'));
});

gulp.task('scripts', ['clean', 'buildLib', 'buildTemplates'], function() {

  return gulp.src(['.tmp/tree-src.js', '.tmp/templates.js'])
    .pipe(plumber({
      errorHandler: handleError
    }))
    .pipe(concat('tree.js'))
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(uglify({preserveComments: 'some'}))
    .pipe(rename({ext:'.min.js'}))
    .pipe(gulp.dest('dist'));

});

gulp.task('styles', ['clean'], function() {

  return gulp.src('src/tree.css')
    .pipe(header(config.banner, {
      timestamp: (new Date()).toISOString(), pkg: config.pkg
    }))
    .pipe(gulp.dest('dist'))
    .pipe(minifyCSS())
    .pipe(rename({ext:'.min.css'}))
    .pipe(gulp.dest('dist'));

});

gulp.task('karma', ['build'], function() {
  karma.start({configFile : __dirname +'/karma.conf.js', singleRun: true});
});

gulp.task('karma-watch', ['build'], function() {
  karma.start({configFile :  __dirname +'/karma.conf.js', singleRun: false});
});

var handleError = function (err) {
  console.log(err.toString());
  this.emit('end');
};
