const got = require('got');

const SERVICES_URL = 'https://bam-sdk-configs.bamgrid.com/bam-sdk/v2.0/disney-svod-3d9324fc/apple/v9.10.0/ios/iphone/prod.json';
let services;

async function getServices() {
	if (!services) {
		services = await got(SERVICES_URL).json();
	}

	return services;
}

module.exports = getServices;