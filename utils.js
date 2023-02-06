// Import this to use the functions
// const utils = require("../utils.js");

const humanizeDuration = require("humanize-duration");

exports.isStaff = (client, input) => {
  const allowedRoles = client.config.staffrole;
  return input.member.roles.cache.some(role => allowedRoles.includes(role.name))
}

exports.formatCooldown = (cooldown) => {
  return humanizeDuration(cooldown - Date.now(),
        { conjunction: " and ", serialComma: false, round: true });
}

exports.updateServerStats = (client) => {
  const memberCountChannel = client.channels.cache.get("961597579659993118");
  const userCountChannel = client.channels.cache.get("961596912669179955");
  const botCountChannel = client.channels.cache.get("961597495878750208");
  const guild = client.guilds.cache.get(client.config.guildId);
  
  const memberCount = guild.memberCount;
  const botCount = client.config.botCount;
  const userCount = memberCount - botCount;

  memberCountChannel.setName(`Member Count: ${memberCount}`);
  userCountChannel.setName(`User Count: ${userCount}`);
  botCountChannel.setName(`Bot Count: ${botCount}`);
}