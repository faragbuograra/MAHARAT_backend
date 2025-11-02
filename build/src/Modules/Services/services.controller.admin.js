"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminServicesController", {
    enumerable: !0,
    get: ()=>AdminServicesController
});
const _servicesModel = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("./services.model")), _finder = require("../../Utils/finder"), AdminServicesController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_servicesModel.default, req.query, _servicesModel.default.query()).then((results)=>res.json(results)).catch((err)=>next(err)),
    async store (req, res, next) {
        let data = req.body, img = req.file, trx = await _servicesModel.default.startTransaction();
        try {
            img && (data.images = [
                img.filename
            ]), data.status = "active", await _servicesModel.default.query(trx).insert(data).then((result)=>res.json(result)), await trx.commit();
        } catch (err) {
            return await trx.rollback(), next(err);
        }
    },
    async update (req, res, next) {
        let data = req.body, { id  } = req.params;
        req.file, await _servicesModel.default.startTransaction();
        try {
            await _servicesModel.default.query().patchAndFetchById(id, data).throwIfNotFound({
                message: "Service not found!"
            }).then((result)=>res.json(result)).catch((err)=>next(err));
        } catch (err) {}
    }
};
