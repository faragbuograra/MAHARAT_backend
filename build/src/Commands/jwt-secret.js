"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
});
const _path = _interopRequireWildcard(require("path")), _crypto = _interopRequireWildcard(require("crypto")), _promises = require("fs/promises"), _config = require("../config");
function _getRequireWildcardCache(nodeInterop) {
    if ("function" != typeof WeakMap) return null;
    var cacheBabelInterop = new WeakMap(), cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if ("default" !== key && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
}
const jwtGenSecret = async ()=>{
    let success = !1, replaced = !1, envPath = _path.resolve(_config.ROOT_PATH, ".env"), secret = _crypto.randomBytes(256).toString("base64");
    return secret && (success = !0, secret = "JWT_SECRET=" + secret), await (0, _promises.readFile)(envPath, "utf8").then((data)=>{
        let exists = data.search(/^JWT_SECRET?.*/gm);
        return -1 != exists ? (replaced = !0, data.replace(/^JWT_SECRET?(.*[A-Za-z]).*/gm, secret)) : data + `\n${secret}`;
    }).then(async (r)=>await (0, _promises.writeFile)(envPath, r, "utf8")).catch((err)=>{
        success = !1, console.error(err);
    }), console.log(`${replaced ? "Replaced" : "Generated"} JWT Secret:`), console.log("-----------------------------------------------------------------"), console.log(secret), console.log("-----------------------------------------------------------------"), success;
};
jwtGenSecret().then((r)=>console.log("jwt secret added to env:", r));
