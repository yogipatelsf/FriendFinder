var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var data = express();
var PORT = 3030;

// BodyParser makes it easy for our server to interpret data sent to it.
// The code below is pretty standard.
data.use(bodyParser.json());
data.use(bodyParser.urlencoded({extended: true}));








// ================================================================================
// ROUTER
// The below points our server to a series of "route" files.
// These routes give our server a "map" of how to respond when users visit or request data from various URLs.
// ================================================================================

require('./app/routing/apiRoutes.js')(data);
require('./app/routing/htmlRoutes.js')(data);








// ==============================================================================
// LISTENER
// The below code effectively "starts" our server
// ==============================================================================

data.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});

