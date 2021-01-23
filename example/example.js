const QueryBuilder = require('src/QueryBuilder');
const runQuery = require('src/QueryRunner');
const $ = require('jquery');

(function() {
	window.runQuery = function() {
		var host = document.getElementById('host').value,
			jobId = document.getElementById('job').value,
			queryStr = document.getElementById('path').value,
			ops = document.getElementById('ops').value,
			rops = document.getElementById('rops').value,
			hasColumns = $('#columnCB:checked').val() != undefined ? true : false;

		if (host && job && queryStr) {
			var query = QueryBuilder.build(
				host,
				jobId,
				queryStr,
				ops,
				rops
			);

			$('#results').html('<h3>Running, please wait!</h3>');
			$('#runButton').attr("disabled", true);

			console.log('QueryRunner', runQuery);

			runQuery(query, function(results) {
				$('#runButton').attr("disabled", false);

				if (results instanceof Error) {
					$('#results').html('An error!\n' + results);
				} else {
					$('#results').html('<h3>Results:</h3>');
					$.each(results, function(rowIdx, row) {

						if ( row.length && !(row instanceof Array)) {
							$('#results').append(row);
						} else {
							var rowHtml = '';
							for (var colIdx in row) {
								var column = row[colIdx];
								if (column) {
									if ( colIdx.length ) {
										rowHtml += colIdx + ': ';
									}
									rowHtml += column;
									rowHtml += ', ';
								}
							}

							$('#results').append(rowHtml);
						} 

						$('#results').append('<br>');
					});
				}
			});
		}
	};
})();