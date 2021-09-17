"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use("App/Models/User");
const Profile = use("App/Models/Profile");

/**
 * Resourceful controller for interacting with profiles
 */
class ProfileController {
  /**
   * Show a list of all profiles.
   * GET profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    console.log("> GET /profiles");

    const profiles = (await Profile.all()).toJSON();

    response.header("X-Total-Count", profiles.length);

    return response.json(profiles);
  }

  /**
   * Render a form to be used for creating a new profile.
   * GET profiles/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new profile.
   * POST profiles
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response }) {
    console.log("> POST /profiles");

    const { profile_name, user_id } = request.body;

    const rules = {
      profile_name: "required",
      user_id: "required",
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      return response.status(409).json({
        message: "Fields Invalids",
      });
    }

    const profile = new User();

    profile.profile_name = profile_name;
    profile.user_id = user_id;

    await profile.save();

    return response.status(201).json(profile.toJSON());
  }

  /**
   * Display a single profile.
   * GET profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params: { id }, request, response, view }) {
    console.log("> GET /profiles/:id");

    const user = await User.find(id);

    const profile = (await user.profile().fetch()).toJSON();

    // delete profile.user_id;
    //
    // const userProfile = {
    //   ...user.toJSON(),
    //   profile: profile,
    // };

    return response.json(profile);
  }

  /**
   * Render a form to update an existing profile.
   * GET profiles/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update profile details.
   * PUT or PATCH profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    console.log("> PUT /profiles/:id");

    const { user_id, profile_name } = request.body;

    const profile = await Profile.find(id);

    profile.user_id = user_id;
    profile.profile_name = profile_name;

    await profile.save();

    return response.json(profile);
  }

  /**
   * Delete a profile with id.
   * DELETE profiles/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const profile = await Profile.find(id);

    await profile.delete();

    return response.json(profile);
  }
}

module.exports = ProfileController;
