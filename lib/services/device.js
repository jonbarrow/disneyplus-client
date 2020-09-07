const format = require('string-template');
const got = require('got');
const variables = require('../variables');

class DeviceServiceClient {
	/**
	 * Calls device::createDeviceGrant
	 * Exchanges the clients current device token for an unauthenticated OAuth token
	 * @async
	*/
	async createDeviceGrant() {
		const serviceData = this.services.device.client.endpoints.createDeviceGrant;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { apiKey: variables.API_KEY });

		const data = await got.post(serviceData.href, {
			headers,
			body: JSON.stringify({
				applicationRuntime: variables.OS_RUNTIME,
				attributes: {
					manufacturer: variables.DEVICE_MANUFACTURER,
					model: variables.BAMSDK_PLATFORM,
					operatingSystem: variables.OS,
					operatingSystemVersion: variables.OS_VERSION,
					osDeviceIds: [
						{
							identifier: variables.OS_IDENTIFIER,
							type: variables.OS_IDENTIFIER_TYPE
						}
					]
				},
				deviceFamily: variables.DEVICE_MANUFACTURER,
				deviceProfile: variables.DEVICE_PROFILE
			})
		}).json();

		this.tokens.device = data.assertion;
	}
}

module.exports = DeviceServiceClient;