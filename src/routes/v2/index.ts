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
import portalReferralPartnerRoute from "@/routes/v2/portal.referral-partner.route.js";
import portalDeliveryAddressRoute from "@/routes/v2/portal.delivery-address.route.js";
import portalOrderRoute from "@/routes/v2/portal.order.route.js";
import adminOrderRoute from "@/routes/v2/admin.order.route.js";
import portalUserRoute from "@/routes/v2/portal.user.route.js";
import productRoute from "@/routes/v2/product.route.js";
import adminDeliveryMethodRoute from "@/routes/v2/admin.delivery-method.route.js";
import deliveryMethodRoute from "@/routes/v2/delivery-method.route.js";
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

router.use("/docs", swaggerUi.serve, (req: any, res: any, next: any) =>
  swaggerUi.setup(createSwaggerSpec())(req, res, next),
);

export default router;
