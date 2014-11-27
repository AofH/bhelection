//Controller Dependencies
var elections = require('../app/controllers/elections');
var visualizations = require('../app/controllers/visualizations');

module.exports = function(app){

	// home route
	app.get('/', elections.index);

	//Election Routes
	app.get('/election/random', elections.randomStuff);
	app.get('/election/general', elections.general);
	app.get('/election/map', elections.map);

	//visualization Routes
	app.get('/visualization/entrantsByGroup/:type', visualizations.entrantsByGroup);
	app.get('/visualization/occupations/limit/:num', visualizations.occupationOfEntrants);
	app.get('/visualization/votes/group/:province', visualizations.totalVotesByGroup);
	app.get('/visualization/parties', visualizations.parties);
	app.get('/visualization/parties/electedofficials', visualizations.electedOfficialsByParties);
	app.get('/visualization/province/:province/parliament/:group', visualizations.getGroupDataByProvince);
	app.get('/visualization/maxGroup/:province', visualizations.maxGroup);

	//game routes
	app.get('/game/elected/:province', visualizations.electedByProvince);

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