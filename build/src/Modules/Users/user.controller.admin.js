"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminUserController", {
    enumerable: !0,
    get: ()=>AdminUserController
});
const _finder = require("../../Utils/finder"), _userModel = require("./user.model"), AdminUserController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_userModel.User, req.query, _userModel.User.query().withGraphFetched("[role,department,management]")).then((results)=>res.json(results)).catch((err)=>next(err)),
    async show (req, res, next) {
        await _userModel.User.query().findById(req.params.id).withGraphFetched("[role,department,management]").throwIfNotFound({
            message: "User not found!"
        }).then((result)=>res.json(result)).catch((err)=>next(err));
    },
    async store (req, res, next) {
        await validateUser(req, res), await _userModel.User.query().insert(req.body).then((result)=>res.json(result)).catch((err)=>next(err));
    },
    async update (req, res, next) {
        await _userModel.User.query().patchAndFetchById(req.params.id, req.body).throwIfNotFound({
            message: "User not found!"
        }).then((result)=>res.json(result)).catch((err)=>next(err));
    },
    async resetpassword (req, res, next) {
        let data = req.body, { id  } = req.params;
        await _userModel.User.query().patchAndFetchById(id, data).throwIfNotFound({
            message: "User not found!"
        }).then((result)=>res.json(result)).catch((err)=>next(err));
    }
};
async function validateUser(req, res) {
    let errors = [];
    if (req.body.username) {
        let user = await _userModel.User.query().findOne({
            username: req.body.username
        });
        user && errors.push({
            username: `The username ${req.body.username} is already exist`
        });
    } else errors.push({
        username: "The username is required"
    });
    req.body.password || errors.push({
        password: "The password is required"
    }), req.body.management_id || errors.push({
        management_id: "The management_id is required"
    }), req.body.role_id || errors.push({
        role_id: "The role_id is required"
    }), req.body.department_id || errors.push({
        department_id: "The department_id is required"
    });
    let errorsObject = {};
    if (errors.forEach((error)=>{
        for(let field in error)errorsObject[field] = error[field];
    }), errors.length > 0) return res.status(400).json({
        errors: errorsObject,
        message: "Validation error"
    });
}
