const gulp                  = require("gulp");
const plumber               = require('gulp-plumber');
const notify                = require('gulp-notify');
const gulpif                = require('gulp-if');
const concat                = require('gulp-concat');
const stripComments         = require('gulp-strip-comments'); // Удаление js комментариев

const config                = require('../config');

module.exports = (src, filename,  dest) => {

    return gulp.src( src )
        .pipe( plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}) )
        .pipe( gulpif(!config.dev_mode, stripComments()) )
        .pipe( concat(filename) )
        .pipe( gulp.dest(dest) );

};