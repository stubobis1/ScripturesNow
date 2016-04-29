'use strict';

// IMPORTS
var appName = 'scriptures_now',
    http = require('http'),
    https = require('https'),
    request = require('request'),
    express = require('express'),
    requireDirectory = require('require-directory'),
    bodyParser = require('body-parser'),
    json = bodyParser.json,
    path = require("path"),
// Create the express app
    app = express();


http.globalAgent.maxSockets = 9999;
https.globalAgent.maxSockets = 9999;

app.set('port', process.env.VCAP_APP_PORT || 4000);

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/view.html'));
    //__dirname : It will resolve to your project folder.
});

app.get('/result', function (req, res, next) {

    res.sendFile(path.join(__dirname + '/results.html'));
    next();
});


//Body Parser for dealing with POSTs
//app.use(json());

app.get("/api/v1/get-scripture", function (req, res) {
    /*var obj = scripParser.parse(req.msg);*/
});

app.use(function (req, res, next) {
    console.log('Hello World');
    var returnBody;
    var queryParams = {book: "bofm", query: "faith"};

    var queryString = '';
    for (var key in queryParams) {
        queryString += "&" + key + "=" + queryParams[key];
    }

    var fullURL = 'http://lds.org/search?domains=scriptures' + queryString;
    request(fullURL, function (error, response, body) {
        console.log(fullURL);
        returnBody = body;
        console.log("SCRAPE THIS INFO: \n\n\n" + body.substring(1, 1000)); //TODO scrape this.

    });


//TODO Parse returnBody to hit footnote
    var footnoteURL = "https://www.lds.org/scriptures/footnote/detail?lang=eng&isReference=true&noteUri=/scriptures/bofm/w-of-m/1.11";
    request(footnoteURL, function (error, respoonse, body) {
        // res.sendFile(body); //TODO clean this up, make it nice
        next();
    });

//I don't think that calling request like this is async.
});

module.exports = app;