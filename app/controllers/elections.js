var mongoose = require('mongoose');
var Election = mongoose.model('Election');

exports.index = function (req, res){
	

  res.render('elections/index', {
    title: "BitHound Election Challenge"
  });
  /*var options = {criteria:{ elected: 1}};

  
	Election.list(options, function (err, elections){
		if (err) return res.render('500');
		res.render('elections/index', {
			title: 'Elections',
			elections: elections
		});
	}); */
}