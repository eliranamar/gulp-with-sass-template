const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.all('/*', function (req, res, next) {
	res.sendFile('index.html', { root: __dirname });
});

app.listen(3000, function () {
	console.log('server is running on port 3000 :)');
});