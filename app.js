var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

app.get('/', function( req, res ){
	res.render('index');
});

app.get('/login', function( req, res ){
	res.render('login');
});

app.listen(4567);
console.log('Yoyo, I\'m at 4567');