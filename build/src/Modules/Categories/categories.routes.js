"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminCategoriesRoutes", {
    enumerable: !0,
    get: ()=>AdminCategoriesRoutes
});
const _multer = require("../../Middlewares/multer"), _categoriesControllerAdmin = require("./categories.controller.admin"), AdminCategoriesRoutes = (router, prefix)=>{
    router.route(`${prefix}/categories`).get(_categoriesControllerAdmin.AdminCategoriesController.index).post(_multer.Multer.simple("categories"), _categoriesControllerAdmin.AdminCategoriesController.store), router.route(`${prefix}/categories/:id`).get(_categoriesControllerAdmin.AdminCategoriesController.index).patch(_multer.Multer.simple("categories"), _categoriesControllerAdmin.AdminCategoriesController.update);
};
