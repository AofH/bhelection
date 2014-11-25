/**
* Insert Script for getting csv file into mongodb
*/

var fs = require('fs');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var config = require('./config/config');
var electionModel = require('./app/models/election');
var Election = mongoose.model('Election');

var connect = function(){
	var options = { server: { socketOptions: { keepAlive: 1}}};
	mongoose.connect(config.db, options);
}
connect();

mongoose.connection.on('error', console.log);
mongoose.connection.on('disconnected', connect);
 
 /*
//bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function(file){
	if(~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
}); */

//read csv file.
var stream = fs.createReadStream("electionResults.csv");

csv
	.fromStream(stream, {headers : true})
	.on("data", function(data){
		//Create Record
		var electionResult = new Election({
			date: data['Election Date'],
			type: data['Election Type'],
			parliment: data['Parliament'],
			province: data['Province'],
			riding: data['Riding'],
			lastname: data['Last Name'],
			firstname: data['First Name'],
			gender: data['Gender'],
			occupation: data['Occupation'],
			party: data['Party'],
			votes: data['Votes'],
			percentage: data['Votes (%)'],
			elected: data['Elected'],
			createdOn:{type: Date, default: Date.now}
		});
		//save data to db
		electionResult.saveElection(function(){
			console.log(data['Last Name']);
		});

	
	})
	.on("end", function(){
		console.log("done");
	});

