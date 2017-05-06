
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
	var path = require('path')

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



/* learnyounode exercises */

// baby_steps(process.argv); 					// Baby steps
// my_first_IO(process.argv[2]); 				// My First IO
// my_first_async_io(process.argv[2]); 			// My First Async IO
filtered_ls(process.argv[2], process.argv[3]); 	// Filtered LS 