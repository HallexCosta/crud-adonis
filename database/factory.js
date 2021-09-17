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
const Hash = use("Hash");

Factory.blueprint("App/Models/User", async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
  };
});

Factory.blueprint("App/Models/Post", async (faker) => {
  return {
    description: faker.username(),
    user_id: Math.floor(Math.random() * (1 - 1 + 1) + 1),
  };
});

Factory.blueprint("App/Models/Profile", async (faker) => {
  return {
    profile_name: faker.username(),
    user_id: Math.floor(Math.random() * (1 - 1 + 1) + 1),
  };
});
