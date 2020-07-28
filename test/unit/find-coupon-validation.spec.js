"use strict";

const { validate } = use("Validator");
const FindCouponValidator = use("App/Validators/FindCoupon");
const { test } = use("Test/Suite")("Find Coupon Validation");

test("check e-mail format in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { email: "wrong email" },
    FindCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check coupon length in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "coupon12345" },
    FindCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check coupon format in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "coupon12=)" },
    FindCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check telephone length in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "01234567891" },
    FindCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check coupon format in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "1234567890" },
    FindCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});
