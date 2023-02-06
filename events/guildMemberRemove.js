const utils = require("../utils.js");

module.exports = (client, member) => {
  utils.updateServerStats(client);
};