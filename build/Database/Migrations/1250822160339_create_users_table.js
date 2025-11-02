"use strict";
Object.defineProperty(exports, "__esModule", {
    value: !0
}), !function(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: !0,
        get: all[name]
    });
}(exports, {
    up: ()=>up,
    down: ()=>down
});
const table_name = "users";
async function up(knex) {
    return knex.schema.createTable(table_name, (table)=>{
        table.increments("id").primary(), table.string("name").notNullable(), table.string("email").notNullable().unique(), table.string("password").notNullable(), table.enu("role", [
            "seeker",
            "provider",
            "admin"
        ]).notNullable().defaultTo("seeker"), table.string("location").nullable(), table.string("phone").nullable(), table.text("bio").nullable(), table.string("profile_image").nullable(), table.enu("status", [
            "active",
            "inactive"
        ]).defaultTo("active").notNullable(), table.timestamp("created_at", {
            useTz: !1
        }).defaultTo(knex.raw("now()")).notNullable(), table.timestamp("updated_at", {
            useTz: !1
        }).defaultTo(knex.raw("now()")).notNullable();
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists(table_name);
}
