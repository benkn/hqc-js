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
 * @class QueryBuilder
 *
 * Creates a Query object given specific parameters
 */

var Query = require('./Query');

module.exports = {
	/**
	 * Builds a Query referencing the given parameters.
	 *
	 * @param {String} host
	 * @param {String} job
	 * @param {String} path
	 * @param {String} ops
	 * @param {String} rops
	 * @return Query
	 */
	build : function(host, job, path, ops, rops) {
		var q = Object.create(Query);

		q.host = host;
		q.job = job;
		q.path = encodeURIComponent(path);
		q.ops = encodeURIComponent(ops);
		q.rops = encodeURIComponent(rops);

		return q;
	}
};