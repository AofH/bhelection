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

//TODO change the error responding statement
exports.maxGroup = function(req, res){
  var province = req.query.province;
  var options = {province:province};
  Election.findMaxGroup(options, function(err, maxGroup){
    if(err){
      console.log(err);
      return res.render('500');
    }
    res.json(maxGroup);
  });
}

exports.getGroupDataByProvince = function(req, res){
  console.log(req.body);
  //var data = JSON.parse(req.body);
  var province = req.body.province;
  var parliament = req.body.parliament;
  
  var options = {criteria:{province: province, parliment: parliament}};

  Election.list(options, function(err, elections){
    if(err){
      console.log(err);
      return res.render('500');
    }
    res.json(elections);
  });
}