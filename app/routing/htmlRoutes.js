// Pull in required dependencies
var path = require('path');

// Export HTML routes
module.exports = function(data) {
    // console.log('___ENTER htmlRoutes.js___');

    // Home page
    data.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    // Survey page
    data.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });
};