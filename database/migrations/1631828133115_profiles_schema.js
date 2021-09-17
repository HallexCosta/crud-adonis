"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ProfilesSchema extends Schema {
  up() {
    this.create("profiles", (table) => {
      table.increments();
      table.string("profile_name", 80).notNullable().unique();
      table.integer("user_id").index().references("id").inTable("users");
      table.timestamps();
    });
  }

  down() {
    this.drop("profiles");
  }
}

module.exports = ProfilesSchema;
