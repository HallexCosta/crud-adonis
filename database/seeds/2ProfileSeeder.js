"use strict";

/*
|--------------------------------------------------------------------------
| ProfileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Profile = use("App/Models/Profile");

class ProfileSeeder {
  async run() {
    await Factory.model("App/Models/Profile").createMany(4);

    const profiles = (await Profile.all()).toJSON();

    console.log({
      profiles,
    });
  }
}

module.exports = ProfileSeeder;
