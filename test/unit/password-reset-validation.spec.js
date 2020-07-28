'use strict'

const { validate } = use("Validator");
const PasswordResetValidator = use("App/Validators/PasswordReset");
const { test } = use('Test/Suite')('Password Reset Validation')

test("check token availability in passwordReset", async ({ assert }) => {
  const validation = await validate({ token: "" }, PasswordResetValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check password availability in passwordReset", async ({ assert }) => {
  const validation = await validate({ password: "" }, PasswordResetValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check confirmation availability in passwordReset", async ({ assert }) => {
  const validation = await validate({ password_confirmation: "" }, PasswordResetValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check password length in passwordReset", async ({ assert }) => {
  const validation = await validate(
    { password: "paswad" },
    PasswordResetValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

