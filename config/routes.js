//Controller Dependencies
var elections = require('../app/controllers/elections');
var visualizations = require('../app/controllers/visualizations');

module.exports = function(app){

	// home route
	app.get('/', elections.index);

	//Election Routes
	app.get('/election/maxGroup', elections.maxGroup);
	app.get('/election/random', elections.randomStuff);
	app.post('/election/groupData', elections.getGroupDataByProvince);

	//visualization Routes
	app.get('/visualization', visualizations.index);
	app.get('/visualization/map', visualizations.map);
	app.get('/visualization/entrantsByGroup', visualizations.entrantsByGroup);
	app.get('/visualization/occupations', visualizations.occupationOfEntrants);
	app.post('/visualization/provincialData', visualizations.provincialElectionData);
	app.post('/visualization/totalVotesByGroup', visualizations.totalVotesByGroup);
	app.get('/visualization/parties', visualizations.parties);

	//game routes
	app.post('/game/elected', visualizations.electedByProvince);

	/**
	 * Error Handling
	 */ 
	app.use(function (err, req, res, next){
		//treat as 404
		if (err.message
			&& (~err.message.indexOf('not found')
			|| (~err.message.indexOf('Cast to ObjectId failed')))) {
			return next();
		}

		console.error(err.stack);
		//error page
		res.status(500).render('500', { error: err.stack });
	});

	// assume 404 since no middleware responsded
	app.use(function (req, res, next){
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not found'
		});
	});


};