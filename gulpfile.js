'use strict';

var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');
var mocha = require('gulp-mocha');
var gulp = require('gulp');

var lint = ['index.js', 'utils.js'];

gulp.task('lint', function() {
  return gulp.src(lint.concat(['gulpfile.js', 'test.js']))
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('coverage', function() {
  return gulp.src(lint)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire());
});

gulp.task('test', ['coverage'], function() {
  return gulp.src('test.js')
    .pipe(mocha({reporter: 'spec'}))
    .pipe(istanbul.writeReports())
    .pipe(istanbul.writeReports({
      reporters: [ 'text' ],
      reportOpts: {dir: 'coverage', file: 'summary.txt'}
    }));
});

gulp.task('default', ['lint', 'test']);
