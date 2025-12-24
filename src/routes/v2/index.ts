import swaggerDef from "@/docs/v2/swagger-def.js";
import testRoute from "@/routes/v2/test.js";
import usersRoute from "@/routes/v2/user.route.js";
import express, { Router } from "express";
import swaggerUi from "swagger-ui-express";
import adminCategoryRoute from "@/routes/v2/admin.category.route.js";

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
    path: "/admin/categories",
    route: adminCategoryRoute,
  },
];

defaultRoutes.forEach((route) => router.use(route.path, route.route));

router.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDef));

export default router;
