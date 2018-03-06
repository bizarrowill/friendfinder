//   load in routes to our data to power the app

var friends = require('../data/friends.js');

// const friendsList = JSON.parse(JSON.stringify(friends));
// console.log(friendsList.friends);
// friendsList = friendsList.friends;


//-----------Routes

module.exports = function (app) {


  //   show all match potentials - API GET Request
  app.get("/api/friends", function (req, res) {
    // this will load when user first hits page
    res.json(friends);
  });

  //    save answers on submit and return closest match - API POST Request
  app.post("/api/friends", function (req, res) {
    //    in this section our server will take the user survey results then
    //    compare with our database to return the best 'match' by calculating
    //    an overall difference rating numbers. Then the user will become part of database

    // Object to hold the 'best match' -- will update constantly while looping options
    var bestMatch = {
      name: "",
      photo: "",
      friendDifference: Infinity
    };

    // Parse results of user survey 'POST'
    var userData = req.body;
    var userScores = userData.scores;

    // variable to determine diffference in user scores with database scores
    var totalDifference;

    // loop through match possibilities in database
    for (var i = 0; i < friends.length; i ++) {
      var currentFriend = friends[i];
      totalDifference = 0;
      
      console.log(currentFriend.name);

      // then loop through all of the scores for each match
      for (var j = 0; j < currentFriend.scores.length; j++) {
        var currentFriendScore = currentFriend.scores[j];
        var currentUserScore = userScores[j];

        // calculate difference between scores and add into totalDifference
        totalDifference += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
      }

      // If the total of difference is less than differences of current 'best match'
      if (totalDifference <= bestMatch.friendDifference) {
        // reset bestMatch to the new friend
        bestMatch.name = currentFriend.name;
        bestMatch.photo = currentFriend.photo;
        bestMatch.friendDifference = totalDifference;

      }
    }
    // Save user's data to database after the check to ensure its not comparing to self
    friends.push(userData);

    // return json of user's bestMatch to be used in HTML on next page
    res.json(bestMatch);
  });
}