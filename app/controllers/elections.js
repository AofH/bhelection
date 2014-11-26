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

exports.randomStuff = function(req, res){
  res.render('elections/randomStuff',{
    title: "Random Stuff"
  });
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
    
  var province = req.body.province;
  var parliament = JSON.parse(req.body.parliament);
  
  var options = { groupFunctions:[
    {$match:{
      province:province, 
      parliment: parliament
    }},
    {$sort:{
      type: -1,
      riding: -1,
      date: -1
    }}, 
  ]};

  Election.groupBy(options, function(err, results){
    if(err) {
      console.log(err);
      return res.render('500');
    }
    res.json(results);
  });
}