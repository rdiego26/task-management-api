import "reflect-metadata";
import { createConnection, DataSource } from "typeorm";
import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

// @ts-ignore
import * as swaggerDocument from "../public/swagger.json";

import Router from "./routes";
import dbConfig from "./config/database";

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

const start = async () => {
    try {
        const dbConnection: DataSource = await createConnection(dbConfig);
        await dbConnection.synchronize(true);

        app.listen(PORT, () => {
            console.log("Server is running on port", PORT);
        });
    } catch (err: any) {
        console.log("Unable to connect to db", err);
        process.exit(1);
    }

};

void start();
