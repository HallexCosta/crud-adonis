"use strict";

/*
|--------------------------------------------------------------------------
| PostSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory");
const Post = use("App/Models/Post");

class PostSeeder {
  async run() {
    await Factory.model("App/Models/Post").createMany(4);

    const posts = (await Post.all()).toJSON();

    console.log({
      posts,
    });
  }
}

module.exports = PostSeeder;
