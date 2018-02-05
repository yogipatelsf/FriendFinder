// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on all possible friends
// ===============================================================================
var path = require('path');

var friendsdata = require('../data/friends.js');


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(data){

    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    data.get('/api/friends', function(req, res){
        res.json(friendsdata);
    });


    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate Javascript array
    // ---------------------------------------------------------------------------

    data.post('/api/friends', function(req, res) {
        // Capture the user input object
        var userData = req.body;
        console.log(userData);

        // console.log('userInput = ' + JSON.stringify(userInput));

        var userResponses = userData.scores;
        // console.log('userResponses = ' + userResponses);

        // Compute best friend match
        var matchName = '';
        var matchImage = '';
        var totalDifference = 1000; // Make the initial value big for comparison

        // Here we loop through all the friend possibilities in the database.
        // Examine all existing friends in the list
        for (var i = 0; i < friendsdata.length; i++) {
            // console.log('friend = ' + JSON.stringify(friends[i]));

            // Compute differenes for each question
            var diff = 0;
            for (var j = 0; j < userResponses.length; j++) {
                diff += Math.abs(friendsdata[i].scores[j] - userResponses[j]);
            }
            // console.log('diff = ' + diff);
            // totalDifference = diff;

            // If lowest difference, record the friend match
            if (diff < totalDifference) {
                // console.log('Closest match found = ' + diff);
                // console.log('Friend name = ' + friends[i].name);
                // console.log('Friend image = ' + friends[i].photo);
                totalDifference = diff;

                matchName = friendsdata[i].name;
                matchImage = friendsdata[i].photo;
                console.log(matchName);
                console.log(matchImage);
            }
        }


        // Finally save the user's data to the database (this has to happen AFTER the check. otherwise,
        // the database will always return that the user is the user's best friend).
        friendsdata.push(userData);

        // Return a JSON with the user's bestMatch. This will be used by the HTML in the next page.
        res.json({status: 'OK', matchName: matchName, matchImage: matchImage});

    });

}