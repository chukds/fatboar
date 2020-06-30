"use strict";
const Factory = use("Factory");
const User = use("App/Models/User");
const { test, trait } = use("Test/Suite")("Authentication");

trait("Test/ApiClient");

test("registers a new user", async ({ assert, client }) => {
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
    .post("register")
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

/*
test("returns an error if user already exists", async ({ assert, client }) => {
  // create a new user
  const {
    firstname,
    lastname,
    email,
    telephone,
    password,
  } = await Factory.model("App/Models/User").create();
  const response = await client
    .post("register")
    .send({ firstname, lastname, email, telephone, password })
    .end();
  console.log("error", response.error);
  // assert the status code is 500
  // response.assertStatus(500);
  // assert the error for used email was returned
  // assert.equal(response.body.message, "Server unable to register user.");
});
*/
