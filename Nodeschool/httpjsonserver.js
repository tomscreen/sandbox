var http = require('http');
var url = require('url');

function unixTime(iso) {
	var date = new Date(iso);
	var d = {};
	d.unixtime = date.getTime();
	return d;
}

function parseTime(iso) {
	var date = new Date(iso);
	var d = {};
	d.hour = date.getHours();
	d.minute = date.getMinutes();
	d.second = date.getSeconds();
	return d;
}

http.createServer(function(request,response) {
	response.writeHead(200, { 'Content-Type': 'application/json' });
	var reqUrl = url.parse(request.url, true);
	// console.log(reqUrl);
	if (reqUrl.pathname === '/api/parsetime')
		response.write(JSON.stringify(parseTime(reqUrl.query.iso)));
	if (reqUrl.pathname === '/api/unixtime')
		response.write(JSON.stringify(unixTime(reqUrl.query.iso)));

	response.end();

}).listen(process.argv[2]);