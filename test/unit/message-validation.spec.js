'use strict'

const { validate } = use("Validator");
const MessageValidator = use("App/Validators/Message");
const { test } = use('Test/Suite')('Message Validation')

test("check e-mail format in message", async ({ assert }) => {
  const validation = await validate(
    { email: "wrong email" },
    MessageValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check e-mail availability in message", async ({ assert }) => {
  const validation = await validate({ email: "" }, MessageValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check name availability in message", async ({ assert }) => {
  const validation = await validate({ name: "" }, MessageValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check name minimum length in message", async ({ assert }) => {
  const validation = await validate(
    { name: "b" },
    MessageValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check name maximum length in message", async ({ assert }) => {
  const validation = await validate(
    { name: "noustudguepuretroonhenemetheristoin" },
    MessageValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check name format in message", async ({ assert }) => {
  const validation = await validate(
    { name: "daMessage17=)" },
    MessageValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check message availability in message", async ({ assert }) => {
  const validation = await validate({ message: "" }, MessageValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check message minimum length in message", async ({ assert }) => {
  const validation = await validate(
    { message: "daMessage" },
    MessageValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});


test("check message format in message", async ({ assert }) => {
  const validation = await validate(
    { message: "daMessage17=}" },
    MessageValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

