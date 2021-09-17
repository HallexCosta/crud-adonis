"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use("App/Models/Post");
const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, response, view }) {
    console.log("> GET /posts");

    const posts = (await Post.all()).toJSON();

    response.header("X-Total-Count", posts.length);

    return response.json(posts);
  }

  /**
   * Render a form to be used for creating a new post.
   * GET posts/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async create({ request, response, view }) {}

  /**
   * Create/save a new post.
   * POST posts
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request: { id }, response }) {
    console.log("> POST /posts");

    const { description, user_id } = request.body;

    const rules = {
      description: "required",
      userId: "required",
    };

    const validation = await validateAll(request.all(), rules);

    if (validation.fails()) {
      return response.status(409).json({
        message: "Fields Invalids",
      });
    }

    const post = new Post();

    post.description = description;
    post.user_id = user_id;

    await post.save();

    return response.status(201).json(post.toJSON());
  }

  /**
   * Display a single post.
   * GET posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {
    console.log("> GET /posts/:id");

    const user = await User.find(id);

    const post = (await user.post().fetch()).toJSON();

    // delete post.user_id;
    //
    // const userProfile = {
    //   ...user.toJSON(),
    //   post: post,
    // };

    return response.json(post);
  }

  /**
   * Render a form to update an existing post.
   * GET posts/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, response, view }) {}

  /**
   * Update post details.
   * PUT or PATCH posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params: { id }, request, response }) {
    console.log("> PUT /users/:id");

    const { description, user_id } = request.body;

    const post = await Post.find(id);

    post.description = description;
    post.user_id = user_id;

    await post.save();

    return response.json(post);
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params: { id }, request, response }) {
    const post = await Post.find(id);

    await post.delete();

    return response.json(post);
  }
}

module.exports = PostController;
