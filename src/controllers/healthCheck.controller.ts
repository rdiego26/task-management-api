import path from "path";
import { Get, Route } from "tsoa";
const { name, version } = require(path.resolve("./package.json"));

export interface HealthCheckResponse {
    name: string;
    version: string;
}

@Route("/healthCheck")
export default class HealthCheckController {
    @Get("/")
    public async getData(): Promise<HealthCheckResponse> {
        return {
            name,
            version,
        }
    }
}
