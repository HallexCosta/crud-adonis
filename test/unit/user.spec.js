const { test, trait } = use("Test/Suite")("User Suite");

const User = use("App/Models/User");

test("test for validate to create instance with a method", async ({
  assert,
}) => {
  const user = User.instance();

  assert.instanceOf(user, User);
});
