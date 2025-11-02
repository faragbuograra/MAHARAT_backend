"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminAgreementController", {
    enumerable: !0,
    get: ()=>AdminAgreementController
});
const _agreementModel = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("./agreement.model")), _finder = require("../../Utils/finder"), AdminAgreementController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_agreementModel.default, req.query, _agreementModel.default.query()).then((results)=>res.json(results)).catch((err)=>next(err)),
    async store (req, res, next) {
        let data = req.body, img = req.file, trx = await _agreementModel.default.startTransaction();
        try {
            img && (data.img = img.filename), data.status = !0, await _agreementModel.default.query(trx).insert(data).then((result)=>res.json(result)), await trx.commit();
        } catch (err) {
            return await trx.rollback(), next(err);
        }
    },
    async update (req, res, next) {
        let data = req.body, { id  } = req.params;
        req.file, await _agreementModel.default.startTransaction();
        try {
            await _agreementModel.default.query().patchAndFetchById(id, data).throwIfNotFound({
                message: "Agreement not found!"
            }).then((result)=>res.json(result)).catch((err)=>next(err));
        } catch (err) {}
    }
};
