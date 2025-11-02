"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "GetStatics", {
    enumerable: !0,
    get: ()=>GetStatics
});
const _userModel = require("../Modules/Users/user.model"), GetStatics = async (req, res, next)=>{
    let users = await _userModel.User.query().count().then((rows)=>Number(rows[0].count)), todayusers = await _userModel.User.query().where("created_at", ">", new Date().toISOString().slice(0, 10) + " 00:00:00").count().then((rows)=>Number(rows[0].count));
    res.json({
        users,
        todayusers
    });
};
