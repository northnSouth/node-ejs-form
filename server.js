const http = require('http')
	, fs = require('fs')
	, ejs = require('ejs')
	, parseLang = require('accept-language-parser')

http.createServer((req, res) => {
	
	res.setHeader('Content-Type', 'text/html')
	
	let path = __dirname + "/dynamic/";
	var text;
	switch(req.url) {
		case '/':
			text = "You are at Home";
			break;
		case '/requests':
			text = "You are at Requests";
			break;
		case '/forms':
			text = "You are at Forms"
			break;
		default:
			text = "You are at 404";
			break;
	}

	res.write(text);
	res.end();

}).listen(3000, () => {
	console.log('Listening on port 3000');
})
