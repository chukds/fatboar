"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PrizeSchema extends Schema {
  up() {
    this.create("prizes", table => {
      table.increments();
      table.string("prize_name");
      table.timestamps();
    });
  }

  down() {
    this.drop("prizes");
  }
}

module.exports = PrizeSchema;
