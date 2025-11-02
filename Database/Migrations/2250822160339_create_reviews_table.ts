import { Knex } from "knex";

const table_name = "reviews";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, (table) => {
    table.increments("id").primary();
    table.integer("service_id").unsigned().references("id").inTable("services").onDelete("CASCADE");
    table.integer("seeker_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.integer("rating").notNullable();
    table.text("comment").nullable();
    table.timestamp("created_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
      table.timestamp("updated_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name);
}