"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "Locale", {
    enumerable: !0,
    get: ()=>Locale
});
const _config = require("../config"), Locale = (req, res, next)=>{
    let lang = req.query.lang ? String(req.query.lang).trim().toLowerCase() : "ar";
    _config.LOCALES_ENUM.includes(lang) || (req.query.lang = "ar"), next();
};
