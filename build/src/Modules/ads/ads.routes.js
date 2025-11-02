"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: !0,
        get: all[name]
    });
}(exports, {
    PublicAdsRoutes: ()=>PublicAdsRoutes,
    AdminAdsRoutes: ()=>AdminAdsRoutes
});
const _multer = require("../../Middlewares/multer"), _adsControllerAdmin = require("./ads.controller.admin"), _adsControllerPublic = require("./ads.controller.public"), PublicAdsRoutes = (router, prefix)=>{
    router.get(`${prefix}/ads`, _adsControllerPublic.PublicAdsController.index), router.get(`${prefix}/ads/:id`, _adsControllerPublic.PublicAdsController.show);
}, AdminAdsRoutes = (router, prefix)=>{
    router.route(`${prefix}/ads`).get(_adsControllerAdmin.AdminAdsController.index).post(_multer.Multer.simple("ads"), _adsControllerAdmin.AdminAdsController.store), router.route(`${prefix}/ads/:id`).get(_adsControllerAdmin.AdminAdsController.index).patch(_multer.Multer.simple("ads"), _adsControllerAdmin.AdminAdsController.update);
};
