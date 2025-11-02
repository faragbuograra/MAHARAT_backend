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
const table_name = "services";
async function up(knex) {
    return knex.schema.createTable(table_name, (table)=>{
        table.increments("id").primary(), table.integer("provider_id").unsigned().references("id").inTable("users").onDelete("CASCADE"), table.integer("category_id").unsigned().references("id").inTable("categories").onDelete("SET NULL"), table.string("title").notNullable(), table.text("description").notNullable(), table.decimal("price", 10, 2).nullable(), table.string("location").nullable(), table.json("images").nullable(), table.enu("status", [
            "active",
            "pending",
            "removed"
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
