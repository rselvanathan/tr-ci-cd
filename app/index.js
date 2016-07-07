const querystring = require('querystring');
const request = require('request');
const express = require('express');
const app = express();

const PORT = process.env.APP_PORT || 8080;
const BACKEND = process.env.BACKEND_HOST;

app.get('/api/:method', function (req, res) {
	const qs = querystring.stringify(req.query);
	const url = `http://${BACKEND}:8080/${req.params.method}?${qs}`;
	request(url, function (err, _res, body) {
		if (!err && _res.statusCode == 200) {
			res.send(body);
		} else {
			res.send(500, "Backend is not available");
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


