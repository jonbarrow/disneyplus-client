const EventEmitter = require('events');
const format = require('string-template');
const MultiClass = require('extends-classes');

const getServices = require('./getServices');
const variables = require('./variables');
const tokenExchangeTypes = require('./tokenExchangeTypes');

const DeviceServiceClient = require('./services/device');
const TokenServiceClient = require('./services/token');
const BAMIdentityServiceClient = require('./services/bamIdentity');
const AccountServiceClient = require('./services/account');

const EXTENDED_CLASSES = [
	// Generic classes
	EventEmitter,

	// Service classes
	DeviceServiceClient, TokenServiceClient, BAMIdentityServiceClient, AccountServiceClient
]

class DisneyPlusClient extends MultiClass(...EXTENDED_CLASSES) {
	constructor() {
		super();

		this.initialized = false;
		this.services = {};
		this.commonHeaders = {};

		this.tokens = {
			device: null,
			identity: null,
			account: null,
			access: null,
			refresh: null
		}
	}

	/**
	 * Requests and sets up initial data needed before client operation
	 * @async
	*/
	async init() {
		const services = await getServices();

		this.services = services.services;
		this.commonHeaders = services.commonHeaders;
		this.commonHeaders['X-BAMSDK-Platform'] = format(this.commonHeaders['X-BAMSDK-Platform'], { SDKPlatform: variables.BAMSDK_PLATFORM });
		this.commonHeaders['X-BAMSDK-Version'] = format(this.commonHeaders['X-BAMSDK-Version'], { SDKVersion: variables.BAMSDK_VERSION });

		this.initialized = true;

		this.emit('ready');
	}

	/**
	 * Exchanges the clients current device token for an OAuth token
	 * @async
	*/
	async exchangeDeviceToken() {
		await this.exchange(this.tokens.device, tokenExchangeTypes.token.DEVICE);
	}

	/**
	 * Exchange the tokens and login the user
	 * @param {string} email - Account email
	 * @param {string} password - Account password
	 * @async
	*/
	async login(email, password) {
		const operations = await this.check(email);
		
		if (!operations.includes('Login')) {
			// Do something, the client most likely can't login
		}

		await this.identityLogin(email, password);
		await this.createAccountGrant();
		await this.exchange(this.tokens.account, tokenExchangeTypes.token.ACCOUNT);
	}
}

module.exports = DisneyPlusClient;