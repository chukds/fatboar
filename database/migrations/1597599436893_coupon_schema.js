"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CouponSchema extends Schema {
  up() {
    this.create("coupons", (table) => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("prize_id")
        .unsigned()
        .references("id")
        .inTable("prizes")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table.string("coupon_name", 100).notNullable().unique().index();
      table.boolean("status").defaultTo(0);
      table.boolean("is_car").defaultTo(0);
      table.boolean("is_end").defaultTo(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("coupons");
  }
}

module.exports = CouponSchema;
