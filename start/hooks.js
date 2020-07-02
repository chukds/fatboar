"use strict";

const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const View = use("Adonis/Src/View");
  // const Exception = use("Exception");

  View.global("appUrl", (path) => {
    const Env = use("Env");

    const APP_URL = Env.get("APP_URL");

    return path ? `${APP_URL}/${path}` : APP_URL;
  });

  View.global("encodeURIComponent", (token) => {
    return encodeURIComponent(token);
  });

  //handle `Route not found`
  /*
  Exception.handle("HttpException", (error, { response }) => {
    return response.send(View.render("404"));
  });
  */
});
