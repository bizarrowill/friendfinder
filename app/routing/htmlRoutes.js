//    Load Dependencies and packages

var path = require("path");


//          ROUTING

module.exports = function (app) {

  //  Routes - HTML GET Requests - below pages load on each 'visit'
  app.get("/survey", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/survey.html"));
  });

  //  Default route to home 
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

}