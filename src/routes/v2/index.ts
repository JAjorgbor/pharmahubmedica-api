import { createSwaggerSpec } from "@/docs/v2/swagger-def.js";
import adminAuthRoute from "@/routes/v2/admin.auth.route.js";
import adminCategoryRoute from "@/routes/v2/admin.category.route.js";
import adminCustomerRoute from "@/routes/v2/admin.customer.route.js";
import adminDeliveryMethodRoute from "@/routes/v2/admin.delivery-method.route.js";
import adminOrderRoute from "@/routes/v2/admin.order.route.js";
import adminProductRoute from "@/routes/v2/admin.product.route.js";
import adminReferralPartnerRoute from "@/routes/v2/admin.referral-partner.route.js";
import adminTeamRoute from "@/routes/v2/admin.team.route.js";
import adminUserRoute from "@/routes/v2/admin.user.route.js";
import appRoute from "@/routes/v2/app.route.js";
import categoryRoute from "@/routes/v2/category.route.js";
import deliveryMethodRoute from "@/routes/v2/delivery-method.route.js";
import portalAuthRoute from "@/routes/v2/portal.auth.route.js";
import portalDeliveryAddressRoute from "@/routes/v2/portal.delivery-address.route.js";
import portalOrderRoute from "@/routes/v2/portal.order.route.js";
import portalReferralPartnerRoute from "@/routes/v2/portal.referral-partner.route.js";
import portalUserRoute from "@/routes/v2/portal.user.route.js";
import productRoute from "@/routes/v2/product.route.js";
import testRoute from "@/routes/v2/test.js";
import adminBankRoute from "@/routes/v2/admin.bank.route.js";
import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import portalBankRoute from "@/routes/v2/portal.bank.route.js";

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/app",
    route: appRoute,
  },
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/products",
    route: productRoute,
  },
  {
    path: "/categories",
    route: categoryRoute,
  },
  {
    path: "/delivery-methods",
    route: deliveryMethodRoute,
  },
  {
    path: "/portal/auth",
    route: portalAuthRoute,
  },
  {
    path: "/portal/users",
    route: portalUserRoute,
  },
  {
    path: "/portal/referral-partners",
    route: portalReferralPartnerRoute,
  },
  {
    path: "/portal/delivery-address",
    route: portalDeliveryAddressRoute,
  },
  {
    path: "/portal/orders",
    route: portalOrderRoute,
  },
  {
    path: "/portal/banks",
    route: portalBankRoute,
  },
  // ADMIN ROUTES
  {
    path: "/admin/auth",
    route: adminAuthRoute,
  },
  {
    path: "/admin/users",
    route: adminUserRoute,
  },
  {
    path: "/admin/banks",
    route: adminBankRoute,
  },
  {
    path: "/admin/customers",
    route: adminCustomerRoute,
  },
  {
    path: "/admin/categories",
    route: adminCategoryRoute,
  },
  {
    path: "/admin/products",
    route: adminProductRoute,
  },
  {
    path: "/admin/team",
    route: adminTeamRoute,
  },
  {
    path: "/admin/referral-partners",
    route: adminReferralPartnerRoute,
  },
  {
    path: "/admin/delivery-methods",
    route: adminDeliveryMethodRoute,
  },
  {
    path: "/admin/orders",
    route: adminOrderRoute,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

// router.use("/docs", swaggerUi.serve, (req: any, res: any, next: any) =>
//   swaggerUi.setup(createSwaggerSpec())(req, res, next),
// );

const isNetlify = process.env.NETLIFY === "true";

// Always expose the raw Swagger spec
router.get("/swagger.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(createSwaggerSpec());
});

if (!isNetlify) {
  // Local development → swagger-ui-express
  router.use("/docs", swaggerUi.serve);

  router.get("/docs", (req, res, next) => {
    return swaggerUi.setup(createSwaggerSpec())(req, res, next);
  });
} else {
  // Netlify production → CDN Swagger UI
  router.get("/docs", (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>API Docs</title>
          <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
        </head>
        <body>
          <div id="swagger-ui"></div>

          <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
          <script>
            SwaggerUIBundle({
              url: '/.netlify/functions/api/v2/swagger.json',
              dom_id: '#swagger-ui'
            });
          </script>
        </body>
      </html>
    `);
  });
}

export default router;
