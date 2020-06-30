"use strict";

const Factory = use("Factory");
const { validate } = use("Validator");
const { test, trait } = use("Test/Suite")("Login Validation");

const LoginValidator = use("App/Validators/Login");

test("validate user e-mail", async ({ assert }) => {
  const validation = await validate(
    { email: "wrong email" },
    LoginValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});
