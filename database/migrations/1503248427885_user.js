"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table.string("firstname", 100).nullable();
      table.string("lastname", 100).nullable();
      table.string("username", 250).nullable();
      table
        .string("email", 250)
        .nullable()
        .unique();
      table.string("password", 60).nullable();
      table.integer("telephone").nullable();
      table.enu("role", ["admin", "staff", "member"]).defaultTo("member");
      table.string("provider_id").nullable();
      table.string("provider").nullable();
      table.boolean("is_adult").defaultTo(0);
      table.boolean("is_cgu").defaultTo(0);
      table.boolean("is_news").defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
