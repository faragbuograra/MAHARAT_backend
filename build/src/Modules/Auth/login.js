"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "Login", {
    enumerable: !0,
    get: ()=>Login
});
const _objection = require("objection"), _config = require("../../config"), _userModel = require("../Users/user.model"), _ms = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("ms")), Login = async (req, res, next)=>{
    let { username , password  } = req.body;
    if (!username || !password) return next(new _objection.ValidationError({
        type: "InputValidationError",
        message: "password or username missing",
        data: {
            body: req.body
        }
    }));
    username && (username = String(username).trim().toLowerCase()), await _userModel.User.query().where("username", username).first().throwIfNotFound({
        message: "User not found"
    }).then(async (result)=>{
        let valid = await result.$validatePassword(password);
        if ("false" == result.status) throw new _objection.ValidationError({
            type: "ValidationError",
            message: "user is not active"
        });
        if ("false" == result.status) return res.status(451).json({
            message: "user is not verified"
        });
        if ("admin" == result.role) return res.status(451).json({
            message: "you are not allowed to login from here"
        });
        let generated = result.$genToken(), token = `Bearer ${generated}`;
        if (valid) return res.setHeader("Set-Cookie", [
            `accessToken=${token}; path=/; HttpOnly; Max-Age=${(0, _ms.default)(_config.JWT_EXPIRY) / 100}; SameSite=None; Secure`
        ]).json({
            status: "success",
            message: "logged in",
            token: result.$genToken(),
            role: result.role
        });
        throw new _objection.ValidationError({
            type: "ValidationError",
            message: "wrong password"
        });
    }).catch((err)=>next(err));
};
