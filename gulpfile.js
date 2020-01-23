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
    dev: './dev/scss/styles.scss',
    prod: './static/'
  },
  templates: {
    dev:  './templates/*.html'
  }
};

/*
*/
function jsScripts() {
  return gulp.src(paths.scripts.dev)
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.scripts.prod))
    .pipe(rename('all.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.prod))
    .pipe(livereload());
}

/*
* sassy styler
* 
* takes dev styles path aka our main control scss files
* compresses, prefixes, and outputs to prod styles path
*
* @return {object} 
*/
function sassStyles() {
  return gulp.src(paths.styles.dev)
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(prefix())
    .pipe(gulp.dest(paths.styles.prod))
    .pipe(livereload());
}

/*
* watch those files
* 
* set up watchers for our various file types 
* 
*/
function watchers() {
  // compilers
  gulp.watch(paths.styles.dev, sassStyles);
  gulp.watch(paths.styles.dev, jsScripts);
  // for live reload
  gulp.watch(paths.templates.dev).on('change', function(file) {
    livereload.reload();
  });
  livereload.listen();
}

/*
* Build our Assets
*
* tods: split this into dev / prod build commands, 
* only run what needs to go 
* & add cleaner
*
*/
let build = gulp.series(jsScripts, sassStyles, watchers);
exports.default = build;
