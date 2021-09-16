"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PostsSchema extends Schema {
  up() {
    this.create("posts", (table) => {
      table.increments();
      table.string("description", 256).notNullable();
      table.integer("user_id").index().references("id").inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("posts");
  }
}

module.exports = PostsSchema;
