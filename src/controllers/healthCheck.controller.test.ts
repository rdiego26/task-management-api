import HealthCheckController from './healthCheck.controller';
import * as path from 'path';
/* tslint:disable no-var-requires */
const { name, version } = require(path.resolve('./package.json'));

describe('HealthCheckController', () => {
	test('should return health check message', async () => {
		const controller = new HealthCheckController();
		const response = await controller.getData();

		expect(response.name).toBe(name);
		expect(response.version).toBe(version);
	});
});
