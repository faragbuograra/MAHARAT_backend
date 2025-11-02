"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "RoleMiddleware", {
    enumerable: !0,
    get: ()=>RoleMiddleware
});
const _objection = require("objection"), RoleMiddleware = (grantedRole)=>(req, res, next)=>{
        let user = req.user;
        return user ? "false" == user.status ? next(new _objection.ValidationError({
            type: "UnauthorizedAccess",
            message: "Your account has been disabled"
        })) : user.role_id && grantedRole != user.role_id ? next(new _objection.ValidationError({
            type: "UnauthorizedAccess",
            message: "route requires the following roles Admin"
        })) : next() : next(new _objection.ValidationError({
            type: "UnauthorizedAccess",
            message: "user does not exist"
        }));
    };
