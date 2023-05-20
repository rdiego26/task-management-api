import HealthCheckController from "./healthCheck";
// @ts-ignore
import path from "path";
const { name, version } = require(path.resolve("./package.json"));

test("should return health check message", async() => {
    const controller = new HealthCheckController();
    const response = await controller.getData();

    expect(response.name).toBe(name);
    expect(response.version).toBe(version);
});
