"use strict";
const Factory = use("Factory");
const User = use("App/Models/User");
const { test, trait } = use("Test/Suite")("AuthController");

trait("Test/ApiClient");
test("register a new user", async ({ assert, client }) => {
  // generate a fake user
  const {
    firstname,
    lastname,
    email,
    telephone,
    password,
  } = await Factory.model("App/Models/User").create();
  // make api request to register a new user
  const response = await client
    .post("enrol")
    .send({
      firstname,
      lastname,
      email,
      telephone,
      password,
    })
    .end();

  // console.log("error", response.error);
  // expect the status code to be 200
  response.assertStatus(200);
  // assert the user was actually saved in the database
  await User.query().where({ email }).firstOrFail();
});

test("check succesful user login", async ({ assert, client }) => {
  // generate a fake user
  const {
    firstname,
    lastname,
    email,
    telephone,
    password,
  } = await Factory.model("App/Models/User").create();

  // make request to login the user
  const response = await client
    .post("login")
    .send({
      email,
      password,
    })
    .end();
  // console.log("error", response.error);
  // assert the status is 200
  response.assertStatus(200);
});
