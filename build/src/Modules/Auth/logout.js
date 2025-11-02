"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "logout", {
    enumerable: !0,
    get: ()=>logout
});
const _config = require("../../config"), logout = async (req, res)=>{
    let { cookie  } = req.headers;
    return cookie ? res.setHeader("Set-Cookie", [
        _config.INVALIDATE_COOKIE
    ]).status(200).json({
        message: "logged out!"
    }).end() : res.setHeader("Set-Cookie", [
        _config.INVALIDATE_COOKIE
    ]).status(401).json({
        error: {
            type: "Unauthenticated",
            message: "not logged in...",
            data: {}
        }
    });
};
