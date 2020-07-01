"use strict";

const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const View = use("Adonis/Src/View");
  const Exception = use("Exception");
  const Env = use("Env");

  View.global("appUrl", (path) => {
    const APP_URL = Env.get("APP_URL");

    return path ? `${APP_URL}/${path}` : APP_URL;
  });

  View.global("encodeURIComponent", (token) => {
    return encodeURIComponent(token);
  });

  // handle `InvalidSessionException`
  Exception.handle("InvalidSessionException", (error, { response }) => {
    return response.redirect("/login");
  });
});
