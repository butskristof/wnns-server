const secrets = require("./secrets");

module.exports = function(tokenString) {
	return tokenString === `Bearer ${secrets["token"]}`;
};

