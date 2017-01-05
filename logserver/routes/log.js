var express = require('express');
var fs = require('fs');
var mkdirp = require('mkdirp');
var router = express.Router();
var logId = 0;

function getAutoIncLogId() {
  return logId++;
}

function getDateString() {
  var date = new Date();
  return '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate();
}

var uploadFileDir = "/Users/erichua/tmp/" + getDateString() + '/';

router.get('/:id', function(req, res, next) {
  var logId = req.params.id;
  var logFilePath = uploadFileDir + logId;
  fs.readFile(logFilePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
  	  	res.status(404).json('logId ' + logId + ' does not exist');
        return;
      } else {
        throw err;
      }
    } else {
	  res.json(JSON.parse(data.toString()));
    }
  });
});

router.get('/', function(req, res, next) {
  fs.readdir(uploadFileDir, function (err, files) {
	console.log(files);
	res.json(files);
  });
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var body = '';
  var logFileId = '' + getAutoIncLogId();
  var filePath = uploadFileDir + logFileId;
  if (req && req.body) {
    mkdirp(uploadFileDir, function (err) {
        if (err) {
          res.status(500).json(err);
          console.error(err);
        }
    });
    fs.writeFile(filePath, JSON.stringify(req.body), function(err) {
      if (!err) {
        res.json(logFileId);
      }	else {
        res.status(500).json(err);
      }
    });
    return;
  } else {
    res.end("requst without body is not allowed", 400);
  }
});


module.exports = router;
