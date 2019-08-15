const wnnsRoutes = require("./wnns_routes");
module.exports = function (app, relays) {
	wnnsRoutes(app, relays);
};