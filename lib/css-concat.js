const gulp                  = require("gulp");
const plumber               = require('gulp-plumber');
const notify                = require('gulp-notify');
const cssnano               = require("gulp-cssnano");
const stripCssComments      = require('gulp-strip-css-comments');
const gulpif                = require('gulp-if');
const concat                = require('gulp-concat');

const config                = require('../config');

module.exports = (src, filename,  dest) => {

    return gulp.src( src )
        .pipe( plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}) )
        .pipe( gulpif(!config.dev_mode, stripCssComments({preserve: false})) )
        .pipe( concat( filename ) )
        .pipe( gulpif(!config.dev_mode, cssnano()) )
        .pipe( gulp.dest( dest ) );

};
