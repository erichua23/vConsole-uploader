var express = require('express')
var fs = require('fs')
var cors = require('cors');

var app = express()
app.use(cors());

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}) );

var uploadFilePath = './uploadedLogFiles/';
app.use(express.static('uploadedLogFiles'))



// respond with "hello world" when a GET request is made to the homepage
app.post('/postLog', function (req, res) {
  console.log(req.body);
  var body = '';
  var filePath = uploadFilePath + getFileName() + '.html';
  if (req && req.body && req.body.logList) {
    for (var item in req.body.logList) {
      body += req.body.logList[item] + '<br/>';
    }
    fs.appendFile(filePath, body, function() {
    	res.end(filePath);
    });
    return;
  }

  // TODO return some tips
  res.end("Base post format", 400);
  
  function getFileName() {
	return new Date().getTime();
  }
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
