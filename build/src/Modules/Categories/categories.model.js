"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>Category
});
const _timestampedModel = require("../Shared/TimestampedModel");
class Category extends _timestampedModel.TimestampedModel {
    static tableName = "categories";
    static defaultSort = "name";
    static jsonSchema = {
        type: "object",
        required: [
            "name"
        ],
        properties: {
            name: {
                type: "string",
                minLength: 1
            },
            description: {
                type: "string"
            }
        }
    };
}
