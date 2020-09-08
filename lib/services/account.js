const format = require('string-template');
const got = require('got');

class AccountServiceClient {
	/**
	 * Calls account::createAccountGrant
	 * Exchanges the accounts BAM Identity token for an account token
	 * @async
	*/
	async createAccountGrant() {
		const serviceData = this.services.account.client.endpoints.createAccountGrant;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });

		const data = await got.post(serviceData.href, {
			headers,
			body: JSON.stringify({ id_token: this.tokens.identity })
		}).json();

		// TODO: Error check

		this.tokens.account = data.assertion;
	}

	/**
	 * Calls account::getUserProfiles
	 * Gets the current list of account profiles
	 * @returns {Array} List of profiles on the account
	 * @async
	*/
	async getUserProfiles() {
		const serviceData = this.services.account.client.endpoints.getUserProfiles;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });

		const profileList = await got(serviceData.href, { headers }).json();

		// TODO: Error check

		return profileList;
	}

	/**
	 * Calls account::getActiveUserProfile
	 * Gets the current list of account profilesactive user profile
	 * @returns {Object} Active user profile
	 * @async
	*/
	async getActiveUserProfile() {
		const serviceData = this.services.account.client.endpoints.getActiveUserProfile;
		const headers = Object.assign(this.commonHeaders, serviceData.headers);

		headers.Authorization = format(headers.Authorization, { accessToken: this.tokens.access });

		const activeProfile = await got(serviceData.href, { headers }).json();

		// TODO: Error check

		return activeProfile;
	}
}

module.exports = AccountServiceClient;