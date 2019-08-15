const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({extended: true}));

// initialise array with relay values, initially all are off
const relayDetails = require("./config/relayDetails");
const relays = {};
// loop through 0-7 and initialise with 0
[...Array(relayDetails.numberOfRelays).keys()].forEach(k => {
	relays[k] = relayDetails.initValue;
});

require("./app/routes")(app, relays);

app.listen(port, () => {
	console.log(`Server running on port ${port}.`)
});