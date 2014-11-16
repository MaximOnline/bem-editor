function dropRequireCache(requireFunc, filename) {
    var module = requireFunc.cache[filename];
    if (module) {
        if (module.parent) {
            if (module.parent.children) {
                var moduleIndex = module.parent.children.indexOf(module);
                if (moduleIndex !== -1) {
                    module.parent.children.splice(moduleIndex, 1);
                }
            }
            delete module.parent;
        }
        delete module.children;
        delete requireFunc.cache[filename];
    }
};
dropRequireCache(require, require.resolve("../../node_modules/bh/lib/bh.js"));
var BH = require("../../node_modules/bh/lib/bh.js");
var bh = new BH();
bh.setOptions({
jsAttrName: 'onclick',
jsAttrScheme: 'js'
})
dropRequireCache(require, require.resolve("../../common.blocks/text/text.bh.js"));
require("../../common.blocks/text/text.bh.js")(bh);
dropRequireCache(require, require.resolve("../../common.blocks/left-image-layout/left-image-layout.bh.js"));
require("../../common.blocks/left-image-layout/left-image-layout.bh.js")(bh);
dropRequireCache(require, require.resolve("../../common.blocks/right-image-layout/right-image-layout.bh.js"));
require("../../common.blocks/right-image-layout/right-image-layout.bh.js")(bh);
dropRequireCache(require, require.resolve("../../libs/bem-components/common.blocks/image/image.bh.js"));
require("../../libs/bem-components/common.blocks/image/image.bh.js")(bh);
dropRequireCache(require, require.resolve("../../common.blocks/image/image.bh.js"));
require("../../common.blocks/image/image.bh.js")(bh);
module.exports = bh;