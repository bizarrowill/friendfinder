var fs = require("fs");


module.exports = function(app, path) {
    
  //  Routes

  //   show all match potentials
    app.get("/api/friends", function(req, res) {
      fs.readFile("app/data/friends.js", "utf8", function(err, data) {
			if (err) {
				return console.log(err);
			}

			else {
				res.json(JSON.parse(data));
			}
		});
	});
    
  //    save answers and return closest match 
    app.post("/api/friends", function(req, res) {
      //    closest match response
      var returnMatch = [];

      //    response object
      var postResponse = JASON.stringify(req.body);

        fs.readFile("app/data/friends.js", function(err, data) {
          // Read the existing array
          var friendFile = JSON.parse(data);

          // Store the difference in values
          var closestMatch = 0;
          var matchScore = 9999;

          // Loop through the file to find the closest match
            for (var i = 0; i < friendFile.length; i++) {
              var spaceBetween = 0;
              for (var j = 0; j < friendFile[i]["answers[]"].length; j++) {
                spaceBetween += Math.abs(parseInt(req.body["answers[]"][j]) - parseInt(friendFile[i]["answers[]"][j]));
              }

              // update the closestMatch if value between current are less than previous match
              if (spaceBetween <= matchScore) {
                matchScore = spaceBetween;
                closestMatch = i;
              }
            }

          returnMatch.push(friendFile[closestMatch]);

          // add new person to the friends array
          friendFile.push(JSON.parse(postResponse));

          // Push the updated result 
          fs.writeFile("app/data/friends.js", JSON.stringify(friendFile));
          res.send(returnMatch[0]);
        });
    });
}