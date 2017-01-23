var express = require('express');
var app = express();
var path = require('path');
var googleFinance = require('google-finance');
var bodyParser = require('body-parser');
var strftime = require('strftime');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/css", express.static(__dirname + '/css'));
app.use("/fonts", express.static(__dirname + '/fonts'));
app.use("/tables", express.static(__dirname + '/tables'));
app.use("/js", express.static(__dirname + '/js'));
app.use("/", express.static(__dirname + '/'));



app.get('/', function(req, res){
  res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/b', function(req, res){
  res.sendFile(path.join(__dirname+'/index2.html'));
});

app.get('/news', function(req, res){
  googleFinance.companyNews({
  symbol: 'NASDAQ:AAPL'
}, function (err, news) {
  res.send(news);
});
});

app.post('/advNews', function(req, res){
  var user_name=req.body.user;
  googleFinance.companyNews({
  symbol: 'NASDAQ:'+req.body.user,
  from: req.body.time - 1,
  to: req.body.time
  }, function (err, quotes) {
  //console.log(quotes);
    res.send(quotes);
  });
});

app.get('/hist', function(req, res){
  googleFinance.historical({
  symbol: 'NASDAQ:AAPL',
  from: '2014-01-01',
  to: '2014-01-02'
  }, function (err, quotes) {
  //console.log(quotes);
    res.send(quotes);
  });
});

app.post('/advQueryHist', function(req, res){
  var user_name=req.body.user;
  googleFinance.historical({
  symbol: 'NASDAQ:' + user_name,
  from: '2016-12-17',
  to: strftime('%F')
  }, function (err, quotes) {
  //console.log(quotes);
    res.send(quotes);
  });
});

app.post('/advQuery',function(req,res){
  var user_name=req.body.user;
  // var password=req.body.password;
  console.log(user_name);
  googleFinance.companyNews({
  symbol: 'NASDAQ:' + user_name
}, function (err, news) {
  res.send(news);
});
  //res.send(user_name);
});

// example : [ { date: Thu Jan 02 2014 00:00:00 GMT-0500 (Eastern Standard Time),
//     open: 79.38,
//     high: 79.58,
//     low: 78.86,
//     close: 79.02,
//     volume: 58791957,
//     symbol: 'NASDAQ:AAPL' } ]

app.listen('3000', function(){
  console.log('running on 3000');
});
