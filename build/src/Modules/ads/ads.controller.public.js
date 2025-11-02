"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "PublicAdsController", {
    enumerable: !0,
    get: ()=>PublicAdsController
});
const _finder = require("../../Utils/finder"), _adsModel = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("./ads.model")), PublicAdsController = {
    async index (req, res, next) {
        let query = _adsModel.default.query();
        return query.where("status", !0), await _finder.UtilDatabase.finder(_adsModel.default, req.query, query).then((results)=>res.json(results)).catch((err)=>next(err));
    },
    async show (req, res, next) {
        await _adsModel.default.query().findById(req.params.id).throwIfNotFound({
            message: "Ads not found!"
        }).then((result)=>res.json(result)).catch((err)=>next(err));
    }
};
