"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "webLogin", {
    enumerable: !0,
    get: ()=>webLogin
});
const _objection = require("objection"), _config = require("../../config"), _userModel = require("../Users/user.model"), _ms = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("ms")), webLogin = async (req, res, next)=>{
    console.log("\uD83D\uDE80 ~ file: web-login.ts ~ line 9 ~ webLogin ~ req.body");
    let { username , password  } = req.body;
    if (console.log(req.body), !username || !password) return next(new _objection.ValidationError({
        type: "InputValidationError",
        message: "password or username missing",
        data: {
            body: req.body
        }
    }));
    username && (username = String(username).trim().toLowerCase()), await _userModel.User.query().where("username", username).first().throwIfNotFound({
        message: "User not found"
    }).then(async (result)=>{
        let valid = await result.$validatePassword(password), generated = result.$genToken(), token = `Bearer ${generated}`;
        if (valid) return res.setHeader("Set-Cookie", [
            `accessToken=${token}; path=/; HttpOnly; Max-Age=${(0, _ms.default)(_config.JWT_EXPIRY) / 100}; SameSite=None; Secure`
        ]).json({
            status: "success",
            message: "logged in",
            role: result.role_id,
            token: result.$genToken()
        });
        throw new _objection.ValidationError({
            type: "ValidationError",
            message: "wrong password"
        });
    }).catch((err)=>next(err));
};
