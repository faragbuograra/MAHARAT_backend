"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>Service
});
const _timestampedModel = require("../Shared/TimestampedModel");
class Service extends _timestampedModel.TimestampedModel {
    static tableName = "services";
    static defaultSort = "title";
    static jsonSchema = {
        type: "object",
        required: [
            "title"
        ],
        properties: {
            title: {
                type: "string",
                minLength: 1
            },
            description: {
                type: "string"
            }
        }
    };
}
