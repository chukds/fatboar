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

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route.group(() => {
  Route.get("/", "AdminController.showAdminHome").as("admin-home");
  Route.get("/stats", "AdminController.showAdminStats").as("admin-stats");
  Route.post("/tickets", "AdminController.userParticipation")
    .validator("FindUser")
    .as("admin.find.participation");
  Route.post("/champ", "AdminController.makeChamp").as("admin.make.champ");
  Route.post("/champ/trouver", "AdminController.findChamp").as(
    "admin.find.champ"
  );
  Route.post("/users/download", "AdminController.exportUsers").as(
    "admin.users.export"
  );
})
  .prefix("compte/admin")
  .middleware(["auth", "admin"]);

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

// Register user test route without captcha
Route.post("enrol", "AuthController.enrol");

// Register user
Route.post("register", "AuthController.register")
  .validator("Register")
  .middleware(["guest"])
  .as("register");

// Login user
Route.post("login", "AuthController.login")
  .validator("Login")
  .middleware(["guest"])
  .as("login");

// Logout user
Route.get("logout", "AuthController.logout").as("logout");

/*
|--------------------------------------------------------------------------
| Password Reset Routes
|--------------------------------------------------------------------------
*/

// Send password reset link
Route.post("password/email", "PasswordResetController.sendLinkReset")
  .validator("SendLink")
  .middleware(["guest"])
  .as("password.email");

// Show reset password page
Route.get(
  "password/reset/:token",
  "PasswordResetController.showPasswordReset"
).middleware(["guest"]);

// Send password reset confirmation
Route.post("password/reset", "PasswordResetController.sendPasswordConfirmation")
  .validator("PasswordReset")
  .as("password.reset");

/*
|--------------------------------------------------------------------------
| Static Routes
|--------------------------------------------------------------------------
*/

// Show home page
Route.on("/").render("home").as("home");

// Show staff home page
Route.on("compte/equipe")
  .render("staff.staff_home")
  .middleware(["staff"])
  .as("staff-home");

// Show user home page
Route.on("compte/client")
  .render("user.user_home")
  .middleware(["user"])
  .as("user-home");

// Show consent page
Route.on("consent").render("consent");
// Show contact page
Route.on("contact").render("contact").middleware(["guest"]);

// Show login page
// might cause error because of auth middleware !
Route.on("login").render("auth.login").middleware(["guest"]);

// Show register page
Route.on("register").render("auth.register").middleware(["guest"]);

// Show password reset request page
Route.on("password/reset").render("password.email").middleware(["guest"]);

// Show CGU page
Route.on("cgu").render("cgu");

// Show FAQ page
Route.on("faq").render("faq");

// Show legal page
Route.on("legales").render("legal");

// Show privacy page
Route.on("politique").render("privacy");

// Show prize page
Route.on("prix").render("user.user_prize").as("prize");

// Show dahome page
Route.on("dahome").render("dahome");

/*
|--------------------------------------------------------------------------
| Social Authentication Routes
|--------------------------------------------------------------------------
*/

// Get social login
Route.get("/auth/:provider", "SocialAuthController.redirectToProvider").as(
  "social.login"
);

// Social login callback
Route.get(
  // "/auth/:provider/callback",
  "/authenticated/:provider",
  "SocialAuthController.handleProviderCallback"
);

// Send consent information
Route.post("check", "SocialAuthController.checkConsent");

/*
|--------------------------------------------------------------------------
| Staff Routes
|--------------------------------------------------------------------------
*/

Route.group(() => {
  Route.post("/tickets", "StaffController.findCoupons")
    .validator("FindCoupon")
    .as("staff.find.coupons");
  Route.post("/tickets/:id", "StaffController.couponActivate");
})
  .prefix("compte/equipe")
  .middleware(["auth", "staff"]);
/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

Route.group(() => {
  Route.post("/tickets/ajouter", "UserController.addCoupon")
    .validator("AddCoupon")
    .as("user.addCoupon");
  Route.get("/tickets", "UserController.userCoupons").as("user-tickets");
})
  .prefix("compte/client")
  .middleware(["auth", "user"]);

/*
|--------------------------------------------------------------------------
| Miscellanous Routes
|--------------------------------------------------------------------------
*/
// Send contact message
Route.post("contact", "RouteController.secureMessage").validator("Message");
// Route.post("contact", "RouteController.sendMessage").validator("Message");
