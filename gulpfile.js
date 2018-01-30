var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var clone = require('gulp-clone');
var cheerio = require('gulp-cheerio');
var rename = require('gulp-rename');
var svgfallback = require('gulp-svgfallback');
var path = require('path');

gulp.task('svgsprite', function () {
  return gulp
    .src('assets/img/icons/*.svg')
    .pipe(svgmin(function (file) {
      var prefix = path.basename(file.relative, path.extname(file.relative));
      return {
        plugins: [{
          removeDoctype: true
        }, {
          cleanupIDs: {
            prefix: prefix + '-',
            minify: true
          }
        }]
      }
    }))
    .pipe(svgstore())
    .pipe(gulp.dest('assets/img'));
});

function colorize (color) {
  // Uncommend 1. / 2. and 3. if you need alternative colors in your png-sprite
  // 1. set variable
  // var sink;
  return (lazypipe()
    // 2. clone icons into variable
    // .pipe(function () {
    //   sink = clone.sink();
    //   return sink;
    // })
    .pipe(cheerio, function ($) {
      $('svg').attr('fill', color).attr('stroke', color);
    })
    // 3. Add suffix and combine alternative icons
    // .pipe(rename, {suffix: '-' + color})
    // .pipe(function () {
    //   return sink.tap();
    // })
  )();
}

gulp.task('svgfallback', function () {
  return gulp
    .src('assets/img/icons/*.svg', {base: 'assets/img/icons'})
    .pipe(colorize('rgb(255,255,255)'))
    .pipe(svgfallback())
    .pipe(gulp.dest('assets/img'));
});
