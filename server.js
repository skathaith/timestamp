// server.js
// where your node app starts

// init project
var express = require('express');
var moment = require('moment');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});




app.get("/api/timestamp/:date_string?", function (req, res) {
    var dateString =req.params.date_string;
   var modifiedDateString = parseInt(dateString);
  
  if(dateString.indexOf("-") > -1) {
    
    modifiedDateString= dateString;
  
  }
  
  
  if (dateString == undefined) {
    
    res.json({unix:moment().valueOf(),utc:new Date().toUTCString()});
  }
  
  if (new Date(modifiedDateString) !== "Invalid Date") {
    
    res.json({unix:new Date(modifiedDateString).getTime(),utc:new Date(modifiedDateString).toUTCString()});
    
  } else {
    
    res.json({"unix": null, "utc" : "Invalid Date" });
  
  }

});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});