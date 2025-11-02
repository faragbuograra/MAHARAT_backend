"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "UserController", {
    enumerable: !0,
    get: ()=>UserController
});
const _objection = require("objection"), _userModel = require("./user.model"), _finder = require("../../Utils/finder"), UserController = {
    async update (req, res, next) {
        "is_disabled" in req.body && delete req.body.is_disabled, await _userModel.User.query().patchAndFetchById(req.params.id, req.body).throwIfNotFound({
            message: "User not found!"
        }).then((result)=>res.json(result)).catch((err)=>next(err));
    },
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_userModel.User, req.query, _userModel.User.query().select("id", "name").where("status", !0)).then((results)=>res.json(results)).catch((err)=>next(err)),
    async activePhone (req, res, next) {
        var data = req.body;
        if (data.phoneIsActive = 1, !data.phone) return next(new _objection.ValidationError({
            message: "Phone number is required!",
            type: "ModelValidation",
            data: {
                phone: "Phone number is required!"
            }
        }));
        console.log(data), await _userModel.User.query().where("phone", data.phone).patch({
            phoneIsActive: "1"
        }).throwIfNotFound({
            message: "User not found!"
        }).then((result)=>res.status(200).json({
                message: "phone is active"
            })).catch((err)=>next(err));
    }
};
