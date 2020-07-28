"use strict";

const { validate } = use("Validator");
const AddCouponValidator = use("App/Validators/AddCoupon");
const { test } = use("Test/Suite")("Add Coupon Validation");

test("check coupon availability in addCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "" },
    AddCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check coupon length in addCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "coupon12345" },
    AddCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check coupon format in addCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "coupon12=)" },
    AddCouponValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});
