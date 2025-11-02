"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>Review
});
const _timestampedModel = require("../Shared/TimestampedModel");
class Review extends _timestampedModel.TimestampedModel {
    static tableName = "reviews";
    static jsonSchema = {
        type: "object",
        required: [
            "service_id",
            "seeker_id",
            "rating"
        ],
        properties: {
            comment: {
                type: "string"
            }
        }
    };
}
