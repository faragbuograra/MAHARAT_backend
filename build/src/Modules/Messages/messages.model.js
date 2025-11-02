"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>Message
});
const _timestampedModel = require("../Shared/TimestampedModel");
class Message extends _timestampedModel.TimestampedModel {
    static tableName = "messages";
    static jsonSchema = {
        type: "object",
        required: [
            "sender_id",
            "receiver_id",
            "content"
        ],
        properties: {
            content: {
                type: "string"
            }
        }
    };
}
