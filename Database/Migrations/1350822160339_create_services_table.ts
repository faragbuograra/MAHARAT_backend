import { Knex } from "knex";

const table_name = "services";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, (table) => {
    table.increments("id").primary();
    table.integer("provider_id").unsigned().references("id").inTable("users").onDelete("CASCADE");
    table.integer("category_id").unsigned().references("id").inTable("categories").onDelete("SET NULL");
    table.string("title").notNullable();
    table.text("description").notNullable();
    table.decimal("price", 10, 2).nullable();
    table.string("location").nullable();
    table.json("images").nullable();
    table.enu("status", ["active", "pending", "removed"]).defaultTo("active").notNullable();
    table.timestamp("created_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
    table.timestamp("updated_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name);
}
