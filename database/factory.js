"use strict";

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");

// Factory.blueprint('App/Models/User', (faker) => {
//   return {
//     username: faker.username()
//   }
// })
Factory.blueprint("App/Models/Coupon", (faker, index, data) => {
  return {
    // reward_id: data[index],
    prize_id: data.pid,
    coupon_name: faker.string({ length: 10 }),
  };
});

Factory.blueprint("App/Models/User", (faker) => {
  return {
    firstname: faker.name(),
    lastname: faker.name(),
    email: faker.email(),
    telephone: faker.phone({ formatted: false }),
    password: "password123",
  };
});
