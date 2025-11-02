"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "JWT", {
    enumerable: !0,
    get: ()=>JWT
});
const _jsonwebtoken = function(obj, nodeInterop) {
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
}(require("jsonwebtoken")), _config = require("../config"), _objection = require("objection"), _userModel = require("../Modules/Users/user.model");
function _getRequireWildcardCache(nodeInterop) {
    if ("function" != typeof WeakMap) return null;
    var cacheBabelInterop = new WeakMap(), cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
const JWT = async (req, res, next)=>{
    let decodedToken, token = req.header("authorization") || "", { cookie  } = req.headers;
    if (!cookie && (!token || "" === token)) return req.user = null, next();
    try {
        if ("" == token && cookie && "" != cookie && (token = cookie.replace("accessToken=", "")), "" != token && void 0 != token) {
            let trimmedToken = token.split(" ").pop();
            if (null != trimmedToken) {
                let user = await _userModel.User.query().findById(_jsonwebtoken.verify(trimmedToken, _config.JWT_SECRET, {}).id);
                if (user) return user.role = user.role, req.user = user, next();
                return req.user = null, next();
            }
        }
    } catch (e) {
        let err = new _objection.ValidationError({
            type: e.name,
            message: e.message,
            data: {
                expired_at: e.expiredAt ? e.expiredAt : null
            }
        });
        return res.setHeader("Set-Cookie", [
            _config.INVALIDATE_COOKIE
        ]), next(err);
    }
};
