"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), require("dotenv/config");
const _app = require("./app"), _config = require("./config"), _objection = require("objection"), _knexfile = require("../knexfile"), start = async ()=>{
    _objection.Model.knex(_knexfile.knex), _app.app.listen(_config.SERVER_PORT, ()=>console.log(`Server listening at ${_config.DOMAIN}`));
};
start().catch((err)=>console.log(err));
