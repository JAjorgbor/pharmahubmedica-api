import express, { Router } from "express";

const router: Router = express.Router();

/* GET users listing. */
router.get("/:id", function (req, res, next) {
  res.send({
    message: "Test message",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
  });
});

export default router;
