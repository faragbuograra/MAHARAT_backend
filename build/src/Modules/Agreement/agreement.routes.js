"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminAgreementRoutes", {
    enumerable: !0,
    get: ()=>AdminAgreementRoutes
});
const _multer = require("../../Middlewares/multer"), _agreementcontrollerAdmin = require("./agreementcontroller.admin"), AdminAgreementRoutes = (router, prefix)=>{
    router.route(`${prefix}/Agreement`).get(_agreementcontrollerAdmin.AdminAgreementController.index).post(_multer.Multer.simple("Agreement"), _agreementcontrollerAdmin.AdminAgreementController.store), router.route(`${prefix}/Agreement/:id`).get(_agreementcontrollerAdmin.AdminAgreementController.index).patch(_multer.Multer.simple("Agreement"), _agreementcontrollerAdmin.AdminAgreementController.update);
};
