"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminReviewsRoutes", {
    enumerable: !0,
    get: ()=>AdminReviewsRoutes
});
const _reviewsControllerAdmin = require("./reviews.controller.admin"), AdminReviewsRoutes = (router, prefix)=>{
    router.route(`${prefix}/reviews`).get(_reviewsControllerAdmin.AdminReviewsController.index).post(_reviewsControllerAdmin.AdminReviewsController.store), router.route(`${prefix}/reviews/:id`).get(_reviewsControllerAdmin.AdminReviewsController.index).patch(_reviewsControllerAdmin.AdminReviewsController.update);
};
