const express = require("express");
const bodyParser = require("body-parser");

const checkToken = require("./auth/auth");

const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const appData = {
	relays: [],
	gpsData: {
		lat: 0,
		long: 0,
		speed: 0 // kph
	}
};

// initialise array with relay values, initially all are off
const relayDetails = require("./config/relayDetails");
// loop through 0-7 and initialise with 0
[...Array(relayDetails.numberOfRelays).keys()].forEach(k => {
	appData.relays[k] = relayDetails.initValue;
});

app.use((req, res, next) => {
	if (checkToken(req.headers['authorization'])) {
		next();
	} else {
		return res
			.status(401)
			.send();
	}
});

require("./app/routes")(app, appData);

app.listen(port, () => {
	console.log(`Server running on port ${port}.`)
});