# Create SVG-Sprites and PNG-Fallback with Gulp

This Repository is work in progress towards creating SVG-sprites and their PNG-fallbacks using gulp. As of now the following are used:

## Packages

- [gulp](https://github.com/gulpjs/gulp)
- [gulp-cheerio](https://github.com/cheeriojs/cheerio)
- [gulp-clone](https://github.com/mariocasciaro/gulp-clone)
- [gulp-if](https://github.com/robrich/gulp-if)
- [gulp-imageoptim](https://github.com/allbitsnbytes/gulp-imageoptim)
- [gulp-rename](https://github.com/hparra/gulp-rename)
- [gulp-svgfallback](https://github.com/w0rm/gulp-svgfallback)
- [gulp-svgmin](https://github.com/ben-eb/gulp-svgmin)
- [gulp-svgstore](https://github.com/w0rm/gulp-svgstore)
- [lazypipe](https://github.com/OverZealous/lazypipe)

## Usage:

```gulp svgsprite``` creates a svg-sprite from the icons inside the icons-folder.

```gulp svgfallback``` creates a png-sprite and a stylesheet. width and height has to be set on the svg-icon in advance for this tool to work
