"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "register", {
    enumerable: !0,
    get: ()=>register
});
const _objection = require("objection"), _config = require("../../config"), _userModel = require("../Users/user.model"), _ms = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("ms")), register = async (req, res, next)=>{
    if (!req.body.password) return next(new _objection.ValidationError({
        message: "Password or phone number is required!",
        type: "ModelValidation",
        data: {
            password: "Password is required!"
        }
    }));
    let trx = await _userModel.User.startTransaction();
    await _userModel.User.query(trx).where("name", req.body.name).first().then(async (user)=>{
        if (user) throw new _objection.ValidationError({
            type: "ModelValidation",
            message: "User already exist"
        });
        req.body.status = "true", console.log(req.body);
        let newUser = await _userModel.User.query(trx).insert(req.body).returning("*"), generated = newUser.$genToken(), token = `Bearer ${generated}`;
        return res.setHeader("Set-Cookie", [
            `accessToken=${token}; path=/; HttpOnly; Max-Age=${(0, _ms.default)(_config.JWT_EXPIRY) / 100}; SameSite=None; Secure`
        ]).json({
            status: "success",
            message: "logged in",
            token: newUser.$genToken()
        });
    }).catch(async (err)=>(await trx.rollback(), next(err))).finally(async ()=>{
        await trx.commit();
    });
};
