import { Knex } from "knex";

const table_name = "saved_list";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, (table) => {
    table.increments("id").primary();
    table.integer("seeker_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.integer("provider_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.timestamp("created_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
      table.timestamp("updated_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name);
}