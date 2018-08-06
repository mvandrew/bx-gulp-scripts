const path          = require("path");

const rootPath      = path.join(__dirname, "../../..");
const assetsPath    = path.join(__dirname, "../..", "assets");
const templateName  = "templateName";

module.exports      = {
    dev_mode:           true,
    assets:             assetsPath,
    template:           path.join(assetsPath,   "templates",        templateName),
    template_dest:      path.join(rootPath,     "local",            "templates", templateName),
    bower:              path.join(rootPath,     "bower_components"),
    node:               path.join(rootPath,     "node_modules")
};
