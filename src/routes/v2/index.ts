import { createSwaggerSpec } from "@/docs/v2/swagger-def.js";
import adminAuthRoute from "@/routes/v2/admin.auth.route.js";
import adminCategoryRoute from "@/routes/v2/admin.category.route.js";
import adminProductRoute from "@/routes/v2/admin.product.route.js";
import adminTeamRoute from "@/routes/v2/admin.team.route.js";
import adminUserRoute from "@/routes/v2/admin.user.route.js";
import testRoute from "@/routes/v2/test.js";
import usersRoute from "@/routes/v2/user.route.js";
import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";

const router: Router = express.Router();

const defaultRoutes = [
  {
    path: "/test",
    route: testRoute,
  },
  {
    path: "/users",
    route: usersRoute,
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
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

router.use("/docs", swaggerUi.serve, (req: any, res: any, next: any) =>
  swaggerUi.setup(createSwaggerSpec())(req, res, next)
);

export default router;
