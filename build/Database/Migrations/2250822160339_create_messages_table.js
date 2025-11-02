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
const table_name = "messages";
async function up(knex) {
    return knex.schema.createTable(table_name, (table)=>{
        table.increments("id").primary(), table.integer("sender_id").unsigned().references("id").inTable("users").onDelete("CASCADE"), table.integer("receiver_id").unsigned().references("id").inTable("users").onDelete("CASCADE"), table.text("content").notNullable(), table.boolean("read_status").defaultTo(!1).notNullable(), table.timestamp("created_at", {
            useTz: !1
        }).defaultTo(knex.raw("now()")).notNullable();
    });
}
async function down(knex) {
    return knex.schema.dropTableIfExists(table_name);
}
