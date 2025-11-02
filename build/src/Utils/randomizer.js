"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: !0,
        get: all[name]
    });
}(exports, {
    randomArrayValue: ()=>randomArrayValue,
    randomNumber: ()=>randomNumber
});
const randomArrayValue = (arr)=>arr[Math.floor(Math.random() * arr.length)], randomNumber = (min, max)=>Math.floor(Math.random() * (max - min + 1)) + min;
