import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

// @ts-ignore
import * as swaggerDocument from "../public/swagger.json";

import Router from "./routes";

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument)
);

app.use(Router);

app.listen(PORT, () => {
    console.log("Server is running on port", PORT);
});
