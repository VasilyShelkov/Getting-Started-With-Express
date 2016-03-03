import express from 'express';
import fs from 'fs';
import _ from 'lodash';

const app = express();
const port = process.env.PORT || 3000;

let users = [];

fs.readFile('users.json', {encoding: 'utf8'}, (err, data) => {
	if (err) throw err;

	JSON.parse(data).forEach((user) => {
		user.name.full = _.startCase(user.name.first + ' ' + user.name.last);
		users.push(user);
	});
});

app.get('/', (req, res) => {
	let buffer = '';

	users.forEach((user) => {
		buffer += '<a href="' + user.username + '">' + user.name.full + '</a><br>';
	});
	res.send(buffer);
});

app.get(/big.*/, (req, res, next) => {
	console.log('BIG USER ACCESS');
	next();
});

app.get(/.*dog.*/, (req, res, next) => {
	console.log('DOGS GO WOOF');
	next();
});

app.get('/:username', (req, res) => {
	let username = req.params.username;
	res.send(username);
});


app.listen(port, () => {
	console.log('Server running at http://localhost: ' + port);
});
