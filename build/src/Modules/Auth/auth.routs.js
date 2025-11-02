"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "PublicAuthRoutes", {
    enumerable: !0,
    get: ()=>PublicAuthRoutes
});
const _userController = require("../Users/user.controller"), _multer = require("../../Middlewares/multer"), _login = require("./login"), _register = require("./register"), _webLogin = require("./web-login"), PublicAuthRoutes = (router, prefix)=>{
    router.post(`${prefix}/admin/web-login`, _multer.Multer.none, _webLogin.webLogin), router.post(`${prefix}/login`, _multer.Multer.none, _login.Login), router.post(`${prefix}/register`, _multer.Multer.none, _register.register).route(`${prefix}/users/activePhone`).patch(_userController.UserController.activePhone);
};
