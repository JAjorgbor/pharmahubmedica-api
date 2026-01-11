import { createSwaggerSpec } from "@/docs/v2/swagger-def.js";
import adminAuthRoute from "@/routes/v2/admin.auth.route.js";
import adminCategoryRoute from "@/routes/v2/admin.category.route.js";
import adminProductRoute from "@/routes/v2/admin.product.route.js";
import adminCustomerRoute from "@/routes/v2/admin.customer.route.js";
import adminTeamRoute from "@/routes/v2/admin.team.route.js";
import adminUserRoute from "@/routes/v2/admin.user.route.js";
import categoryRoute from "@/routes/v2/category.route.js";
import portalAuthRoute from "@/routes/v2/portal.auth.route.js";
import adminReferralPartnerRoute from "@/routes/v2/admin.referral-partner.route.js";
import portalReferralRoute from "@/routes/v2/portal.referral.route.js";
import productRoute from "@/routes/v2/product.route.js";
import testRoute from "@/routes/v2/test.js";
import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";

const router: Router = express.Router();

const defaultRoutes = [
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
    path: "/portal/auth",
    route: portalAuthRoute,
  },
  {
    path: "/portal/referrals",
    route: portalReferralRoute,
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
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

router.use("/docs", swaggerUi.serve, (req: any, res: any, next: any) =>
  swaggerUi.setup(createSwaggerSpec())(req, res, next)
);

export default router;
