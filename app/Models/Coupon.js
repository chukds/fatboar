"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Coupon extends Model {
  reward() {
    return this.hasOne("App/Models/Prize");
  }

  participation() {
    return this.hasOne("App/Models/Participation");
  }
}

module.exports = Coupon;
