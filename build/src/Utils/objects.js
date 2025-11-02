"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: !0,
        get: all[name]
    });
}(exports, {
    limit: ()=>limit,
    distinct_array_obj_key: ()=>distinct_array_obj_key
});
const limit = (obj, keys)=>Object.entries(obj).filter(([key])=>keys.includes(key)).reduce((obj, [key, val])=>Object.assign(obj, {
            [key]: val
        }), {}), distinct_array_obj_key = (arrayObj, key)=>[
        ...new Map(arrayObj.map((item)=>[
                item[key],
                item
            ])).values()
    ];
