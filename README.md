# Disney+ Client
# Client for interacting with the Disney+ private API

## All information was acquired by reverse engineering the iOS version of Disney+ on an iPhone 8+ running iOS 14

# DISCLAIMER
## This product is not officially supported by Disney. This client acts like the real app just enough to work, it does not perfectly mimic how the real client works. Use at your own risk

# Does this stream content or rip stream URLs?
## No

# Usage

```js
require('dotenv').config()

const DisneyPlusClient = require('disneyplus-client');
const client = new DisneyPlusClient();

client.init();

client.on('ready', async () => {
	// Login the user as if we have never connected before
	// Normally you would reuse a refresh token

	await client.createDeviceGrant(); // Get device grant token
	await client.exchangeDeviceToken(); // Convert that token into an OAuth token (Disney+ requires an OAuth token even for logging in)
	await client.login(process.env.DISNEY_PLUS_EMAIL, process.env.DISNEY_PLUS_PASSWORD); // Login the user (this does more stuff under the hood)

	// Get the profiles for the current account
	const profiles = await client.getUserProfiles();
	console.log(profiles);
});
```