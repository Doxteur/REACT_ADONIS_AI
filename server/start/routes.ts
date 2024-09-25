import Route from "@ioc:Adonis/Core/Route";
import AutoSwagger from "adonis-autoswagger";
import swagger from "Config/swagger";
import HealthCheck from "@ioc:Adonis/Core/HealthCheck";

Route.group(() => {
  // Groupe de routes authentifiées
  Route.group(() => {
    Route.get("/", "UsersController.index").as("users.index");
  }).middleware("auth");

  // Routes d'authentification
  Route.group(() => {
    Route.post("/login", "AuthController.login").as("auth.login");
    Route.post("/logout", "AuthController.logout").as("auth.logout");
    Route.get("/me", "AuthController.me").as("auth.me");
    Route.post("/register", "AuthController.register").as("auth.register");
  }).prefix("/auth");

  // Routes pour les orders
  Route.group(() => {
    Route.get("/", "OrdersController.index").as("orders.index");
    Route.post("/", "OrdersController.store").as("orders.store");
    Route.get("/:id", "OrdersController.show").as("orders.show");
    Route.put("/:id", "OrdersController.update").as("orders.update");
    Route.delete("/:id", "OrdersController.destroy").as("orders.destroy");
  })
    .prefix("/orders")
    .middleware("auth");

  // Routes pour les paiements
  Route.group(() => {
    Route.post("/process-payment", "PaymentsController.processPayment").as(
      "payments.processPayment"
    );
    Route.get(
      "/:paymentIntentId/status",
      "PaymentsController.checkPaymentStatus"
    ).as("payments.checkPaymentStatus");
    Route.post(
      "create-checkout-session",
      "PaymentsController.createCheckoutSession"
    );
  }).prefix("/payments");

  // Routes de documentation
  Route.get("/swagger", async () => {
    return AutoSwagger.docs(Route.toJSON(), swagger);
  });
  Route.get("/docs", async () => {
    return AutoSwagger.ui("/swagger", swagger);
  });

  Route.get("health", async ({ response }) => {
    const report = await HealthCheck.getReport();

    return report.healthy ? response.ok(report) : response.badRequest(report);
  });

  Route.get('/auth/google', 'GoogleAuthsController.redirect')
  Route.get('/auth/google/callback', 'GoogleAuthsController.callback')
  Route.post('/auth/google/login', 'GoogleAuthsController.loginFromClient')

}).prefix("/api");
