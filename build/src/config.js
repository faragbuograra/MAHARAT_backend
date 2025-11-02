"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: !0,
        get: all[name]
    });
}(exports, {
    DOMAIN: ()=>DOMAIN,
    SERVER_PORT: ()=>SERVER_PORT,
    CORS_ORIGIN: ()=>CORS_ORIGIN,
    ROOT_PATH: ()=>ROOT_PATH,
    PUBLIC_PATH: ()=>PUBLIC_PATH,
    PRIVATE_PATH: ()=>PRIVATE_PATH,
    UPLOADS_PATH: ()=>UPLOADS_PATH,
    JWT_SECRET: ()=>JWT_SECRET,
    JWT_EXPIRY: ()=>JWT_EXPIRY,
    INVALIDATE_COOKIE: ()=>INVALIDATE_COOKIE,
    DB: ()=>DB,
    LOCALES_ENUM: ()=>LOCALES_ENUM
});
const _path = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("path")), DOMAIN = process.env.DOMAIN, SERVER_PORT = process.env.SERVER_PORT, CORS_ORIGIN = [
    "http://localhost:8022",
    "http://localhost:3000/",
    "http://192.168.31.22"
], ROOT_PATH = _path.default.resolve(__dirname, "../"), PUBLIC_PATH = _path.default.resolve(__dirname, "../", "public"), PRIVATE_PATH = _path.default.resolve(__dirname, "../", "private"), UPLOADS_PATH = _path.default.resolve(__dirname, "../", "public", "uploads"), JWT_SECRET = String(process.env.JWT_SECRET), JWT_EXPIRY = String(process.env.JWT_EXPIRY), INVALIDATE_COOKIE = "accessToken=deleted; path=/; HttpOnly; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=None; Secure", DB = {
    client: process.env.DB_CLIENT,
    port: process.env.PG_PORT,
    host: process.env.PG_HOST,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE
}, LOCALES_ENUM = [
    "ar",
    "en"
];
