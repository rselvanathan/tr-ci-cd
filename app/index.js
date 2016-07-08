const querystring = require('querystring');
const request = require('request');
const bodyParser = require("body-parser");
const express = require('express');
const app = express();

const PORT = process.env.APP_PORT || 8080;
const BACKEND_HOST = process.env.BACKEND_HOST;
const BACKEND_PORT = process.env.BACKEND_PORT || 8080;

const baseUrl = `http://${BACKEND_HOST}:${BACKEND_PORT}/`;

app.use(bodyParser.json());

app.get('/api/:method', function (req, res) {
	const qs = querystring.stringify(req.query);
	const method = req.params.method;
	const url = `${baseUrl}${method}?${qs}`;

	request(url, function (err, _res, body) {
		if (!err && _res.statusCode < 400) {
			res.send(body);
		} else {
			res.send(500, "Backend is not available");
		}
	});
});

app.post('/api/addCity', function (req, res) {
	request(
		{
			uri: `${baseUrl}cities`,
			json: req.body,
			method: 'POST'
		},
		function (err, _res, body) {
			if (!err && _res.statusCode < 400) {
				res.send({ok: true});
			} else {
				res.status(500).send("Backend is not available");
			}
		}
	);
});

app.get('/', function (req, res) {
	res.redirect(301, '/public');
});

app.use('/public', express.static('public'));

app.listen(PORT, function () {
	console.log(`Example app listening on port ${PORT}!`);
});


