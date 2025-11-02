"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminSavedListController", {
    enumerable: !0,
    get: ()=>AdminSavedListController
});
const _savedListModel = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("./saved_list.model")), _finder = require("../../Utils/finder"), AdminSavedListController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_savedListModel.default, req.query, _savedListModel.default.query()).then((results)=>res.json(results)).catch((err)=>next(err)),
    async store (req, res, next) {
        let data = req.body, trx = await _savedListModel.default.startTransaction();
        try {
            await _savedListModel.default.query(trx).insert(data).then((result)=>res.json(result)), await trx.commit();
        } catch (err) {
            return await trx.rollback(), next(err);
        }
    },
    async update (req, res, next) {
        let data = req.body, { id  } = req.params;
        try {
            await _savedListModel.default.query().patchAndFetchById(id, data).throwIfNotFound({
                message: "Saved item not found!"
            }).then((result)=>res.json(result)).catch((err)=>next(err));
        } catch (err) {
            return next(err);
        }
    }
};
