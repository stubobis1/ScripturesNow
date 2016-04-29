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
//scripParser = require('lds-scripture-nlp-query-parser'),
scripScrap = require('./scripScrap'),
//middleware = requireDirectory(module, './server/middleware'),

// Create the express app
app = express();


http.globalAgent.maxSockets = 9999;
https.globalAgent.maxSockets = 9999;

app.set('port', process.env.VCAP_APP_PORT || 4000);

//Body Parser for dealing with POSTs
//app.use(json());

app.get("/api/v1/get-scripture", function(req, res) {
    /*var obj = scripParser.parse(req.msg);*/
});

app.use(function(req, res, next){
    console.log('Hello World');
    var returnBody;
    var queryParams = { testaments: [], terms: ['faith']};

    scripScrap(queryParams, res);

//I don't think that calling request like this is async.
});

module.exports = app;
