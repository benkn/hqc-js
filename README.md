HQC-JS
================

## Hydra Query Client for Java Script
This library provides query construction for running [Hydra](https://github.com/addthis/hydra) queries. It offers running a query and returning an array of arrays, or as an array of Objects.

### Getting Started
To use hqc-js, you can download it through node by adding it to your **package.json**:

	devDependencies: {
		"hqc-js" : ["version"]
	}

### Using the API
hqc-js provides an interface for constructing Queries, and another for running them asynchronously.

To construct a query, use the QueryBuilder:

	var QueryBuilder = require('hqc-js').QueryBuilder;

	var query = QueryBuilder.build(
		<hostAndPort>,
		<jobId>,
		<unEncodedPath>,
		<ops>,
		<rops>
	);

This build operation will construct a query object, which you can use to run a query through the QueryRunner:

	var QueryRunner = require('hqc-js').QueryRunner;
	var results = QueryRunner.runQueryRaw(query, callback);

The results will return as an array of arrays. **Alternatively**, you can run `QueryRunner.runQueryToObjects(query, callback)` to get an array of Objects, with fields constructed dynamically from the results.

### Example
To run the example, you can go to the directory in your terminal and run `npm install`, then `webpack-dev-server`. Then, open a browser and go to http://localhost:8080 

You can see the execution of the query and results returned.

### Contributing
If you would like to add to hqc-js, here are the steps to get development going:

1. Clone this repo
2. Run `npm install` 
3. After making updates, run `gulp compress` to minify files.
4. If you add more components, update **index.js** to export them.