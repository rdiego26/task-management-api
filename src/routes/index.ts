import express from "express";
import HealthCheckController from "../controllers/healthCheck";

const router = express.Router();

router.get("/healthCheck", async (_req, res) => {
   const controller = new HealthCheckController();
   const response = await controller.getData();

   return res.send(response);
});

export default router;
