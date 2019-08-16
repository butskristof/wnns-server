const relayDetails = require("../../config/relayDetails");

module.exports = function (app, appData) {
	// get all
	app.get("/relays", (req, res) => {
		res.send(appData.relays);
	});

	// get by id
	app.get("/relays/:relayId", (req, res) => {
		// check relayId
		if (isNaN(req.params.relayId) || req.params.relayId < 0 || req.params.relayId > (relayDetails.numberOfRelays - 1)) {
			return res
				.status(400) // bad request
				.send({
					message: "Invalid relay ID."
				});
		}

		let ret = {};
		ret[req.params.relayId] = appData.relays[req.params.relayId];
		res.send(ret);
	});

	// post by id
	// toggles current value for relay
	app.post("/relays/:relayId", (req, res) => { // no body, save bandwith
		// check relayId
		if (isNaN(req.params.relayId) || req.params.relayId < 0 || req.params.relayId > (relayDetails.numberOfRelays - 1)) {
			// return -> pipeline stops here
			return res
				.status(400) // bad request
				.send({
					message: "Invalid relay ID."
				});
		}

		appData.relays[req.params.relayId] = (appData.relays[req.params.relayId] + 1) % 2; // toggle between 0 and 1

		let ret = {};
		ret[req.params.relayId] = appData.relays[req.params.relayId];
		res.send(ret);
	});

	app.get("/pos", (req, res) => {
		res.send(appData.gpsData);
	});

	// post gps data
	app.post("/pos", (req, res) => {
		// TODO validation
		appData.gpsData = req.body;
		res.json(appData.gpsData);
	});
};