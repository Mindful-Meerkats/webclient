var express = require('express');
var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function( req, res ){
	res.render('index');
});

app.get('/login', function( req, res ){
	res.render('login');
});

app.get('/preview', function( req, res ){
	res.render('preview');
});


app.listen(4567);
console.log('Yoyo, I\'m at 4567');