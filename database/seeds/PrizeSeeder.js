"use strict";

/*
|--------------------------------------------------------------------------
| RewardSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use("Factory");
const Prize = use("App/Models/Prize");

class PrizeSeeder {
  async run() {
    const prizes = [
      {
        prize_name: "une entrée ou un dessert au choix"
      },
      {
        prize_name: "un burger au choix"
      },
      {
        prize_name: "un menu du jour"
      },
      {
        prize_name: "un menu au choix"
      },
      {
        prize_name: "70% de réduction"
      }
    ];
    await Prize.createMany(prizes);
  }
}

module.exports = PrizeSeeder;
