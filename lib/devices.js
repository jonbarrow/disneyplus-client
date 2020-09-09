const { v4 } = require('uuid');

module.exports = {
	IOS: {
		BAMSDK_PLATFORM: 'iPhone10,2',
		BAMSDK_VERSION: '9.10.0',

		// TODO: what is this? First part decodes to "disney&apple&1.0.0"
		API_KEY: 'ZGlzbmV5JmFwcGxlJjEuMC4w.H9L7eJvc2oPYwDgmkoar6HzhBJRuUUzt_PcaC3utBI4',

		RUNTIME: 'ios',
		DEVICE_FAMILY: 'apple',
		DEVICE_PROFILE: 'iphone',

		ATTRIBUTES: {
			manufacturer: 'apple',
			model: 'iPhone10,2',
			operatingSystem: 'iOS',
			operatingSystemVersion: '14.0',
			osDeviceIds: [
				{
					identifier: v4(),
					type: 'apple.vendor.id'
				}
			]
		}
	},

	CHROME_LINUX: {
		BAMSDK_PLATFORM: 'linux',
		BAMSDK_VERSION: '4.11',

		// TODO: what is this? First part decodes to "disney&browser&1.0.0"
		API_KEY: 'ZGlzbmV5JmJyb3dzZXImMS4wLjA.Cu56AgSfBTDag5NiRA81oLHkDZfu5L3CKadnefEAY84',

		RUNTIME: 'chrome',
		DEVICE_FAMILY: 'browser',
		DEVICE_PROFILE: 'linux',

		ATTRIBUTES: {}
	},
}