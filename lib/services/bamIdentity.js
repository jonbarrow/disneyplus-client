const format = require('string-template');
const got = require('got');

class BAMIdentityServiceClient {
	/**
	 * Calls bamIdentity::check
	 * Checks what operations the account can make
	 * @param {string} email - Account email address
	 * @returns {Array} List of operations the account can make
	 * @async
	*/
	async check(email) {
		const serviceData = this.services.bamIdentity.client.endpoints.check;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });

		const data = await got.post(serviceData.href, {
			headers,
			body: JSON.stringify({ email })
		}).json();

		// TODO: Error check

		return data.operations;
	}

	/**
	 * Calls bamIdentity::identityLogin
	 * Authenticates a user and returns a BAM ID token. Token needs to be exchanged for an OAuth token
	 * @param {string} email - Account email address
	 * @param {string} password - Account password
	 * @async
	*/
	async identityLogin(email, password) {
		const serviceData = this.services.bamIdentity.client.endpoints.identityLogin;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });

		const data = await got.post(serviceData.href, {
			headers,
			body: JSON.stringify({ email, password })
		}).json();

		// TODO: Error check

		this.tokens.identity = data.id_token;
	}
}

module.exports = BAMIdentityServiceClient;