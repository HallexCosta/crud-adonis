"use strict";

const Factory = use("Factory");
const User = use("App/Models/User");

const { test, trait, before } = use("Test/Suite")("User Functional");

trait("Test/ApiClient");

test("create an user and given id", async ({ client, assert }) => {
  const users = await User.all();

  const { body: user } = await client
    .post("/users")
    .send({
      username: `testing${users.length}`,
      email: `testing${users.length}@test.com`,
      password: "hallex123",
    })
    .end();

  assert.property(user, "id");

  const userCreatedWithSuccess = await User.find(user.id);
  await userCreatedWithSuccess.delete();
});
