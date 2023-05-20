import { ConnectionOptions } from "typeorm";
import { User } from "../entities/User";

const config: ConnectionOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
  insecureAuth: true,
};

export default config;
