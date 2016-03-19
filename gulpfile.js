'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var include = require("gulp-include");

gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./src/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

gulp.task("plugin", function() {
  console.log("-- gulp is running task 'plugin'");

  gulp.src("src/plugin/product-builder.js")
    .pipe(include())
    .on('error', console.log)
    .pipe(gulp.dest("src/plugin/dist"));
});
