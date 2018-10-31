const gulp                  = require("gulp");
const sass                  = require("gulp-sass");
const sourcemaps            = require("gulp-sourcemaps");
const cssnano               = require("gulp-cssnano");
const autoprefixer          = require("gulp-autoprefixer");
const plumber               = require('gulp-plumber');
const stripCssComments      = require('gulp-strip-css-comments');
const notify                = require('gulp-notify');
const gcmq                  = require('gulp-group-css-media-queries');
const gulpif                = require('gulp-if');
const replace               = require('gulp-string-replace');

const config                = require('../config');

module.exports = (src, dest, browserSync) => {

    return gulp.src( src )
        .pipe( plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}) )
        .pipe( gulpif(config.dev_mode, sourcemaps.init()) )
        .pipe( sass() )
        .pipe( autoprefixer(
            ['last 2 versions'],
            { cascade: false }
        ) )
        .pipe( gcmq() )
        .pipe( gulpif(!config.dev_mode, stripCssComments({preserve: false})) )
        .pipe( gulpif(!config.dev_mode, cssnano()) )
        .pipe( gulpif(config.dev_mode, sourcemaps.write()) )
        .pipe( replace(/content\s*:\s*("|')[^\\"']+("|')/g, data => {
            const contentVal = data.match(/("|')[^\\"']+("|')/i);
            let rawVal = contentVal[0].match(/[^\\"']+/i);
            rawVal = escape(rawVal).toLowerCase().replace(/%u/g, "\\");
            return "content: \"" + rawVal + "\";";
        }) )
        .pipe( gulp.dest( dest ) )
        .pipe( browserSync.stream() )
        .pipe( notify({ message: 'Styles task complete', onLast: true }) );

};
