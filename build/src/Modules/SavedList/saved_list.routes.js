"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminSavedListRoutes", {
    enumerable: !0,
    get: ()=>AdminSavedListRoutes
});
const _savedListControllerAdmin = require("./saved_list.controller.admin"), AdminSavedListRoutes = (router, prefix)=>{
    router.route(`${prefix}/saved_list`).get(_savedListControllerAdmin.AdminSavedListController.index).post(_savedListControllerAdmin.AdminSavedListController.store), router.route(`${prefix}/saved_list/:id`).get(_savedListControllerAdmin.AdminSavedListController.index).patch(_savedListControllerAdmin.AdminSavedListController.update);
};
