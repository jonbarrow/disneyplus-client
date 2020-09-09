const EventEmitter = require('events');
const format = require('string-template');
const MultiClass = require('extends-classes');

const getServices = require('./getServices');
const devices = require('./devices');
const tokenExchangeTypes = require('./tokenExchangeTypes');

const DeviceServiceClient = require('./services/device');
const TokenServiceClient = require('./services/token');
const BAMIdentityServiceClient = require('./services/bamIdentity');
const AccountServiceClient = require('./services/account');
const ContentServiceClient = require('./services/content');

const EXTENDED_CLASSES = [
	// Generic classes
	EventEmitter,

	// Service classes
	DeviceServiceClient, TokenServiceClient, BAMIdentityServiceClient, AccountServiceClient, ContentServiceClient
]

class DisneyPlusClient extends MultiClass(...EXTENDED_CLASSES) {
	constructor() {
		super();

		this.initialized = false;
		this.services = {};
		this.commonHeaders = {};
		this.device = null;

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

		// Default to iOS client since that's the client I am reverse engineering
		this.setClientDeviceiOS();

		this.initialized = true;

		this.emit('ready');
	}

	/**
	 * Sets the clients current device type to be iOS
	*/
	setClientDeviceiOS() {
		this.device = devices.IOS;

		this.commonHeaders['X-BAMSDK-Platform'] = format(this.commonHeaders['X-BAMSDK-Platform'], { SDKPlatform: devices.IOS.BAMSDK_PLATFORM });
		this.commonHeaders['X-BAMSDK-Version'] = format(this.commonHeaders['X-BAMSDK-Version'], { SDKVersion: devices.IOS.BAMSDK_VERSION });
	}

	/**
	 * Sets the clients current device type to be Chrome (on Linux)
	*/
	setClientDeviceChrome() {
		this.device = devices.CHROME_LINUX;

		this.commonHeaders['X-BAMSDK-Platform'] = format(this.commonHeaders['X-BAMSDK-Platform'], { SDKPlatform: devices.CHROME_LINUX.BAMSDK_PLATFORM });
		this.commonHeaders['X-BAMSDK-Version'] = format(this.commonHeaders['X-BAMSDK-Version'], { SDKVersion: devices.CHROME_LINUX.BAMSDK_VERSION });
	}

	/**
	 * Exchanges a refresh token for an OAuth token
	 * @async
	*/
	async exchangeRefreshToken(token) {
		await this.exchange(token, 'refresh');
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

	async search(query) {
		return await this.searchPersisted({
			q: query,
			index: 'disney_global',
			preferredLanguage: ['en'] // TODO: Other languages?
		});
	}
}

module.exports = DisneyPlusClient;