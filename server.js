var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/config');

var app = express();
var port = process.env.PORT || 8080

//Connect to MongoDb
var connect = function() {
	var options = {	server: { socketOptions: { keepAlive:1 }}};
  console.log(config.db);
	mongoose.connect(config.db, options);
};

connect();

//Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
});

// Bootstrap application settings
require('./config/express')(app);
// Bootstrap routes
require('./config/routes')(app);

app.listen(port);
console.log('Express app started on port ' + port);

/**
 *  Expose
 */
module.exports = app;


/*
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', function(req,res){
	res.render('pages/index');
});

app.get('/election', function(req, res){
	res.render('pages/election');
});

app.listen(8080);
console.log("Connect to localhost:8080");
*/