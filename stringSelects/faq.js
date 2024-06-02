const { EmbedBuilder } = require('discord.js');
const FAQ = require('../constant.js');

module.exports = {
	async execute(client, interaction) {
		const choice = interaction.values[0];

		let embed;
		switch (choice) {
		case FAQ.CONNECT_REGISTER.value:
			embed = createConnectRegisterEmbed();
			break;
		case FAQ.TWO_FA.value:
			embed = createTwoFAEmbed();
			break;
		case FAQ.PREMIUM.value:
			embed = createPremiumEmbed(client);
			break;
		case FAQ.RESET_PASSWORD.value:
			embed = createResetPasswordEmbed(client);
			break;
		case FAQ.LINK_DISCORD.value:
			embed = createLinkDiscordEmbed(client);
			break;
		default:
			console.error(`Invalid choice = ${choice}`);
			return;
		}
		return await interaction.reply({
			embeds: [embed],
			ephemeral: true,
		});
	},
};

function createConnectRegisterEmbed() {
	return new EmbedBuilder()
		.setTitle(FAQ.CONNECT_REGISTER.label)
		.setDescription(`
**How to connect to KCHS Craft?**
Step 1: Select **Multiplayer**
Step 2: Select **Add Server**
Step 3: Fill in the details as below:
**Server Name:** \`KCHS Craft\`
**Server Address:** \`play.kchscraft.net\`
Step 4: Press **Done**
Step 5: Select **KCHS Craft** in your server list and you are connected!

**How do I register as a new player?**
Step 1: Enter the captcha as shown in chat with \`/captcha <current captcha>\`
Step 2: Create your password using \`/register <password> <password>\`
Step 3: Your account is all set!

Tips: You are able to use \`/logout\` to log out your account from server!

Ps: Kindly remember **Alternate accounts are not allowed!**

**Video Guide**
https://youtu.be/17qbjeXOk3c
		`);
}

function createTwoFAEmbed() {
	return new EmbedBuilder()
		.setTitle(FAQ.TWO_FA.label)
		.setDescription(`
**What is 2FA?**
Two-factor Authentication (2FA) is a security process that adds an extra layer of protection to your accounts.

**Why 2FA?**
It can prevent others from logging into your account even if your password is guessed or hacked as they can't proceed without the 2FA code in your **Google Authenticator** app.

**How can I enable 2FA?**
Step 1: Download **Google Authenticator** on your phone using Apple Store / Play Store
Step 2: \`/2fa add\` in-game
Step 3: Click on the link that pops out in chat (A QR Code should appear.)
Step 4: Scan the QR code
Step 5: \`/2fa confirm <current 2fa code>\`

**What should I do if I can't scan the QR Code?**
Save the QR Code and open the image saved with a **white background**.

**How do I log in after I enabled 2FA?**
Step 1: \`/login <password>\`
Step 2: \`/2fa code <current 2fa code>\`

**How can I disable 2FA?**
Step 1: \`/2fa remove <current 2fa code>\`

**Video Guide**
https://youtu.be/sIqKb0QNcWU
		`);
}

function createPremiumEmbed(client) {
	return new EmbedBuilder()
		.setTitle(FAQ.PREMIUM.label)
		.setDescription(`
**What is auto log in?**
It allows premium users to join our server without typing their password.
If you are a premium user and wants to protect your account, feel free to enable this feature!

**How to enable auto log in?**
Step 1: Do \`/premium\` in the chat
Step 2: Do \`/premium\` again for confirmation on activating this feature

If your in-game name is that of a premium account but you do not own the account, you will **NOT** be able to join the server again.

**What should I do if I accidentally enabled this feature?**
You can try to communicate with our staff team by creating a ticket in <#${client.config.playersupport}>.

Ps: After enabling this feature, only Minecraft launched using **premium launcher** can join the server. This protects your account from other players that try join using your name.

**Video Guide**
https://youtu.be/Zkqp7A2oVWs
		`);
}

function createResetPasswordEmbed(client) {
	return new EmbedBuilder()
		.setTitle(FAQ.RESET_PASSWORD.label)
		.setDescription(`
**How to change your password?**
Step 1: Do \`/changepassword <old password> <new password>\` in the chat

**What should I do if I do not remember my password?**
You can create a ticket in <#${client.config.playersupport}> to seek help from our staff.
		`);
}

function createLinkDiscordEmbed(client) {
	return new EmbedBuilder()
		.setTitle(FAQ.LINK_DISCORD.label)
		.setDescription(`
**How can I link my Discord account with my in-game account?**
Have you ever wondered how a player can chat with you from Discord?
You can link your Discord account with your in-game account by following the steps below.

Step 1: Do \`/discord link\` in-game. A set of numbers will appear in the chat
Step 2: Private message the numbers to <@${client.config.kchscraftbot}> (you can find it at member list under the Bot section)
Step 3: You have successfully linked your account and will be able to use Discord in-game chat

**What should I do if I want to unlink my Discord account with my in-game account?**
You can create a ticket in <#${client.config.playersupport}> to seek help from our staff.

**Video Guide**
https://youtu.be/VEFfFWqnr3w
		`);
}
