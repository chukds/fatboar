"use strict";

const { validate } = use("Validator");
const FindUserValidator = use("App/Validators/FindUser");
const { test } = use("Test/Suite")("Find User Validation");

test("check e-mail format in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { email: "wrong email" },
    FindUserValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check coupon length in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "coupon12345" },
    FindUserValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check coupon format in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { coupon_name: "coupon12=)" },
    FindUserValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check telephone length in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { telephone: "01234567891" },
    FindUserValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check telephone format in findCoupon", async ({ assert }) => {
  const validation = await validate(
    { telephone: "1234567890" },
    FindUserValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});
