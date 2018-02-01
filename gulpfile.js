var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var clone = require('gulp-clone');
var cheerio = require('gulp-cheerio');
var rename = require('gulp-rename');
var svgfallback = require('gulp-svgfallback');
var imageOptim = require('gulp-imageoptim');
var path = require('path');

gulp.task('svgsprite', function () {
  return gulp
    .src('assets/img/icons/*.svg')
    .pipe(svgstore({
      fileName: 'sprite.svg',
      prefix: 'icon-'
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(svgmin({
      plugins: [{
        removeDoctype: true
      }, {
        removeComments: true
      }, {
        cleanupNumericValues: {
          floatPrecision: 2
        }
      }, {
        cleanupIDs: false
      }]
    }))
    .pipe(gulp.dest('assets/img'));
});

function colorize (color) {
  // 1. set variable
  var sink;
  return (lazypipe()
    // 2. clone icons into variable
    .pipe(function () {
      sink = clone.sink();
      return sink;
    })
    .pipe(cheerio, function ($) {
      $('svg').attr('fill', color);
    })
    // 3. Add suffix and combine alternative icons
    .pipe(rename, {suffix: '-' + color})
    .pipe(function () {
      return sink.tap();
    })
  )();
}

gulp.task('svgfallback', function () {
  return gulp
    .src('assets/img/icons/*.svg', {base: 'assets/img/icons'})
    // Use this if only one color of icons is needed in fallback PNG
    .pipe(cheerio({
      run: function ($) {
        $('svg').attr('fill', 'rgb(255,255,255)');
      },
      parserOptions: { xmlMode: true }
    }))
    // Use this if you need icons in two colors in fallback PNG
    // .pipe(colorize('rgb(255,255,255)'))
    .pipe(svgfallback())
    // imageOptim takes a while, use only when building for production
    // .pipe(imageOptim.optimize())
    .pipe(gulp.dest('assets/img'));
});
