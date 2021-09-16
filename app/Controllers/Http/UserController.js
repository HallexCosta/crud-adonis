"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Database = use("Database");
const { validateAll } = use("Validator");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    console.log("> GET /users");

    const users = await Database.select("*").from("users");

    response.header("X-Total-Count", users.length);

    return response.json(users);
  }

  /**
   * Render a form to be used for creating a new user.
   * GET users/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new user.
   * POST users
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    console.log("> POST /users");

    const { username, password, email } = request.body;

    const rules = {
      email: "required|email|unique:users,email",
      password: "required",
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      return response.status(409).json({
        message: "Fields Invalids",
      });
    }

    const user = {
      email,
      username,
      password,
    };

    Database.select("*").where({ email });

    await Database.insert(user).into("users");

    return response.status(201).json(user);
  }

  /**
   * Display a single user.
   * GET users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {
    console.log("> GET /users/:id");

    const user = await Database.select("*").from("users").where({ id }).first();

    return response.json(user);
  }

  /**
   * Render a form to update an existing user.
   * GET users/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    console.log("> PUT /users/:id");
    const { username, email, password } = request.body;

    const user = {
      username,
      email,
      password,
    };

    await Database.table("users").update(user).where({ id });

    return response.json(user);
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const affectedRows = await Database.table("users").where({ id }).delete();

    return response.json({
      affectedRows,
    });
  }
}

module.exports = UserController;
