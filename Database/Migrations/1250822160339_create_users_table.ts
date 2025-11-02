import { Knex } from "knex";

const table_name = "users";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table_name, (table) => {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.string("email").notNullable().unique();
    table.string("password").notNullable();
    table.enu("role", ["seeker", "provider", "admin"]).notNullable().defaultTo("seeker");
    table.string("location").nullable();
    table.string("phone").nullable();
    table.text("bio").nullable();
    table.string("profile_image").nullable();
    table.enu("status", ["active", "inactive"]).defaultTo("active").notNullable();
    table.timestamp("created_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
    table.timestamp("updated_at", { useTz: false }).defaultTo(knex.raw("now()")).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(table_name);
}