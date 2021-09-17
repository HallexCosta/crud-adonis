"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

// Route.on("/").render("welcome");
Route.get("/users", "UserController.index");
Route.get("/users/posts", "UserController.indexPosts");
Route.get("/users/posts/:id", "UserController.showPosts");
Route.get("/users/:id", "UserController.show");
Route.post("/users", "UserController.store");
Route.put("/users/:id", "UserController.update");
Route.delete("/users/:id", "UserController.destroy");

Route.get("/profiles", "ProfileController.index");
Route.get("/profiles/users", "ProfileController.indexUser");
Route.get("/profiles/users/:id", "ProfileController.showUser");
Route.get("/profiles/:id", "ProfileController.show");
Route.post("/profiles", "ProfileController.store");
Route.put("/profiles/:id", "ProfileController.update");
Route.delete("/profiles/:id", "ProfileController.destroy");

Route.get("/posts", "PostController.index");
Route.get("/posts/:id", "PostController.show");
Route.post("/posts", "PostController.store");
Route.put("/posts/:id", "PostController.update");
Route.delete("/posts/:id", "PostController.destroy");
