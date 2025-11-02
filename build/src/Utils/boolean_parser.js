"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "default", {
    enumerable: !0,
    get: ()=>_default
});
const _default = function(value) {
    let parsedValue;
    switch(value){
        case "true":
        case !0:
        case "t":
        case "1":
        case "yes":
        case "y":
        case 1:
            parsedValue = !0;
            break;
        case "false":
        case !1:
        case "f":
        case "0":
        case "no":
        case "n":
        case 0:
            parsedValue = !1;
            break;
        default:
            parsedValue = Boolean(value);
    }
    return parsedValue;
};
