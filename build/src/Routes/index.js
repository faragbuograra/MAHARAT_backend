"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "applyRoutes", {
    enumerable: !0,
    get: ()=>applyRoutes
});
const _express = require("express"), _errorHandler = require("../Middlewares/error.handler"), _jwt = require("../Middlewares/Jwt"), _locale = require("../Middlewares/locale"), _authRouts = require("../Modules/Auth/auth.routs"), _userRoutes = require("../Modules/Users/user.routes"), _statisticsRoute = require("./statistics.route"), _logout = require("Modules/Auth/logout"), _me = require("Modules/Auth/me"), applyRoutes = ()=>{
    let router = (0, _express.Router)();
    router.use(_locale.Locale);
    let prefix = "/api/v1";
    return (0, _authRouts.PublicAuthRoutes)(router, prefix), router.use(_jwt.JWT), router.get(`${prefix}/me`, _me.me), router.get(`${prefix}/logout`, _logout.logout), (0, _userRoutes.UserRoutes)(router, prefix), router.get(`${prefix + "/admin"}/statistics`, _statisticsRoute.GetStatics), router.use(_errorHandler.errorHandler), router;
};
