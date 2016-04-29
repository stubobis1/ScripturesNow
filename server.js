'use strict';

// IMPORTS
var appName = 'scriptures_now',
<<<<<<< HEAD
http = require('http'),
https = require('https'),
request = require('request'),
express = require('express'),
requireDirectory = require('require-directory'),
bodyParser = require('body-parser'),
json = bodyParser.json,
path = require("path"),
scripScrap = require('./scripScrap'),

// Create the express app
app = express();


http.globalAgent.maxSockets = 9999;
https.globalAgent.maxSockets = 9999;

app.set('port', process.env.VCAP_APP_PORT || 4000);

app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/view.html'));
  //__dirname : It will resolve to your project folder.
});


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
