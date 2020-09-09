const format = require('string-template');
const got = require('got');

class DeviceServiceClient {
	/**
	 * Calls device::createDeviceGrant
	 * Exchanges the clients current device token for an unauthenticated OAuth token
	 * @async
	*/
	async createDeviceGrant() {
		const serviceData = this.services.device.client.endpoints.createDeviceGrant;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { apiKey: this.device.API_KEY });

		const data = await got.post(serviceData.href, {
			headers,
			body: JSON.stringify({
				applicationRuntime: this.device.RUNTIME,
				attributes: this.device.ATTRIBUTES,
				deviceFamily: this.device.DEVICE_FAMILY,
				deviceProfile: this.device.DEVICE_PROFILE
			})
		}).json();

		this.tokens.device = data.assertion;
	}
}

module.exports = DeviceServiceClient;