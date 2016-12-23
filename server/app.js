var express = require('express');
var fs = require('fs');
var cors = require('cors');
var ipfilter = require('express-ipfilter').IpFilter;
var bodyParser = require('body-parser');

var app = express();

var config = require('./config');
app.configure(function() {
  app.set('config', config); 
});

// TODO add ip filter here
app.use(ipfilter([], {mode: 'allow'})); 
// TODO 做成接收参数 
var config = {
  ipWhiteList: [],
  ipBlackList: [],
  fileuploadPath: './server/uploadedLogFiles/', // TODO abs path is batter
  bodyLimit: '50mb'
};

var uploadFilePath = config.fileuploadPath;

app.use(cors());
app.use(bodyParser.json({
  limit: config.bodyLimit 
}));

app.use(express.static('./'));
app.use('/example', express.static('./example'));

app.get('/logs', function (req, res) {
  console.log(req.params.id);
  res.end('id list: ' + req.params.id, 200);
});

app.get('/log/:id', function (req, res) {
  console.log(req.params.id);
  res.end('id: ' + req.params.id, 200);
});

app.post('/log', function (req, res) {
  console.log(req.body);
  var body = '';
  var fileName = '' + getFileName();
  var filePath = uploadFilePath + fileName + '.html';
  if (req && req.body && req.body.logList) {
    for (var item in req.body.logList) {
      body += req.body.logList[item] + '<br/>';
    }
    fs.appendFile(filePath, body, function() {
    	res.end(fileName + '.html');
    });
    return;
  }

  // TODO return some tips
  res.end("Bad post format", 400);

  function getFileName() {
	return new Date().getTime();
  }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
