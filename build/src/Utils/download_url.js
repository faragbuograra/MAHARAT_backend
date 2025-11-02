"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>_default
});
const _fs = _interopRequireDefault(require("fs")), _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const downloadUrl = async (url, dest)=>{
    await _axios.default.get(url, {
        responseType: "stream"
    }).then((response)=>new Promise((resolve, reject)=>{
            response.data.pipe(_fs.default.createWriteStream(dest)).on("finish", resolve).on("error", reject);
        })).catch((err)=>console.log(err));
}, _default = downloadUrl;
