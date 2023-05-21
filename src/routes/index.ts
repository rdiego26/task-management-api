import express from "express";
import UserRouter from "./user.router";
import HealthCheckRouter from "./healthCheck.router";

const router = express.Router();


router.use("/users", UserRouter);
router.use("/healthCheck", HealthCheckRouter);

export default router;
