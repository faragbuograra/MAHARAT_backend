"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>Ads
});
const _config = require("../../config"), _timestampedModel = require("../Shared/TimestampedModel");
class Ads extends _timestampedModel.TimestampedModel {
    static tableName = "ads";
    static defaultSort = "name";
    static jsonSchema = {
        type: "object",
        required: [
            "name",
            "dec"
        ],
        properties: {
            name: {
                type: "string",
                minLength: 1
            }
        }
    };
    $parseDatabaseJson(json) {
        return (json = super.$parseDatabaseJson(json)).img = null != json.img ? `${_config.DOMAIN}/uploads/ads/${json.img}` : null, json;
    }
}
