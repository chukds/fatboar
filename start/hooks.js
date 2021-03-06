"use strict";

const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const Env = use("Env");
  const View = use("Adonis/Src/View");
  // const Exception = use("Exception");

  View.global("appUrl", (path) => {
    const APP_URL = Env.get("APP_URL");

    return path ? `${APP_URL}/${path}` : APP_URL;
  });

  View.global("encodeURIComponent", (token) => {
    return encodeURIComponent(token);
  });

  View.global("rckey", function () {
    return Env.get("RECAPTCHA_KEY");
  });
});
