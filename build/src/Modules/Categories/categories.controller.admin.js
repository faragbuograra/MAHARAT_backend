"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminCategoriesController", {
    enumerable: !0,
    get: ()=>AdminCategoriesController
});
const _categoriesModel = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("./categories.model")), _finder = require("../../Utils/finder"), AdminCategoriesController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_categoriesModel.default, req.query, _categoriesModel.default.query()).then((results)=>res.json(results)).catch((err)=>next(err)),
    async store (req, res, next) {
        let data = req.body, trx = await _categoriesModel.default.startTransaction();
        try {
            await _categoriesModel.default.query(trx).insert(data).then((result)=>res.json(result)), await trx.commit();
        } catch (err) {
            return await trx.rollback(), next(err);
        }
    },
    async update (req, res, next) {
        let data = req.body, { id  } = req.params;
        try {
            await _categoriesModel.default.query().patchAndFetchById(id, data).throwIfNotFound({
                message: "Category not found!"
            }).then((result)=>res.json(result)).catch((err)=>next(err));
        } catch (err) {
            return next(err);
        }
    }
};
