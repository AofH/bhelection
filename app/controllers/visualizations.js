var mongoose = require('mongoose');
var Election = mongoose.model('Election');


exports.index = function (req, res){
  res.render('visualizations/index',{
    title: 'Parliamentary Elections'
  });
}   

exports.entrantsByGroup = function(req, res){

  //console.log(req.query);

  var options = {groupFunctions: [
    {$match: {
      type:req.query.entrantType
    }},
    {$group: {
      _id:{ parliment:'$parliment' },
      total:{$sum:1}
    }},
    {$project:{
      parliament:"$_id.parliment",
      total: true,
      _id:false
    }},
    {$sort:{
      parliament:1
    }},
  ]};

  Election.groupBy(options, function (err, results){
    if (err) {
      console.log(err);
      return res.render('500');
    }
    //console.log(results);
    res.json(results);
  });   

}