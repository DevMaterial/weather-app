/*jshint esversion:6*/
var express = require('express');
    app = express();

app.use(express.static(__dirname + '/app'));

app.listen(3000);
console.log('listening on port 3000');

app.get('/', function(req,res){
  res.sendFile('index.html');
});

app.get('/index', function(req,res){
  res.sendFile('index.html');
});
