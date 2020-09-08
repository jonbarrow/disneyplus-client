require('dotenv').config()

const DisneyPlusClient = require('..');
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

	const activeProfile = await client.getActiveUserProfile();
	console.log(activeProfile);
});