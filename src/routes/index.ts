import express from "express";
import LoginRouter from "./login.router";
import UserRouter from "./user.router";
import HealthCheckRouter from "./healthCheck.router";

const router = express.Router();


router.use("/login", LoginRouter);
router.use("/users", UserRouter);
router.use("/healthCheck", HealthCheckRouter);

export default router;
