// Declare requireables for express, handlebars, and bodyParser ##########################################################
var express = require('express');

var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

var colors = require('colors');  // Only useable if run with 'node', forever will not append colors in logs
var timestamps = require('log-timestamp');  // Prepend timestamps to console.log() outputs

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 2401);
var portString = String( app.get('port') );

// End of requireables ###################################################################################################


// Maintain a splash page at the root URL
app.get('/', function(req, res) {
	res.type('text/plain');
 
	res.send('Welcome to the splash page! There\'s nothing here right now...');
});


// A derp page
app.get('/derp', function(req, res) {
	
	res.type('text/plain');
	res.send('Are you lost?...');
  
});


// Handle a GET request and use the /home page
app.get('/home', function(req, res) {
	
	var queryParameters = [];

	for (var param in req.query) {
		
		queryParameters.push({'name':param, 'value':req.query[param]});
	}
	
	var context = {};
	
	context.dataList = queryParameters;  // Package the queries to be sent and parsed in the /home view
	context.type = 'GET';  // Set the request type to be used in the /home view

	res.render('home', context);  // Render the response to the client
	
	console.log('  ### ' + 'INFO'.bgCyan.black + ' ###    Completed ' + 'GET '.yellow.bold + '  request @ ' + '/home'.green.bold);
});


// Handle a POST request and use the /home page
app.post('/home', function(req, res) {
	
	var bodyParameters = [];
	
	for (var param in req.body) {
		
		bodyParameters.push({'name':param, 'value':req.body[param]});
	}
	
	var context = {};
	
	context.dataList = bodyParameters;
	context.type = 'POST';
	
	res.render('home', context);
	
	console.log('  ### ' + 'INFO'.bgCyan.black + ' ###    Completed ' + 'POST'.yellow.bold + '  request @ ' + '/home'.green.bold);
});



app.use(function(req, res) {
	
	res.type('text/plain');
	res.status(404);
	res.send('404 - Not Found - Can\'t find that here, sorry ¯\\_(ツ)_/¯');
});



app.use(function(err, req, res, next) {
	
	console.error(err.stack.red);
	res.type('plain/text');
	res.status(500);
	res.send('500 - Server Error: Something has gone terribly wrong!');
	
});



app.listen(app.get('port'), function() {
	
	console.log('');
	console.log('  ### ' + 'STARTUP'.bgWhite.black + ' ###  Express started on http://localhost:' + portString);
	console.log('  ### ' + 'STARTUP'.bgWhite.black + ' ###  Clients will navigate to: ' + 'http://flip2.engr.oregonstate.edu:'.green + portString.green + '/home'.green);
	console.log('  ### ' + 'STARTUP'.bgWhite.black + ' ###  Press Ctrl-C to terminate.');
	console.log('');
});
