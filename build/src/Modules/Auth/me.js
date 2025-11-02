"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "me", {
    enumerable: !0,
    get: ()=>me
});
const me = async (req, res)=>{
    if (!req.user || "false" == req.user.status) return res.status(401).json({
        message: "Unauthorized"
    });
    res.status(200).json(req.user);
};
