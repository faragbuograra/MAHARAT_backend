"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>Agreement
});
const _timestampedModel = require("../Shared/TimestampedModel");
class Agreement extends _timestampedModel.TimestampedModel {
    static tableName = "agreement";
    static defaultSort = "name";
    static jsonSchema = {
        type: "object",
        required: [],
        properties: {
            name: {
                type: "string",
                minLength: 1
            }
        }
    };
}
