"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: !0,
        get: all[name]
    });
}(exports, {
    UserRoutes: ()=>UserRoutes,
    AdminUserRoutes: ()=>AdminUserRoutes
});
const _multer = require("../../Middlewares/multer"), _userController = require("./user.controller"), _userControllerAdmin = require("./user.controller.admin"), UserRoutes = (router, prefix)=>{
    router.route(`${prefix}/users/:id`).post(_userController.UserController.update), router.route(`${prefix}/users`).get(_userController.UserController.index);
}, AdminUserRoutes = (router, prefix)=>{
    router.route(`${prefix}/users`).get(_userControllerAdmin.AdminUserController.index).post(_multer.Multer.none, _userControllerAdmin.AdminUserController.store), router.route(`${prefix}/users/:id`).get(_userControllerAdmin.AdminUserController.show).patch(_multer.Multer.none, _userControllerAdmin.AdminUserController.update), router.route(`${prefix}/resetpassword/:id`).patch(_multer.Multer.none, _userControllerAdmin.AdminUserController.resetpassword);
};
