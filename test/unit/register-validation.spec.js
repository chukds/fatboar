'use strict'

const { validate } = use("Validator");
const RegisterValidator = use("App/Validators/Register");
const { test } = use('Test/Suite')('Register Validation')

test("check e-mail availability in register", async ({ assert }) => {
  const validation = await validate({ email: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check is_cgu availability in register", async ({ assert }) => {
  const validation = await validate({ is_cgu: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check is_news availability in register", async ({ assert }) => {
  const validation = await validate({ is_news: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check is_adult availability in register", async ({ assert }) => {
  const validation = await validate({ is_adult: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check firstname availability in register", async ({ assert }) => {
  const validation = await validate({ firstname: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check lastname availability in register", async ({ assert }) => {
  const validation = await validate({ lastname: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check recaptcha availability in register", async ({ assert }) => {
  const validation = await validate({ recaptcha: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check password availability in register", async ({ assert }) => {
  const validation = await validate({ password: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check telephone availability in register", async ({ assert }) => {
  const validation = await validate({ telephone: "" }, RegisterValidator.rules);

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check password length in register", async ({ assert }) => {
  const validation = await validate(
    { password: "paswad" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});


test("check e-mail format in register", async ({ assert }) => {
  const validation = await validate(
    { email: "wrong email" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check telephone length in register", async ({ assert }) => {
  const validation = await validate(
    { telephone: "01234567891" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check telephone format in register", async ({ assert }) => {
  const validation = await validate(
    { telephone: "1234567890" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check firstname minimum length in register", async ({ assert }) => {
  const validation = await validate(
    { firstname: "n" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check lastname minimum length in register", async ({ assert }) => {
  const validation = await validate(
    { lastname: "n" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check firstname maximum length in register", async ({ assert }) => {
  const validation = await validate(
    { firstname: "larditeoustupbasynortlanzinaspolingalprogablockeydrocki" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check lastname maximum length in register", async ({ assert }) => {
  const validation = await validate(
    { lastname: "larditeoustupbasynortlanzinaspolingalprogablockeydrocki" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check firstname format in register", async ({ assert }) => {
  const validation = await validate(
    { firstname: "daName=)" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check lastname format in register", async ({ assert }) => {
  const validation = await validate(
    { lastname: "daName=)" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check is_adult format in register", async ({ assert }) => {
  const validation = await validate(
    { is_adult: "3" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check is_cgu format in register", async ({ assert }) => {
  const validation = await validate(
    { is_cgu: "3" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});

test("check is_news format in register", async ({ assert }) => {
  const validation = await validate(
    { is_news: "3" },
    RegisterValidator.rules
  );

  // console.log(validation);
  assert.isTrue(validation.fails());
});
