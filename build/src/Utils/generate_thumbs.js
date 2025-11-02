"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "generateThumb", {
    enumerable: !0,
    get: ()=>generateThumb
});
const _fs = _interopRequireDefault(require("fs")), _path = _interopRequireDefault(require("path")), _sharp = _interopRequireDefault(require("sharp"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const generateThumb = async (filepath, filename)=>{
    let thumb_path = _path.default.resolve(filepath, "thumbs");
    _fs.default.stat(thumb_path, (err, stats)=>{
        stats || _fs.default.mkdir(thumb_path, {
            recursive: !0
        }, (err, path)=>{
            err && console.log(err), console.log("created:", path);
        });
    });
    let thumb_no_ext_name = _path.default.basename(filename).split(".").reverse().pop(), thumb_name = "thumb_" + thumb_no_ext_name + ".png", store_in = _path.default.resolve(thumb_path, thumb_name), original = _path.default.resolve(filepath, filename), file = await _fs.default.readFileSync(original);
    return await (0, _sharp.default)(file).resize(150, 150, {
        fit: _sharp.default.fit.outside
    }).png({
        quality: 100
    }).toFile(store_in).then(()=>thumb_name).catch((err)=>console.log(err));
};
