"use strict";

const Factory = use("Factory");
const User = use("App/Models/User");

const { test, trait, before } = use("Test/Suite")("User Functional");

trait("Test/ApiClient");

test("create an user and given id", async ({ client, assert, faker }) => {
  const user = await Factory.model("App/Models/User").create();

  await client.post("/users").send(user);

  const userCreatedWithSuccess = (await User.find(user.id)).toJSON();

  assert.property(userCreatedWithSuccess, "id");
});
