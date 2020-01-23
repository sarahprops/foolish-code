// Include gulp & plugins
const gulp = require('gulp');

const babel = require('gulp-babel');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const prefix = require('gulp-autoprefixer');
const sass = require('gulp-sass');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');

//gulp sass needs node sass
sass.compiler = require('node-sass');

// declare paths
const paths = {
  scripts: {
    dev: './dev/js/*.js',
    prod: './static/'
  },
  styles: {
    dev: './dev/scss/*/*.scss',
    devMaster: './dev/scss/styles.scss',
    prod: './static/'
  },
  templates: {
    dev:  './templates/*.html'
  }
};


/*
* javascript scripter
*
* takes all our source js files, babel-ifies, concats them all together into one file
* outputs that file, then compresses and outputs a minified version
* calls livereload
*
* return {object}
*/
function jsScripts() {
  return gulp.src(paths.scripts.dev)
    .pipe(babel())
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.scripts.prod))
    .pipe(rename('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.prod))
    .pipe(livereload());
}

/*
* sassy styler
* 
* takes dev styles path aka our main control scss files
* compresses, prefixes, and outputs to prod styles path
* calls livereload
*
* todo: set up specific autoprefixer browser lists
*
* @return {object} 
*/
function sassStyles() {
  return gulp.src(paths.styles.devMaster)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest(paths.styles.prod))
    .pipe(livereload());
}

/*
* watch those files
* 
* set up watchers for our various file types
* inits livereload 
* 
*/
function watchers() {
  // compilers
  gulp.watch(paths.scripts.dev, jsScripts);
  gulp.watch(paths.styles.dev, sassStyles);

  // for live reload
  livereload.listen();
  gulp.watch(paths.templates.dev).on('change', function() {
    livereload.reload();
  });
}

/*
* Build our Assets
*
* tods: split this into dev / prod build commands, 
*   only run what needs to go 
*   & add cleaner
*
*/
let build = gulp.series(jsScripts, sassStyles, watchers);
exports.default = build;
