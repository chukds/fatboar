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
| Account Routes
|--------------------------------------------------------------------------
*/
/*
Route.group(() => {
  Route.get("/account", "UserController.showEditAccount").as(
    "settings.account"
  );
  Route.put("/account", "UserController.updateAccount");
  Route.get("/password", "UserController.showChangePassword").as(
    "settings.password"
  );
  Route.put("/password", "UserController.updatePassword");
})
  .prefix("/settings")
  .middleware(["auth"]);
*/
/*
Route.on("/admin")
  .render("admin")
  .middleware(["auth", "admin"]);
*/

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Show admin page
/*Route.get("compte/admin", "CouponController.showAdminDashoard").as(
  "admin.dashboard"
);*/
// Show admin home page
Route.get("compte/admin", "AdminController.showAdminHome").as("admin-home");
Route.get("compte/admin/stats", "AdminController.showAdminStats").as(
  "admin-stats"
);
// Route.on("compte/admin/stats").render("admin.admin_stats").as("admin-stats");
// Route.on("compte/admin/stats").render("admin.admin_stats").as("admin-stats");
// Route.on("compte/admin").render("admin.admin_home").as("admin-home");

// Show user information
Route.post("compte/admin/tickets", "AdminController.userParticipation")
  .validator("FindUser")
  .as("admin.find.participation");

// Show user participation
Route.post("compte/admin/tickets", "AdminController.userParticipation")
  .validator("FindUser")
  .as("admin.find.participation");

// Generate winner
Route.post("compte/admin/champ", "AdminController.makeChamp").as(
  "admin.make.champ"
);

// Find winnner
Route.post("compte/admin/champ/trouver", "AdminController.findChamp").as(
  "admin.find.champ"
);

// Download users
Route.post("compte/admin/users/download", "AdminController.exportUsers").as(
  "admin.users.export"
);

//Show user information
/*Route.get("compte/admin/tickets", "AdminController.userParticipation").as(
  "user-participation"
);*/

// Show list of staff
// Show list of users

/*
|--------------------------------------------------------------------------
| Authentication Routes
|--------------------------------------------------------------------------
*/

/*
Route.get("register", "RegisterController.showRegister").middleware(["guest"]);
Route.get("login", "LoginController.showLogin").middleware(["guest"]);
*/

// Register user
Route.post("register", "AuthController.register")
  .validator("Register")
  .as("register");

// Login user
Route.post("login", "AuthController.login").validator("Login").as("login");

// Logout user
Route.get("logout", "AuthController.logout").as("logout");

/*
|--------------------------------------------------------------------------
| Demo Routes
|--------------------------------------------------------------------------
*/

Route.on("demo").render("demo.home");
Route.on("demo/contact").render("demo.contact");
Route.on("demo/consent").render("demo.consent");
Route.on("demo/dashboard").render("demo.dashboard");
Route.on("demo/login").render("demo.login");
Route.on("demo/register").render("demo.register");
Route.on("demo/search").render("demo.search");
Route.on("demo/tickets/add").render("demo.add-ticket");
Route.on("demo/staff/tickets/list").render("demo.list-tickets");
Route.on("demo/user").render("demo.user-home");
Route.on("demo/error").render("demo.error");
Route.on("demo/admin/home").render("demo.admin-home");
Route.on("demo/admin/stats").render("demo.admin-stats");

/*
|--------------------------------------------------------------------------
| Password Reset Routes
|--------------------------------------------------------------------------
*/

/*
Route.get(
  "password/reset",
  "PasswordResetController.showLinkRequestForm"
).middleware(["guest"]);
*/

// Show password reset request form

// Send password reset link
Route.post("password/email", "PasswordResetController.sendLinkReset")
  .validator("SendLink")
  .as("password.email");

/*
Route.get(
  "password/reset/:token",
  "PasswordResetController.showPasswordReset"
).middleware(["guest"]);
*/
// Show reset password page
Route.get("password/reset/:token", "PasswordResetController.showPasswordReset");

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
Route.on("compte/equipe").render("staff.staff_home").as("staff-home");

// Show user home page
Route.on("compte/client").render("user.user_home").as("user-home");

// Show consent page
Route.on("consent").render("consent");

// Show contact page
Route.on("contact").render("contact");

// Show login page
Route.on("login").render("auth.login");

// Show register page
Route.on("register").render("auth.register");

// Show password reset request page
Route.on("password/reset").render("password.email");

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

/*
|--------------------------------------------------------------------------
| Staff Routes
|--------------------------------------------------------------------------
*/
// Find user coupons
Route.post("compte/equipe/tickets", "StaffController.findCoupons")
  .validator("FindCoupon")
  .as("staff.find.coupons");

// Activate user coupon
Route.post("compte/equipe/tickets/:id", "StaffController.couponActivate");

/*
|--------------------------------------------------------------------------
| User Routes
|--------------------------------------------------------------------------
*/

// Add user coupon
Route.post("compte/client/tickets/ajouter", "UserController.addCoupon")
  .validator("AddCoupon")
  .as("user.addCoupon");

// Show user coupons
Route.get("compte/client/tickets", "UserController.userCoupons").as(
  "user-tickets"
);

/*
|--------------------------------------------------------------------------
| Miscellanous Routes
|--------------------------------------------------------------------------
*/

// Send consent information
Route.post("check", "RouteController.consentCheck");

// Send contact information
Route.post("contact", "RouteController.sendMessage").validator("Message");

// Route.get("errors", "RouteController.sendError");
