"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminReviewsController", {
    enumerable: !0,
    get: ()=>AdminReviewsController
});
const _reviewsModel = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("./reviews.model")), _finder = require("../../Utils/finder"), AdminReviewsController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_reviewsModel.default, req.query, _reviewsModel.default.query()).then((results)=>res.json(results)).catch((err)=>next(err)),
    async store (req, res, next) {
        let data = req.body, trx = await _reviewsModel.default.startTransaction();
        try {
            await _reviewsModel.default.query(trx).insert(data).then((result)=>res.json(result)), await trx.commit();
        } catch (err) {
            return await trx.rollback(), next(err);
        }
    },
    async update (req, res, next) {
        let data = req.body, { id  } = req.params;
        try {
            await _reviewsModel.default.query().patchAndFetchById(id, data).throwIfNotFound({
                message: "Review not found!"
            }).then((result)=>res.json(result)).catch((err)=>next(err));
        } catch (err) {
            return next(err);
        }
    }
};
