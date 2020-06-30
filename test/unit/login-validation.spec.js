"use strict";

const Factory = use("Factory");
const { validate } = use("Validator");
const { test, trait } = use("Test/Suite")("Login Validation");

const LoginValidator = use("App/Validators/Login");

test("check e-mail format in login", async ({ assert }) => {
  const validation = await validate(
    { email: "wrong email" },
    LoginValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check e-mail availability in login", async ({ assert }) => {
  const validation = await validate({ email: "" }, LoginValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check password availability in login", async ({ assert }) => {
  const validation = await validate({ password: "" }, LoginValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check password length in login", async ({ assert }) => {
  const validation = await validate(
    { password: "paswad" },
    LoginValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});
