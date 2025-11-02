"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminMessagesController", {
    enumerable: !0,
    get: ()=>AdminMessagesController
});
const _messagesModel = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("./messages.model")), _finder = require("../../Utils/finder"), AdminMessagesController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_messagesModel.default, req.query, _messagesModel.default.query()).then((results)=>res.json(results)).catch((err)=>next(err)),
    async store (req, res, next) {
        let data = req.body, trx = await _messagesModel.default.startTransaction();
        try {
            await _messagesModel.default.query(trx).insert(data).then((result)=>res.json(result)), await trx.commit();
        } catch (err) {
            return await trx.rollback(), next(err);
        }
    },
    async update (req, res, next) {
        let data = req.body, { id  } = req.params;
        try {
            await _messagesModel.default.query().patchAndFetchById(id, data).throwIfNotFound({
                message: "Message not found!"
            }).then((result)=>res.json(result)).catch((err)=>next(err));
        } catch (err) {
            return next(err);
        }
    }
};
