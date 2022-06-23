const http = require("http"),
	fs = require("fs"),
	ejs = require("ejs"),
	parseLang = require("accept-language-parser");

function pageRoute(req, res) {
	let reqContentType = "page";
	let prefix = "/files/";
	res.setHeader("Content-Type", "text/html");

	path = "./dynamic/";
	switch (req.url) {
		case "/":
			text = "Requested Home";
			path += "index.ejs";
			ejs_values = { nav: `${prefix}nav.css`, css: `${prefix}home.css` };
			res.statusCode = 200;
			break;
		case "/requests":
			text = "Requested Requests";
			break;
		case "/forms":
			text = "Requested Forms";
			break;
		default:
			text = "Requested 404";
			path += "404.ejs";
			ejs_values = { nav: `${prefix}nav.css` };
			res.statusCode = 404;
			break;
	}
	return { path, text, reqContentType, ejs_values };
}

function fileRoute(req, res) {
	let reqContentType = "file";
	let prefix = "/files/";
	let css = "./css/";
	let images = "./images/";
	let ext = req.url.split(".").pop();

	let filename = req.url.split("/").pop();

	path = ""; // reset or empty path
	if (ext === "css") {
		path = css;
	} else if (ext === "webp") {
		path = images;
	}

	switch (req.url) {
		case prefix + filename:
			text = "Requested " + filename;
			path += filename;
			res.statusCode = 200;
			break;
		default:
			text = "File 404";
			path = "";
			res.statusCode = 404;
			break;
	}
	return { path, text, reqContentType };
}

http.createServer((req, res) => {
	var route;
	let fileRegex = /^\/files\//;
	let isFile = fileRegex.test(req.url);

	if (isFile) {
		route = fileRoute(req, res);
		console.log("\nFile");
	} else {
		route = pageRoute(req, res);
		console.log("\nPage");
	}

	let text = route.text;
	let path = route.path;
	let ejs_values = route.ejs_values;	

	console.log("URL: " + req.url);
	console.log("Path: " + path);
	console.log(text);
	fs.readFile(path, (err, data) => {
		if (err) {
			console.log(err);
			res.write("No Content");
			res.end();
		} else {
			if (route.reqContentType === "page") {
				Object.assign(ejs_values, {filename: path});
				res.end(ejs.render(data.toString(), ejs_values));
			} else {
				res.end(data);
			}
		}
	});
}).listen(3000, () => {
	console.log("Listening on port 3000");
});
