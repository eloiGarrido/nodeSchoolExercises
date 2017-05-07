
function add(a, b) {
    return a + b;
}

function baby_steps(arguments) {
	// arguments.splice(0,2)
	var sum = 0;
	for(i=2;i<arguments.length; i++){
		sum+=Number(arguments[i]);
	}
	console.info(sum);

}
// -------------------------------------------------//
function my_first_IO(file){
	var fs = require('fs');
	var contents = fs.readFileSync(file);
	var lines = contents.toString().split('\n').length - 1
	console.log(lines);
}
// -------------------------------------------------//
function my_first_async_io(file) {
	var fs = require('fs');
	fs.readFile(file, function doneReading (err, contents) {
		if (err) {
        	return console.error(err)
      	}
		var lines = contents.toString().split('\n').length - 1
      	console.log(lines)
	});

}
// -------------------------------------------------//
function filtered_ls(dir, ext) {
	var fs = require('fs');
	var path = require('path');

	fs.readdir(dir, function readDir (err, contents) {

		if (err) { 
			throw err;
		}
		contents.filter(function(e){
			return path.extname(e) === '.'+ext;
		}).forEach(function(e){
			console.log(e);
		})

	});
}
// -------------------------------------------------//
function make_it_modular(arguments) {
	var my_module = require('./funct_module.js');
	var dir = arguments[2];
	var ext = arguments[3];
	my_module(dir, ext, function (err, list) {
		if (err) {
			return console.error('There was an error:', err);
		}

		list.forEach(function(e) {
			console.log(e);
		});
	});
	
}

// -------------------------------------------------//
var http = require('http')
function http_client(url) {
	http.get(url, function(response) {
		response.setEncoding('utf8')
		response.on('error', console.error)
		response.on('data', console.log)
	}).on('error', console.error)
}
// -------------------------------------------------//
var bl = require('bl')
function http_collect(url) {
	http.get(url, function(response){
		response.pipe(bl(function (err, data){
			if (err) {
				return console.error(err)
			}
			data = data.toString()
			console.log(data.length)
			console.log(data)
		}))
	})
}
// -------------------------------------------------//
var count = 0
var results = [];

function printOut() {
    for (var t = 0; t < results.length; t++) {
        console.log(results[t]);
    }
}

function run_http_get(url, id) {
	http.get(url, function(response){
		response.pipe(bl(function (err, data){
			if (err) {
				return console.error(err)
			}
			results[id] = data.toString()
			count++

			if (count === 3) {
				printOut()
			}
		}))
	})
}

function juggling_asyinc(args) {
	for (i=2;i<5;i++){
		run_http_get(args[i], i-2)
	}
}
// -------------------------------------------------//
var net = require('net')  

function zeroFill (i) {
  	return (i < 10 ? '0' : '') + i
}

function now () {
  	var d = new Date()
  	return d.getFullYear() + '-' +
    zeroFill(d.getMonth() + 1) + '-' +
    zeroFill(d.getDate()) + ' ' +
    zeroFill(d.getHours()) + ':' +
    zeroFill(d.getMinutes())
}


var format_date = ""
function time_server(port) {
	var server = net.createServer(function (socket){
		console.info(now())
		socket.end(now() + '\n')
	})
	server.listen(port)
}
// -------------------------------------------------//
var http = require('http')
var fs = require('fs')

function http_file_server(port, file_dir) {
	var server = http.createServer(function (request, response){
		response.writeHead(200, {'content-type': 'text/plain'})
		fs.createReadStream(file_dir).pipe(response)
	})
	server.listen(port)
}
// -------------------------------------------------//
var map = require('through2-map')

function http_uppercaser(port) {
	var server = http.createServer(function (req, res) {
		if (req.method !== 'POST') {
			return res.end('send me a POST\n')
		}
		req.pipe(map(function (chunk){
			return chunk.toString().toUpperCase()
		})).pipe(res)
	})
	server.listen(port)
}
// -------------------------------------------------//
var url = require('url')

function http_json_api_server(port) {
	var server = http.createServer(function (req, res) {
		if (req.method !== 'GET') {
			return res.end('send me a GET\n')
		}
		req_data = url.parse(req.url, true)
		res.writeHead(200, {'Content-Type': 'application/json'})
		if (req_data.pathname === '/api/parsetime') {
			var time = new Date(req_data.query.iso)
			result = {
	       		"hour": time.getHours(),  
				"minute": time.getMinutes(),  
				"second": time.getSeconds() 
			}
			res.end(JSON.stringify(result))


		} else if (req_data.pathname === '/api/unixtime') {
			var time = new Date(req_data.query.iso).getTime()
			result = { "unixtime":  time}
			res.end(JSON.stringify(result))

		}

	})
	server.listen(port)
}
// -------------------------------------------------//


/* learnyounode exercises */

// baby_steps(process.argv); 						// Baby steps
// my_first_IO(process.argv[2]); 					// My First IO
// my_first_async_io(process.argv[2]); 				// My First Async IO
// filtered_ls(process.argv[2], process.argv[3]); 	// Filtered LS 
// make_it_modular(process.argv);					// Make it modula
// http_client(process.argv[2])						// Http Client
// http_collect(process.argv[2])					// Http Collect
// juggling_asyinc(process.argv)					// Juggling Async
// time_server(process.argv[2])						// Time Server
// http_file_server(process.argv[2], process.argv[3]) // Http File Server
// http_uppercaser(process.argv[2])					// Http Uppercaserer
http_json_api_server(process.argv[2]) 			// Http JSON API Server	