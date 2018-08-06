const browserSync           = require('browser-sync');

module.exports = (target, workFiles) => {
    return browserSync.init(workFiles, {
        proxy: {
            target: target
        },
        injectChanges: true
    });
};
