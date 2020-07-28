'use strict'

const { validate } = use("Validator");
const SendLinkValidator = use("App/Validators/SendLink");
const { test } = use('Test/Suite')('Send Link Validation')

test("check e-mail format in sendLink", async ({ assert }) => {
  const validation = await validate(
    { email: "wrong email" },
    SendLinkValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check e-mail availability in sendLink", async ({ assert }) => {
  const validation = await validate({ email: "" }, SendLinkValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});
