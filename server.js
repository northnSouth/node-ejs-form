const http = require("http"),
	fs = require("fs"),
	ejs = require("ejs"),
	parseLang = require("accept-language-parser");

function pageRoute(req, res) {
	let reqContentType = "page";
	let prefix = "/files/";
	res.setHeader("Content-Type", "text/html");

	path = "./dynamic/";
	res.statusCode = 200;
	switch (req.url) {
		case "/":
			text = "Home";
			path += "index.ejs";
			ejs_values = { css: `${prefix}home.css` };
			break;
		case "/create-form":
			text = "Create Form";
			path += "create-form.ejs";
			ejs_values = {
				css: `${prefix}create-form.css`,
				js: [ 
					`${prefix}add-field.js`,
					`${prefix}ui-functions.js`
				]
			};
			break;
		case "/forms":
			text = "Forms";
			break;
		default:
			text = "404";
			path += "404.ejs";
			ejs_values = { css: `${prefix}404.css` };
			res.statusCode = 404;
			break;
	}
	return { path, text, reqContentType, ejs_values };
}

function fileRoute(req, res) {
	let reqContentType = "file";
	let prefix = "/files/";
	//let css = "./css/";
	//let images = "./images/";
	let ext = req.url.split(".").pop();

	let filename = req.url.split("/").pop();

	path = ""; // reset or empty path
	if (ext === "css") { path = "./css/" }
	else if ( ext === "webp" | ext === "svg" ) { path = "./images/" }
	else if (ext === "js") { path = "./js_modules/" }

	text = filename;
	path += filename;
	
	return { path, text, reqContentType };
}

http.createServer((req, res) => {
	var route;
	let fileRegex = /^\/files\//;
	let isFile = fileRegex.test(req.url);

	if (isFile) {
		route = fileRoute(req, res);
		if (fs.existsSync(route.path)) { res.statusCode = 200 }
		else { res.statusCode = 404 }
		
		console.log("\x1b[32m","\nFile", "\x1b[0m");
	} else {
		route = pageRoute(req, res);
		console.log("\n" + "\x1b[43m\x1b[30m%s\x1b[0m", " Page --------- ");
	}

	let text = route.text;
	let path = route.path;
	let ejs_values = route.ejs_values;	

	console.log("URL: " + req.url);
	console.log("Path: " + path);
	console.log(req.method + " " + res.statusCode + " " + text);
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			res.write("No Content");
			res.statusCode = 404;
			res.end();
		} else {
			if (route.reqContentType === "page") {
				Object.assign(ejs_values, {filename: path});
				res.end(ejs.render(data.toString(), ejs_values));
			} else { res.end(data) }
		}
	});
}).listen(3000, () => {
	console.log("Listening on port 3000");
});
