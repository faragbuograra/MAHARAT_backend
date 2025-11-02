"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "User", {
    enumerable: !0,
    get: ()=>User
});
const _knexfile = require("../../../knexfile"), _bcryptjs = _interopRequireWildcard(require("bcryptjs")), _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken")), _config = require("../../config"), _timestampedModel = require("../Shared/TimestampedModel");
function _getRequireWildcardCache(nodeInterop) {
    if ("function" != typeof WeakMap) return null;
    var cacheBabelInterop = new WeakMap(), cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interopRequireWildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) return obj;
    if (null === obj || "object" != typeof obj && "function" != typeof obj) return {
        default: obj
    };
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {}, hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if ("default" !== key && Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        desc && (desc.get || desc.set) ? Object.defineProperty(newObj, key, desc) : newObj[key] = obj[key];
    }
    return newObj.default = obj, cache && cache.set(obj, newObj), newObj;
}
class User extends _timestampedModel.TimestampedModel {
    static tableName = "user";
    static defaultSort = "email";
    static jsonSchema = {
        type: "object",
        required: [
            "name",
            "password"
        ],
        properties: {}
    };
    async $beforeInsert(qc) {
        return "username" in this && (this.username = this.username.toLowerCase(), this.password = await this.$setPassword(this.password)), super.$beforeInsert(qc);
    }
    async $beforeUpdate(args, qc) {
        return "username" in this && (this.username = this.username.toLowerCase()), "password" in this && this.password && (this.password = await this.$setPassword(this.password)), super.$beforeUpdate(args, qc);
    }
    async $getPassword() {
        let result = await (0, _knexfile.knex)("user").where("id", this.id).select("password");
        return result[0] ? result[0].password : null;
    }
    async $setPassword(value) {
        let salt = await _bcryptjs.genSalt();
        return null == value ? null : await _bcryptjs.hash(value, salt);
    }
    async $validatePassword(candidatePassword) {
        let userPassword = await this.$getPassword();
        return !!userPassword && await _bcryptjs.compare(candidatePassword, userPassword);
    }
    $genToken() {
        return _jsonwebtoken.sign({
            id: this.id
        }, _config.JWT_SECRET, {
            expiresIn: _config.JWT_EXPIRY
        });
    }
    $formatJson(json) {
        return "password" in (json = super.$formatJson(json)) && delete json.password, json;
    }
}
