"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "AdminAdsController", {
    enumerable: !0,
    get: ()=>AdminAdsController
});
const _path = _interopRequireDefault(require("path")), _config = require("../../config"), _adsModel = _interopRequireDefault(require("./ads.model")), _promises = require("node:fs/promises"), _finder = require("../../Utils/finder");
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const AdminAdsController = {
    index: async (req, res, next)=>await _finder.UtilDatabase.finder(_adsModel.default, req.query, _adsModel.default.query()).then((results)=>res.json(results)).catch((err)=>next(err)),
    async store (req, res, next) {
        let data = req.body, img = req.file, trx = await _adsModel.default.startTransaction();
        try {
            img && (data.img = img.filename), data.status = !0, await _adsModel.default.query(trx).insert(data).then((result)=>res.json(result)), await trx.commit();
        } catch (err) {
            if (img) {
                let img_path = _path.default.resolve(_config.UPLOADS_PATH, "Ads", img.filename);
                await (0, _promises.unlink)(img_path), console.log(`successfully deleted ${img_path}`);
            }
            return await trx.rollback(), next(err);
        }
    },
    async update (req, res, next) {
        let data = req.body, { id  } = req.params, img = req.file;
        await _adsModel.default.startTransaction(), img && (data.img = img.filename);
        try {
            let oldAds = await _adsModel.default.query().findById(id);
            if (null == oldAds ? void 0 : oldAds.img) {
                let oldImg = oldAds.img.split("/").pop();
                console.log(oldImg), (0, _promises.unlink)(_path.default.resolve(_config.UPLOADS_PATH, "Ads", oldImg || ""));
            }
            await _adsModel.default.query().patchAndFetchById(id, data).throwIfNotFound({
                message: "Ads not found!"
            }).then((result)=>res.json(result)).catch((err)=>next(err));
        } catch (err) {}
    }
};
