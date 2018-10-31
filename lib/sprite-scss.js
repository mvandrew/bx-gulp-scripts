const gulp                  = require("gulp");
const plumber               = require('gulp-plumber');
const notify                = require('gulp-notify');
const imagemin              = require('gulp-imagemin');
const imageminPngquant      = require('imagemin-pngquant');
const cache                 = require('gulp-cache');
const imageResize           = require('gulp-image-resize');
const spritesmith           = require('gulp.spritesmith');
const buffer                = require('vinyl-buffer');
const merge                 = require('merge-stream');

const config                = require('../config');

module.exports = (src, imgDest, scssDest, spriteName, width, height) => {
    const imgName = spriteName + ".png";
    const cssName = "_" + spriteName + ".scss";

    const spriteData = gulp.src(src)
        .pipe( plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}) )
        .pipe( imageResize({
            width: width,
            height: height,
            crop: true,
            upscale: true,
            imageMagick: true
        }))
        .pipe(spritesmith({
            imgName: imgName,
            cssName: cssName,
            cssFormat: "scss",
            algorithm: "binary-tree",
            cssVarMap: sprite => {
                sprite.name = "ico-" + sprite.name
            }
        }));

    // TODO-msav: imagemin bug (Linux): Error: write callback called multiple times
    const imgStream = spriteData.img
        .pipe( plumber({ errorHandler: function(err) {
                notify.onError({
                    title: "Gulp error in " + err.plugin,
                    message:  err.toString()
                })(err);
            }}) )
        .pipe( buffer() )
        /*.pipe( cache(imagemin({
                interlaced: true,
                progressive: true,
                svgoPlugins: [{removeViewBox: false}],
                use: [imageminPngquant()]
            }))
        )*/
        .pipe( gulp.dest(imgDest) );

    const cssStream = spriteData.css
        .pipe( gulp.dest(scssDest) );

    return merge(imgStream, cssStream)
        .pipe( notify({
            message: "Sprite task completed: " + spriteName,
            onLast: true
        }));
};
