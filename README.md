# Create SVG-Sprites and PNG-Fallback with Gulp

This Repository is work in progress towards creating SVG-sprites and their PNG-fallbacks using gulp. As of now the following are used:

```
var gulp = require('gulp');
var svgmin = require('gulp-svgmin');
var svgstore = require('gulp-svgstore');
var gulpif = require('gulp-if');
var lazypipe = require('lazypipe');
var clone = require('gulp-clone');
var cheerio = require('gulp-cheerio');
var rename = require('gulp-rename');
var svgfallback = require('gulp-svgfallback');
```
