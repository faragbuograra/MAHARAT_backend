"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "Multer", {
    enumerable: !0,
    get: ()=>Multer
});
const _path = _interopRequireDefault(require("path")), _multer = _interopRequireDefault(require("multer")), _objection = require("objection"), _config = require("../config"), _fs = _interopRequireDefault(require("fs"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
class Multer {
    static none = (0, _multer.default)().none();
    static simple = (tableName)=>{
        let storage = _multer.default.diskStorage({
            destination (req, file, next) {
                next(null, _path.default.resolve(_config.UPLOADS_PATH, tableName));
            },
            filename (req, file, next) {
                next(null, tableName + "_" + Date.now() + "_" + Math.round(1E9 * Math.random()) + _path.default.extname(file.originalname));
            }
        });
        return (0, _multer.default)({
            storage
        }).single("attachment");
    };
    static simple2 = (tableName)=>{
        let storage = _multer.default.diskStorage({
            destination (req, file, next) {
                let currentDate = new Date(), formattedDate = currentDate.toISOString().substring(0, 10), folderPath = _path.default.resolve(_config.UPLOADS_PATH + "/" + tableName, formattedDate);
                _fs.default.existsSync(folderPath) || _fs.default.mkdirSync(folderPath), next(null, folderPath);
            },
            filename (req, file, next) {
                file.size, next(null, tableName + "_" + Date.now() + "_" + Math.round(1e9 * Math.random()) + _path.default.extname(file.originalname));
            }
        });
        return (0, _multer.default)({
            storage
        }).array("attachment[]", 10);
    };
    static single = (tableName, filepath, fieldName)=>{
        let storage = _multer.default.diskStorage({
            destination (req, file, next) {
                next(null, _path.default.resolve(_config.UPLOADS_PATH, filepath));
            },
            filename (req, file, next) {
                next(null, tableName + "_" + Date.now() + "_" + Math.round(1E9 * Math.random()) + _path.default.extname(file.originalname));
            }
        });
        return (0, _multer.default)({
            storage,
            limits: {
                fileSize: 8000000
            },
            async fileFilter (req, file, next) {
                let allowedMimeTypes = [
                    "image/jpeg",
                    "image/gif",
                    "image/png",
                    "image/svg+xml",
                    "image/webp"
                ];
                if (req.headers && req.headers["content-length"]) {
                    let filesize = parseInt(req.headers["content-length"]), invalidImage = !allowedMimeTypes.includes(file.mimetype) || filesize > 8000000;
                    if (!invalidImage) return next(null, !0);
                    {
                        let err = new _objection.ValidationError({
                            message: "File validation error",
                            type: "FileValidationError",
                            data: {
                                allowedMimeTypes,
                                maxFileSize: "8 MB",
                                provided: file.mimetype + " " + Math.round(filesize / 1000000 * 100) / 100 + " MB"
                            }
                        });
                        return next(err);
                    }
                }
            }
        }).single(fieldName);
    };
}
