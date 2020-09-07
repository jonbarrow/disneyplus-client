const format = require('string-template');
const got = require('got');
const querystring = require('querystring');

const variables = require('../variables');
const tokenExchangeTypes = require('../tokenExchangeTypes');

class TokenServiceClient {
	/**
	 * Calls token::exchange
	 * Exchanges a given token for an OAuth token
	 * @param {string} token - Token being exchanged
	 * @param {string} type - The token type
	 * @async
	*/
	async exchange(token, type) {
		const serviceData = this.services.token.client.endpoints.exchange;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { apiKey: variables.API_KEY });

		const postBody = {};

		// TODO: This endpoint also supports refresh tokens, need to add those
		switch (type) {
			case tokenExchangeTypes.token.DEVICE:
			case tokenExchangeTypes.token.ACCOUNT:
				postBody.subject_token = token;
				postBody.subject_token_type = type;
				postBody.platform = variables.DEVICE_PROFILE;
				postBody.grant_type = 'urn:ietf:params:oauth:grant-type:token-exchange';
				break;

			default:
				break;
		}

		const data = await got.post(serviceData.href, {
			headers,
			body: querystring.stringify(postBody)
		}).json();

		// TODO: Error check

		this.tokens.access = data.access_token;
		this.tokens.refresh = data.refresh_token;
	}
}

module.exports = TokenServiceClient;