"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "TimestampedModel", {
    enumerable: !0,
    get: ()=>TimestampedModel
});
const _objection = require("objection");
class TimestampedModel extends _objection.Model {
    async $beforeInsert(qc) {
        return this.created_at = new Date(), this.updated_at = new Date(), super.$beforeInsert(qc);
    }
    async $beforeUpdate(args, qc) {
        return this.updated_at = new Date(), super.$beforeUpdate(args, qc);
    }
}
