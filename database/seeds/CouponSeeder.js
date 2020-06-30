"use strict";

/*
|--------------------------------------------------------------------------
| CouponSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
let i = 0;
const coupons = 100;
const coupon60Percent = coupons * 0.6;
const coupon20Percent = coupons * 0.2;
const coupon10Percent = coupons * 0.1;
const coupon6Percent = coupons * 0.06;
const coupon4Percent = coupons * 0.01;

class CouponSeeder {
  async run() {
    for (i = 1; i <= coupon60Percent; i++) {
      await Factory.model("App/Models/Coupon").create({ pid: 1 });
    }
    for (i = 1; i <= coupon20Percent; i++) {
      await Factory.model("App/Models/Coupon").create({ pid: 2 });
    }
    for (i = 1; i <= coupon10Percent; i++) {
      await Factory.model("App/Models/Coupon").create({ pid: 3 });
    }
    for (i = 1; i <= coupon6Percent; i++) {
      await Factory.model("App/Models/Coupon").create({ pid: 4 });
    }

    for (i = 1; i <= coupon4Percent; i++) {
      await Factory.model("App/Models/Coupon").create({ pid: 5 });
    }
  }
}

module.exports = CouponSeeder;
