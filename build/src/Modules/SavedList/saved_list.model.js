"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>SavedList
});
const _timestampedModel = require("../Shared/TimestampedModel");
class SavedList extends _timestampedModel.TimestampedModel {
    static tableName = "saved_list";
    static jsonSchema = {
        type: "object",
        required: [
            "seeker_id",
            "provider_id"
        ],
        properties: {}
    };
}
