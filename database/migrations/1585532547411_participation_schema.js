"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ParticipationSchema extends Schema {
  up() {
    this.create("participations", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table
        .integer("coupon_id")
        .unsigned()
        .references("id")
        .inTable("coupons");
      table.timestamps();
    });
  }

  down() {
    this.drop("participations");
  }
}

module.exports = ParticipationSchema;
