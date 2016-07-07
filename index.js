var request = require('request');
var express = require('express');
var app = express();

const PORT = process.env.APP_PORT || 8080;
const BACKEND = process.env.BACKEND_HOST;

app.get('/api/time', function (req, res) {
	request(`http://${BACKEND}:8080/time`, function (err, _res, body) {
		if (!err && _res.statusCode == 200) {
			res.send(body);
		}
	});
});

app.get('/', function (req, res) {
	res.redirect(301, '/public');
});

app.use('/public', express.static('public'));

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});


