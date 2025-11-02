import { Knex } from "knex";

const table_name = "messages";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, (table) => {
    table.increments("id").primary();
    table.integer("sender_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.integer("receiver_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.text("content").notNullable();
    table.boolean("read_status").defaultTo(false).notNullable();
    table.timestamp("created_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
      table.timestamp("updated_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name);
}