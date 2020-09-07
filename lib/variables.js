const { v4 } = require('uuid');

module.exports = {
	BAMSDK_PLATFORM: 'iPhone10,2',
	BAMSDK_VERSION: '9.10.0',

	API_KEY: 'ZGlzbmV5JmFwcGxlJjEuMC4w.H9L7eJvc2oPYwDgmkoar6HzhBJRuUUzt_PcaC3utBI4', // TODO: what is this? First part decodes to "disney&apple&1.0.0"

	DEVICE_MANUFACTURER: 'apple',
	DEVICE_PROFILE: 'iphone',
	OS: 'iOS',
	OS_RUNTIME: 'ios',
	OS_VERSION: '14.0',
	OS_IDENTIFIER: v4(),
	OS_IDENTIFIER_TYPE: 'apple.vendor.id',
}