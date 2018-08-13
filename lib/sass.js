const gulp                  = require("gulp");
const sass                  = require("gulp-sass");
const sourcemaps            = require("gulp-sourcemaps");
const cssnano               = require("gulp-cssnano");
const autoprefixer          = require("gulp-autoprefixer");
const plumber               = require('gulp-plumber');
const stripCssComments      = require('gulp-strip-css-comments');
const notify                = require('gulp-notify');
const browserSync           = require('browser-sync');
const reload                = browserSync.reload;
const gcmq                  = require('gulp-group-css-media-queries');
const gulpif                = require('gulp-if');

const config                = require('../config');

module.exports = (src, dest) => {

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
        .pipe( gulpif(config.dev_mode, sourcemaps.write( dest )) )
        .pipe( gulp.dest( dest ) )
        .pipe( reload({stream:true}) )
        .pipe( notify({ message: 'Styles task complete', onLast: true }) );

};
