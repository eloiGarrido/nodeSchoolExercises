var fs = require('fs');
var path = require('path');

module.exports = function functModule(dir, ext, callback) {
	fs.readdir(dir, function(err, list) {
		if (err) {
			return callback(err);
		}

		list = list.filter(function(e) {
			return path.extname(e) === '.' + ext;
		});
		callback(null, list);
	});
}