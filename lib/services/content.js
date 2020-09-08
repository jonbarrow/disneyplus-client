const format = require('string-template');
const got = require('got');

class ContentServiceClient {
	/**
	 * Calls content::searchPersisted
	 * Searches for media
	 * @param {Object} options - Search params
	 * @returns {Object} Disney search results
	 * @async
	*/
	async searchPersisted(options) {
		const serviceData = this.services.content.client.endpoints.searchPersisted;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });
		serviceData.href = format(serviceData.href, { queryId: `core/disneysearch?variables=${JSON.stringify(options)}` });

		const data = await got(serviceData.href, { headers }).json();

		// TODO: Error check

		return data.data.disneysearch;
	}
}

module.exports = ContentServiceClient;