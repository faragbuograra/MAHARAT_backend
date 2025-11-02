"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "writeToFile", {
    enumerable: !0,
    get: ()=>writeToFile
});
const _promises = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("fs/promises")), writeToFile = async (filepath, data)=>{
    await _promises.default.appendFile(filepath, data).catch((err)=>console.error(err));
};
