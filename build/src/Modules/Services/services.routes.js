"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminServicesRoutes", {
    enumerable: !0,
    get: ()=>AdminServicesRoutes
});
const _multer = require("../../Middlewares/multer"), _servicesControllerAdmin = require("./services.controller.admin"), AdminServicesRoutes = (router, prefix)=>{
    router.route(`${prefix}/services`).get(_servicesControllerAdmin.AdminServicesController.index).post(_multer.Multer.simple("services"), _servicesControllerAdmin.AdminServicesController.store), router.route(`${prefix}/services/:id`).get(_servicesControllerAdmin.AdminServicesController.index).patch(_multer.Multer.simple("services"), _servicesControllerAdmin.AdminServicesController.update);
};
