/*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

/**
 * @class QueryRunner
 *
 * Executes queries in Hydra
 */
var http = require('http');

function defaultCallback(results) {
	console.log('Results:\n', results);
}

function processTitledResults(data) {
	var results = [],
		fields = [];

	// go through all the rows of the data
	for (var rowIdx in data) {
		// get the current row
		var resultsRow = data[rowIdx];
		if (resultsRow) {

			// if the current row is the first row, then this 
			// should contain the titles for the objects
			if (rowIdx === '0') {
				// set the fields possible for each
				fields = resultsRow;
			} else {
				// construct the object from the fields array
				var result = {};
				for (var colIdx = 0; colIdx < resultsRow.length; colIdx++) {
					result[fields[colIdx]] = resultsRow[colIdx];
				}
				results.push(result);
			}
		}
	}

	return results;
}

module.exports = function(query, callback) {
	if (query === null || query === undefined) {
		return new Error('Cannot run an query when none is given.');
	}

	callback = callback || defaultCallback;
	console.log('query', query);

	var hasTitle = query.ops.indexOf('title') >= 0;

	var queryParams =
		'allowPartial=true' +
		'&job=' + query.job +
		'&path=' + encodeURIComponent(query.path) +
		'&ops=' + encodeURIComponent(query.ops) +
		'&rops=' + encodeURIComponent(query.rops) +
		'&format=json';

	var options = {
		hostname: query.host,
		port: 2222,
		path: '/query/call',
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			'Content-Length': queryParams.length
		}
	};

	var req = http.request(options, function(res) {
		res.setEncoding('utf8');
		var raw = '';
		res.on('data', function(chunk) {
			raw += chunk;
		});
		res.on('end', function() {
			try {
				var json = JSON.parse(raw);
				if (hasTitle) {
					var results = processTitledResults(json);
					callback(results);
				} else {
					callback(json);
				}
			} catch (e) {
				console.error(e.message);
			}
		});
	});

	req.on('error', function(e) {
		console.log('problem with request: ' + e.message);
	});

	// write data to request body
	req.write(queryParams);
	req.end();
};