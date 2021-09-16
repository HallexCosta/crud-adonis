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
const Factory = use("Factory");
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    await Factory.model("App/Models/User").createMany(2);

    const users = (await User.all()).toJSON();

    console.log({
      users,
    });
  }
}

module.exports = UserSeeder;
