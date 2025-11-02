"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: !0,
        get: all[name]
    });
}(exports, {
    knex: ()=>knex,
    default: ()=>_default
}), require("dotenv/config");
const _knex = function(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}(require("knex")), _config = require("./src/config"), config = {
    client: _config.DB.client,
    connection: {
        host: _config.DB.host,
        user: _config.DB.user,
        password: _config.DB.password,
        database: _config.DB.database
    },
    searchPath: [
        "public"
    ],
    pool: {
        min: 0,
        max: 100
    },
    migrations: {
        tableName: "migrations",
        directory: "Database/Migrations",
        stub: "Database/migration.stub"
    },
    seeds: {
        directory: "Database/Seeders",
        timestampFilenamePrefix: !0
    }
}, knex = (0, _knex.default)(config), _default = config;
