// Dependencies and packages

// load npm required packages
var express = require("express");
var bodyParser = require("body-parser");

// var path = require("path");
// var fs = require("fs");


// Setup Express & Heroku PORT settings
var app = express();
var PORT = process.env.PORT || 8080;

// Sets up the Express server to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
// place into json format
app.use(bodyParser.json());

// Setup the router to map the app
require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});