"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    const users = [
      {
        firstname: "admin",
        lastname: "wan",
        email: "admin1@email.com",
        password: "adminone",
        role: "admin",
      },
      {
        firstname: "staff",
        lastname: "wan",
        email: "staff1@email.com",
        password: "staffone",
        role: "staff",
      },
      {
        firstname: "member",
        lastname: "wan",
        email: "member1@email.com",
        password: "memberone",
        role: "member",
      },
      {
        firstname: "member",
        lastname: "two",
        email: "member2@email.com",
        password: "membertwo",
        role: "member",
      },
      {
        firstname: "member",
        lastname: "three",
        email: "member3@email.com",
        password: "memberthree",
        role: "member",
      },
    ];
    await User.createMany(users);
  }
}

module.exports = UserSeeder;
