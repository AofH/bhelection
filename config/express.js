var bodyParser = require('body-parser');
var express = require('express');
var swig = require('swig');

var helpers = require('view-helpers');
var config = require('./config');
var pkg = require('../package.json');

var env = process.env.NODE_ENV || 'development';

/**
 * Expose
 */ 
module.exports = function(app){
	app.use(express.static(config.root + '/public'));

	//Swig templating engine settings
	if(env === 'development' || env === 'test'){
		swig.setDefaults({
			cache:false
		});
	}

	app.engine('html', swig.renderFile);
	app.set('views', config.root + '/app/views');
	app.set('view engine', 'html');

	//expose package.json to views
	app.use(function (req, res, next){
		res.locals.pkg = pkg;
		res.locals.env = env;
		next();
	});

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true }));


	app.use(helpers(pkg.name));

};